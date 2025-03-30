import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "/image/RLsolutions - web 1.1.png";
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion";

// Componente reutilizable para los enlaces del menú
const NavLink = ({ to, children, onClick }) => {
    return (
        <li className="list-none">
            <Link
                to={to}
                onClick={onClick}
                className="lg:text-[#002c82] text-[#0059ff] font-semibold lg:hover:text-[#e6f2ff] transition duration-300"
            >
                {children}
            </Link>
        </li>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [startX, setStartX] = useState(null);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
    const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Función para manejar el arrastre del menú
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            closeMenu();
            setStartX(null);
        }
    };

    // Cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white border-b border-blue-600 shadow-md shadow-blue-500/50 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Botón del menú móvil (lado izquierdo) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-blue-400 focus:outline-none focus:text-blue-800"
                    aria-label="Toggle menu"
                >
                    <Icon icon="line-md:menu" width="24" height="24" />
                </button>

                {/* Logo (centro en móviles) */}
                <Link to="/" className="text-white text-2xl font-bold mx-auto md:mx-0">
                    <img src={logo} alt="Logo" className="w-[200px]" />
                </Link>

                {/* Carrito (lado derecho) */}
                <div className="lg:hidden">

                    <NavLink to="/cart">
                        <Icon icon="fluent:cart-24-regular" width="24" height="24" />
                    </NavLink>

                </div>
                {/* Menú de navegación (escritorio) */}
                <ul className="hidden md:flex space-x-6 items-center">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Productos</NavLink>
                    <NavLink to="/brands">Marcas</NavLink>

                    {/* Carrito */}
                    <NavLink to="/cart">
                        <Icon icon="fluent:cart-24-regular" width="24" height="24" />
                    </NavLink>

                    {/* Notificaciones */}
                    <div className="relative">
                        <button
                            onClick={toggleNotifications}
                            className="p-2 cursor-pointer text-blue-600 hover:text-blue-800 transition duration-300"
                        >
                            <Icon icon="mdi:bell-outline" width="24" height="24" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                                3
                            </span>
                        </button>
                        {isNotificationsOpen && (
                            <ul className="absolute right-0 z-10 mt-2 w-64 bg-white shadow-lg rounded-bl-md rounded-tl-md rounded-br-md border-blue-800 border-2 overflow-hidden">
                                <li className="p-4 border-b border-gray-200">
                                    <p className="font-semibold text-gray-900">Notificaciones</p>
                                </li>
                                {[
                                    { id: 1, text: "Tu pedido ha sido enviado.", time: "Hace 2 horas" },
                                    { id: 2, text: "Oferta especial: 20% de descuento.", time: "Hace 1 día" },
                                    { id: 3, text: "Nuevo producto disponible.", time: "Hace 3 días" },
                                ].map((notification) => (
                                    <li key={notification.id} className="p-4 hover:bg-blue-50 transition duration-300">
                                        <p className="text-sm text-gray-800">{notification.text}</p>
                                        <p className="text-xs text-gray-500">{notification.time}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Submenú de usuario */}
                    <div className="relative">
                        <button
                            onClick={toggleSubMenu}
                            className="p-2 cursor-pointer bg-blue-600 rounded-md text-white flex items-center gap-2 hover:bg-blue-700 transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill="#fff"
                                    d="M11 7c0 1.66-1.34 3-3 3S5 8.66 5 7s1.34-3 3-3s3 1.34 3 3"
                                />
                                <path
                                    fill="#fff"
                                    fillRule="evenodd"
                                    d="M16 8c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M4 13.75C4.16 13.484 5.71 11 7.99 11c2.27 0 3.83 2.49 3.99 2.75A6.98 6.98 0 0 0 14.99 8c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.38 1.19 4.49 3.01 5.75"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {isSubMenuOpen && (
                            <ul className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-bl-md rounded-tl-md rounded-br-md border-blue-800 border-2 overflow-hidden">
                                <li>
                                    <Link
                                        to="/setting"
                                        onClick={() => setIsSubMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                                    >
                                        Configuraciones
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/orders"
                                        onClick={() => setIsSubMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                                    >
                                        Historial de compras
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/viewed"
                                        onClick={() => setIsSubMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                                    >
                                        Productos vistos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsSubMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                                    >
                                        Iniciar sesión
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsSubMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 transition duration-300"
                                    >
                                        Registrarse
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </ul>
            </div>

            {/* Menú desplegable para móviles */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 z-50 bg-black/70 bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                        style={{ willChange: "opacity" }}
                    >
                        <motion.div
                            ref={menuRef}
                            className="fixed top-0 left-0 h-full w-80 bg-white shadow-lg flex flex-col"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            style={{ willChange: "transform" }}
                        >
                            {/* Perfil en la parte superior */}
                            <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
                                <img
                                    src="https://rlsolutions.com.mx/Admin/img/1620268737.jpg"
                                    alt="Perfil"
                                    className="w-10 h-10 rounded-full"
                                    loading="lazy"
                                />
                                <div>
                                    <p className="font-semibold">Nombre del Usuario</p>
                                    <p className="text-sm text-gray-500">usuario@example.com</p>
                                </div>
                            </div>

                            {/* Notificaciones en móvil */}
                            <div className="p-4 border-b border-gray-200">
                                <button
                                    onClick={toggleNotifications}
                                    className="w-full flex items-center justify-between text-blue-600 hover:text-blue-800 transition duration-300"
                                >
                                    <span className="flex items-center space-x-2">
                                        <Icon icon="mdi:bell-outline" width="24" height="24" />
                                        <span>Notificaciones</span>
                                    </span>
                                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                        3
                                    </span>
                                </button>
                                {isNotificationsOpen && (
                                    <ul className="mt-4 space-y-2">
                                        {[
                                            { id: 1, text: "Tu pedido ha sido enviado.", time: "Hace 2 horas" },
                                            { id: 2, text: "Oferta especial: 20% de descuento.", time: "Hace 1 día" },
                                            { id: 3, text: "Nuevo producto disponible.", time: "Hace 3 días" },
                                        ].map((notification) => (
                                            <li key={notification.id} className="p-2 hover:bg-blue-50 transition duration-300">
                                                <p className="text-sm text-gray-800">{notification.text}</p>
                                                <p className="text-xs text-gray-500">{notification.time}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Enlaces del menú principal */}
                            <ul className="p-4 flex flex-col space-y-3 text-lg">
                                {[
                                    { to: "/", icon: "line-md:home", label: "Inicio", delay: 0.1 },
                                    { to: "/products", icon: "ic:outline-discount", label: "Ofertas", delay: 0.2 },
                                    { to: "/categories", icon: "mdi:category", label: "Categorías", delay: 0.3 },
                                    { to: "/brands", icon: "tabler:letter-m", label: "Marcas", delay: 0.4 },
                                ].map(({ to, icon, label, delay }) => (
                                    <NavLink key={to} to={to} onClick={closeMenu} className="flex items-center space-x-2">
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2, delay }}>
                                            <span className="flex items-start space-x-2">
                                                <Icon icon={icon} width="24" height="24" />
                                                <span>{label}</span>
                                            </span>
                                        </motion.div>
                                    </NavLink>
                                ))}
                            </ul>

                            {/* Accesos rápidos */}
                            <div className="p-4 border-t border-gray-200 flex flex-col space-y-3">
                                {[
                                    { to: "/cart", icon: "mdi:cart", label: "Carrito", delay: 0.5 },
                                    { to: "/favorites", icon: "mdi:heart", label: "Favoritos", delay: 0.6 },
                                    { to: "/orders", icon: "mdi:package-variant", label: "Mis pedidos", delay: 0.7 },
                                    { to: "/viewed", icon: "mdi:eye", label: "Productos vistos", delay: 0.8 },
                                    { to: "/help", icon: "mdi:help-circle-outline", label: "Ayuda y soporte", delay: 0.9 },
                                ].map(({ to, icon, label, delay }) => (
                                    <NavLink key={to} to={to} onClick={closeMenu} className="flex items-center space-x-2">
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2, delay }}>
                                            <span className="flex items-start space-x-2">
                                                <Icon icon={icon} width="24" height="24" />
                                                <span>{label}</span>
                                            </span>
                                        </motion.div>
                                    </NavLink>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;