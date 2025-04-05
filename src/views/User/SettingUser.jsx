import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiTrash2,
  FiBell, FiSun, FiMoon, FiGlobe, FiCheck, FiX
} from "react-icons/fi";
import * as yup from "yup";
import { useFormik } from "formik";
import AvatarEditor from "react-avatar-editor";

// Esquema de validación para el perfil
const perfilSchema = yup.object().shape({
  nombre: yup.string().required("El nombre es requerido").min(3, "Mínimo 3 caracteres"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
});

// Esquema de validación para contraseña
const passwordSchema = yup.object().shape({
  contraseñaActual: yup.string().required("La contraseña actual es requerida"),
  nuevaContraseña: yup.string()
    .required("La nueva contraseña es requerida")
    .min(8, "Mínimo 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Debe contener mayúsculas, minúsculas, números y símbolos"
    ),
  confirmarContraseña: yup.string()
    .oneOf([yup.ref('nuevaContraseña'), null], "Las contraseñas deben coincidir")
    .required("Debes confirmar la contraseña"),
});

const SettingUser = () => {
  // Estados para la foto de perfil
  const [editor, setEditor] = useState(null);
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Formulario de perfil
  const formikPerfil = useFormik({
    initialValues: {
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
    },
    validationSchema: perfilSchema,
    onSubmit: (values) => {
      toast.success("Perfil actualizado correctamente");
      // Aquí iría la llamada a la API para guardar los cambios
    },
  });

  // Formulario de contraseña
  const formikPassword = useFormik({
    initialValues: {
      contraseñaActual: "",
      nuevaContraseña: "",
      confirmarContraseña: "",
    },
    validationSchema: passwordSchema,
    onSubmit: (values, { resetForm }) => {
      toast.success("Contraseña cambiada correctamente");
      resetForm();
      // Aquí iría la llamada a la API para cambiar la contraseña
    },
  });

  // Configuraciones de preferencias
  const [preferences, setPreferences] = useState({
    autenticacionDosFactores: false,
    notificaciones: true,
    idioma: "es",
    tema: "claro",
  });

  // Cargar datos iniciales del usuario
  useEffect(() => {
    // Simular carga de datos del usuario
    const loadUserData = async () => {
      try {
        // Aquí iría la llamada a la API para obtener los datos del usuario
        const userData = {
          nombre: "Juan Pérez",
          email: "juan.perez@example.com",
          fotoPerfil: "https://via.placeholder.com/150",
          preferences: {
            autenticacionDosFactores: false,
            notificaciones: true,
            idioma: "es",
            tema: "claro",
          }
        };

        formikPerfil.setValues({
          nombre: userData.nombre,
          email: userData.email,
        });

        setImage(userData.fotoPerfil);
        setPreferences(userData.preferences);
      } catch (error) {
        toast.error("Error al cargar los datos del usuario");
      }
    };

    loadUserData();
  }, []);

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setShowImageEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar imagen editada
  const saveImage = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const newImage = canvas.toDataURL();
      setImage(newImage);
      setShowImageEditor(false);
      toast.success("Foto de perfil actualizada");
      // Aquí iría la llamada a la API para guardar la imagen
    }
  };

  // Eliminar cuenta con confirmación
  const eliminarCuenta = async () => {
    setIsDeleting(true);
    try {
      // Mostrar diálogo de confirmación personalizado
      toast.custom((t) => (
        <div className="bg-white p-4 rounded-lg shadow-xl max-w-md">
          <h3 className="font-bold text-lg mb-2">¿Estás seguro?</h3>
          <p className="mb-4">Esta acción eliminará tu cuenta permanentemente y no podrá deshacerse.</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => toast.dismiss(t)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                toast.dismiss(t);
                confirmDelete();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      ), { duration: 10000 });
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    // Aquí iría la llamada a la API para eliminar la cuenta
    toast.success("Cuenta eliminada correctamente");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Configuración de Usuario</h1>
          <p className="text-gray-600">Administra tu perfil y preferencias</p>
        </motion.div>

        {/* Sección de perfil */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiUser className="text-blue-600" /> Perfil
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src={image || "https://via.placeholder.com/150"}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-lg"
                >
                  <FiUser size={16} />
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {showImageEditor && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="font-bold text-lg mb-4">Editar foto de perfil</h3>
                    <div className="flex justify-center mb-4">
                      <AvatarEditor
                        ref={(ref) => setEditor(ref)}
                        image={image}
                        width={250}
                        height={250}
                        border={50}
                        borderRadius={125}
                        color={[255, 255, 255, 0.6]}
                        scale={scale}
                        rotate={0}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Zoom</label>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.01"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowImageEditor(false)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={saveImage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex-1">
              <form onSubmit={formikPerfil.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      onChange={formikPerfil.handleChange}
                      onBlur={formikPerfil.handleBlur}
                      value={formikPerfil.values.nombre}
                      className={`w-full p-3 border rounded-lg pl-10 ${formikPerfil.touched.nombre && formikPerfil.errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {formikPerfil.touched.nombre && formikPerfil.errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{formikPerfil.errors.nombre}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={formikPerfil.handleChange}
                      onBlur={formikPerfil.handleBlur}
                      value={formikPerfil.values.email}
                      className={`w-full p-3 border rounded-lg pl-10 ${formikPerfil.touched.email && formikPerfil.errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                  {formikPerfil.touched.email && formikPerfil.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{formikPerfil.errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <FiCheck size={18} />
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* Sección de seguridad */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiLock className="text-blue-600" /> Seguridad
          </h2>

          <form onSubmit={formikPassword.handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contraseñaActual" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña actual
              </label>
              <div className="relative">
                <input
                  id="contraseñaActual"
                  name="contraseñaActual"
                  type={showCurrentPassword ? "text" : "password"}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.contraseñaActual}
                  className={`w-full p-3 border rounded-lg pl-10 ${formikPassword.touched.contraseñaActual && formikPassword.errors.contraseñaActual ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formikPassword.touched.contraseñaActual && formikPassword.errors.contraseñaActual && (
                <p className="mt-1 text-sm text-red-600">{formikPassword.errors.contraseñaActual}</p>
              )}
            </div>

            <div>
              <label htmlFor="nuevaContraseña" className="block text-sm font-medium text-gray-700 mb-1">
                Nueva contraseña
              </label>
              <div className="relative">
                <input
                  id="nuevaContraseña"
                  name="nuevaContraseña"
                  type={showNewPassword ? "text" : "password"}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.nuevaContraseña}
                  className={`w-full p-3 border rounded-lg pl-10 ${formikPassword.touched.nuevaContraseña && formikPassword.errors.nuevaContraseña ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formikPassword.touched.nuevaContraseña && formikPassword.errors.nuevaContraseña && (
                <p className="mt-1 text-sm text-red-600">{formikPassword.errors.nuevaContraseña}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmarContraseña" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar nueva contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmarContraseña"
                  name="confirmarContraseña"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={formikPassword.handleChange}
                  onBlur={formikPassword.handleBlur}
                  value={formikPassword.values.confirmarContraseña}
                  className={`w-full p-3 border rounded-lg pl-10 ${formikPassword.touched.confirmarContraseña && formikPassword.errors.confirmarContraseña ? 'border-red-500' : 'border-gray-300'}`}
                />
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formikPassword.touched.confirmarContraseña && formikPassword.errors.confirmarContraseña && (
                <p className="mt-1 text-sm text-red-600">{formikPassword.errors.confirmarContraseña}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FiCheck size={18} />
              Cambiar contraseña
            </button>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiLock className="text-blue-600" />
                  <span className="font-medium">Autenticación de dos factores</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.autenticacionDosFactores}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      autenticacionDosFactores: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Añade una capa adicional de seguridad a tu cuenta
              </p>
            </div>
          </form>
        </motion.section>


        {/* Sección de cuenta */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiX className="text-red-600" /> Cuenta
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
              <h3 className="font-bold text-red-800 mb-2">Eliminar cuenta</h3>
              <p className="text-sm text-red-600 mb-3">
                Esta acción eliminará permanentemente tu cuenta y todos tus datos.
                Esta acción no puede deshacerse.
              </p>
              <button
                onClick={eliminarCuenta}
                disabled={isDeleting}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <FiTrash2 size={16} />
                {isDeleting ? "Eliminando..." : "Eliminar cuenta"}
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default SettingUser;