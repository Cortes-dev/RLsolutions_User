import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FiSearch, FiCalendar, FiFilter, FiRefreshCw, FiPrinter, FiDownload, FiEye, FiTruck, FiCheckCircle, FiXCircle } from "react-icons/fi";

const HistorialCompras = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const comprasPorPagina = 5;

  // Cargar datos del historial
  useEffect(() => {
    const cargarHistorial = () => {
      try {
        setLoading(true);
        // Datos de ejemplo (en producción sería una llamada API)
        const datosEjemplo = [
          {
            id: "ORD-2023-1001",
            fecha: "2023-10-01",
            productos: [
              { id: 101, nombre: "Laptop Gamer Pro", cantidad: 1, precio: 1200 },
              { id: 102, nombre: "Mouse Inalámbrico", cantidad: 2, precio: 25 },
            ],
            total: 1250,
            estado: "entregado"
          },
          {
            id: "ORD-2023-0925",
            fecha: "2023-09-25",
            productos: [
              { id: 201, nombre: "Smartphone Premium", cantidad: 1, precio: 800 },
              { id: 202, nombre: "Cargador USB-C", cantidad: 1, precio: 15 },
            ],
            total: 815.20,
            estado: "en_camino"
          }
        ];

        setCompras(datosEjemplo);
        localStorage.setItem("compras", JSON.stringify(datosEjemplo));
      } catch (err) {
        setError("Error al cargar el historial");
        toast.error("No se pudo cargar el historial de compras");
      } finally {
        setLoading(false);
      }
    };

    cargarHistorial();
  }, []);

  // Filtrar compras
  const comprasFiltradas = useMemo(() => {
    return compras.filter(compra => {
      const coincideEstado = filtroEstado === "Todos" || compra.estado === filtroEstado;
      const coincideFecha = filtroFecha ? compra.fecha.includes(filtroFecha) : true;
      const coincideNombre = filtroNombre
        ? compra.productos.some(producto =>
          producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        )
        : true;
      return coincideEstado && coincideFecha && coincideNombre;
    });
  }, [compras, filtroEstado, filtroFecha, filtroNombre]);

  // Paginación
  const indiceUltimaCompra = paginaActual * comprasPorPagina;
  const indicePrimeraCompra = indiceUltimaCompra - comprasPorPagina;
  const comprasActuales = comprasFiltradas.slice(indicePrimeraCompra, indiceUltimaCompra);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetearFiltros = () => {
    setFiltroEstado("Todos");
    setFiltroFecha("");
    setFiltroNombre("");
    setPaginaActual(1);
    toast.success("Filtros reseteados");
  };

  // Componente de estado
  const EstadoCompra = ({ estado }) => {
    const estados = {
      entregado: { texto: "Entregado", color: "bg-green-100 text-green-800", icono: <FiCheckCircle className="mr-1" /> },
      en_camino: { texto: "En camino", color: "bg-blue-100 text-blue-800", icono: <FiTruck className="mr-1" /> },
      cancelado: { texto: "Cancelado", color: "bg-red-100 text-red-800", icono: <FiXCircle className="mr-1" /> }
    };

    const estadoInfo = estados[estado] || { texto: estado, color: "bg-gray-100 text-gray-800" };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${estadoInfo.color}`}>
        {estadoInfo.icono}
        {estadoInfo.texto}
      </span>
    );
  };

  // Componente de lista de compras
  const ListaCompras = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {[...Array(comprasPorPagina)].map((_, index) => (
            <div key={index} className="p-6 border-b animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      );
    }

    if (comprasActuales.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center">
          <p className="text-gray-600">No se encontraron compras que coincidan con los filtros.</p>
          <button
            onClick={resetearFiltros}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center mx-auto"
          >
            <FiRefreshCw className="mr-2" />
            Resetear filtros
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {comprasActuales.map((compra) => (
          <motion.div
            key={compra.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">Orden #{compra.id}</h3>
                  <EstadoCompra estado={compra.estado} />
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Fecha:</span> {new Date(compra.fecha).toLocaleDateString()}
                </p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Productos:</h4>
                  <ul className="space-y-2">
                    {compra.productos.map((producto, index) => (
                      <li key={`${compra.id}-${producto.id}`} className="flex justify-between text-gray-700">
                        <p>{producto.nombre} (x{producto.cantidad})</p>
                        <p>${(producto.precio * producto.cantidad).toFixed(2)}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:w-64 lg:w-80 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Resumen de pago</h4>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-medium">
                    <span>Total:</span>
                    <span className="text-blue-600">${compra.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => toast.info(`Descargando factura para ${compra.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded hover:bg-gray-50 text-sm"
                  >
                    <FiDownload size={14} />
                    Factura
                  </button>
                  <button
                    onClick={() => toast.info(`Mostrando detalles de ${compra.id}`)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    <FiEye size={14} />
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Componente de paginación
  const Paginacion = () => {
    const totalPaginas = Math.ceil(comprasFiltradas.length / comprasPorPagina);

    if (totalPaginas <= 1) return null;

    return (
      <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition flex items-center"
        >
          Anterior
        </button>

        {Array.from({ length: totalPaginas }).map((_, index) => (
          <button
            key={index}
            onClick={() => cambiarPagina(index + 1)}
            className={`p-2 min-w-[40px] rounded-lg ${paginaActual === index + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition flex items-center"
        >
          Siguiente
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Historial de Compras</h1>
          <p className="text-gray-600 mt-2">Revisa el estado de tus pedidos anteriores</p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-6 bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={filtroNombre}
                onChange={(e) => {
                  setFiltroNombre(e.target.value);
                  setPaginaActual(1);
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-400" />
              </div>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => {
                  setFiltroFecha(e.target.value);
                  setPaginaActual(1);
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                value={filtroEstado}
                onChange={(e) => {
                  setFiltroEstado(e.target.value);
                  setPaginaActual(1);
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="Todos">Todos los estados</option>
                <option value="entregado">Entregado</option>
                <option value="en_camino">En camino</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <button
              onClick={resetearFiltros}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              <FiRefreshCw size={16} />
              Resetear
            </button>
          </div>
        </motion.div>

        {/* Lista de compras */}
        <ListaCompras />

        {/* Paginación */}
        <Paginacion />
      </div>
    </div>
  );
};

export default HistorialCompras;