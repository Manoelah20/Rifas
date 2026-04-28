import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const NumberGrid = ({ raffleId, totalNumbers = 100, onNumbersChange }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [soldNumbers, setSoldNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (raffleId && raffleId !== 'example-id') {
      fetchSoldNumbers();
    }
  }, [raffleId]);

  const fetchSoldNumbers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getRaffleById(raffleId);
      const tickets = response.data.raffle.soldNumbers || [];
      setSoldNumbers(tickets);
    } catch (err) {
      setError('Erro ao carregar números vendidos');
      console.error('Error fetching sold numbers:', err);
    } finally {
      setLoading(false);
    }
  };

  const getNumberStatus = (number) => {
    const soldTicket = soldNumbers.find(ticket => ticket.number === number);

    if (soldTicket) {
      return soldTicket.status === 'paid' ? 'paid' : 'reserved';
    }

    if (selectedNumbers.includes(number)) {
      return 'selected';
    }

    return 'available';
  };

  const getNumberClassName = (status) => {
    const baseClass = 'number-cell';

    switch (status) {
      case 'available':
        return `${baseClass} number-available`;
      case 'selected':
        return `${baseClass} number-selected`;
      case 'reserved':
        return `${baseClass} number-reserved`;
      case 'paid':
        return `${baseClass} number-paid`;
      default:
        return `${baseClass} number-available`;
    }
  };

  const handleNumberClick = (number) => {
    const status = getNumberStatus(number);

    if (status === 'available') {
      const newSelectedNumbers = [...selectedNumbers, number];
      setSelectedNumbers(newSelectedNumbers);
      onNumbersChange(newSelectedNumbers);
    } else if (status === 'selected') {
      const newSelectedNumbers = selectedNumbers.filter(n => n !== number);
      setSelectedNumbers(newSelectedNumbers);
      onNumbersChange(newSelectedNumbers);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Disponível';
      case 'selected':
        return 'Selecionado';
      case 'reserved':
        return 'Reservado';
      case 'paid':
        return 'Vendido';
      default:
        return 'Disponível';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-gray-100 text-gray-800';
      case 'selected':
        return 'bg-primary-100 text-primary-800';
      case 'reserved':
        return 'bg-warning-100 text-warning-800';
      case 'paid':
        return 'bg-success-100 text-success-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
        <button
          onClick={fetchSoldNumbers}
          className="mt-2 btn btn-primary"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Selecione os Números</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
            <span className="text-sm text-gray-600">Disponível</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary-600 rounded"></div>
            <span className="text-sm text-gray-600">Selecionado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-warning-100 border border-warning-400 rounded"></div>
            <span className="text-sm text-gray-600">Reservado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-success-100 border border-success-400 rounded"></div>
            <span className="text-sm text-gray-600">Vendido</span>
          </div>
        </div>

        {selectedNumbers.length > 0 && (
          <div className={`p-3 rounded-lg ${getStatusColor('selected')}`}>
            <p className="font-medium">
              {selectedNumbers.length} número(s) selecionado(s): {selectedNumbers.sort((a, b) => a - b).join(', ')}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-20 gap-2">
        {Array.from({ length: totalNumbers }, (_, i) => i + 1).map((number) => {
          const status = getNumberStatus(number);
          return (
            <button
              key={number}
              onClick={() => handleNumberClick(number)}
              className={getNumberClassName(status)}
              disabled={status === 'reserved' || status === 'paid'}
              title={`Número ${number} - ${getStatusText(status)}`}
            >
              {number}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Total: {totalNumbers} números |
          Disponíveis: {totalNumbers - soldNumbers.length - selectedNumbers.length} |
          Selecionados: {selectedNumbers.length}
        </div>
        {selectedNumbers.length > 0 && (
          <button
            onClick={() => {
              setSelectedNumbers([]);
              onNumbersChange([]);
            }}
            className="btn btn-secondary"
          >
            Limpar Seleção
          </button>
        )}
      </div>
    </div>
  );
};

export default NumberGrid;
