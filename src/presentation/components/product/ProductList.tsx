import React from 'react';
import { IProduct } from '@/data/model/IProduct';
import Product from '@/presentation/components/product/Product';
import './ProductList.css';

const ProductList: React.FC<{ products: IProduct[] }> = ({ products }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: IProduct) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
        <h2 className="sr-only">Products</h2>
      </div>
    </div>
  );
};

export default ProductList;
