import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

// Sample data for when API is not available
const sampleRaffles = [
  {
    _id: '1',
    title: 'Rifa iPhone 15 Pro',
    description: 'iPhone 15 Pro Max 256GB - Titânio Natural. Prêmio incrível para você!',
    prize: 'iPhone 15 Pro Max 256GB',
    prizeImage: '/images/sorteio2.png',
    totalNumbers: 200,
    soldNumbers: [1,2,3,4,5],
    reservedNumbers: [6,7,8],
    pricePerNumber: 25.00,
    drawDate: '2026-06-15'
  },
  {
    _id: '2',
    title: 'Rifa PlayStation 5',
    description: 'PS5 Slim + 2 Controles + 3 Jogos. Diversão garantida!',
    prize: 'PlayStation 5 Slim + Acessórios',
    prizeImage: '/images/sorteio.png',
    totalNumbers: 150,
    soldNumbers: [10,11,12],
    reservedNumbers: [],
    pricePerNumber: 30.00,
    drawDate: '2026-07-20'
  }
];

const calculateRaffleProgress = (raffle) => {
  const sold = raffle.soldNumbers?.length || 0;
  const reserved = raffle.reservedNumbers?.length || 0;
  const total = raffle.totalNumbers;
  const percentage = ((sold + reserved) / total) * 100;
  return { sold, reserved, percentage };
};

const RaffleCard = ({ raffle, onSelectRaffle }) => {
  const progress = calculateRaffleProgress(raffle);

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={() => onSelectRaffle(raffle)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectRaffle(raffle);
        }
      }}
      aria-label={`Ver detalhes da rifa: ${raffle.title}`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <div className="w-full sm:w-32 h-32 sm:h-32 flex-shrink-0">
          <img
            src={raffle.prizeImage || '/images/celebracao.png'}
            alt={raffle.prize}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{raffle.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{raffle.description}</p>

          {/* Prize */}
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-500">Prêmio:</span>
            <p className="text-sm font-medium text-gray-900">{raffle.prize}</p>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Vendidos: {progress.sold + progress.reserved}/{raffle.totalNumbers}</span>
              <span>{progress.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectRaffle(raffle);
              }}
              className="flex-1 btn btn-primary font-semibold"
            >
              Selecionar Números
            </button>
          </div>
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
      // Try to fetch from API, fallback to sample data
      try {
        const response = await apiService.getRaffles();
        setRaffles(response.data.raffles);
      } catch (apiError) {
        console.log('Using sample data - API not available');
        setRaffles(sampleRaffles);
      }
    } catch (err) {
      setError('Erro ao carregar rifas. Tente novamente mais tarde.');
      console.error('Error fetching raffles:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRaffleClick = (raffle) => {
    onRaffleSelect(raffle);
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
