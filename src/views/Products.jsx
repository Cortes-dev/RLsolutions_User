import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import axios from "axios";

const Products = () => {
  // Estados
  const [filtro, setFiltro] = useState("Todos");
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina, setProductosPorPagina] = useState(8);
  const [mostrarSoloDescuentos, setMostrarSoloDescuentos] = useState(false);
  const [error, setError] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [vista, setVista] = useState("cards"); // 'cards' o 'lista'
  const [productosAgregados, setProductosAgregados] = useState({}); // Para el estado del botón

  // Cargar datos del localStorage al montar el componente
  useEffect(() => {
    const cargarDatosLocalStorage = () => {
      try {
        // Cargar productos guardados
        const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
        const savedProductsIds = savedProducts.map(p => p.id);

        // Cargar carrito
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCarrito(savedCart);

        // Si hay productos guardados, marcarlos en el estado
        if (savedProducts.length > 0) {
          setProductos(prev => prev.map(p => ({
            ...p,
            isSaved: savedProductsIds.includes(p.id)
          })));
        }
      } catch (err) {
        console.error("Error al cargar datos del localStorage:", err);
      }
    };

    cargarDatos();
    cargarDatosLocalStorage();
    window.scrollTo(0, 0);
  }, []);

  // Función para cargar datos con Axios
  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError(null);

      const [responseMarcas, responseProductos] = await Promise.all([
        axios.get("/Datos.json"),
        axios.get("/Datos.json")
      ]);

      setMarcas(responseMarcas.data);
      setProductos(responseProductos.data.map(producto => ({
        ...producto,
        isSaved: false // Inicializamos todos como no guardados
      })));
    } catch (err) {
      console.error("Error al cargar los datos:", err);
      setError("Error al cargar los productos. Por favor intenta nuevamente.");
    } finally {
      setTimeout(() => setCargando(false), 1000);
    }
  };

  const categorias = ["Todos", ...new Set(marcas.map((marca) => marca.categoria))];

  // Navegación a detalles del producto
  const handleCardClick = (id) => {
    window.location.href = `/product/${id}`;
  };

  // Manejo del carrito de compras
  const handleBuyClick = (e, producto) => {
    e.stopPropagation();

    const productoExistente = carrito.find(item => item.id === producto.id);
    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('cart', JSON.stringify(nuevoCarrito));

    // Cambiar estado del botón temporalmente
    setProductosAgregados(prev => ({
      ...prev,
      [producto.id]: true
    }));

    setTimeout(() => {
      setProductosAgregados(prev => ({
        ...prev,
        [producto.id]: false
      }));
    }, 2000);
  };

  // Manejo de productos favoritos
  const toggleGuardarProducto = (e, producto) => {
    e.stopPropagation();
    try {
      const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
      const isSaved = savedProducts.some(p => p.id === producto.id);

      let updatedProducts;
      if (isSaved) {
        updatedProducts = savedProducts.filter(p => p.id !== producto.id);
      } else {
        updatedProducts = [...savedProducts, producto];
      }

      localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));

      // Actualizar estado para reflejar cambios en la UI
      setProductos(prev => prev.map(p =>
        p.id === producto.id ? { ...p, isSaved: !isSaved } : p
      ));
    } catch (err) {
      console.error("Error al guardar producto:", err);
    }
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
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  // Cambiar página
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  // Resetear todos los filtros
  const resetearFiltros = () => {
    setFiltro("Todos");
    setBusqueda("");
    setMostrarSoloDescuentos(false);
    setPaginaActual(1);
  };

  // Generar rango de páginas para mostrar
  const generarRangoPaginas = () => {
    const paginas = [];
    const paginasTotales = totalPaginas;
    const paginasAMostrar = 5;

    if (paginasTotales <= paginasAMostrar) {
      for (let i = 1; i <= paginasTotales; i++) {
        paginas.push(i);
      }
    } else {
      let inicio = Math.max(1, paginaActual - 2);
      let fin = Math.min(paginasTotales, paginaActual + 2);

      if (paginaActual <= 3) {
        fin = paginasAMostrar;
      } else if (paginaActual >= paginasTotales - 2) {
        inicio = paginasTotales - paginasAMostrar + 1;
      }

      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
    }

    return paginas;
  };

  // Contador de productos en el carrito
  const contarProductosCarrito = () => {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
  };

  // Renderizar producto en vista de cards
  const renderProductoCard = (producto) => (
    <motion.div
      key={producto.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col border border-gray-100"
      onClick={() => handleCardClick(producto.id)}
      whileHover={{ y: -5 }}
      layout
    >
      {/* Imagen del producto */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />

        {/* Etiqueta de descuento */}
        {producto.descuento && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {producto.descuento}
          </span>
        )}

        {/* Botón de guardado */}
        <button
          onClick={(e) => toggleGuardarProducto(e, producto)}
          className={`absolute top-2 left-2 p-2 rounded-full shadow-md transition-colors duration-200 ${producto.isSaved ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
        >
          <Icon
            icon={producto.isSaved ? "mdi:bookmark-check" : "mdi:bookmark-outline"}
            className="text-lg"
          />
        </button>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 h-14">
          {producto.nombre}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                icon={i < 4.5 ? "mdi:star" : "mdi:star-half-full"}
                className="text-sm"
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-1">(4.5)</span>
        </div>

        <div className="mt-auto">
          <p className="text-xl font-bold text-blue-600 mb-3">
            {producto.precio}
            {producto.precioOriginal && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {producto.precioOriginal}
              </span>
            )}
          </p>

          <button
            onClick={(e) => handleBuyClick(e, producto)}
            className={`w-full py-2 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2 ${productosAgregados[producto.id]
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            <Icon icon="mdi:cart" />
            <span>
              {productosAgregados[producto.id] ? "¡Agregado!" : "Agregar al carrito"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Renderizar producto en vista de lista
  const renderProductoLista = (producto) => (
    <motion.div
      key={producto.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col md:flex-row border border-gray-100"
      onClick={() => handleCardClick(producto.id)}
      whileHover={{ y: -2 }}
      layout
    >
      {/* Imagen del producto */}
      <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />

        {/* Etiqueta de descuento */}
        {producto.descuento && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            {producto.descuento}
          </span>
        )}
      </div>

      {/* Contenido de la lista */}
      <div className="p-4 flex-grow flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="md:flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {producto.nombre}
            </h3>

            {/* Botón de guardado */}
            <button
              onClick={(e) => toggleGuardarProducto(e, producto)}
              className={`p-2 rounded-full shadow-md transition-colors duration-200 ml-4 ${producto.isSaved ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Icon
                icon={producto.isSaved ? "mdi:bookmark-check" : "mdi:bookmark-outline"}
                className="text-lg"
              />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  icon={i < 4.5 ? "mdi:star" : "mdi:star-half-full"}
                  className="text-sm"
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-1">(4.5)</span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {producto.descripcion || "Descripción no disponible"}
          </p>
        </div>

        <div className="mt-4 md:mt-0 md:ml-4 md:text-right">
          <p className="text-xl font-bold text-blue-600 mb-3">
            {producto.precio}
            {producto.precioOriginal && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {producto.precioOriginal}
              </span>
            )}
          </p>

          <button
            onClick={(e) => handleBuyClick(e, producto)}
            className={`py-2 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2 ${productosAgregados[producto.id]
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            <Icon icon="mdi:cart" />
            <span>
              {productosAgregados[producto.id] ? "¡Agregado!" : "Agregar al carrito"}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row p-4 md:p-6 min-h-screen bg-gray-50"
    >

      {/* Filtro de categorías */}
      <aside className="w-full lg:w-72 mb-8 lg:mb-0 lg:mr-8">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Filtrar por</h2>

          <div className="space-y-3">
            {/* Filtros de categoría para desktop */}
            <div className="hidden lg:block space-y-2">
              {categorias.map((categoria) => (
                <motion.button
                  key={categoria}
                  onClick={() => {
                    setFiltro(categoria);
                    setPaginaActual(1);
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${filtro === categoria
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  {categoria}
                </motion.button>
              ))}
            </div>

            {/* Select para móvil */}
            <select
              className="w-full p-3 border rounded-lg bg-white text-gray-800 lg:hidden border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center ${mostrarSoloDescuentos
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
            >
              <Icon
                icon={mostrarSoloDescuentos ? "mdi:tag-off" : "mdi:tag"}
                className="mr-2 text-lg"
              />
              {mostrarSoloDescuentos ? "Mostrar todos" : "Solo descuentos"}
            </motion.button>

            {/* Botón para resetear filtros */}
            <motion.button
              onClick={resetearFiltros}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all duration-200 shadow-md flex items-center justify-center"
            >
              <Icon icon="mdi:refresh" className="mr-2 text-lg" />
              Resetear filtros
            </motion.button>
          </div>
        </div>
      </aside>

      {/* Lista de productos */}
      <main className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Nuestros Productos</h1>
              <p className="text-gray-600">Encuentra los mejores productos al mejor precio</p>
            </div>

            {/* Selector de vista y productos por página */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setVista("cards")}
                  className={`p-2 rounded-md ${vista === "cards" ? "bg-white shadow-sm" : ""}`}
                >
                  <Icon icon="mdi:view-grid" className="text-xl" />
                </button>
                <button
                  onClick={() => setVista("lista")}
                  className={`p-2 rounded-md ${vista === "lista" ? "bg-white shadow-sm" : ""}`}
                >
                  <Icon icon="mdi:view-list" className="text-xl" />
                </button>
              </div>

              <select
                value={productosPorPagina}
                onChange={(e) => {
                  setProductosPorPagina(Number(e.target.value));
                  setPaginaActual(1);
                }}
                className="p-2 border rounded-lg bg-white text-gray-800 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="8">8 por página</option>
                <option value="10">10 por página</option>
                <option value="20">20 por página</option>
                <option value="30">30 por página</option>
                <option value="50">50 por página</option>
              </select>
            </div>
          </div>

          {/* Campo de búsqueda y contador de productos */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 mt-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => {
                  setBusqueda(e.target.value);
                  setPaginaActual(1);
                }}
                className="w-full p-3 pl-10 border rounded-lg bg-white text-gray-800 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-3.5 text-gray-400 text-xl"
              />
            </div>
            <p className="text-gray-700 whitespace-nowrap">
              {productosFiltrados.length} {productosFiltrados.length === 1 ? "producto" : "productos"} encontrados
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <div className="flex items-center">
              <Icon icon="mdi:alert-circle" className="mr-2 text-xl" />
              <p>{error}</p>
              <button
                onClick={cargarDatos}
                className="ml-auto bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        <section className={`${vista === "cards" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6"}`}>
          {cargando ? (
            // Skeleton loading mejorado
            Array.from({ length: productosPorPagina }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 h-56 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
                    <div className="bg-gray-200 h-4 w-full rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                    <div className="bg-gray-200 h-10 w-full rounded mt-4"></div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : productosActuales.length > 0 ? (
            productosActuales.map(producto =>
              vista === "cards" ? renderProductoCard(producto) : renderProductoLista(producto)
            )
          ) : (
            <div className="col-span-full text-center py-12">
              <Icon icon="mdi:package-variant-remove" className="text-gray-400 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 mb-4">Intenta ajustar tus filtros de búsqueda</p>
              <button
                onClick={resetearFiltros}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
              >
                <Icon icon="mdi:filter-remove" />
                Limpiar filtros
              </button>
            </div>
          )}
        </section>

        {/* Paginación mejorada */}
        {productosFiltrados.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
            <div className="text-sm text-gray-600">
              Mostrando {indicePrimerProducto + 1}-{Math.min(indiceUltimoProducto, productosFiltrados.length)} de {productosFiltrados.length} productos
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="p-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 flex items-center gap-1"
              >
                <Icon icon="mdi:chevron-left" />
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {generarRangoPaginas().map((numeroPagina) => (
                <button
                  key={numeroPagina}
                  onClick={() => cambiarPagina(numeroPagina)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${paginaActual === numeroPagina
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  {numeroPagina}
                </button>
              ))}

              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="p-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 flex items-center gap-1"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <Icon icon="mdi:chevron-right" />
              </button>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
};

export default Products;