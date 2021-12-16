// import { Router } from 'express';
import adminAccess from '../middleware/admin';
import controlProductos from '../controllers/producto.controllers';
import Router from 'koa-router'

const routerProductos = new Router();

routerProductos.get('/listar', controlProductos.muestraProducto);

routerProductos.get(
  '/listar/:id',
  controlProductos.productoExiste,
  controlProductos.muestraProducto
);

routerProductos.post('/agregar', adminAccess, controlProductos.agregaProducto);

routerProductos.put(
  '/actualizar/:id',
  adminAccess,
  controlProductos.productoExiste,
  controlProductos.modificaProducto
);

routerProductos.delete(
  '/borrar/:id',
  adminAccess,
  controlProductos.productoExiste,
  controlProductos.eliminaProducto
);

export default routerProductos.routes();
