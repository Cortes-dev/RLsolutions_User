import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/image/RLsolutions - web 1.1.png";
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion";

// Componente reutilizable para los enlaces del menú
const NavLink = ({ to, children, onClick, isActive }) => {
    return (
        <li className="list-none">
            <Link
                to={to}
                onClick={onClick}
                className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${isActive
                        ? "bg-blue-100 text-blue-700 font-semibold"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
            >
                {children}
            </Link>
        </li>
    );
};

const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [startX, setStartX] = useState(null);
    const menuRef = useRef(null);
    const subMenuRef = useRef(null);
    const notificationsRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
    const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);
    const closeAllMenus = () => {
        setIsMenuOpen(false);
        setIsSubMenuOpen(false);
        setIsNotificationsOpen(false);
    };

    // Función para manejar el arrastre del menú
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!startX) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        if (diffX > 50) {
            closeAllMenus();
            setStartX(null);
        }
    };

    // Cerrar menús si se hace clic fuera de ellos
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                closeAllMenus();
            }
            if (subMenuRef.current && !subMenuRef.current.contains(e.target)) {
                setIsSubMenuOpen(false);
            }
            if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        closeAllMenus();
    }, [location]);

    // Notificaciones de ejemplo
    const notifications = [
        { id: 1, text: "Tu pedido ha sido enviado.", time: "Hace 2 horas", read: false },
        { id: 2, text: "Oferta especial: 20% de descuento.", time: "Hace 1 día", read: true },
        { id: 3, text: "Nuevo producto disponible.", time: "Hace 3 días", read: true },
    ];

    const unreadNotifications = notifications.filter(n => !n.read).length;

    return (
        <nav className="bg-white border-b border-blue-200 shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Botón del menú móvil (lado izquierdo) */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-blue-600 focus:outline-none p-1 rounded-md hover:bg-blue-50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <Icon icon="line-md:menu" width="24" height="24" />
                    </button>

                    {/* Logo (centro en móviles) */}
                    <Link
                        to="/"
                        className="flex-shrink-0 mx-4 md:mx-0"
                        onClick={closeAllMenus}
                    >
                        <img
                            src={logo}
                            alt="RL Solutions"
                            className="h-10 w-auto"
                            loading="eager"
                        />
                    </Link>

                    {/* Menú de navegación (escritorio) */}
                    <div className="hidden md:flex items-center space-x-1">
                        <ul className="flex space-x-1">
                            <NavLink
                                to="/"
                                isActive={location.pathname === "/"}
                                onClick={closeAllMenus}
                            >
                                Inicio
                            </NavLink>
                            <NavLink
                                to="/products"
                                isActive={location.pathname.startsWith("/products")}
                                onClick={closeAllMenus}
                            >
                                Productos
                            </NavLink>
                            <NavLink
                                to="/brands"
                                isActive={location.pathname.startsWith("/brands")}
                                onClick={closeAllMenus}
                            >
                                Marcas
                            </NavLink>
                        </ul>

                        {/* Iconos de acciones */}
                        <div className="flex items-center ml-4 space-x-2">
                            {/* Carrito */}
                            <NavLink
                                to="/cart"
                                isActive={location.pathname === "/cart"}
                                onClick={closeAllMenus}
                                className="p-2"
                            >
                                <div className="relative">
                                    <Icon icon="fluent:cart-24-regular" width="22" height="22" />
                                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        2
                                    </span>
                                </div>
                            </NavLink>

                            {/* Notificaciones */}
                            <div className="relative" ref={notificationsRef}>
                                <button
                                    onClick={toggleNotifications}
                                    className="p-2 rounded-md hover:bg-blue-50 transition-colors relative"
                                    aria-label="Notificaciones"
                                >
                                    <Icon icon="mdi:bell-outline" width="22" height="22" />
                                    {unreadNotifications > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                            {unreadNotifications}
                                        </span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isNotificationsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden z-50"
                                        >
                                            <div className="p-3 border-b border-gray-200 bg-blue-50">
                                                <p className="font-semibold text-gray-900">Notificaciones</p>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((notification) => (
                                                        <div
                                                            key={notification.id}
                                                            className={`p-3 border-b border-gray-100 transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                                                        >
                                                            <p className="text-sm text-gray-800">{notification.text}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-gray-500">
                                                        No hay notificaciones
                                                    </div>
                                                )}
                                            </div>
                                            <Link
                                                to="/notifications"
                                                className="block p-3 text-center text-sm text-blue-600 hover:bg-blue-50 border-t border-gray-200"
                                                onClick={() => {
                                                    setIsNotificationsOpen(false);
                                                    closeAllMenus();
                                                }}
                                            >
                                                Ver todas las notificaciones
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Perfil y submenú */}
                            <div className="relative" ref={subMenuRef}>
                                <button
                                    onClick={toggleSubMenu}
                                    className="p-1 rounded-full hover:bg-blue-50 transition-colors flex items-center"
                                    aria-label="Menú de usuario"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                                        <Icon icon="mdi:account" width="18" height="18" />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isSubMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden z-50"
                                        >
                                            <div className="p-4 border-b border-gray-200">
                                                <p className="font-medium text-gray-900">Nombre Usuario</p>
                                                <p className="text-xs text-gray-500">usuario@example.com</p>
                                            </div>
                                            <ul className="py-1">
                                                <li>
                                                    <Link
                                                        to="/profile"
                                                        onClick={() => {
                                                            setIsSubMenuOpen(false);
                                                            closeAllMenus();
                                                        }}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                                    >
                                                        Mi perfil
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/orders"
                                                        onClick={() => {
                                                            setIsSubMenuOpen(false);
                                                            closeAllMenus();
                                                        }}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                                    >
                                                        Mis pedidos
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/settings"
                                                        onClick={() => {
                                                            setIsSubMenuOpen(false);
                                                            closeAllMenus();
                                                        }}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                                    >
                                                        Configuración
                                                    </Link>
                                                </li>
                                            </ul>
                                            <div className="py-1 border-t border-gray-200">
                                                <Link
                                                    to="/logout"
                                                    onClick={() => {
                                                        setIsSubMenuOpen(false);
                                                        closeAllMenus();
                                                    }}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                                                >
                                                    Cerrar sesión
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Carrito en móvil */}
                    <Link
                        to="/cart"
                        className="md:hidden p-2 relative"
                        onClick={closeAllMenus}
                    >
                        <Icon icon="fluent:cart-24-regular" width="22" height="22" />
                        <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                            2
                        </span>
                    </Link>
                </div>
            </div>

            {/* Menú desplegable para móviles */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeAllMenus}
                            transition={{ duration: 0.2 }}
                        />

                        <motion.div
                            ref={menuRef}
                            className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 flex flex-col"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                            {/* Encabezado del menú */}
                            <div className="p-4 border-b border-gray-200 flex items-center space-x-3 bg-blue-50">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                                    <Icon icon="mdi:account" width="20" height="20" />
                                </div>
                                <div>
                                    <p className="font-medium">Nombre Usuario</p>
                                    <p className="text-xs text-gray-500">usuario@example.com</p>
                                </div>
                            </div>

                            {/* Contenido del menú */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Sección principal */}
                                <ul className="p-2">
                                    {[
                                        { to: "/", icon: "line-md:home", label: "Inicio" },
                                        { to: "/products", icon: "mdi:shopping", label: "Productos" },
                                        { to: "/brands", icon: "tabler:letter-m", label: "Marcas" },
                                        { to: "/categories", icon: "mdi:category", label: "Categorías" },
                                    ].map((item) => (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            onClick={closeAllMenus}
                                            isActive={location.pathname === item.to ||
                                                (item.to !== "/" && location.pathname.startsWith(item.to))}
                                        >
                                            <Icon icon={item.icon} className="mr-3" width="20" height="20" />
                                            {item.label}
                                        </NavLink>
                                    ))}
                                </ul>

                                {/* Sección secundaria */}
                                <div className="p-2 border-t border-gray-200">
                                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Mi cuenta
                                    </h3>
                                    <ul>
                                        {[
                                            { to: "/profile", icon: "mdi:account-cog", label: "Perfil" },
                                            { to: "/orders", icon: "mdi:package-variant", label: "Mis pedidos" },
                                            { to: "/favorites", icon: "mdi:heart", label: "Favoritos" },
                                        ].map((item) => (
                                            <NavLink
                                                key={item.to}
                                                to={item.to}
                                                onClick={closeAllMenus}
                                                isActive={location.pathname.startsWith(item.to)}
                                            >
                                                <Icon icon={item.icon} className="mr-3" width="20" height="20" />
                                                {item.label}
                                            </NavLink>
                                        ))}
                                    </ul>
                                </div>

                                {/* Notificaciones en móvil */}
                                <div className="p-2 border-t border-gray-200">
                                    <h3 className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Notificaciones
                                    </h3>
                                    <Link
                                        to="/notifications"
                                        onClick={closeAllMenus}
                                        className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-blue-50"
                                    >
                                        <div className="relative mr-3">
                                            <Icon icon="mdi:bell-outline" width="20" height="20" />
                                            {unreadNotifications > 0 && (
                                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center transform translate-x-1 -translate-y-1"></span>
                                            )}
                                        </div>
                                        Ver notificaciones
                                    </Link>
                                </div>
                            </div>

                            {/* Pie del menú */}
                            <div className="p-2 border-t border-gray-200">
                                <Link
                                    to="/settings"
                                    onClick={closeAllMenus}
                                    className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-blue-50 text-sm"
                                >
                                    <Icon icon="mdi:cog" className="mr-3" width="18" height="18" />
                                    Configuración
                                </Link>
                                <Link
                                    to="/logout"
                                    onClick={closeAllMenus}
                                    className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-blue-50 text-sm"
                                >
                                    <Icon icon="mdi:logout" className="mr-3" width="18" height="18" />
                                    Cerrar sesión
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;