import Header from '@/presentation/components/header/Header';
import React from 'react';
import { LayoutRouteProps } from 'react-router-dom';
import './Layout.css';

const Layout: React.FC<LayoutRouteProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
