import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import * as ServiceAccount from '../../service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount as any),
});

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy, 'firebase') {
  constructor() {
    super();
  }

  async validate(req: Request): Promise<any> {
    const token = req.headers.authorization;
    if (token) {
      try {
        const user = await admin
          .auth()
          .verifyIdToken(token.replace('Bearer ', ''));
        return user;
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
