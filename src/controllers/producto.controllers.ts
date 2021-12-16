import { Context, Next } from 'koa';
import productos from '../models/productos.model';
// import { Request, Response, NextFunction } from 'express';

class controlProductos {
  async productoExiste(ctx: Context, next: Next) {
    const { id } = ctx.params.id;
    const producto = await productos.find(id);
    if (!producto) {
        ctx.response.status = 404
        ctx.response.body = { error: `Producto con id ${id} no encontrado` };
    }
    next();
  }

  async muestraProducto(ctx: Context, next: Next) {
    const { id } = ctx.params.id;
    const consulta = id ? await productos.get(id) : await productos.get();
    ctx.response.body = consulta
  }

  async agregaProducto(ctx: Context, next: Next) {
    const datos = ctx.request.body;
    const agregado = await productos.add(datos);
    ctx.response.body = agregado
    // res.json({
    //   msg: `Producto agregado exitosamente`,
    //   producto: agregado,
    // });
  }

  async modificaProducto(ctx: Context, next: Next) {
    const { id } = ctx.params.id;
    const nuevo = ctx.request.body;
    await productos.update(id, nuevo);
    ctx.response.body = await productos.find(id)

    // res.json({
    //   msg: `Producto ${id} modificado exitosamente`,
    //   producto: await productos.find(id),
    // });
  }

  async eliminaProducto(ctx: Context, next: Next): Promise<void> {
    const { id } = ctx.params.id;
    const eliminado = await productos.find(id);
    await productos.delete(id);
    // res.json({
    //   msg: `Producto ${id} eliminado exitosamente`,
    //   producto: eliminado,
    // });
  }
}

export default new controlProductos();
