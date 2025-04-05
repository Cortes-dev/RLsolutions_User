import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import Promociones from "../components/Promociones";
import Header from "../components/Header";
import FeaturedProducts from "./FeaturedProducts";
import Images from "../components/Images";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' o 'list'

  const categories = [
    "Todos",
    "Tecnología",
    "Hogar",
    "Electrodomésticos",
    "Oficina"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50"
    >
      {/* Header */}
      <Header />

      {/* Sección de promociones con animación mejorada */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Promociones />
      </motion.section>

      {/* Sección de productos destacados */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Productos Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Descubre nuestros productos más populares y mejor valorados
          </motion.p>
        </div>

        {/* Filtros y controles de vista */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-gray-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
              aria-label="Vista de cuadrícula"
            >
              <Icon icon="mdi:grid" width="20" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:bg-gray-100"}`}
              aria-label="Vista de lista"
            >
              <Icon icon="mdi:format-list-bulleted" width="20" />
            </button>
          </div>
        </motion.div>

        {/* Componente de productos destacados */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeaturedProducts category={activeCategory} viewMode={viewMode} />
        </motion.div>

        {/* Botón Ver Más con animación */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-10"
        >
          <Link
            to="/products"
            className="group relative inline-flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-3 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
              <Icon icon="mdi:arrow-right" width="24" />
            </span>
            <span className="text-sm font-medium transition-all group-hover:mr-4">
              Ver todos los productos
            </span>
          </Link>
        </motion.div>
      </motion.section>

      {/* Sección de estadísticas */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Productos", icon: "mdi:package-variant" },
              { value: "98%", label: "Clientes Satisfechos", icon: "mdi:account-heart" },
              { value: "24/7", label: "Soporte", icon: "mdi:headset" },
              { value: "5M+", label: "Ventas", icon: "mdi:cart-check" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex flex-col items-center">
                  <Icon icon={stat.icon} className="text-blue-600 text-4xl mb-4" />
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Sección de imágenes */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <Images />
      </motion.div>

      {/* Testimonios */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-gray-50"
      >
        <Testimonials />
      </motion.section>

      {/* Newsletter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      >
        <Newsletter />
      </motion.section>
    </motion.div>
  );
};

export default Home;