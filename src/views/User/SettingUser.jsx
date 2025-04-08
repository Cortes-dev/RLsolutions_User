import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  FiPlus,
  FiLock,
  FiCheck,
  FiEyeOff,
  FiEye,
  FiGlobe,
  FiHome,
  FiEdit2,
  FiTrash2,
  FiBriefcase,
  FiStar,
  FiMapPin,
  FiPhone,
  FiSave
} from 'react-icons/fi';
import * as yup from "yup";
import { useFormik } from "formik";
import AvatarEditor from "react-avatar-editor";

// Esquema de validación para el perfil
const perfilSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es requerido")
    .min(3, "Mínimo 3 caracteres"),
  email: yup.string().email("Email inválido").required("El email es requerido"),
});

// Esquema de validación para contraseña
const passwordSchema = yup.object().shape({
  contraseñaActual: yup.string().required("La contraseña actual es requerida"),
  nuevaContraseña: yup
    .string()
    .required("La nueva contraseña es requerida")
    .min(8, "Mínimo 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Debe contener mayúsculas, minúsculas, números y símbolos"
    ),
  confirmarContraseña: yup
    .string()
    .oneOf(
      [yup.ref("nuevaContraseña"), null],
      "Las contraseñas deben coincidir"
    )
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

  // Estados para el formulario de dirección
  const [mostrarFormDireccion, setMostrarFormDireccion] = useState(false);
  const [direccionEditando, setDireccionEditando] = useState(null);
  const [formDireccion, setFormDireccion] = useState({
    alias: "",
    calle: "",
    colonia: "",
    codigoPostal: "",
    ciudad: "",
    estado: "",
    telefono: "",
    principal: false,
  });

  const guardarDireccion = () => {
    // Lógica para guardar la dirección
    setMostrarFormDireccion(false);
    setFormDireccion({
      alias: "",
      calle: "",
      colonia: "",
      codigoPostal: "",
      ciudad: "",
      estado: "",
      telefono: "",
      principal: false,
    });
  };

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
          },
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
      toast.custom(
        (t) => (
          <div className="bg-white p-4 rounded-lg shadow-xl max-w-md">
            <h3 className="font-bold text-lg mb-2">¿Estás seguro?</h3>
            <p className="mb-4">
              Esta acción eliminará tu cuenta permanentemente y no podrá
              deshacerse.
            </p>
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
        ),
        { duration: 10000 }
      );
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
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Configuración de Usuario
          </h1>
          <p className="text-gray-600">Administra tu perfil y preferencias</p>
        </motion.div>

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
              <label
                htmlFor="contraseñaActual"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  className={`w-full p-3 border rounded-lg pl-10 ${
                    formikPassword.touched.contraseñaActual &&
                    formikPassword.errors.contraseñaActual
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
              {formikPassword.touched.contraseñaActual &&
                formikPassword.errors.contraseñaActual && (
                  <p className="mt-1 text-sm text-red-600">
                    {formikPassword.errors.contraseñaActual}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="nuevaContraseña"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  className={`w-full p-3 border rounded-lg pl-10 ${
                    formikPassword.touched.nuevaContraseña &&
                    formikPassword.errors.nuevaContraseña
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
              {formikPassword.touched.nuevaContraseña &&
                formikPassword.errors.nuevaContraseña && (
                  <p className="mt-1 text-sm text-red-600">
                    {formikPassword.errors.nuevaContraseña}
                  </p>
                )}
            </div>

            <div>
              <label
                htmlFor="confirmarContraseña"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
                  className={`w-full p-3 border rounded-lg pl-10 ${
                    formikPassword.touched.confirmarContraseña &&
                    formikPassword.errors.confirmarContraseña
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
              {formikPassword.touched.confirmarContraseña &&
                formikPassword.errors.confirmarContraseña && (
                  <p className="mt-1 text-sm text-red-600">
                    {formikPassword.errors.confirmarContraseña}
                  </p>
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
                  <span className="font-medium">
                    Autenticación de dos factores
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.autenticacionDosFactores}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        autenticacionDosFactores: e.target.checked,
                      })
                    }
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

        {/* Seccion de Direcciones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FiGlobe className="text-blue-600" />
              Direcciones
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={() => setMostrarFormDireccion(!mostrarFormDireccion)}
            >
              <FiPlus className="text-lg" />
              Agregar Dirección
            </motion.button>
          </div>

          <div className="space-y-6">
            {/* Dirección Principal */}
            <motion.div
              whileHover={{ y: -2 }}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FiHome className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">Casa Principal</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Principal
                      </span>
                    </div>
                    <p className="text-gray-600">
                      Av. Principal #123, Col. Centro
                    </p>
                    <p className="text-gray-600">
                      Ciudad de México, CDMX, 06000
                    </p>
                    <p className="text-gray-600 mt-2">
                      <FiPhone className="inline mr-2" />
                      55 1234 5678
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-gray-500 hover:text-blue-600 p-2">
                    <FiEdit2 />
                  </button>
                  <button className="text-gray-500 hover:text-red-600 p-2">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Otras Direcciones */}
            <motion.div
              whileHover={{ y: -2 }}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <FiBriefcase className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Oficina</h3>
                    <p className="text-gray-600">
                      Paseo de la Reforma #505, Piso 10
                    </p>
                    <p className="text-gray-600">Cuauhtémoc, CDMX, 06500</p>
                    <p className="text-gray-600 mt-2">
                      <FiPhone className="inline mr-2" />
                      55 8765 4321
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-gray-500 hover:text-blue-600 p-2"
                    onClick={() => setMostrarFormDireccion(true)}
                  >
                    <FiEdit2 />
                  </button>
                  <button className="text-gray-500 hover:text-red-600 p-2">
                    <FiTrash2 />
                  </button>
                  <button className="text-gray-500 hover:text-green-600 p-2">
                    <FiStar />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Formulario para agregar/editar dirección */}
            {mostrarFormDireccion && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg p-5 mt-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FiMapPin className="text-blue-600" />
                  {direccionEditando
                    ? "Editar Dirección"
                    : "Agregar Nueva Dirección"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alias
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Casa, Oficina"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.alias}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          alias: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Calle y número
                    </label>
                    <input
                      type="text"
                      placeholder="Av. Principal #123"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.calle}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          calle: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Colonia
                    </label>
                    <input
                      type="text"
                      placeholder="Colonia Centro"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.colonia}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          colonia: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      placeholder="06000"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.codigoPostal}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          codigoPostal: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      placeholder="Ciudad de México"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.ciudad}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          ciudad: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <input
                      type="text"
                      placeholder="CDMX"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.estado}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          estado: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      placeholder="55 1234 5678"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formDireccion.telefono}
                      onChange={(e) =>
                        setFormDireccion({
                          ...formDireccion,
                          telefono: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-end">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="direccionPrincipal"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formDireccion.principal}
                        onChange={(e) =>
                          setFormDireccion({
                            ...formDireccion,
                            principal: e.target.checked,
                          })
                        }
                      />
                      <label
                        htmlFor="direccionPrincipal"
                        className="text-sm text-gray-700"
                      >
                        Marcar como dirección principal
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setMostrarFormDireccion(false)}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    onClick={guardarDireccion}
                  >
                    <FiSave className="text-lg" />
                    Guardar Dirección
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Seccion de Tarjetas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Mis Tarjetas</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Icon icon="mdi:credit-card-plus" className="text-lg" />
                Agregar Tarjeta
              </motion.button>
            </div>

            {/* Listado de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tarjeta Principal */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-5 text-white shadow-lg overflow-hidden"
              >
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                    Principal
                  </span>
                  <button className="text-white hover:text-blue-200">
                    <Icon icon="mdi:dots-vertical" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm opacity-80">Banco Nacional</p>
                  <p className="text-lg font-semibold">•••• •••• •••• 4242</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Titular</p>
                    <p className="text-sm">JUAN PEREZ</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 mb-1">Vence</p>
                    <p className="text-sm">12/25</p>
                  </div>
                  <div className="flex items-center">
                    <Icon
                      icon="mdi:credit-card-chip"
                      className="text-2xl mr-2"
                    />
                    <Icon icon="mdi:credit-card" className="text-3xl" />
                  </div>
                </div>
              </motion.div>

              {/* Otras Tarjetas */}
              <motion.div
                whileHover={{ y: -5 }}
                className="relative bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-5 text-white shadow-lg overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <button className="text-white hover:text-gray-300">
                    <Icon icon="mdi:dots-vertical" />
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-sm opacity-80">Banco Internacional</p>
                  <p className="text-lg font-semibold">•••• •••• •••• 5689</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-80 mb-1">Titular</p>
                    <p className="text-sm">JUAN PEREZ</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80 mb-1">Vence</p>
                    <p className="text-sm">05/24</p>
                  </div>
                  <div className="flex items-center">
                    <Icon
                      icon="mdi:credit-card-chip"
                      className="text-2xl mr-2"
                    />
                    <Icon icon="mdi:credit-card" className="text-3xl" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Formulario para agregar tarjeta (oculto por defecto) */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-lg p-4 mt-4 overflow-hidden"
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Agregar nueva tarjeta
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del titular
                  </label>
                  <input
                    type="text"
                    placeholder="JUAN PEREZ"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de expiración
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                  Cancelar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <Icon icon="mdi:check" />
                  Guardar Tarjeta
                </button>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Sección de cuenta */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Cuenta
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
              <h3 className="font-bold text-red-800 mb-2">Eliminar cuenta</h3>
              <p className="text-sm text-red-600 mb-3">
                Esta acción eliminará permanentemente tu cuenta y todos tus
                datos. Esta acción no puede deshacerse.
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
