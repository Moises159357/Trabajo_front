export class ProductoDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  category: string = '';
  brand: string = '';
  price: number = 0;
  rating: number = 0;
  stock: number = 0;
  thumbnail: string = '';
}

export class ProductosRespuesta {
  products: ProductoDTO[] = [];
  total: number = 0;
}