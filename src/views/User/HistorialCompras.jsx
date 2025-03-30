import React, { useState, useEffect, useMemo, useCallback } from "react";

const HistorialCompras = () => {
  const [compras, setCompras] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const comprasPorPagina = 5;

  useEffect(() => {
    const dataGuardada = localStorage.getItem("compras");
    if (dataGuardada) {
      setCompras(JSON.parse(dataGuardada));
    } else {
      const comprasIniciales = [
        {
          id: 1,
          fecha: "2023-10-01",
          productos: [
            { nombre: "Laptop Gamer", cantidad: 1, precio: 1200 },
            { nombre: "Mouse Inalámbrico", cantidad: 2, precio: 25 },
          ],
          total: 1250,
          estado: "Entregado",
        },
        {
          id: 2,
          fecha: "2023-09-25",
          productos: [
            { nombre: "Smartphone", cantidad: 1, precio: 800 },
            { nombre: "Cargador USB", cantidad: 1, precio: 15 },
          ],
          total: 815.20,
          estado: "En camino",
        },
        {
          id: 3,
          fecha: "2025-02-21",
          productos: [
            { nombre: "Audifonos", cantidad: 1, precio: 1500 },
            { nombre: "Cargador C", cantidad: 1, precio: 120 },
          ],
          total: 1620,
          estado: "cancelado",
        },
      ];
      setCompras(comprasIniciales);
      localStorage.setItem("compras", JSON.stringify(comprasIniciales));
    }
  }, []);

  const comprasFiltradas = useMemo(() => {
    return compras.filter((compra) => {
      const coincideEstado = filtroEstado === "Todos" || compra.estado === filtroEstado;
      const coincideFecha = filtroFecha ? compra.fecha.includes(filtroFecha) : true;
      const coincideNombre = filtroNombre
        ? compra.productos.some((prod) =>
            prod.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
          )
        : true;
      return coincideEstado && coincideFecha && coincideNombre;
    });
  }, [compras, filtroEstado, filtroFecha, filtroNombre]);

  const indiceUltimaCompra = paginaActual * comprasPorPagina;
  const indicePrimeraCompra = indiceUltimaCompra - comprasPorPagina;
  const comprasActuales = useMemo(() => {
    return comprasFiltradas.slice(indicePrimeraCompra, indiceUltimaCompra);
  }, [comprasFiltradas, indicePrimeraCompra, indiceUltimaCompra]);

  const cambiarPagina = useCallback((numeroPagina) => setPaginaActual(numeroPagina), []);

  const resetearFiltros = useCallback(() => {
    setFiltroEstado("Todos");
    setFiltroFecha("");
    setFiltroNombre("");
    setPaginaActual(1);
  }, []);

  const Paginacion = () => {
    const totalPaginas = Math.ceil(comprasFiltradas.length / comprasPorPagina);

    return (
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
        >
          Anterior
        </button>
        {Array.from({ length: totalPaginas }).map((_, index) => (
          <button
            key={index}
            onClick={() => cambiarPagina(index + 1)}
            className={`p-2 rounded-lg ${
              paginaActual === index + 1 ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    );
  };

  const ListaCompras = () => {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {comprasActuales.length > 0 ? (
          comprasActuales.map((compra) => (
            <div key={compra.id} className="p-6 border-b last:border-b-0">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Compra #{compra.id}</p>
                <p className={`text-sm font-semibold ${
                  compra.estado === "Entregado"
                    ? "text-green-600"
                    : compra.estado === "En camino"
                    ? "text-blue-600"
                    : "text-red-600"
                }`}>
                  {compra.estado}
                </p>
              </div>
              <p className="text-sm text-gray-600">{compra.fecha}</p>
              <div className="mt-4">
                {compra.productos.map((producto, index) => (
                  <div key={index} className="flex justify-between text-gray-700">
                    <p>{producto.nombre} (x{producto.cantidad})</p>
                    <p>${producto.precio.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold text-blue-600">${compra.total.toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="p-6 text-gray-600">No hay compras que coincidan.</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Historial de Compras</h1>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="Todos">Todos</option>
          <option value="Entregado">Entregado</option>
          <option value="En camino">En camino</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="p-2 border rounded-lg bg-white"
        />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="p-2 border rounded-lg bg-white"
        />
        <button
          onClick={resetearFiltros}
          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Resetear
        </button>
      </div>
      <ListaCompras />
      <Paginacion />
    </div>
  );
};

export default HistorialCompras;