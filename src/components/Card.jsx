import React from 'react';

const Card = () => {
    const productos = [
        {
            id: 1,
            nombre: 'Producto 1',
            descripcion: 'Descripción del producto 1. Ideal para uso diario.',
            precio: '$50.00',
            imagen: 'https://i.pinimg.com/736x/3e/82/15/3e821575ef10f8a074b7706d5ab1d199.jpg',
            descuento: '10% de descuento',
        },
        {
            id: 2,
            nombre: 'Producto 2',
            descripcion: 'Descripción del producto 2. Perfecto para regalos.',
            precio: '$75.00',
            imagen: 'https://i.pinimg.com/736x/3e/82/15/3e821575ef10f8a074b7706d5ab1d199.jpg',
            descuento: null, // Sin descuento
        },
        {
            id: 3,
            nombre: 'Producto 3',
            descripcion: 'Descripción del producto 3. Calidad premium.',
            precio: '$100.00',
            imagen: 'https://i.pinimg.com/736x/3e/82/15/3e821575ef10f8a074b7706d5ab1d199.jpg',
            descuento: '20% de descuento',
        },
        {
            id: 4,
            nombre: 'Producto 4',
            descripcion: 'Descripción del producto 4. Oferta limitada.',
            precio: '$120.00',
            imagen: 'https://i.pinimg.com/736x/3e/82/15/3e821575ef10f8a074b7706d5ab1d199.jpg',
            descuento: '15% de descuento',
        },
    ];

    const handleBuyClick = (e) => {
        e.stopPropagation(); // Evita que el clic en el botón active el clic de la card
        window.location.href = '#pagar'; // Redirige a #pagar
    };

    const handleCardClick = (e) => {
        window.location.href = '#Product'; // Redirige a #Product
    };

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {productos.map((producto) => (
                <div
                    key={producto.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 block"
                    onClick={handleCardClick}
                >
                    {/* Imagen del producto */}
                    <div className="relative">
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="w-full h-48 object-contain"
                        />
                        {producto.descuento && (
                            <span className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                {producto.descuento}
                            </span>
                        )}
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800">{producto.nombre}</h3>
                        <p className="text-gray-600 mt-2">{producto.descripcion}</p>
                        <p className="text-2xl font-bold text-blue-600 mt-4">
                            {producto.precio}
                        </p>

                        {/* Botón de acción */}
                        <button
                            onClick={handleBuyClick}
                            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
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