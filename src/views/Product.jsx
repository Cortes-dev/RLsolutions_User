import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
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
        // Cargamos todos los productos del JSON
        const response = await axios.get(`/Datos.json`);

        if (!response.data || !Array.isArray(response.data)) {
          setLoading(false);
          console.log(response.data);
          throw new Error("Estructura de datos incorrecta");
        }

        // Buscamos el producto con el ID de la URL
        const productoEncontrado = response.data.find((p) => p.id === parseInt(id));

        if (!productoEncontrado) {
          throw new Error(`Producto con ID ${id} no encontrado`);
        }

        setProducto(productoEncontrado);
        if (productoEncontrado.imagenes?.length > 0) {
          setImagenSeleccionada(productoEncontrado.imagenes[0]);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
        console.error("Error:", err);
      }
    };

    fetchProducto();
  }, [id]);

  const handleComprar = () => {
    toast.success("Producto agregado al carrito");
  };

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

  // Verificar y normalizar la calificación
  const normalizeRating = (rating) => {
    const num = Number(rating);
    if (isNaN(num)) return 0;
    return Math.min(5, Math.max(0, num));
  };

  // En tu componente:
  const rating = normalizeRating(producto.calificacion);

  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 min-h-screen"
      >
        {/* Contenedor principal */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección de imágenes */}
          <div className="space-y-4">
            {/* Imagen principal */}
            <motion.img
              src={imagenSeleccionada}
              alt={producto.nombre}
              className="w-full h-96 object-contain rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
            />

            {/* Galería de imágenes - CORRECCIÓN: usar producto.imagenes en lugar de producto */}
            <div className="overflow-x-auto whitespace-nowrap space-x-4 py-2">
              {producto.imagenes.map((imagen, index) => (
                <motion.img
                  key={index}
                  src={imagen}
                  alt={`Imagen ${index + 1}`}
                  className={`inline-block w-24 h-24 object-cover rounded-lg cursor-pointer ${imagen === imagenSeleccionada
                    ? "border-2 border-blue-500"
                    : "border border-gray-200"
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
              {[1, 2, 3, 4, 5].map((star) => {
                const rating = Number(producto.calificacion) || 0;
                return (
                  <span key={star} className="text-yellow-400 text-xl">
                    {star <= rating ? (
                      <FaStar />
                    ) : star - 0.5 <= rating ? (
                      <FaStarHalfAlt />
                    ) : (
                      <FaRegStar />
                    )}
                  </span>
                );
              })}
              <span className="text-gray-600 ml-1">
                ({rating.toFixed(1)})
              </span>
            </div>

            <p className="text-3xl font-bold text-blue-600">{producto.precio}</p>
            <p className="text-gray-700">{producto.descripcion}</p>
            <p className="text-gray-600">
              {producto.stock > 0
                ? `Disponible: ${producto.stock} unidades`
                : "Agotado"}
            </p>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button
                onClick={handleComprar}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => toast.info("Compra rápida no implementada")}
                className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Comprar ahora
              </button>
            </div>

            <p className="text-gray-600">
              Categoría:{" "}
              <span className="font-semibold">{producto.categoria}</span>
            </p>
          </div>
        </div>
      </motion.div>

      <Card />
    </div>
  );
};

export default Product;