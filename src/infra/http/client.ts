import axios from 'axios';
import { ICreateProduct, IUpdateProduct } from '@/data/model/IProduct';

const client = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getAllProducts = () => {
  return client.get('/products?_sort=id&_order=desc');
};
export const limitAndSKipProducts = (limit: number, skip: number) => {
  return client.get(
    `/products?limit=${limit}&skip=${skip}&select=id,title,price,thumbnail,description`
  );
};
export const getASignleProducts = (id: number) => {
  return client.get(`/products/${id}`);
};
export const searchProducts = (title: string) => {
  return client.get(`/products?title={title}`);
};
export const limitAndSkipProducts = () => {
  return client.get('/products');
};
export const getProductsOfACategory = (category: string) => {
  return client.get(`/products/category/${category}`);
};
export const addANewProduct = (info: ICreateProduct) => {
  return client.post('/products', { ...info, price: Number(info.price) });
};
export const updateAProduct = (id: number, info: IUpdateProduct) => {
  return client.put(`/products/${id}`, { ...info, price: Number(info.price) });
};
export const deleteAProduct = (id: number) => {
  return client.delete(`/products/${id}`);
};
