export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string | null;
  price: number | null;
}
export interface ICreateProduct {
  title: string;
  description: string;
  image: string | null;
  price: string;
}
export interface IUpdateProduct {
  title: string;
  description: string;
  image: string | null;
  price: string;
}
