import { Response } from "express";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

interface ApiResponse<T> {
  meta: {
    code: number;
    message: string;
  };
  data?: T;
  errors?: T;
}

class Helper {

  public response = <T>(res: Response, code: number, message: string, data: T): Response => {
    const responseBody: ApiResponse<T> = {
      meta: {
        code,
        message,
      },
      data,
    };
    return res.status(code).json(responseBody);
  };

  public responseErr = <T>(res: Response, code: number, message: string, errors: T) => {
    const responseBody: ApiResponse<T> = {
      meta: {
        code,
        message,
      },
      errors,
    };
    return res.status(code).json(responseBody);
  };

  public encryptPassword = async (password: string) => {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  };

  public isPasswordMatch = async (password: string, userPassword: string) => {
    return bcrypt.compare(password, userPassword);
  };

  public createUuid = (): string => {
    let uuid: string = uuidv4();
    return uuid;
  }
}

export default new Helper();
