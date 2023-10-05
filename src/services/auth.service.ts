import {
  ReasonPhrases,

} from 'http-status-codes';
import tokenService from '../services/token.service';
import UserService from '../services/user.service';
import { TokenType, User } from '@prisma/client';
import { db } from '../utils/db.server';
import Helper from '../utils/helper';

import { AuthTokensResponse } from '../types/response';
import exclude from '../utils/exclude';

class AuthService {

  /**
  * Login with username and password
  * @param {string} email
  * @param {string} password
  * @returns {Promise<Omit<User, 'password'>>}
  */
  public loginUserWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<Omit<User, 'password'> & {
    company_id: number | null;
    department_id: number | null;
    email_verified_at: Date | null;
    remember_token: string | null;
    created_at: Date;
    updated_at: Date;
    active: boolean;
    role: string;
    bank_account: string | null;
    account_number: string | null;
    deleted_at: Date | null;
  }> => {
    const user = await UserService.getUserByEmail(email, [
      'id',
      'email',
      'name',
      'password',
      'company_id',
      'department_id',
      'email_verified_at',
      'remember_token',
      'created_at',
      'updated_at',
      'active',
      'role',
      'bank_account',
      'account_number',
      'deleted_at'
    ]);
    if (!user || !(await Helper.isPasswordMatch(password, user.password as string))) {
      throw new Error('Incorrect email or password');
    }
    return exclude(user, ['password']) as Omit<User, 'password'> & {
      company_id: number | null;
      department_id: number | null;
      email_verified_at: Date | null;
      remember_token: string | null;
      created_at: Date;
      updated_at: Date;
      active: boolean;
      role: string;
      bank_account: string | null;
      account_number: string | null;
      deleted_at: Date | null;
    };
  };

  /**
  * Logout
  * @param {string} refreshToken
  * @returns {Promise<void>}
  */
  public logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenData = await db.token.findFirst({
      where: {
        token: refreshToken,
        type: TokenType.REFRESH,
        blacklisted: false
      }
    });
    if (!refreshTokenData) {
      throw new Error('Not found');
    }
    await db.token.delete({ where: { id: refreshTokenData.id } });
  };

  /**
  * Refresh auth tokens
  * @param {string} refreshToken
  * @returns {Promise<AuthTokensResponse>}
  */
  public refreshAuth = async (refreshToken: string): Promise<AuthTokensResponse> => {
    try {
      const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH);
      const { user_id } = refreshTokenData;
      await db.token.delete({ where: { id: refreshTokenData.id } });
      return tokenService.generateAuthTokens({ id: user_id });
    } catch (error) {
      throw new Error(ReasonPhrases.UNAUTHORIZED);
    }
  };
}

export default new AuthService();
