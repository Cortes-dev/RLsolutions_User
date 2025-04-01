import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Card = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Usamos process.env.PUBLIC_URL para asegurar que la ruta es correcta
                const response = await axios.get(`/Datos.json`);
                setProductos(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error al cargar los productos:', err);
            }
        };

        fetchData();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    const handleBuyClick = (e) => {
        e.stopPropagation();
        window.location.href = '#pagar';
    };

    const handleCardClick = (e) => {
        window.location.href = '#Product';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-4">Cargando productos...</span>
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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {productos.map((producto) => (
                <div
                    key={producto.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 block"
                    onClick={handleCardClick}
                >
                    <div className="relative">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-48 object-contain"
                            loading="lazy" // Mejora el performance con lazy loading
                        />
                        {producto.descuento && (
                            <span className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                {producto.descuento}
                            </span>
                        )}
                    </div>

                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800">{producto.nombre}</h3>
                        {/* <p className="text-gray-600 mt-2">{producto.descripcion}</p> */}
                        <p className="text-2xl font-bold text-blue-600 mt-4">
                            {producto.precio}
                        </p>

                        <button
                            onClick={handleBuyClick}
                            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                            aria-label={`Comprar ${producto.nombre}`}
                        >
                            Comprar ahora
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Card;