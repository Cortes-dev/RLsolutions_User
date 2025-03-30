import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Estilos básicos de Swiper
import 'swiper/css/navigation'; // Estilos para los botones de navegación
import 'swiper/css/pagination'; // Estilos para la paginación
import { Navigation, Pagination } from 'swiper/modules';

// Datos de ejemplo para los productos
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

const Promociones = () => {
    return (
        <div className="bg-gray-300 py-8 rounded-lg">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Promociones Destacadas</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {productos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[400px]">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-full h-48 object-contain"
                                />
                                <div className="p-6">
                                    {producto.descuento && (
                                        <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                                            {producto.descuento}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold mt-4">{producto.nombre}</h3>
                                    <p className="text-gray-600 mt-2">{producto.descripcion}</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-4">
                                        {producto.precio}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Promociones;