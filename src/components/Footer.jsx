import React from 'react';

import logo from '/image/RLsolutions - web 1.1.png';

const Footer = () => {
    return (
        <footer className="bg-[#002d83] text-white py-8 mt-16">
            <div className="container mx-auto px-4">
                {/* Logo de la empresa con la "R" en espejo */}
                <div className="flex justify-center items-center mb-6">
                    <img src={logo} alt="" className='w-[200px] bg-white p-1 rounded-sm' />
                    {/* <span className="text-4xl font-bold transform scale-x-[-1]">R</span>
                    <span className="text-4xl font-bold">Lsolutions</span> */}
                </div>

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* Correo */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Correo</h3>
                        <p className="text-gray-400">info@rlsolutions.com</p>
                    </div>

                    {/* Teléfono */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
                        <p className="text-gray-400">+52 (878) 108 1837</p>
                        <p className="text-gray-400">+52 (878) 187  2538</p>
                    </div>

                    {/* Ubicación */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Ubicación</h3>
                        <p className="text-gray-400">Calle Falsa 123, Ciudad, País</p>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} RLsolutions. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;