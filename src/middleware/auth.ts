import passport from 'passport';
import {
	StatusCodes,
} from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import Helper from '../utils/helper';

const verifyCallback =
  (
    req: Request,
    res: Response,
    resolve: (value?: unknown) => void,
    reject: (reason?: unknown) => void,
    requiredRights: string[]
  ) =>
  async (err: unknown, user: User | false, info: unknown) => {
    if (err || info || !user) {
      return reject(Helper.response(res, StatusCodes.UNAUTHORIZED, 'Please Authenticate', null));
    }
    req.user = user;

    // if (requiredRights.length) {
    //   const userRights = roleRights.get(user.role) ?? [];
    //   const hasRequiredRights = requiredRights.every((requiredRight) =>
    //     userRights.includes(requiredRight)
    //   );
    //   if (!hasRequiredRights && req.params.userId !== user.id) {
    //     return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    //   }
    // }

    resolve();
  };

const auth =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, res, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export default auth;
