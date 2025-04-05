import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import axios from "axios";
import { toast } from "sonner";

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar datos iniciales
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.get("/Datos.json");

                // Obtener estados guardados
                const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
                const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

                // Procesar productos con estado
                const processedProducts = response.data
                    .slice(0, 8) // Mostrar solo 8 productos destacados
                    .map(product => ({
                        ...product,
                        isSaved: savedProducts.some(p => p.id === product.id),
                        inCart: cartItems.some(item => item.id === product.id)
                    }));

                setProducts(processedProducts);
            } catch (err) {
                console.error("Error loading products:", err);
                setError("Error al cargar los productos. Intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Función para agregar al carrito
    const addToCart = (product, e) => {
        e.stopPropagation();

        try {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cartItems.find(item => item.id === product.id);

            let updatedCart;
            if (existingItem) {
                updatedCart = cartItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                toast.success(`Otra unidad de ${product.nombre} agregada`);
            } else {
                updatedCart = [
                    ...cartItems,
                    {
                        id: product.id,
                        name: product.nombre,
                        price: product.precio,
                        image: product.imagen,
                        quantity: 1
                    }
                ];
                toast.success(`${product.nombre} agregado al carrito`);
            }

            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Actualizar estado UI
            setProducts(prev => prev.map(p =>
                p.id === product.id ? { ...p, inCart: true } : p
            ));

            // Notificar a otros componentes
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        } catch (err) {
            console.error("Error adding to cart:", err);
            toast.error("Error al agregar al carrito");
        }
    };

    // Función para guardar producto
    const toggleSavedProduct = (e, product) => {
        e.stopPropagation();

        try {
            const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
            const isSaved = savedProducts.some(p => p.id === product.id);

            let updatedProducts;
            if (isSaved) {
                updatedProducts = savedProducts.filter(p => p.id !== product.id);
                toast.success(`${product.nombre} removido de guardados`);
            } else {
                updatedProducts = [...savedProducts, product];
                toast.success(`${product.nombre} guardado para después`);
            }

            localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));

            // Actualizar estado UI
            setProducts(prev => prev.map(p =>
                p.id === product.id ? { ...p, isSaved: !isSaved } : p
            ));
        } catch (err) {
            console.error("Error saving product:", err);
            toast.error("Error al guardar producto");
        }
    };

    // Manejar click en producto
    const handleProductClick = (id) => {
        window.location.href = `/product/${id}`;
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="animate-pulse">
                            <div className="bg-gray-200 h-48 w-full"></div>
                            <div className="p-4 space-y-3">
                                <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
                                <div className="bg-gray-200 h-4 w-full rounded"></div>
                                <div className="bg-gray-200 h-8 w-full rounded mt-4"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mx-6">
                <div className="flex items-center">
                    <Icon icon="mdi:alert-circle" className="mr-2 text-xl" />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <AnimatePresence>
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer relative"
                        onClick={() => handleProductClick(product.id)}
                    >
                        {/* Imagen y badges */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={product.imagen}
                                alt={product.nombre}
                                className="w-full h-full object-contain p-4"
                                loading="lazy"
                            />

                            {/* Badge de descuento */}
                            {product.descuento && (
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                    {product.descuento}
                                </span>
                            )}

                            {/* Botón de guardado */}
                            <button
                                onClick={(e) => toggleSavedProduct(e, product)}
                                className={`absolute top-2 left-2 p-2 rounded-full shadow-md transition-colors ${product.isSaved ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                                aria-label={product.isSaved ? "Quitar de guardados" : "Guardar producto"}
                            >
                                <Icon
                                    icon={product.isSaved ? "mdi:bookmark-check" : "mdi:bookmark-outline"}
                                    className="text-lg"
                                />
                            </button>
                        </div>

                        {/* Contenido */}
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                                {product.nombre}
                            </h3>

                            <div className="flex items-center justify-between mt-4">
                                <p className="text-xl font-bold text-blue-600">
                                    ${product.precio.toFixed(2)}
                                    {product.precioOriginal && (
                                        <span className="ml-2 text-sm text-gray-500 line-through">
                                            ${product.precioOriginal.toFixed(2)}
                                        </span>
                                    )}
                                </p>
                            </div>

                            <button
                                onClick={(e) => addToCart(product, e)}
                                className={`w-full mt-4 py-2 px-4 rounded-md transition flex items-center justify-center gap-2 ${product.inCart
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                            >
                                <Icon icon={product.inCart ? "mdi:cart-check" : "mdi:cart"} />
                                {product.inCart ? "En el carrito" : "Agregar al carrito"}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </section>
    );
};

export default FeaturedProducts;