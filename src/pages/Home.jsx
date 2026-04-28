import React from 'react';
import { Link } from 'react-router-dom';
import RaffleLogo from '../components/RaffleLogo';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <RaffleLogo size="large" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bem-vindo ao
            <span className="block text-primary-600">App de Gerenciamento de Sorteio de Rifas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Crie, gerencie e participe de rifas de forma simples e segura.
            A melhor plataforma para organizar seus sorteios e premiar seus participantes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/raffle"
              className="btn btn-primary text-lg px-8 py-4"
            >
              Ver Rifas Disponíveis
            </Link>
            <Link
              to="/login"
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Entrar na Plataforma
            </Link>
          </div>
        </div>

        {/* Features Section with Images */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="card text-center">
            <div className="mb-4 sm:mb-6">
              <img
                src="/images/bilhete.png"
                alt="Bilhete de Rifa"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto object-contain rounded-lg"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Crie Rifas</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Crie rifas personalizadas com prêmios, números e preços definidos por você.
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-4 sm:mb-6">
              <img
                src="/images/sorteio.png"
                alt="Sorteio"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto object-contain rounded-lg"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Sorteios Justos</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Sistema de sorteio transparente e aleatório para garantir resultados justos.
            </p>
          </div>

          <div className="card text-center">
            <div className="mb-4 sm:mb-6">
              <img
                src="/images/vencedora.png"
                alt="Vencedor Feliz"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto object-contain rounded-lg"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Ganhadores</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Anuncie os vencedores e celebre os sucessos com toda a comunidade.
            </p>
          </div>
        </div>

        {/* Celebration Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-4 sm:p-6 lg:p-8 mb-16 text-white">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Celebre Cada Vitória!</h2>
              <p className="text-base sm:text-lg mb-6 opacity-90">
                Participe de rifas emocionantes e tenha a chance de ganhar prêmios incríveis.
                Nossa plataforma torna tudo mais divertido e seguro!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/raffle"
                  className="btn bg-white text-primary-600 hover:bg-gray-100 font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  Ver Rifas Ativas
                </Link>
                <Link
                  to="/login"
                  className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                >
                  Começar Agora
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/images/celebracao.png"
                alt="Celebração"
                className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Plataforma em Crescimento</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
              <div className="text-gray-600">Rifas Criadas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-600 mb-2">50K+</div>
              <div className="text-gray-600">Bilhetes Vendidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning-600 mb-2">500+</div>
              <div className="text-gray-600">Usuários Ativos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-danger-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
