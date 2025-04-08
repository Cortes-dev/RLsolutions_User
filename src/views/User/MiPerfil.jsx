import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import axios from "axios";

const MiPerfil = () => {
  const [usuario, setUsuario] = useState({
    nombre: "Usuario Ejemplo",
    email: "usuario@ejemplo.com",
    telefono: "+1234567890",
    direccion: "Calle Falsa 123",
    imagen: "https://randomuser.me/api/portraits/men/1.jpg",
    fechaRegistro: "01/01/2023",
    pedidos: 15,
    favoritos: 8
  });
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...usuario });
  const [cargando, setCargando] = useState(true);
  const [pedidos, setPedidos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [tabActiva, setTabActiva] = useState("pedidos");

  useEffect(() => {
    // Simular carga de datos
    const cargarDatos = async () => {
      try {
        setCargando(true);
        // Aquí irían tus llamadas a la API reales
        const response = await axios.get("/Datos.json");
        setPedidos(response.data.slice(0, 5));
        setFavoritos(response.data.slice(5, 10));
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setTimeout(() => setCargando(false), 1000);
      }
    };

    cargarDatos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const guardarCambios = () => {
    setUsuario(formData);
    setEditando(false);
    // Aquí iría la llamada a la API para guardar los cambios
  };

  const cancelarEdicion = () => {
    setFormData(usuario);
    setEditando(false);
  };

  const renderPedido = (pedido) => (
    <motion.div
      key={pedido.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <img
            src={pedido.imagen}
            alt={pedido.nombre}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <h4 className="font-medium text-gray-800">{pedido.nombre}</h4>
            <p className="text-sm text-gray-500">ID: {pedido.id}</p>
          </div>
        </div>
        <div className="flex flex-col sm:items-end">
          <span className="text-lg font-bold text-blue-600">{pedido.precio}</span>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full mt-1 ${pedido.estado === "entregado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
            {pedido.estado || "En proceso"}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const renderFavorito = (producto) => (
    <motion.div
      key={producto.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div className="flex-grow">
          <h4 className="font-medium text-gray-800">{producto.nombre}</h4>
          <p className="text-sm text-gray-500">{producto.categoria}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-bold text-blue-600">{producto.precio}</span>
          <button className="text-red-500 hover:text-red-700 mt-1">
            <Icon icon="mdi:heart-remove" className="text-xl" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 md:p-6"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Perfil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información del usuario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <img
                    src={usuario.imagen}
                    alt="Foto de perfil"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                  />
                  {editando && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition">
                      <Icon icon="mdi:camera" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {editando ? (
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="border-b border-gray-300 focus:border-blue-500 outline-none text-center"
                    />
                  ) : (
                    usuario.nombre
                  )}
                </h2>
                <p className="text-gray-500">Miembro desde {usuario.fechaRegistro}</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Icon icon="mdi:package-variant-closed" className="text-blue-600 mr-2" />
                    <span>Pedidos</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    {usuario.pedidos}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Icon icon="mdi:heart" className="text-red-500 mr-2" />
                    <span>Favoritos</span>
                  </div>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                    {usuario.favoritos}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-800 mb-3">Información de contacto</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Correo electrónico</p>
                    {editando ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mt-1"
                      />
                    ) : (
                      <p className="font-medium">{usuario.email}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    {editando ? (
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mt-1"
                      />
                    ) : (
                      <p className="font-medium">{usuario.telefono}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dirección</p>
                    {editando ? (
                      <textarea
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mt-1"
                        rows="2"
                      />
                    ) : (
                      <p className="font-medium">{usuario.direccion}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {editando ? (
                  <>
                    <button
                      onClick={guardarCambios}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:content-save" />
                      Guardar
                    </button>
                    <button
                      onClick={cancelarEdicion}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md flex items-center justify-center gap-2"
                    >
                      <Icon icon="mdi:close" />
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditando(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
                  >
                    <Icon icon="mdi:pencil" />
                    Editar perfil
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Contenido principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setTabActiva("pedidos")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${tabActiva === "pedidos" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                  >
                    Mis Pedidos
                  </button>
                  <button
                    onClick={() => setTabActiva("favoritos")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${tabActiva === "favoritos" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                  >
                    Favoritos
                  </button>
                  <button
                    onClick={() => setTabActiva("configuracion")}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${tabActiva === "configuracion" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
                  >
                    Configuración
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {cargando ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-gray-200 rounded-lg h-24"></div>
                    ))}
                  </div>
                ) : tabActiva === "pedidos" ? (
                  pedidos.length > 0 ? (
                    <div className="space-y-4">
                      {pedidos.map(renderPedido)}
                      <button className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Icon icon="mdi:history" />
                        Ver historial completo
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon icon="mdi:package-variant-remove" className="text-gray-400 text-5xl mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No tienes pedidos recientes</h3>
                      <p className="text-gray-500 mb-4">Cuando hagas un pedido, aparecerá aquí</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2">
                        <Icon icon="mdi:cart" />
                        Ir a la tienda
                      </button>
                    </div>
                  )
                ) : tabActiva === "favoritos" ? (
                  favoritos.length > 0 ? (
                    <div className="space-y-4">
                      {favoritos.map(renderFavorito)}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon icon="mdi:heart-outline" className="text-gray-400 text-5xl mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No tienes productos favoritos</h3>
                      <p className="text-gray-500 mb-4">Guarda tus productos favoritos para encontrarlos fácilmente</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2">
                        <Icon icon="mdi:cart" />
                        Ir a la tienda
                      </button>
                    </div>
                  )
                ) : (
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Configuración de la cuenta</h3>
                    <div className="space-y-6">
                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <Icon icon="mdi:bell" className="text-blue-600" />
                          Notificaciones
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Notificaciones por correo</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Notificaciones push</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-200 pb-6">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <Icon icon="mdi:shield" className="text-blue-600" />
                          Seguridad
                        </h4>
                        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                          <Icon icon="mdi:lock-reset" />
                          Cambiar contraseña
                        </button>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                          <Icon icon="mdi:alert-circle" className="text-red-500" />
                          Zona peligrosa
                        </h4>
                        <button className="text-red-600 hover:text-red-800 flex items-center gap-2">
                          <Icon icon="mdi:trash-can" />
                          Eliminar mi cuenta permanentemente
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MiPerfil;