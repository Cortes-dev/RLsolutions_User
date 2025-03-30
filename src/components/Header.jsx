import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Estilos básicos de Swiper
import 'swiper/css/navigation'; // Estilos para los botones de navegación
import 'swiper/css/pagination'; // Estilos para la paginación
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Datos de ejemplo para los productos
const productos = [
    {
        id: 1,
        nombre: 'Smartphone X',
        descripcion: 'El último smartphone con pantalla OLED y cámara de 108MP.',
        precio: '$799.99',
        imagen: 'https://rlsolutions.com.mx/Admin/img/1015485835.jpg',
    },
    {
        id: 2,
        nombre: 'Laptop Pro',
        descripcion: 'Laptop ultradelgada con procesador de última generación.',
        precio: '$1299.99',
        imagen: 'https://rlsolutions.com.mx/Admin/img/871373184.jpg',
    },
    {
        id: 3,
        nombre: 'Auriculares Inalámbricos',
        descripcion: 'Auriculares con cancelación de ruido y 20 horas de batería.',
        precio: '$199.99',
        imagen: 'https://rlsolutions.com.mx/Admin/img/986850733.jpg',
    },
    {
        id: 4,
        nombre: 'Smartwatch 4',
        descripcion: 'Reloj inteligente con monitor de ritmo cardíaco y GPS.',
        precio: '$249.99',
        imagen: 'https://rlsolutions.com.mx/Admin/img/351268489.jpg',
    },
];

const Header = () => {
    return (
        <div className=" w-[90%] mx-auto md:w-full h-[600px] md:h-[400px] overflow-hidden bg-gradient-to-r from-[#016eee] to-[#002a81] rounded-lg my-6">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-full"
            >
                {productos.map((producto) => (
                    <SwiperSlide key={producto.id}>
                        <div className="flex flex-col md:flex-row items-center justify-around h-full">
                        <div className="md:hidden justify-center flex">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-[300px] h-[250px] object-contain"
                                />
                            </div>
                            <div className="grid md:place-items-center text-center md:text-left text-white">
                                <div className="max-w-md">
                                    <h1 className="text-4xl font-bold uppercase">{producto.nombre}</h1>
                                    <p className="mt-4">{producto.descripcion}</p>
                                    <button className="bg-[#007bff] text-white py-2 px-4 rounded mt-4 hover:bg-[#005cde] transition duration-300">
                                        Comprar {producto.precio}
                                    </button>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-full h-[300px] object-contain"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Header;