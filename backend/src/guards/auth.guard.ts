import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Retrieve the bearer token
    const authorizationHeader: string = request?.headers?.authorization || '';

    const token: string | null =
      authorizationHeader &&
      typeof authorizationHeader === 'string' &&
      authorizationHeader.startsWith('Bearer ')
        ? authorizationHeader.split(' ')[1]
        : null;

    if (!token) {
      throw new UnauthorizedException('Bad token');
    }

    try {
      const jwtSecretKey = process.env.JWT_SECRET as string;

      const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;

      if (!decoded.userId) {
        throw new UnauthorizedException('Invalid payload');
      }

      request.userId = decoded.userId;

      return true;
    } catch (err) {
      throw new UnauthorizedException('Error during authentication');
    }
  }
}
