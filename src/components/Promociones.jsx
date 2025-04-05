import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { FiShoppingCart, FiHeart, FiShare2, FiClock, FiEye } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Promociones = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const navigate = useNavigate();

    // Cargar productos y favoritos al inicio
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('/Datos.json');
                const productosDestacados = response.data.slice(0, 5);

                // Cargar favoritos desde localStorage
                const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
                const productosConFavoritos = productosDestacados.map(producto => ({
                    ...producto,
                    favorito: favoritosGuardados.includes(producto.id)
                }));

                setProductos(productosConFavoritos);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar las promociones');
                setLoading(false);
                toast.error('No se pudieron cargar las promociones');
            }
        };

        fetchProductos();
    }, []);

    // Guardar favoritos en localStorage cuando cambian
    useEffect(() => {
        if (productos.length > 0) {
            const favoritos = productos.filter(p => p.favorito).map(p => p.id);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    }, [productos]);

    const toggleFavorito = (id) => {
        setProductos(productos.map(producto =>
            producto.id === id
                ? { ...producto, favorito: !producto.favorito }
                : producto
        ));

        toast.success(
            productos.find(p => p.id === id)?.favorito
                ? 'Producto removido de favoritos'
                : 'Producto añadido a favoritos'
        );
    };

    const agregarAlCarrito = (producto, e) => {
        e.stopPropagation(); // Evitar que se active el click del producto

        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        toast.success(`${producto.nombre} añadido al carrito`);
    };

    const verDetalleProducto = (id) => {
        navigate(`/product/${id}`);
    };

    const compartirProducto = (producto, e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: producto.nombre,
                text: producto.descripcion,
                url: `${window.location.origin}/product/${producto.id}`
            }).catch(() => {
                toast.info('Compartir cancelado');
            });
        } else {
            // Fallback para navegadores que no soportan Web Share API
            navigator.clipboard.writeText(`${window.location.origin}/product/${producto.id}`);
            toast.success('Enlace copiado al portapapeles');
        }
    };

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (error) {
        return <ErrorComponent error={error} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 py-12 rounded-lg"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Promociones Destacadas</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Descubre nuestras mejores ofertas y productos exclusivos con descuentos especiales
                    </p>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 }
                    }}
                    className="pb-12"
                >
                    {productos.map((producto) => (
                        <SwiperSlide key={producto.id}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col cursor-pointer"
                                onClick={() => verDetalleProducto(producto.id)}
                                onMouseEnter={() => setHoveredProduct(producto.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div className="relative">
                                    <img
                                        src={producto.imagen || 'https://via.placeholder.com/300'}
                                        alt={producto.nombre}
                                        className="w-full h-60 object-contain p-4 bg-gray-50"
                                    />

                                    <div className="absolute top-4 left-4 flex space-x-2">
                                        {producto.descuento && (
                                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {producto.descuento}% OFF
                                            </span>
                                        )}
                                        {producto.nuevo && (
                                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                NUEVO
                                            </span>
                                        )}
                                    </div>

                                    <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${hoveredProduct === producto.id ? 'opacity-100' : 'opacity-0'}`}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorito(producto.id);
                                            }}
                                            className={`p-2 rounded-full shadow ${producto.favorito ? 'bg-red-100 text-red-500' : 'bg-white text-gray-700'}`}
                                        >
                                            <FiHeart className={`${producto.favorito ? 'fill-current' : ''}`} />
                                        </button>
                                        <button
                                            onClick={(e) => compartirProducto(producto, e)}
                                            className="p-2 rounded-full bg-white shadow text-gray-700"
                                        >
                                            <FiShare2 />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                verDetalleProducto(producto.id);
                                            }}
                                            className="p-2 rounded-full bg-white shadow text-gray-700"
                                        >
                                            <FiEye />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{producto.nombre}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{producto.descripcion}</p>

                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <span className="text-xl font-bold text-blue-600">
                                                    ${(producto.precio * (1 - (producto.descuento || 0) / 100)).toFixed(2)}
                                                </span>
                                                {producto.descuento && (
                                                    <span className="text-sm text-gray-500 line-through ml-2">
                                                        ${producto.precio.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            {producto.stock && (
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <FiClock className="mr-1" />
                                                    {producto.stock > 10 ? 'Disponible' : `Últimas ${producto.stock} unidades`}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex space-x-2">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => agregarAlCarrito(producto, e)}
                                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center transition"
                                            >
                                                <FiShoppingCart className="mr-2" />
                                                Añadir
                                            </motion.button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    verDetalleProducto(producto.id);
                                                }}
                                                className="px-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center justify-center"
                                            >
                                                <FiEye />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/products')}
                        className="border-2 border-blue-600 text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-50 transition"
                    >
                        Ver todas las promociones
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

// Componentes auxiliares
const LoadingSkeleton = () => (
    <div className="bg-gray-100 py-12 rounded-lg">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Cargando promociones...</h2>
            <div className="flex justify-center">
                <div className="animate-pulse flex space-x-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg shadow w-72 h-96"></div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ErrorComponent = ({ error }) => (
    <div className="bg-gray-100 py-12 rounded-lg">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ocurrió un error</h2>
            <p className="text-red-500">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Reintentar
            </button>
        </div>
    </div>
);

export default Promociones;