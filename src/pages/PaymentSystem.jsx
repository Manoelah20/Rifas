import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentSystem = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [pixKey, setPixKey] = useState('');

  const paymentMethods = [
    { id: 'pix', name: 'PIX', icon: '⚡', description: 'Pagamento instantâneo' },
    { id: 'credit', name: 'Cartão de Crédito', icon: '💳', description: 'Parcelado em até 12x' },
    { id: 'debit', name: 'Cartão de Débito', icon: '💳', description: 'Débito à vista' },
    { id: 'boleto', name: 'Boleto', icon: '📄', description: 'Vencimento em 3 dias' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Pagamento 💰</h1>
          <p className="text-gray-600">Escolha a forma de pagamento</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="space-y-4 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{method.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{method.name}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedMethod === 'pix' && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Configurar PIX</h3>
              <div>
                <label htmlFor="pixKey" className="block text-sm font-medium text-gray-700 mb-2">
                  Chave PIX
                </label>
                <input
                  type="text"
                  id="pixKey"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="CPF, CNPJ, Email ou Telefone"
                />
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              ⚠️ Esta é uma página de demonstração. Em produção, aqui seria integrado com um gateway de pagamento real.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              disabled={!selectedMethod}
              className="flex-1 btn btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Pagamento
            </button>
            <Link to="/raffle" className="btn btn-secondary py-3 px-6">
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSystem;
