import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from '@/presentation/pages/product/ProductDetail';
import Home from '@/presentation/pages/home/Home';
import './index.css';
import Layout from '@/presentation/components/layout/Layout';
import RegisterProduct from '@/presentation/pages/product/RegisterProduct';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products/add" element={<RegisterProduct />} />
        <Route path="/products/edit/:productId" element={<RegisterProduct />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </Layout>
  );
};

export default App;
