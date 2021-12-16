export interface ProductoI {
  _id: string;
  timestamp: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export interface NuevoProductoI {
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export interface ProductoBaseClass {
  get(id?: string | undefined): Promise<ProductoI[]>;
  add(data: NuevoProductoI): Promise<ProductoI>;
  update(id: string, dataNuevoProducto: NuevoProductoI): any;
  delete(id: string): Promise<void>;
}
