import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const CreateRaffle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prize: '',
    totalNumbers: 100,
    pricePerNumber: 10.00,
    drawDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.prize || !formData.drawDate) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);

    try {
      await apiService.createRaffle(formData);
      navigate('/raffle');
    } catch (err) {
      setError(err.message || 'Erro ao criar rifa');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Nova Rifa ✨</h1>
          <p className="text-gray-600">Configure sua rifa personalizada</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título da Rifa *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: Rifa iPhone 15"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Descreva os detalhes da rifa..."
              />
            </div>

            <div>
              <label htmlFor="prize" className="block text-sm font-medium text-gray-700 mb-2">
                Prêmio *
              </label>
              <input
                type="text"
                id="prize"
                name="prize"
                value={formData.prize}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Ex: iPhone 15 Pro Max"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="totalNumbers" className="block text-sm font-medium text-gray-700 mb-2">
                  Total de Números *
                </label>
                <input
                  type="number"
                  id="totalNumbers"
                  name="totalNumbers"
                  value={formData.totalNumbers}
                  onChange={handleChange}
                  required
                  min={10}
                  max={10000}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="pricePerNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Valor por Número (R$) *
                </label>
                <input
                  type="number"
                  id="pricePerNumber"
                  name="pricePerNumber"
                  value={formData.pricePerNumber}
                  onChange={handleChange}
                  required
                  min={0.01}
                  step={0.01}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="drawDate" className="block text-sm font-medium text-gray-700 mb-2">
                Data do Sorteio *
              </label>
              <input
                type="date"
                id="drawDate"
                name="drawDate"
                value={formData.drawDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 btn btn-primary py-3 text-lg font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Criando...' : 'Criar Rifa'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/raffle')}
                className="btn btn-secondary py-3 px-6"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffle;
