import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
    return;
  }

  jwt.verify(
    accessToken,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => { // Explicitly typed err and decoded
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.status(403).json({ success: false, message: 'Access token expired' });
          return;
        }
        res.status(403).json({ success: false, message: 'Invalid token' });
        return;
      }

      req.user = decoded;
      next(); // Explicitly return void here
    }
  );
};

export default authMiddleware;