// import carrito from '../models/carrito';
import productos from '../models/productos.model';
// import { Request, Response, NextFunction } from 'express';
import carrito from '../models/carrito.model';
import sendSMS from '../services/sms';
import { Context, Next } from 'koa';
import { ComplexTypes } from 'graphql-compose-mongoose';

class controlCarrito {
  // async productoExiste(req: Request, res: Response, next: NextFunction) {
  //   const { id_producto } = req.params;
  //   const producto = productos.find(id_producto);
  //   if (!producto) {
  //     return res
  //       .status(404)
  //       .json({ error: `Producto con id ${id_producto} no encontrado` });
  //   }
  //   next();
  // }
  async productoExiste(ctx: Context, next: Next) {
    const { id_producto } = ctx.params.id;
    const producto = productos.find(id_producto);
    if (!producto) {
      ctx.response.status = 404
      ctx.body = { error: `Producto con id ${id_producto} no encontrado` };
    }
    next();
  }
  // async articuloExiste(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   console.log(id);
  //   const articulo = await carrito.find(id);
  //   if (!articulo) {
  //     return res
  //       .status(404)
  //       .json({ error: `Articulo con id ${id} no encontrado` });
  //   }
  //   next();
  // }
  async articuloExiste(ctx: Context, next: Next) {
    const { id } = ctx.params.id;
    console.log(id);
    const articulo = await carrito.find(id);
    if (!articulo) {
       ctx.response.status = 404
        ctx.response.body = { error: `Articulo con id ${id} no encontrado` };
    }
    next();
  }

  async muestraArticulo(ctx: Context, next: Next) {
    const { id } = ctx.params.id;
    const consulta = id ? await carrito.get(id) : await carrito.get();
    ctx.response.body = consulta
  }

  async agregaArticulo(ctx: Context, next: Next) {
    const { id_producto } = ctx.params.id;
    // const producto = productos.find(id_producto);
    // if (producto !== undefined) {
    // console.log(producto);
    const agregado = await carrito.add(id_producto);
    ctx.response.body = agregado
  }

  async eliminaArticulo(ctx: Context, nex: Next) {
    const { id } = ctx.params.id;
    const eliminado = await carrito.get(id);
    await carrito.delete(id);
    // res.json({
    //   msg: `Articulo ${id} eliminado exitosamente`,
    //   producto: eliminado,
    // });
  }

  // async checkout(req: Request, res: Response, nex: NextFunction) {
  //   let total = 0;
  //   const enCarrito = await carrito.get();
  //   for (let i = 0; i < enCarrito.length; i++) {
  //     total += enCarrito[i].producto.precio;
  //   }
  //   sendSMS(
  //     `${process.env.ADMIN_PHONE!}`,
  //     `El total de tu compra es: ${total}`
  //   );
  //   return total;
  // }
}

export default new controlCarrito;
