import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Brands = () => {
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get(`/Datos.json`);
                setMarcas(response.data || []); // Asume que los datos tienen una propiedad 'marcas'
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error("Error al cargar las marcas:", err);
            }
        };

        fetchMarcas();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-4">Cargando marcas...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 min-h-screen"
        >
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Nuestras Marcas
                </h1>

                {marcas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {marcas.map((marca) => (
                            <motion.div
                                key={marca.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={marca.imagen}
                                    alt={marca.categoria}
                                    className="w-24 h-24 object-contain mb-4"
                                    loading="lazy"
                                />
                                <h2 className="text-xl font-bold text-gray-800 mb-2">
                                    {marca.categoria}
                                </h2>
                                {/* <p className="text-gray-600">{marca.descripcion}</p> */}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No hay marcas disponibles</p>
                )}
            </div>
        </motion.div>
    );
};

export default Brands;