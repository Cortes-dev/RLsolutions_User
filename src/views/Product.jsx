import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Product = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch("/Datos.json");
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Estructura de datos incorrecta");
        }

        const productoEncontrado = data.find((p) => p.id === parseInt(id));

        if (!productoEncontrado) {
          throw new Error(`Producto con ID ${id} no encontrado`);
        }

        setProducto(productoEncontrado);
        setImagenSeleccionada(productoEncontrado.imagenes?.[0] || "");
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleComprar = () => toast.success("Producto agregado al carrito");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Cargando producto...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  const rating = Math.min(5, Math.max(0, Number(producto.calificacion) || 0));

  return (
    <div className="p-6 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Sección de imágenes */}
        <div className="space-y-4">
          <motion.img
            src={imagenSeleccionada}
            alt={producto.nombre}
            className="w-full h-96 object-contain rounded-lg shadow-lg"
            whileHover={{ scale: 1.02 }}
          />
          <div className="flex space-x-4 py-2">
            {producto.imagenes.map((imagen, index) => (
              <motion.img
                key={index}
                src={imagen}
                alt={`Imagen ${index + 1}`}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer ${imagen === imagenSeleccionada ? "border-2 border-blue-500" : "border border-gray-200"
                  }`}
                onClick={() => setImagenSeleccionada(imagen)}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>

        {/* Sección de detalles */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{producto.nombre}</h1>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xl">
                {star <= rating ? <FaStar /> : star - 0.5 <= rating ? <FaStarHalfAlt /> : <FaRegStar />}
              </span>
            ))}
            <span className="text-gray-600 ml-1">({rating.toFixed(1)})</span>
          </div>

          <p className="text-3xl font-bold text-blue-600">{producto.precio}</p>
          <p className="text-gray-700">{producto.descripcion}</p>
          <p className="text-gray-600">
            {producto.stock > 0 ? `Disponible: ${producto.stock} unidades` : "Agotado"}
          </p>

          <div className="flex space-x-4">
            <button
              onClick={handleComprar}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Agregar al carrito
            </button>
            <button
              onClick={() => toast.info("Compra rápida no implementada")}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Comprar ahora
            </button>
          </div>

          <p className="text-gray-600">
            Categoría: <span className="font-semibold">{producto.categoria}</span>
          </p>
        </div>
      </motion.div>
      <Card />
    </div>
  );
};

export default Product;
