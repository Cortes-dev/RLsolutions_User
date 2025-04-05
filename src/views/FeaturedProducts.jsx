import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

const FeaturedProducts = ({ category, viewMode }) => {
    // Datos de ejemplo - reemplaza con tu data real
    const products = [
        {
            id: 1,
            name: "Laptop Ultra Slim",
            price: 1299.99,
            category: "Tecnología",
            image: "https://via.placeholder.com/300x300?text=Laptop",
            discount: "20% OFF",
            rating: 4.5
        },
        // Agrega más productos según necesites
    ].filter(p => category === "Todos" || p.category === category);

    return (
        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-6"}>
            <AnimatePresence>
                {products.slice(0, 8).map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        layout
                        className={`bg-white rounded-xl shadow-md overflow-hidden ${viewMode === "grid" ? "" : "flex max-w-3xl mx-auto"
                            }`}
                    >
                        <Link to={`/product/${product.id}`} className="block">
                            <div className={`relative ${viewMode === "grid" ? "h-48" : "w-48 flex-shrink-0"}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`w-full h-full object-contain ${viewMode === "grid" ? "" : "p-4"}`}
                                    loading="lazy"
                                />
                                {product.discount && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                        {product.discount}
                                    </span>
                                )}
                                <button className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-blue-600">
                                    <Icon icon="mdi:heart-outline" className="text-xl" />
                                </button>
                            </div>
                        </Link>

                        <div className={`p-4 ${viewMode === "grid" ? "" : "flex-grow"}`}>
                            <div className="flex justify-between items-start mb-2">
                                <Link to={`/product/${product.id}`}>
                                    <h3 className={`font-bold text-gray-800 ${viewMode === "grid" ? "text-lg" : "text-xl"}`}>
                                        {product.name}
                                    </h3>
                                </Link>
                                {viewMode === "list" && (
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Icon
                                                key={i}
                                                icon="mdi:star"
                                                className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div>
                                    <p className="text-xl font-bold text-blue-600">
                                        ${product.price.toFixed(2)}
                                    </p>
                                    {viewMode === "grid" && product.rating && (
                                        <div className="flex items-center mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Icon
                                                    key={i}
                                                    icon="mdi:star"
                                                    className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                                        </div>
                                    )}
                                </div>

                                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-1">
                                    <Icon icon="mdi:cart" className="text-lg" />
                                    {viewMode === "list" && <span>Agregar</span>}
                                </button>
                            </div>

                            {viewMode === "list" && (
                                <p className="text-gray-600 mt-3 line-clamp-2">
                                    Descripción del producto o características destacadas que podrían interesar al cliente...
                                </p>
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FeaturedProducts;