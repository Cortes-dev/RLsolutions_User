import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react"; // Importa Iconify para los íconos
import { motion, AnimatePresence } from "framer-motion"; // Importa Framer Motion para animaciones

const Loader = () => {
    const [loading, setLoading] = useState(true);

    // Simula un tiempo de carga (puedes reemplazar esto con tu lógica real)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 9000); // 3 segundos de carga simulada
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-r from-[#0162eb] to-[#002a81]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {/* Logo */}
                        <div className="text-white text-6xl font-bold mb-4">
                            <span className="inline-block scale-x-[-1]">R</span>Lsolutions
                        </div>

                        {/* Spinner */}
                        <motion.div
                            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        ></motion.div>

                        {/* Texto de carga */}
                        <motion.p
                            className="text-white text-lg flex items-center justify-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Cargando <Icon icon="svg-spinners:3-dots-bounce" width="24" height="24" />
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;