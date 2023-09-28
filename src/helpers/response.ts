import { Response } from "express";

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
}

export default new Helper();