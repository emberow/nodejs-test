import { Request, Response, NextFunction } from 'express';
import {getAllAccount, addAccount, deleteAccount} from '../services/AccountService';

export const getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllAccount();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let name = req.body.name;
    let password = req.body.password;
    const result = await addAccount(name, password);
    // res.send(result);
    res.send("tes")
  } catch (err) {
    next(err);
  }
};

export const del = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let name = req.body.name;
    let password = req.body.password;
    const result = await deleteAccount(name, password);
    // res.send(result);
    res.send("tes")
  } catch (err) {
    next(err);
  }
};