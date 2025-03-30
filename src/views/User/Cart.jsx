import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Para notificaciones

// Datos de ejemplo del carrito (simulando la respuesta de la base de datos)
const productosCarrito = [
  {
    id: 1,
    nombre: "Laptop Gamer Pro",
    imagen: "https://rlsolutions.com.mx/Admin/img/1015485835.jpg",
    precio: 1500.0,
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Teclado Mecánico RGB",
    imagen: "https://rlsolutions.com.mx/Admin/img/351268489.jpg",
    precio: 120.0,
    cantidad: 2,
  },
  {
    id: 3,
    nombre: "Mouse Inalámbrico",
    imagen: "https://rlsolutions.com.mx/Admin/img/996723646.jpg",
    precio: 50.0,
    cantidad: 1,
  },
];

const Cart = () => {
  const [carrito, setCarrito] = useState(productosCarrito);

  // Función para aumentar la cantidad de un producto
  const aumentarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  };

  // Función para disminuir la cantidad de un producto
  const disminuirCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  };

  // Función para eliminar un producto del carrito
  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id !== id)
    );
    toast.success("Producto eliminado del carrito"); // Notificación con Sonner
  };

  // Calcular el subtotal del carrito
  const subtotal = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  // Calcular impuestos (ejemplo: 10% de impuestos)
  const impuestos = subtotal * 0.1;

  // Calcular el total
  const total = subtotal + impuestos;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Animación inicial
      animate={{ opacity: 1, y: 0 }} // Animación al cargar
      transition={{ duration: 0.5 }} // Duración de la animación
      className="p-6 min-h-screen"
    >
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu Carrito</h1>

        {/* Lista de productos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sección de productos */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            {carrito.length === 0 ? (
              <p className="text-gray-600">No hay productos en el carrito.</p>
            ) : (
              carrito.map((producto) => (
                <motion.div
                  key={producto.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-4"
                >
                  {/* Imagen y nombre */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-18 h-18 object-cover rounded-full"
                    />
                    <p className="text-lg font-semibold text-gray-800">
                      {producto.nombre}
                    </p>
                  </div>

                  {/* Cantidad y precio */}
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    {/* Botones de cantidad */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => disminuirCantidad(producto.id)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {producto.cantidad}
                      </span>
                      <button
                        onClick={() => aumentarCantidad(producto.id)}
                        className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition duration-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Precio y eliminar */}
                    <p className="text-lg font-semibold text-gray-800">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </p>
                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="text-red-500 hover:text-red-700 transition duration-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Resumen de compra */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Resumen de Compra
            </h2>

            {/* Subtotal, impuestos y total */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Impuestos (10%)</p>
                <p className="font-semibold">${impuestos.toFixed(2)}</p>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <p className="text-lg font-bold text-gray-800">Total</p>
                <p className="text-lg font-bold text-blue-600">
                  ${total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Botón de finalizar compra */}
            <button
              onClick={() => toast.success("Compra finalizada con éxito")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;