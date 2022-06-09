import { Request, Response, NextFunction } from 'express';
import { getAccount, getAllAccount } from '../services/AccountService';

export const getName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAccount();
    getAllAccount();
    res.send(result);
  } catch (err) {
    next(err);
  }
};