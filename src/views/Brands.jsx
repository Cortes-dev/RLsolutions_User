import React from "react";
import { motion } from "framer-motion";

// Datos de ejemplo de marcas (simulando la respuesta de la base de datos)
const marcas = [
    {
        id: 1,
        nombre: "Apple",
        imagen: "https://via.placeholder.com/150x100?text=Apple",
        descripcion: "Tecnología innovadora y diseño premium.",
    },
    {
        id: 2,
        nombre: "Samsung",
        imagen: "https://via.placeholder.com/150x100?text=Samsung",
        descripcion: "Innovación en dispositivos móviles y electrónica.",
    },
    {
        id: 3,
        nombre: "Sony",
        imagen: "https://via.placeholder.com/150x100?text=Sony",
        descripcion: "Calidad en audio, video y entretenimiento.",
    },
    {
        id: 4,
        nombre: "Microsoft",
        imagen: "https://via.placeholder.com/150x100?text=Microsoft",
        descripcion: "Software y hardware líder en el mercado.",
    },
    {
        id: 5,
        nombre: "Nike",
        imagen: "https://via.placeholder.com/150x100?text=Nike",
        descripcion: "Ropa y calzado deportivo de alta calidad.",
    },
    {
        id: 6,
        nombre: "Adidas",
        imagen: "https://via.placeholder.com/150x100?text=Adidas",
        descripcion: "Innovación en moda y rendimiento deportivo.",
    },
    {
        id: 7,
        nombre: "Tesla",
        imagen: "https://via.placeholder.com/150x100?text=Tesla",
        descripcion: "Vehículos eléctricos y energía sostenible.",
    },
    {
        id: 8,
        nombre: "Google",
        imagen: "https://via.placeholder.com/150x100?text=Google",
        descripcion: "Tecnología y servicios en la nube.",
    },
];

const Brands = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Animación inicial
            animate={{ opacity: 1, y: 0 }} // Animación al cargar
            transition={{ duration: 0.5 }} // Duración de la animación
            className="p-6 min-h-screen"
        >
            {/* Contenedor principal */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Nuestras Marcas
                </h1>

                {/* Cuadrícula de marcas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {marcas.map((marca) => (
                        <motion.div
                            key={marca.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }} // Efecto hover
                            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Imagen de la marca */}
                            <img
                                src={marca.imagen}
                                alt={marca.nombre}
                                className="w-24 h-24 object-contain mb-4"
                            />

                            {/* Nombre de la marca */}
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                {marca.nombre}
                            </h2>

                            {/* Descripción de la marca */}
                            <p className="text-gray-600">{marca.descripcion}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Brands;