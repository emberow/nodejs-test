import { RequestHandler } from 'express';
import * as AccountController from './controller/AccountController';

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
      AccountController.getList,
      (req, res, next) => {
        console.log("aaaa");
        next();
      },
      (req, res) => {
        res.send("查詢完畢");
      },
    ],
  },
  {
    path: '',
    method: 'post',
    middlewares: [
      AccountController.save,
      (req, res) => {
        res.send("新增成功");
      },
    ],
  },
  {
    path: '',
    method: 'delete',
    middlewares: [
      AccountController.del,
      (req, res) => {
        res.send("新增成功");
      },
    ],
  }
];
  