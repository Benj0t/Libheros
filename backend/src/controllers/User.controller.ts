import {
  Controller,
  Post,
  Body,
  UsePipes,
  ConflictException,
  HttpException,
  UnauthorizedException,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';

import { YupValidationPipe } from '../pipes/YupValidationPipe';
import userSignupSchema from '../yupSchemas/userSignupSchema';
import userSigninSchema from '../yupSchemas/userSigninSchema';
import SigninUserDto from '../dto/signinUser.dto';
import { User, UserService } from '../service/User.service';
import { validateEmail } from '../yupSchemas/loginDataValidation';
import { verifyPassword } from '../utils/password';
import { AuthGuard } from '../guards/auth.guard';
import { RequestCtx } from '../types/auth';

@Controller('auth')
export class UsersController {
  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Request() req: RequestCtx): Promise<{ user: Omit<User, 'password'> }> {
    try {
      const user = await UserService.findOneById(req.userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;

      return { user: userWithoutPassword };
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }

      console.log(err);
      throw new HttpException('Error fetching user data', 500);
    }
  }

  @Post('/signup')
  @UsePipes(new YupValidationPipe(userSignupSchema))
  async userSignup(
    @Body() userPayload: Omit<User, 'uuid'>,
  ): Promise<{ message: string; user: Omit<User, 'password'> }> {
    try {
      const { password, ...payload } = {
        uuid: uuidv4(),
        ...userPayload,
      };

      const [emailAlreadyExist, usernameAlreadyExist] = await Promise.all([
        UserService.findOneByEmail(payload.email),
        UserService.findOneByUsername(payload.username),
      ]);

      if (emailAlreadyExist) {
        console.log('User email already exist', { email: payload.email });
        throw new ConflictException('This Email is already used');
      }

      if (usernameAlreadyExist) {
        console.log('User username already exist', {
          username: payload.username,
        });
        throw new ConflictException('This Username is already used');
      }

      await UserService.create({ ...payload, password });

      console.log('User registered successfully', payload.uuid);

      return {
        message: 'User registered successfully',
        user: payload,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Something bad Happened', 500);
    }
  }

  @Post('/signin')
  @UsePipes(new YupValidationPipe(userSigninSchema))
  async userSignin(@Body() signinDto: SigninUserDto): Promise<{ message: string; jwt: string }> {
    try {
      const jwtSecretKey = process.env.JWT_SECRET as string;
      const { credential, password } = signinDto;

      // If credential is an email, we use findByEmail, else, credential is an username, so we use findByUsername
      const userData = validateEmail(credential)
        ? await UserService.findOneByEmail(credential)
        : await UserService.findOneByUsername(credential);

      const isValidAuthentication = userData && (await verifyPassword(password, userData.password));

      if (!isValidAuthentication) {
        throw new UnauthorizedException('Unauthorized user');
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
      if (err instanceof UnauthorizedException) {
        throw err;
      }

      console.log(err);
      throw new HttpException('Error during /auth/signin', 500);
    }
  }
}
