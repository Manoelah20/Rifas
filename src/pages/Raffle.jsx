import React, { useState } from 'react';
import RaffleList from '../components/RaffleList';
import NumberGrid from '../components/NumberGrid';
import apiService from '../services/api';
import { useNotification } from '../context/NotificationContext';

const Raffle = () => {
  const [selectedRaffle, setSelectedRaffle] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const { addNotification } = useNotification();

  const handleNumbersChange = (numbers) => {
    setSelectedNumbers(numbers);
  };

  const handleRaffleSelect = (raffle) => {
    setSelectedRaffle(raffle);
    setSelectedNumbers([]);
  };

  const handleBackToList = () => {
    setSelectedRaffle(null);
    setSelectedNumbers([]);
  };

  const handlePurchase = async () => {
    if (!selectedRaffle || selectedNumbers.length === 0) return;

    try {
      await apiService.buyTicket(selectedRaffle._id, { numbers: selectedNumbers });
      addNotification('Compra realizada com sucesso!', 'success');
      setSelectedNumbers([]);
    } catch (error) {
      addNotification('Erro ao realizar compra: ' + error.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <img
              src="/images/sorteio2.png"
              alt="Sorteio de Rifa"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Rifas Disponíveis</h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Participe das nossas rifas ativas e concorra a prêmios incríveis!
            Selecione seus números e tenha a chance de ser o grande vencedor.
          </p>
        </div>

        {/* Main Content */}
        {!selectedRaffle ? (
          <RaffleList onRaffleSelect={handleRaffleSelect} />
        ) : (
          <div>
            {/* Back Button */}
            <button
              onClick={handleBackToList}
              className="mb-6 btn btn-secondary flex items-center space-x-2"
            >
              <span>←</span>
              <span>Voltar para Rifas</span>
            </button>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Raffle Details Section */}
              <div className="space-y-4 sm:space-y-6">
                <div className="card">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                    {selectedRaffle.prizeImage ? (
                      <img
                        src={selectedRaffle.prizeImage}
                        alt={selectedRaffle.prize}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl sm:text-3xl">🎁</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{selectedRaffle.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">{selectedRaffle.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Total:</span>
                          <span className="ml-2 text-gray-900">{selectedRaffle.totalNumbers}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Valor:</span>
                          <span className="ml-2 text-gray-900">R$ {selectedRaffle.pricePerNumber.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Sorteio:</span>
                          <span className="ml-2 text-gray-900">{new Date(selectedRaffle.drawDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <img
                      src="/images/ticket-professional.svg"
                      alt="Bilhete"
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
                    />
                    <div className="text-center sm:text-left">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Como Participar</h3>
                      <p className="text-sm sm:text-base text-gray-600">
                        1. Escolha uma rifa ativa<br />
                        2. Selecione seus números<br />
                        3. Confirme sua compra<br />
                        4. Aguarde o sorteio!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Number Grid Section */}
              <div>
                <NumberGrid
                   raffleId={selectedRaffle._id}
                   totalNumbers={selectedRaffle.totalNumbers}
                   pricePerNumber={selectedRaffle.pricePerNumber}
                   onNumbersChange={handleNumbersChange}
                 />

                {/* Purchase Section */}
                {selectedNumbers.length > 0 && (
                  <div className="mt-6 card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
                    <h3 className="text-lg font-semibold text-primary-900 mb-4">
                      Resumo da Compra
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-primary-900">
                        <span>Números selecionados:</span>
                        <span className="font-semibold">{selectedNumbers.length}</span>
                      </div>
                      <div className="flex justify-between text-primary-900">
                        <span>Valor por número:</span>
                        <span className="font-semibold">R$ {selectedRaffle.pricePerNumber.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-primary-900 text-lg font-bold border-t border-primary-200 pt-3">
                        <span>Total:</span>
                        <span>R$ {(selectedNumbers.length * selectedRaffle.pricePerNumber).toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={handlePurchase}
                      className="w-full mt-6 btn btn-primary text-lg font-semibold"
                    >
                      Confirmar Compra
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Winner Celebration */}
        <div className="mt-16 bg-gradient-to-r from-success-50 to-success-100 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-success-900 mb-4">Últimos Ganhadores!</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
                  <img
                    src="/images/vencedora.png"
                    alt="Vencedor"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Maria Silva</p>
                    <p className="text-sm text-gray-600">Ganhou iPhone 15 - Rifa #123</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 flex items-center space-x-4">
                  <img
                    src="/images/vencedora.png"
                    alt="Vencedor"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">João Santos</p>
                    <p className="text-sm text-gray-600">Ganhou PlayStation 5 - Rifa #122</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/celebracao2.png"
                alt="Celebração de Vitória"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Raffle;
