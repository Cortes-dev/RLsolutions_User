import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios"; // Para llamadas API

// Datos de ejemplo del carrito
const productosCarrito = [
  {
    id: 1,
    nombre: "Laptop Gamer Pro",
    imagen: "https://rlsolutions.com.mx/Admin/img/1015485835.jpg",
    precio: 1500.0,
    cantidad: 1,
    stock: 10,
    peso: 2.5, // kg
    dimensiones: "40x30x5", // cm
  },
  {
    id: 2,
    nombre: "Teclado Mecánico RGB",
    imagen: "https://rlsolutions.com.mx/Admin/img/351268489.jpg",
    precio: 120.0,
    cantidad: 2,
    stock: 15,
    peso: 1.2,
    dimensiones: "45x15x3",
  },
  {
    id: 3,
    nombre: "Mouse Inalámbrico",
    imagen: "https://rlsolutions.com.mx/Admin/img/996723646.jpg",
    precio: 50.0,
    cantidad: 1,
    stock: 20,
    peso: 0.3,
    dimensiones: "12x6x4",
  },
];

// Opciones de envío disponibles en Piedras Negras, Coahuila
const opcionesEnvio = [
  {
    id: "fedex_estandar",
    nombre: "FedEx Estándar",
    precio: 120.0,
    tiempo: "3-5 días",
    api: "FedEx",
  },
  {
    id: "fedex_express",
    nombre: "FedEx Express",
    precio: 250.0,
    tiempo: "1-2 días",
    api: "FedEx",
  },
  {
    id: "dhl_estandar",
    nombre: "DHL Estándar",
    precio: 110.0,
    tiempo: "4-6 días",
    api: "DHL",
  },
  {
    id: "dhl_express",
    nombre: "DHL Express",
    precio: 230.0,
    tiempo: "1-3 días",
    api: "DHL",
  },
  {
    id: "estafeta",
    nombre: "Estafeta Local",
    precio: 80.0,
    tiempo: "2-4 días",
    api: "Estafeta",
  },
  {
    id: "recoger_tienda",
    nombre: "Recoger en tienda",
    precio: 0.0,
    tiempo: "Inmediato",
    api: null,
    direccion: "Av. Universidad 123, Piedras Negras, Coahuila",
  },
];

