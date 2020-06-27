import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

const ErrorHandle = (
  err: Error,
  __: Request,
  response: Response,
  _: NextFunction,
): any => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default ErrorHandle;
