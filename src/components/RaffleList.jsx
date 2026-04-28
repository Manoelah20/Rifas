import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const RaffleCard = ({ raffle, onSelectRaffle }) => {
  const soldCount = raffle.soldNumbers?.length || 0;
  const availableCount = raffle.totalNumbers - soldCount;
  const progressPercentage = (soldCount / raffle.totalNumbers) * 100;

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        {raffle.prizeImage ? (
          <img 
            src={raffle.prizeImage} 
            alt={raffle.prize} 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-2xl sm:text-3xl">🎁</span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{raffle.title}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{raffle.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="ml-2 text-gray-900">{raffle.totalNumbers}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Valor:</span>
              <span className="ml-2 text-gray-900">R$ {raffle.pricePerNumber.toFixed(2)}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Disponíveis:</span>
              <span className="ml-2 text-success-600 font-semibold">{availableCount}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Sorteio:</span>
              <span className="ml-2 text-gray-900">{new Date(raffle.drawDate).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{availableCount} disponíveis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
            <span className="text-sm text-gray-600">{soldCount} vendidos</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-success-500 to-warning-500 h-3 rounded-full transition-all duration-300" 
            style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => onSelectRaffle(raffle)}
            className="flex-1 btn btn-primary font-semibold"
          >
            Selecionar Números
          </button>
          <button className="btn btn-secondary">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

const RaffleList = ({ onRaffleSelect }) => {
  const [raffles, setRaffles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRaffles();
  }, []);

  const fetchRaffles = async () => {
    try {
      setLoading(true);
      const response = await apiService.getRaffles();
      setRaffles(response.data.raffles || []);
    } catch (err) {
      setError('Erro ao carregar rifas');
      console.error('Error fetching raffles:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger-600 p-4">
        <p>{error}</p>
        <button onClick={fetchRaffles} className="mt-2 btn btn-primary">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (raffles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎲</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma rifa disponível</h3>
        <p className="text-gray-600">Volte em breve para novas rifas!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {raffles.map((raffle) => (
        <RaffleCard 
          key={raffle._id} 
          raffle={raffle} 
          onSelectRaffle={onRaffleSelect}
        />
      ))}
    </div>
  );
};

export default RaffleList;
