import React, { useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import { motion, AnimatePresence } from "framer-motion";

function BackgroundRemover() {
    const [inputImage, setInputImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setInputImage(URL.createObjectURL(file));
            setResultImage(null);
            setError(null);
        }
    };

    const handleRemoveBackground = async () => {
        if (!inputImage) return;

        setIsLoading(true);
        setError(null);
        try {
            const file = document.getElementById("upload").files[0];
            const blob = await removeBackground(file);
            const resultUrl = URL.createObjectURL(blob);
            setResultImage(resultUrl);
        } catch (error) {
            console.error("Error al eliminar el fondo:", error);
            setError("Error al procesar la imagen. Intenta con otra.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Eliminador de Fondos</h1>
                    <p className="text-gray-600">Sube una imagen y elimina el fondo al instante</p>
                </motion.div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 sm:p-8">
                    {/* Upload Area */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8 cursor-pointer"
                    >
                        <label htmlFor="upload" className="flex flex-col items-center">
                            <svg
                                className="w-12 h-12 text-blue-500 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <span className="text-lg font-medium text-gray-700 mb-2">
                                {inputImage ? "Imagen seleccionada" : "Haz clic para subir una imagen"}
                            </span>
                            <p className="text-sm text-gray-500 mb-4">
                                Formatos soportados: JPG, PNG, WEBP
                            </p>
                            <input
                                id="upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            {inputImage && (
                                <motion.span
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                                >
                                    ✓ Listo para procesar
                                </motion.span>
                            )}
                        </label>
                    </motion.div>

                    {/* Process Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRemoveBackground}
                        disabled={!inputImage || isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${!inputImage || isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Procesando...
                            </div>
                        ) : (
                            "Eliminar Fondo"
                        )}
                    </motion.button>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {inputImage && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                                >
                                    <div className="p-4 border-b border-gray-200 bg-white">
                                        <h3 className="font-medium text-gray-700">Imagen Original</h3>
                                    </div>
                                    <div className="p-4 flex justify-center">
                                        <motion.img
                                            src={inputImage}
                                            alt="Original"
                                            className="max-h-64 object-contain rounded"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {resultImage && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
                                >
                                    <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
                                        <h3 className="font-medium text-gray-700">Resultado</h3>
                                        <motion.a
                                            href={resultImage}
                                            download="imagen-sin-fondo.png"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Descargar
                                        </motion.a>
                                    </div>
                                    <div className="p-4 flex justify-center bg-gray-100">
                                        <motion.img
                                            src={resultImage}
                                            alt="Sin Fondo"
                                            className="max-h-64 object-contain"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-sm text-gray-500"
                >
                    <p>Powered by @imgly/background-removal</p>
                </motion.div>
            </div>
        </div>
    );
}

export default BackgroundRemover;