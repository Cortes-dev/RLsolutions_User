import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const Products = () => {
  const [filtro, setFiltro] = useState("Todos");
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(8);
  const [mostrarSoloDescuentos, setMostrarSoloDescuentos] = useState(false);


  useEffect(() => {
    const fetchMarcas = async () => {
    const response = await fetch("/Datos.json");
    const data = await response.json();
    setMarcas(data);
    };
    fetchMarcas();
  }, []);

  const categorias = ["Todos", ...new Set(marcas.map((marca) => marca.categoria))];



  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await fetch("/Datos.json");
        const data = await response.json();
        setProductos(data);
        setMarcas(data);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setTimeout(() => setCargando(false), 1000);
      }
    };

    cargarDatos();
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (id) => {
    window.location.href = `/product/${id}`;
  };

  const handleBuyClick = (e, id) => {
    e.stopPropagation();
    alert(`Producto ${id} agregado al carrito`);
  };

  // Filtrar productos por categoría, búsqueda y descuento
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = filtro === "Todos" || producto.categoria === filtro;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const tieneDescuento = mostrarSoloDescuentos ? producto.descuento : true;
    return coincideCategoria && coincideBusqueda && tieneDescuento;
  });

  // Obtener productos actuales para la paginación
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  // Cambiar página
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  // Resetear todos los filtros
  const resetearFiltros = () => {
    setFiltro("Todos");
    setBusqueda("");
    setMostrarSoloDescuentos(false);
    setPaginaActual(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row p-6 min-h-screen"
    >
      {/* Filtro de categorías */}
      <aside className="w-full lg:w-64 mb-8 lg:mb-0 lg:mr-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar por</h2>
        <div className="space-y-2 lg:block hidden">
          {categorias.map((categoria) => (
            <motion.button
              key={categoria}
              onClick={() => {
                setFiltro(categoria);
                setPaginaActual(1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 ${filtro === categoria
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {categoria}
            </motion.button>
          ))}
        </div>
        <select
          className="w-full p-2 border rounded-lg bg-white text-gray-800 lg:hidden"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPaginaActual(1);
          }}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>

        {/* Botón para mostrar solo productos con descuento */}
        <motion.button
          onClick={() => {
            setMostrarSoloDescuentos(!mostrarSoloDescuentos);
            setPaginaActual(1);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors duration-300 ${mostrarSoloDescuentos
              ? "bg-green-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
        >
          {mostrarSoloDescuentos ? "Mostrar todos" : "Mostrar solo descuentos"}
        </motion.button>

        {/* Botón para resetear filtros */}
        <motion.button
          onClick={resetearFiltros}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
        >
          Resetear filtros
        </motion.button>
      </aside>

      {/* Lista de productos */}
      <main className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Nuestros Productos</h1>

        {/* Campo de búsqueda y contador de productos */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
            className="w-full sm:w-64 p-2 border rounded-lg bg-white text-gray-800 mb-4 sm:mb-0"
          />
          <p className="text-gray-700">
            Mostrando {productosActuales.length} de {productosFiltrados.length} productos
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cargando
            ? // Skeleton loading mientras se cargan los datos
            Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="bg-gray-300 h-48 w-full"></div>
                  <div className="p-6">
                    <div className="bg-gray-300 h-6 w-3/4 mb-4"></div>
                    <div className="bg-gray-300 h-4 w-full mb-2"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
                    <div className="bg-gray-300 h-10 w-full rounded-md"></div>
                  </div>
                </div>
              </motion.div>
            ))
            : // Mostrar productos cuando los datos están cargados
            productosActuales.map((producto) => (
              <motion.div
                key={producto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col"
                onClick={() => handleCardClick(producto.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Imagen del producto */}
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover"
                  />
                  {producto.descuento && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                      {producto.descuento}
                    </span>
                  )}
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Nombre del producto */}
                  <h3 className="text-xl font-bold text-gray-800 uppercase text-center truncate">
                    {producto.nombre}
                  </h3>

                  {/* Precio del producto */}
                  <p className="text-2xl font-bold text-blue-600 mt-4 text-center">
                    {producto.precio}
                  </p>

                  {/* Botón de compra */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={(e) => handleBuyClick(e, producto.id)}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    >
                      <Icon icon="mdi:cart" className="mr-2" />
                      Comprar ahora
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </section>

        {/* Paginación */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          {Array.from({ length: Math.ceil(productosFiltrados.length / productosPorPagina) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => cambiarPagina(index + 1)}
                className={`px-4 py-2 rounded-lg ${paginaActual === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === Math.ceil(productosFiltrados.length / productosPorPagina)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      </main>
    </motion.div>
  );
};

export default Products;