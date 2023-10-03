import { Request, Response } from "express";
import {
  ReasonPhrases,
  StatusCodes,
} from 'http-status-codes';
import exclude from '../utils/exclude';
import { User } from '@prisma/client';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.service';
import Helper from '../utils/helper';

class AuthController {

  public login = async (req: Request, res: Response) => {

    try {
      const { email, password } = req.body;
      const user = await AuthService.loginUserWithEmailAndPassword(email, password);
      const tokens = await TokenService.generateAuthTokens(user);
      const data = {
        user: user,
        tokens: tokens,
      };
      return Helper.response(res, StatusCodes.OK, `List Users`, data);
    } catch (e: any) {
      return Helper.responseErr(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        e.message
        );
    }
  };

  // public logout = catchAsync(async (req, res) => {
  //   await authService.logout(req.body.refreshToken);
  //   res.status(httpStatus.NO_CONTENT).send();
  // });

  // public refreshTokens = catchAsync(async (req, res) => {
  //   const tokens = await authService.refreshAuth(req.body.refreshToken);
  //   res.send({ ...tokens });
  // });
}



export default new AuthController();
