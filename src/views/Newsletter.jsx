import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para suscribir al usuario
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                <Icon icon="mdi:email-newsletter" className="text-5xl mx-auto mb-6 text-white opacity-90" />
                <h2 className="text-3xl font-bold text-white mb-4">Suscríbete a nuestro boletín</h2>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                    Recibe ofertas exclusivas, novedades de productos y consejos directamente en tu bandeja de entrada.
                </p>

                {subscribed ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    >
                        <strong className="font-bold">¡Gracias por suscribirte!</strong>
                        <span className="block sm:inline"> Pronto recibirás nuestras mejores ofertas.</span>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo electrónico"
                            required
                            className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <Icon icon="mdi:send" />
                            Suscribirse
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default Newsletter;