import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import * as ServiceAccount from '../../../service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount as any),
});

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Authentication...');

    const token = req.headers.authorization;
    if (token) {
      try {
        await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        next();
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
