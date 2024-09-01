import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import FarmerProfile from './components/FarmerProfile';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <ProductList />
        <FarmerProfile />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
