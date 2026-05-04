import React from 'react';
import PixPayment from './PixPayment';

const PaymentRedirect = ({ raffle, selectedNumbers, onPaymentComplete }) => {
  const totalPrice = selectedNumbers.length * raffle.pricePerNumber;

  const handleExternalPayment = () => {
    // Abre link externo em nova aba
    window.open(raffle.paymentLink, '_blank');
  };

  const renderPaymentMethod = () => {
    switch (raffle.paymentPlatform) {
      case 'pix':
        return (
          <PixPayment
            raffle={raffle}
            selectedNumbers={selectedNumbers}
            onPaymentComplete={onPaymentComplete}
          />
        );
      
      case 'hotmart':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamento via Hotmart</h3>
              <p className="text-gray-600 text-sm">Compra segura através da Hotmart</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Resumo da Compra</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Números:</span>
                  <span className="font-medium">{selectedNumbers.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{selectedNumbers.length}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-lg text-primary-600">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">Como Funciona</h4>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>• Clique abaixo para acessar a Hotmart</p>
                    <p>• Complete a compra na plataforma Hotmart</p>
                    <p>• Receba confirmação por e-mail</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleExternalPayment}
              className="w-full btn btn-primary flex items-center justify-center"
              aria-label="Ir para Hotmart para pagamento"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Ir para Hotmart
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Pagamento processado pela Hotmart. O RifaSorte não se responsabiliza pelas transações.
              </p>
            </div>
          </div>
        );

      case 'mercadopago':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamento via Mercado Pago</h3>
              <p className="text-gray-600 text-sm">Múltiplas opções de pagamento</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Resumo da Compra</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Números:</span>
                  <span className="font-medium">{selectedNumbers.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{selectedNumbers.length}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-lg text-primary-600">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-green-800">Opções Disponíveis</h4>
                  <div className="mt-1 text-sm text-green-700">
                    <p>• Cartão de crédito (parcelamento)</p>
                    <p>• Débito online</p>
                    <p>• PIX</p>
                    <p>• Boleto bancário</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleExternalPayment}
              className="w-full btn btn-primary flex items-center justify-center"
              aria-label="Ir para Mercado Pago para pagamento"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Ir para Mercado Pago
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Pagamento processado pelo Mercado Pago. O RifaSorte não se responsabiliza pelas transações.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamento Externo</h3>
              <p className="text-gray-600 text-sm">Plataforma: {raffle.paymentPlatform}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Resumo da Compra</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Números:</span>
                  <span className="font-medium">{selectedNumbers.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantidade:</span>
                  <span className="font-medium">{selectedNumbers.length}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-lg text-primary-600">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {raffle.paymentInstructions && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Instruções</h4>
                <p className="text-sm text-blue-700 whitespace-pre-line">
                  {raffle.paymentInstructions}
                </p>
              </div>
            )}

            <button
              onClick={handleExternalPayment}
              className="w-full btn btn-primary flex items-center justify-center"
              aria-label={`Ir para ${raffle.paymentPlatform} para pagamento`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Ir para Pagamento
            </button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Pagamento processado externamente. O RifaSorte não se responsabiliza pelas transações.
              </p>
            </div>
          </div>
        );
    }
  };

  if (selectedNumbers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Selecione pelo menos um número para continuar.</p>
      </div>
    );
  }

  return (
    <div className="payment-redirect">
      {renderPaymentMethod()}
    </div>
  );
};

export default PaymentRedirect;
