// src/views/auth/Login.jsx
import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/public/image/RLsolutions - web 1.1.png"
            alt="Logo RL Solutions"
            className="h-20 w-auto"
          />
        </div>

        {/* Título */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar sesión
        </h2>

        {/* Formulario */}
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Campo de correo electrónico */}
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>

            {/* Campo de contraseña */}
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="flex items-center justify-between">
            {/* Checkbox "Recuérdame" */}
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#007bff] focus:ring-[#007bff] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recuérdame
              </label>
            </div>

            {/* Enlace "¿Olvidaste tu contraseña?" */}
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#007bff] hover:text-[#005cde] transition duration-300"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Botón de inicio de sesión */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#007bff] hover:bg-[#005cde] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff]"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;