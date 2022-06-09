import { RequestHandler } from 'express';
import {getName} from './controller/AccountController';

interface IRouteItem {
    path: string;
    method: 'get' | 'post' | 'put' | 'delete';
    middlewares: RequestHandler[];
  }

export const AppRoutes: IRouteItem[] = [
  {
    path: '',
    method: 'get',
    middlewares: [
      getName,
      (req, res, next) => {
        console.log("aaaa");
        next();
      },
      (req, res) => {
        res.send("hi");
      },
    ],
  }
];
  