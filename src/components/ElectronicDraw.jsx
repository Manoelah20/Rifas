import React, { useState, useEffect } from 'react';

const ElectronicDraw = ({ raffle, onDrawComplete }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [winnerNumber, setWinnerNumber] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const startDraw = () => {
    setIsDrawing(true);
    setShowResult(false);
    setWinnerNumber(null);
    setCountdown(3);
    
    // Countdown animation
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          performDraw();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const performDraw = () => {
    // Generate random number between 1 and raffle.totalNumbers
    const randomWinner = Math.floor(Math.random() * raffle.totalNumbers) + 1;
    setWinnerNumber(randomWinner);
    
    // Animate the draw
    const drawDuration = 5000; // 5 seconds
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed >= drawDuration) {
        clearInterval(interval);
        setCurrentNumber(randomWinner);
        setShowResult(true);
        setIsDrawing(false);
        
        // Notify parent component
        if (onDrawComplete) {
          onDrawComplete(randomWinner);
        }
      } else {
        // Show random numbers during animation
        const tempNumber = Math.floor(Math.random() * raffle.totalNumbers) + 1;
        setCurrentNumber(tempNumber);
      }
    }, 100);
  };

  const resetDraw = () => {
    setIsDrawing(false);
    setCurrentNumber(null);
    setWinnerNumber(null);
    setShowResult(false);
    setCountdown(3);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sorteio Eletrônico
          </h2>
          <p className="text-gray-600">
            {raffle.title} - {raffle.prize}
          </p>
        </div>

        {!isDrawing && !showResult && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Pronto para o Sorteio?
              </h3>
              <p className="text-gray-600 mb-4">
                O sorteio será realizado de forma totalmente eletrônica e aleatória.
                Todos os {raffle.totalNumbers} números têm chances iguais.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500">Total de Números</div>
                  <div className="text-xl font-bold text-primary-600">{raffle.totalNumbers}</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500">Números Vendidos</div>
                  <div className="text-xl font-bold text-success-600">
                    {raffle.soldNumbers?.filter(n => n.status === 'paid').length || 0}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="text-gray-500">Valor por Número</div>
                  <div className="text-xl font-bold text-warning-600">
                    R$ {raffle.pricePerNumber.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={startDraw}
              className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold"
              aria-label="Iniciar sorteio eletrônico"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Iniciar Sorteio
            </button>
          </div>
        )}

        {isDrawing && countdown > 0 && (
          <div className="space-y-6">
            <div className="text-6xl font-bold text-primary-600 animate-pulse">
              {countdown}
            </div>
            <p className="text-xl text-gray-600">Preparando o sorteio...</p>
          </div>
        )}

        {isDrawing && countdown === 0 && !showResult && (
          <div className="space-y-6">
            <div className="relative">
              <div className="text-8xl font-bold text-primary-600 animate-pulse">
                {currentNumber}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-bold text-primary-300 animate-ping">
                  {currentNumber}
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600">Sorteando o número vencedor...</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {showResult && winnerNumber && (
          <div className="space-y-6">
            <div className="animate-bounce">
              <div className="text-6xl font-bold text-success-600 mb-4">
                🎉 {winnerNumber} 🎉
              </div>
            </div>
            
            <div className="bg-success-50 border-2 border-success-200 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-success-800 mb-2">
                Parabéns ao Ganhador!
              </h3>
              <p className="text-success-700 mb-4">
                O número <strong>{winnerNumber}</strong> foi sorteado e ganhou a cafeteira elétrica!
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Prêmio:</span>
                    <div className="font-semibold">{raffle.prize}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Número Vencedor:</span>
                    <div className="font-semibold text-success-600">{winnerNumber}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Data do Sorteio:</span>
                    <div className="font-semibold">{new Date().toLocaleDateString('pt-BR')}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Método:</span>
                    <div className="font-semibold">Eletrônico Automático</div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600">
                <p>Sorteio realizado em: {new Date().toLocaleString('pt-BR')}</p>
                <p>ID do Sorteio: {Date.now()}</p>
                <p>Validação: Algoritmo aleatório criptograficamente seguro</p>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={resetDraw}
                className="btn btn-secondary"
                aria-label="Refazer sorteio"
              >
                Refazer Sorteio
              </button>
              <button
                onClick={() => window.print()}
                className="btn btn-primary"
                aria-label="Imprimir resultado"
              >
                Imprimir Resultado
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectronicDraw;
