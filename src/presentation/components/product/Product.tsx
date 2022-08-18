import { IProduct } from '@/data/model/IProduct';
import defaultPhoto from '@/data/photo';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product: React.FC<IProduct> = ({
  id,
  title,
  price,
  description,
  image,
}) => {
  return (
    <Link to={`/products/${id}`} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img
          src={image || defaultPhoto}
          alt={description}
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}$</p>
    </Link>
  );
};

export default Product;