const Cart = () => {
  const [carrito, setCarrito] = useState(productosCarrito);
  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [envioSeleccionado, setEnvioSeleccionado] = useState(opcionesEnvio[0]);
  const [direccionEnvio, setDireccionEnvio] = useState({
    calle: "",
    colonia: "",
    ciudad: "Piedras Negras",
    estado: "Coahuila",
    codigoPostal: "",
    telefono: "",
  });
  const [mostrarFormEnvio, setMostrarFormEnvio] = useState(false);
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  // Calcular el subtotal del carrito
  const subtotal = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  // Calcular impuestos (16% IVA en México)
  const impuestos = (subtotal - descuento) * 0.16;

  // Calcular el total
  const total = subtotal - descuento + impuestos + envioSeleccionado.precio;

  // Aplicar cupón de descuento
  const aplicarCupon = () => {
    const cuponesValidos = {
      DESCUENTO10: 0.1, // 10% de descuento
      BLACKFRIDAY: 0.2, // 20% de descuento
      ENVIOGRATIS: "envio_gratis", // Envío gratis
    };

    if (cuponesValidos[cupon]) {
      if (cuponesValidos[cupon] === "envio_gratis") {
        setDescuento(envioSeleccionado.precio);
        toast.success("¡Cupón aplicado! Envío gratis");
      } else {
        const descuentoAplicado = subtotal * cuponesValidos[cupon];
        setDescuento(descuentoAplicado);
        toast.success(
          `¡Cupón aplicado! Descuento del ${cuponesValidos[cupon] * 100}%`
        );
      }
    } else {
      setDescuento(0);
      toast.error("Cupón no válido");
    }
  };

  // Función para simular cálculo de envío con API
  const calcularEnvio = async () => {
    try {
      // Simulación de llamada API
      toast.info("Calculando costos de envío...");

      // En una implementación real, aquí harías la llamada a la API correspondiente
      // const response = await axios.post(`/api/${envioSeleccionado.api}/calcular`, {
      //   productos: carrito,
      //   direccion: direccionEnvio
      // });

      // Simulamos un retraso de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Costos de envío calculados");
    } catch (error) {
      toast.error("Error al calcular envío");
    }
  };

  // Efecto para recalcular envío cuando cambian los productos o la dirección
  useEffect(() => {
    if (carrito.length > 0 && direccionEnvio.codigoPostal) {
      calcularEnvio();
    }
  }, [carrito, direccionEnvio, envioSeleccionado]);

  // Función para finalizar compra
  const finalizarCompra = async () => {
    if (!direccionEnvio.calle || !direccionEnvio.codigoPostal) {
      toast.error("Por favor completa la dirección de envío");
      return;
    }

    try {
      toast.loading("Procesando tu compra...");

      // Simulación de pago
      await new Promise(resolve => setTimeout(resolve, 2000));

      // En una implementación real, aquí integrarías con la pasarela de pago
      // y las APIs de envío

      toast.dismiss();
      toast.success("¡Compra exitosa! Tu pedido está en proceso");

      // Resetear carrito después de compra
      setCarrito([]);
      setDescuento(0);
      setCupon("");
    } catch (error) {
      toast.dismiss();
      toast.error("Error al procesar la compra");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 min-h-screen bg-gray-50"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sección de productos */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lista de productos */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
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
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-20 h-20 object-contain rounded"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {producto.nombre}
                        </p>
                        <p className="text-sm text-gray-500">
                          Stock disponible: {producto.stock}
                        </p>
                        <p className="text-sm text-gray-500">
                          Peso: {producto.peso} kg
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => disminuirCantidad(producto.id)}
                          disabled={producto.cantidad <= 1}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-300 ${producto.cantidad <= 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">
                          {producto.cantidad}
                        </span>
                        <button
                          onClick={() => aumentarCantidad(producto.id)}
                          disabled={producto.cantidad >= producto.stock}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition duration-300 ${producto.cantidad >= producto.stock
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-semibold text-gray-800 min-w-[80px] text-right">
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

            {/* Cupón de descuento */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Cupón de descuento
              </h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={cupon}
                  onChange={(e) => setCupon(e.target.value.toUpperCase())}
                  placeholder="Ingresa tu cupón"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={aplicarCupon}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Aplicar
                </button>
              </div>
              {descuento > 0 && (
                <p className="text-green-600 mt-2">
                  Descuento aplicado: ${descuento.toFixed(2)}
                </p>
              )}
            </div>

            {/* Opciones de envío */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Opciones de envío
              </h2>

              <div className="space-y-3">
                {opcionesEnvio.map((opcion) => (
                  <div
                    key={opcion.id}
                    className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${envioSeleccionado.id === opcion.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                    onClick={() => setEnvioSeleccionado(opcion)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{opcion.nombre}</p>
                        <p className="text-sm text-gray-600">
                          Tiempo estimado: {opcion.tiempo}
                          {opcion.api && ` • Via ${opcion.api}`}
                        </p>
                        {opcion.id === "recoger_tienda" && (
                          <p className="text-sm text-gray-600 mt-1">
                            {opcion.direccion}
                          </p>
                        )}
                      </div>
                      <p className="font-bold">
                        {opcion.precio > 0 ? `$${opcion.precio.toFixed(2)}` : "Gratis"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMostrarFormEnvio(!mostrarFormEnvio)}
                className="mt-4 text-blue-600 hover:text-blue-800 transition duration-300 flex items-center"
              >
                {mostrarFormEnvio ? "Ocultar" : "Agregar"} dirección de envío
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-1 transition-transform duration-200 ${mostrarFormEnvio ? "rotate-180" : ""
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {mostrarFormEnvio && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Calle y número
                      </label>
                      <input
                        type="text"
                        value={direccionEnvio.calle}
                        onChange={(e) =>
                          setDireccionEnvio({
                            ...direccionEnvio,
                            calle: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Colonia
                      </label>
                      <input
                        type="text"
                        value={direccionEnvio.colonia}
                        onChange={(e) =>
                          setDireccionEnvio({
                            ...direccionEnvio,
                            colonia: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        value={direccionEnvio.ciudad}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        value={direccionEnvio.estado}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={direccionEnvio.codigoPostal}
                        onChange={(e) =>
                          setDireccionEnvio({
                            ...direccionEnvio,
                            codigoPostal: e.target.value,
                          })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono de contacto
                    </label>
                    <input
                      type="tel"
                      value={direccionEnvio.telefono}
                      onChange={(e) =>
                        setDireccionEnvio({
                          ...direccionEnvio,
                          telefono: e.target.value,
                        })
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Método de pago */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Método de pago
              </h2>
              <div className="space-y-3">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${metodoPago === "tarjeta"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setMetodoPago("tarjeta")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fillRule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">Tarjeta de crédito/débito</p>
                      <p className="text-sm text-gray-600">
                        Pago seguro con tarjeta
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${metodoPago === "paypal"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                  onClick={() => setMetodoPago("paypal")}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.5 11.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">PayPal</p>
                      <p className="text-sm text-gray-600">
                        Paga con tu cuenta PayPal
                      </p>
                    </div>
                  </div>
                </div>

                {envioSeleccionado.id === "recoger_tienda" && (
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${metodoPago === "efectivo"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                      }`}
                    onClick={() => setMetodoPago("efectivo")}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold">Efectivo al recoger</p>
                        <p className="text-sm text-gray-600">
                          Paga cuando recojas tu pedido
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Resumen de Compra
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-gray-600">Subtotal ({carrito.length} productos)</p>
                  <p className="font-semibold">${subtotal.toFixed(2)}</p>
                </div>

                {descuento > 0 && (
                  <div className="flex justify-between">
                    <p className="text-gray-600">Descuento</p>
                    <p className="font-semibold text-green-600">
                      -${descuento.toFixed(2)}
                    </p>
                  </div>
                )}

                <div className="flex justify-between">
                  <p className="text-gray-600">Envío ({envioSeleccionado.nombre})</p>
                  <p className="font-semibold">
                    {envioSeleccionado.precio > 0
                      ? `$${envioSeleccionado.precio.toFixed(2)}`
                      : "Gratis"}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-600">IVA (16%)</p>
                  <p className="font-semibold">${impuestos.toFixed(2)}</p>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <p className="text-lg font-bold text-gray-800">Total</p>
                  <p className="text-lg font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={finalizarCompra}
                disabled={carrito.length === 0}
                className={`w-full py-3 rounded-lg mt-6 transition duration-300 ${carrito.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {metodoPago === "tarjeta"
                  ? "Pagar con tarjeta"
                  : metodoPago === "paypal"
                    ? "Pagar con PayPal"
                    : "Confirmar pedido"}
              </button>

              <div className="mt-4 text-xs text-gray-500">
                <p>
                  Al completar tu compra, aceptas nuestros{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Términos y Condiciones
                  </a>{" "}
                  y{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Política de Privacidad
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Seguridad y garantías */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Compra segura</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Tus datos están protegidos con encriptación SSL. No almacenamos
                    información de tu tarjeta.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mt-4">
                <div className="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Garantía de entrega</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Si tu pedido no llega en el tiempo estimado, te ofrecemos un
                    reembolso del costo de envío.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Función para aumentar la cantidad de un producto
  function aumentarCantidad(id) {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id && producto.cantidad < producto.stock
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    );
  }

  // Función para disminuir la cantidad de un producto
  function disminuirCantidad(id) {
    setCarrito((prevCarrito) =>
      prevCarrito.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    );
  }

  // Función para eliminar un producto del carrito
  function eliminarProducto(id) {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((producto) => producto.id !== id)
    );
    toast.success("Producto eliminado del carrito");
  }
};

export default Cart;