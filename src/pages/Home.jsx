import React from 'react';
import { Link } from 'react-router-dom';
import RaffleLogo from '../components/RaffleLogo';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-primary-500 to-accent-500 text-white py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8 animate-float">
              <RaffleLogo size="lg" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in">
              Bem-vindo ao RifaSorte
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-95">
              Crie, gerencie e participe de rifas online com facilidade e segurança
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto px-2">
              <Link
                to="/raffle"
                className="btn btn-primary btn-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-accent-500 hover:bg-accent-600 transform hover:scale-105 transition-all duration-300 shadow-lg rounded-lg w-full xs:w-auto"
              >
                🎫 Ver Rifas
              </Link>
              <Link
                to="/create-raffle"
                className="btn btn-secondary btn-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-white text-primary-600 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg rounded-lg w-full xs:w-auto"
              >
                ✨ Criar Rifa
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12 md:mb-16 text-gray-900">
            Por que escolher RifaSorte?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Feature 1 */}
            <div className="card text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="mb-4 sm:mb-6">
                <img
                  src="/images/bilhete.png"
                  alt="Bilhete de Rifa"
                  className="feature-icon"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">Crie Rifas</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Configure rifas personalizadas com prêmios, números e preços definidos por você.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="mb-4 sm:mb-6">
                <img
                  src="/images/sorteio.png"
                  alt="Sorteio"
                  className="feature-icon"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">Sorteios Justos</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Sistema de sorteio transparente e aleatório garantindo resultados imparciais.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center p-6 sm:p-8 hover:shadow-lg transition-shadow">
              <div className="mb-4 sm:mb-6">
                <img
                  src="/images/vencedora.png"
                  alt="Vencedor Feliz"
                  className="feature-icon"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">Ganhadores</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Anuncie vencedores e celebrate os sucessos com toda a comunidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-100 via-primary-50 to-accent-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-white shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">🎉 Comece Agora!</h2>
                <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-95">
                  Participe de rifas emocionantes e tenha a chance de ganhar prêmios incríveis. 
                  Nossa plataforma oferece segurança, facilidade e diversão!
                </p>
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  <Link
                    to="/raffle"
                    className="btn bg-white text-primary-600 hover:bg-gray-50 font-semibold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors w-full xs:w-auto text-center"
                  >
                    Ver Rifas
                  </Link>
                  <Link
                    to="/login"
                    className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors w-full xs:w-auto text-center"
                  >
                    Entrar
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/celebracao.png"
                  alt="Celebração"
                  className="cta-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">1000+</div>
            <p className="text-sm sm:text-base text-gray-600">Rifas Criadas</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">50K+</div>
            <p className="text-sm sm:text-base text-gray-600">Participantes Ativos</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">2M+</div>
            <p className="text-sm sm:text-base text-gray-600">Em Prêmios</p>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-600 mb-2">100%</div>
            <p className="text-sm sm:text-base text-gray-600">Seguro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
