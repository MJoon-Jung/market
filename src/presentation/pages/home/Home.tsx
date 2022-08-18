import React, { useEffect, useState } from 'react';
import ProductList from '@/presentation/components/product/ProductList';
import { getAllProducts } from '@/infra/http/client';
import { IProduct } from '@/data/model/IProduct';
import Loading from '@/presentation/components/loading/Loading';

const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    if (products && products.length) return;
    (async () => {
      const res = await getAllProducts();
      setProducts(res.data);
    })();
  }, [products]);
  return products && products.length ? (
    <ProductList products={products} />
  ) : (
    <Loading />
  );
};

export default Home;
