import React, { useState } from 'react';

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'border-red-500';
    if (password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      return 'border-green-500';
    }
    return 'border-green-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <img src="/publib/image/rlsolution.png" alt="Logo RL Solutions" className="h-20 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registro de usuarios
        </h2>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="full-name" className="sr-only">Nombre completo</label>
              <input id="full-name" name="full-name" type="text" autoComplete="name" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nombre completo" />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Correo electrónico" />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${getPasswordStrength(password)} placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm`}
                placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirmar contraseña</label>
              <input id="confirm-password" name="confirm-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${password && confirmPassword && password === confirmPassword ? 'border-green-500' : 'border-blue-500'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none sm:text-sm`}
                placeholder="Confirmar contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Registrarse
            </button>
          </div>
          <div className="text-sm text-center">
            <span className="text-gray-600">¿Ya tienes una cuenta? </span>
            <a href="/login" className="font-medium text-blue-500 hover:text-blue-700 transition duration-300">
              Iniciar sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
