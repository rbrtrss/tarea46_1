// import { Request, Response, NextFunction } from 'express';

import { Context, Next } from "koa";

const admin = true;

const adminAccess = (ctx: Context, next: Next) => {
  if (admin) {
    return next();
  }
  ctx.response.status = 403
  ctx.response.body = { msg: 'No autorizado'}
  // res.status(403).json({
  //   error: -1,
  //   descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`,
  // });
};

export default adminAccess;
