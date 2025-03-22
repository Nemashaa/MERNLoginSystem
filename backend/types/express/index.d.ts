import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { _id: string }; // Add the `user` property to the Request interface
    }
  }
}
