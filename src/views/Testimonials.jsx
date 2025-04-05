import React from "react";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';

const testimonials = [
    {
        id: 1,
        name: "María González",
        role: "CEO, TechSolutions",
        content: "Los productos son excelentes y el servicio al cliente es increíble. Siempre encuentro lo que necesito aquí.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 2,
        name: "Carlos Martínez",
        role: "Diseñador UX",
        content: "La calidad supera mis expectativas cada vez. Mi tienda favorita para equipos tecnológicos.",
        rating: 4,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        name: "Ana Rodríguez",
        role: "Desarrolladora Full Stack",
        content: "Entrega rápida y productos genuinos. He comprado varias veces y nunca me han decepcionado.",
        rating: 5,
        avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
];

const Testimonials = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Miles de clientes satisfechos confían en nuestros productos
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-xl shadow-md"
                    >
                        <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Icon
                                    key={i}
                                    icon="mdi:star"
                                    className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                        <div className="flex items-center">
                            <img
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-gray-600 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;