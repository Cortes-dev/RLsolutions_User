import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Images = () => {
    const imageGroups = [
        {
            title: "Tecnología de Vanguardia",
            description: "Descubre los últimos lanzamientos tecnológicos",
            images: [
                "https://via.placeholder.com/600x400?text=Tecnología+1",
                "https://via.placeholder.com/600x400?text=Tecnología+2"
            ],
            link: "/category/technology"
        },
        {
            title: "Hogar Inteligente",
            description: "Convierte tu hogar en un espacio inteligente",
            images: [
                "https://via.placeholder.com/600x400?text=Hogar+1",
                "https://via.placeholder.com/600x400?text=Hogar+2"
            ],
            link: "/category/home"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {imageGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{group.title}</h2>
                        <p className="text-lg text-gray-600">{group.description}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {group.images.map((image, imageIndex) => (
                            <motion.div
                                key={imageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 + imageIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group overflow-hidden rounded-xl shadow-lg"
                            >
                                <img
                                    src={image}
                                    alt={`${group.title} ${imageIndex + 1}`}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                                    <Link
                                        to={group.link}
                                        className="text-white text-xl font-bold group-hover:underline"
                                    >
                                        Ver colección →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Images;