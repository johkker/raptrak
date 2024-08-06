import * as express from 'express';
import { jwt } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      newInput: any;
      decoded: string | jwt.JwtPayload | undefined;
      adm: boolean;
      self: boolean;
    }
  }
}
