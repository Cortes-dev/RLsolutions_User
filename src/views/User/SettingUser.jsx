import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Para notificaciones

const SettingUser = () => {
  // Estados para los campos editables
  const [nombre, setNombre] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan.perez@example.com");
  const [fotoPerfil, setFotoPerfil] = useState("https://via.placeholder.com/150");
  const [contraseñaActual, setContraseñaActual] = useState("");
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [autenticacionDosFactores, setAutenticacionDosFactores] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);
  const [idioma, setIdioma] = useState("es");
  const [tema, setTema] = useState("claro");

  // Función para guardar cambios del perfil
  const guardarPerfil = () => {
    toast.success("Perfil actualizado correctamente");
  };

  // Función para cambiar la contraseña
  const cambiarContraseña = () => {
    if (nuevaContraseña !== confirmarContraseña) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    toast.success("Contraseña cambiada correctamente");
  };

  // Función para eliminar la cuenta
  const eliminarCuenta = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
      toast.success("Cuenta eliminada correctamente");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Animación inicial
      animate={{ opacity: 1, y: 0 }} // Animación al cargar
      transition={{ duration: 0.5 }} // Duración de la animación
      className="p-6 min-h-screen"
    >
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Configuración de Usuario</h1>

        {/* Sección de perfil */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfil</h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <img
                src={fotoPerfil}
                alt="Foto de perfil"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                Cambiar foto
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={guardarPerfil}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </motion.section>

        {/* Sección de seguridad */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Seguridad</h2>
          <div className="space-y-4">
            <input
              type="password"
              value={contraseñaActual}
              onChange={(e) => setContraseñaActual(e.target.value)}
              placeholder="Contraseña actual"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="password"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              placeholder="Nueva contraseña"
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="password"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              placeholder="Confirmar nueva contraseña"
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={cambiarContraseña}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Cambiar contraseña
            </button>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={autenticacionDosFactores}
                onChange={(e) => setAutenticacionDosFactores(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Habilitar autenticación de dos factores</span>
            </div>
          </div>
        </motion.section>


        {/* Sección de cuenta */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cuenta</h2>
          <div className="space-y-4">
            <button
              onClick={eliminarCuenta}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Eliminar cuenta
            </button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SettingUser;