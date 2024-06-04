import {
  Controller,
  Post,
  Body,
  UsePipes,
  ConflictException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { YupValidationPipe } from '../pipes/YupValidationPipe';
import userSignupSchema from '../yupSchemas/userSignupSchema'; // Importez votre schéma de validation depuis le fichier approprié
import userSigninSchema from '../yupSchemas/userSigninSchema';
import { SigninUserDto } from '../DTO/signinUser.dto';
import { User, UserModel } from '../models/User.model';
import { v4 as uuidv4 } from 'uuid';
import { validateEmail } from '../yupSchemas/loginDataValidation';
import { verifyPassword } from '../utils/password';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  @UsePipes(new YupValidationPipe(userSignupSchema))
  async userSignup(@Body() userPayload: User) {
    try {
      userPayload.uuid = uuidv4();
      const [emailAlreadyExist, usernameAlreadyExist] = await Promise.all([
        UserModel.findOneByEmail(userPayload.email),
        UserModel.findOneByUsername(userPayload.username),
      ]);

      if (emailAlreadyExist) {
        console.log('User email already exist', { email: userPayload.email });
        throw new ConflictException('This Email is already used');
      }

      if (usernameAlreadyExist) {
        console.log('User username already exist', {
          username: userPayload.username,
        });
        throw new ConflictException('This Username is already used');
      }
      await UserModel.create(userPayload);
      console.log('user created');
      return {
        message: 'User registered successfully',
        user: userPayload,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Something bad Happened', 500);
    }
  }

  @Post('/signin')
  @UsePipes(new YupValidationPipe(userSigninSchema))
  async userSignin(@Body() signinDto: SigninUserDto) {
    try {
      const jwtSecretKey = process.env.JWT_SECRET as string;
      const { credential, password } = signinDto;

      // If credential is an email, we use findByEmail, else, credential is an username, so we use findByUsername
      const userData = validateEmail(credential)
        ? await UserModel.findOneByEmail(credential)
        : await UserModel.findOneByUsername(credential);

      const isValidAuthentication = userData && (await verifyPassword(password, userData.password));
      if (!isValidAuthentication) {
        throw new BadRequestException('Invalid user');
      }
      const token = jwt.sign(
        {
          userId: userData.uuid,
        },
        jwtSecretKey,
        { expiresIn: '1h' },
      );
      return {
        message: 'User logged successfully',
        jwt: token,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Error during /auth/signin', 500);
    }
  }
}
