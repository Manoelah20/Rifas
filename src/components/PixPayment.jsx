import React, { useState } from 'react';

const PixPayment = ({ raffle, selectedNumbers, onPaymentComplete }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  
  const totalPrice = selectedNumbers.length * raffle.pricePerNumber;
  const selectedNumbersText = selectedNumbers.join(', ');

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(raffle.pixKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 3000);
    } catch (err) {
      console.error('Erro ao copiar chave PIX:', err);
    }
  };

  const formatPixKey = (key, type) => {
    switch (type) {
      case 'cpf':
        return key.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      case 'cnpj':
        return key.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      case 'phone':
        return key.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      default:
        return key;
    }
  };

  const getPixKeyTypeLabel = (type) => {
    switch (type) {
      case 'cpf': return 'CPF';
      case 'cnpj': return 'CNPJ';
      case 'email': return 'E-mail';
      case 'phone': return 'Telefone';
      case 'random': return 'Chave Aleatória';
      default: return 'Chave PIX';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Pagamento via PIX</h3>
        <p className="text-gray-600 text-sm">Pague instantaneamente usando PIX</p>
      </div>

      {/* Resumo da Compra */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Resumo da Compra</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Números selecionados:</span>
            <span className="font-medium">{selectedNumbersText}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quantidade:</span>
            <span className="font-medium">{selectedNumbers.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor por número:</span>
            <span className="font-medium">R$ {raffle.pricePerNumber.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total:</span>
              <span className="font-bold text-lg text-primary-600">R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chave PIX */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Chave PIX</h4>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {getPixKeyTypeLabel(raffle.pixKeyType)}
            </span>
            <button
              onClick={copyPixKey}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
              aria-label="Copiar chave PIX"
            >
              {copiedKey ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <div className="bg-white rounded border border-gray-200 p-3">
            <code className="text-sm text-gray-900 break-all">
              {formatPixKey(raffle.pixKey, raffle.pixKeyType)}
            </code>
          </div>
        </div>
      </div>

      {/* Instruções */}
      {showInstructions && raffle.paymentInstructions && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">Instruções</h4>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
              aria-label="Ocultar instruções"
            >
              ✕
            </button>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm text-blue-800 whitespace-pre-line">
              {raffle.paymentInstructions}
            </p>
          </div>
        </div>
      )}

      {/* Aviso de Pagamento */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-yellow-800">Importante</h4>
            <div className="mt-1 text-sm text-yellow-700">
              <p>• Após o pagamento, envie o comprovante para o criador da rifa</p>
              <p>• Os números serão confirmados após validação do pagamento</p>
              <p>• O RifaSorte não processa pagamentos, apenas facilita o contato</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="space-y-3">
        <button
          onClick={copyPixKey}
          className="w-full btn btn-primary flex items-center justify-center"
          aria-label="Copiar chave PIX para pagamento"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
          {copiedKey ? 'Chave PIX Copiada!' : 'Copiar Chave PIX'}
        </button>
        
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full btn btn-secondary"
          aria-label={showInstructions ? 'Ocultar instruções' : 'Mostrar instruções'}
        >
          {showInstructions ? 'Ocultar Instruções' : 'Mostrar Instruções'}
        </button>
      </div>

      {/* Termos e Condições */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Ao realizar o pagamento, você concorda com os termos da rifa.
          O RifaSorte não se responsabiliza por transações financeiras.
        </p>
      </div>
    </div>
  );
};

export default PixPayment;
