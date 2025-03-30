import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Promociones from "../components/Promociones";
import Header from "../components/Header";
import Card from "../components/Card";
import Images from "../components/Images";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Animación inicial
      animate={{ opacity: 1 }} // Animación al cargar
      transition={{ duration: 0.5 }} // Duración de la animación
    >
      {/* Header */}
      <Header />

      {/* Sección de promociones */}
      <Promociones />

      {/* Sección de productos destacados */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} // Animación inicial
        whileInView={{ opacity: 1, y: 0 }} // Animación al entrar en la vista
        transition={{ duration: 0.5 }} // Duración de la animación
        className="py-12 bg-gray-100"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Productos Destacados</h1>
        <Card />
        <div className="flex justify-center mt-8">
          <Link
            to="/products"
            className="bg-[#007bff] text-white py-2 px-6 rounded-lg hover:bg-[#005cde] transition duration-300 flex items-center"
          >
            Ver más
          </Link>
        </div>
      </motion.section>

      {/* Sección de imágenes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Animación inicial
        whileInView={{ opacity: 1, y: 0 }} // Animación al entrar en la vista
        transition={{ duration: 0.5 }} // Duración de la animación
        className="py-12"
      >
        <Images />
      </motion.div>
    </motion.div>
  );
};

export default Home;