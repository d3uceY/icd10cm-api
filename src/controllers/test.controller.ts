import { Request, Response } from 'express';

export const getTestMessage = (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Server is working',
  });
};
