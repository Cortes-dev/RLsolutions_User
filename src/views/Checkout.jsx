// src/views/Checkout.jsx
import React from 'react';

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Checkout - Finalizar compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumen del pedido */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Resumen del pedido
            </h2>

            {/* Lista de productos */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Producto"
                    className="h-12 w-12 rounded-md"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Nombre del producto
                    </p>
                    <p className="text-sm text-gray-500">Cantidad: 1</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">$50.00</p>
              </div>

              <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Producto"
                    className="h-12 w-12 rounded-md"
                  />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Nombre del producto
                    </p>
                    <p className="text-sm text-gray-500">Cantidad: 2</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">$100.00</p>
              </div>
            </div>

            {/* Totales */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">$150.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Envío</p>
                <p className="text-sm font-medium text-gray-900">$10.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Impuestos</p>
                <p className="text-sm font-medium text-gray-900">$15.00</p>
              </div>
              <div className="flex justify-between border-t pt-3">
                <p className="text-lg font-semibold text-gray-900">Total</p>
                <p className="text-lg font-semibold text-gray-900">$175.00</p>
              </div>
            </div>
          </div>

          {/* Información de envío y pago */}
          <div className="space-y-8">
            {/* Información de envío */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información de envío
              </h2>

              <form className="space-y-4">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                    placeholder="Nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                    placeholder="Dirección"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                      placeholder="Ciudad"
                    />
                  </div>

                  <div>
                    <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">
                      Código postal
                    </label>
                    <input
                      type="text"
                      id="zip-code"
                      name="zip-code"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                      placeholder="Código postal"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Método de pago */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Método de pago
              </h2>

              <form className="space-y-4">
                <div>
                  <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Fecha de expiración
                    </label>
                    <input
                      type="text"
                      id="expiration-date"
                      name="expiration-date"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                      placeholder="MM/AA"
                    />
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#007bff] focus:border-[#007bff] sm:text-sm"
                      placeholder="123"
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Botón de confirmación */}
            <button
              type="button"
              className="w-full bg-[#007bff] text-white py-2 px-6 rounded-lg hover:bg-[#005cde] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007bff]"
            >
              Confirmar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;