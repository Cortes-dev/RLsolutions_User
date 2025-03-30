// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Products from './views/Products';
import Brands from './views/Brands';
import Cart from './views/User/Cart';
import Setting from './views/User/SettingUser';
import Orders from './views/User/HistorialCompras';
import NotFound from './views/NotFound';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import Loader from './components/Load'; // Importar el Loader
import Footer from './components/Footer';
import Product from './views/Product';
import BackgroundRemover from './views/Remove';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de navegación */}
      {!isAuthPage && <Navbar />}

      {/* Contenido principal */}
      <main className="container mx-auto content w-full">
        <Routes>
          {/* Rutas principales */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          {/* Nomas el de abajo --- Prueba nomas */}
          <Route path="/product" element={<Product />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/remove" element={<BackgroundRemover />} />

          {/* Rutas de autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta para páginas no encontradas (404) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {/* Mostrar el Loader si isLoading es true */}
      {isLoading ? <Loader /> : <AppContent />}
    </Router>
  );
};

export default App;