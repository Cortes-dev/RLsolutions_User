import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Para alertas con Sonner
import Card from "../components/Card";

const Product = () => {
  // Datos de ejemplo del producto (simulando la respuesta de la base de datos)
  const producto = {
    id: 1,
    nombre: "M12 Plug 8 Pin Male",
    descripcion:"Conector Macho - M12 Plug 8 Pin Male",
    precio: "$1500.00",
    calificacion: 4.5, // Calificación de 1 a 5
    imagenes: [
      "https://rlsolutions.com.mx/Admin/img/1015485835.jpg",
      "https://rlsolutions.com.mx/Admin/img/1120253900.jpg",
      "https://rlsolutions.com.mx/Admin/img/1017272602.jpg",
      "https://rlsolutions.com.mx/Admin/img/1022273744.jpg",
      "https://rlsolutions.com.mx/Admin/img/351268489.jpg",
      "https://rlsolutions.com.mx/Admin/img/1620268737.jpg",
      "https://rlsolutions.com.mx/Admin/img/430985328.jpeg",
    ],
    categoria: "Electrónica",
    stock: 10, // Cantidad disponible
  };

  // Estado para la imagen seleccionada
  const [imagenSeleccionada, setImagenSeleccionada] = useState(
    producto.imagenes[0]
  );

  // Función para manejar la compra
  const handleComprar = () => {
    toast.success("Producto agregado al carrito"); // Alerta de éxito con Sonner
  };

  return (
    <div className="">
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Animación inicial
      animate={{ opacity: 1, y: 0 }} // Animación al cargar
      transition={{ duration: 0.5 }} // Duración de la animación
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
            whileHover={{ scale: 1.02 }} // Efecto hover suave
          />

          {/* Galería de imágenes con scroll horizontal */}
          <div className="overflow-x-auto whitespace-nowrap space-x-4 py-2">
            {producto.imagenes.map((imagen, index) => (
              <motion.img
                key={index}
                src={imagen}
                alt={`Imagen ${index + 1}`}
                className={`inline-block w-24 h-24 object-cover rounded-lg cursor-pointer ${
                  imagen === imagenSeleccionada
                    ? "border-2 border-blue-500"
                    : "border border-gray-200"
                }`}
                onClick={() => setImagenSeleccionada(imagen)}
                whileHover={{ scale: 1.05 }} // Efecto hover suave
              />
            ))}
          </div>
        </div>

        {/* Sección de detalles del producto */}
        <div className="space-y-6">
          {/* Nombre y calificación */}
          <h1 className="text-4xl font-bold text-gray-800">{producto.nombre}</h1>
          <div className="flex items-center space-x-2">
            {/* Estrellas de calificación */}
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`text-2xl ${
                  index < Math.floor(producto.calificacion)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-gray-600">({producto.calificacion})</span>
          </div>

          {/* Precio */}
          <p className="text-3xl font-bold text-blue-600">{producto.precio}</p>

          {/* Descripción */}
          <p className="text-gray-700">{producto.descripcion}</p>

          {/* Stock disponible */}
          <p className="text-gray-600">
            {producto.stock > 0
              ? `Disponible: ${producto.stock} unidades`
              : "Agotado"}
          </p>

          {/* Botones de acción */}
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

          {/* Categoría */}
          <p className="text-gray-600">
            Categoría:{" "}
            <span className="font-semibold">{producto.categoria}</span>
          </p>
        </div>
      </div>
    </motion.div>

    <Card/>
      </div>
  );
};

export default Product;