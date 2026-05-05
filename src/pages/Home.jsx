import React from 'react';
import { Link } from 'react-router-dom';
import RaffleLogo from '../components/RaffleLogo';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <RaffleLogo size="lg" />
            </div>
            {/* Banner image for a professional look */}
            <div className="flex justify-center mb-6">
              <img src="/images/banner-professional.svg" alt="Banner profissional de rifas" style={{maxWidth:'100%', width:'720px'}} />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Bem-vindo ao RifaSorte
            </h1>
            <p className="text-xl sm:text-2xl mb-10 opacity-90 font-light">
              Crie, gerencie e participe de rifas online com facilidade e segurança
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link
                to="/raffle"
                className="btn btn-primary px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Ver Rifas
              </Link>
              <Link
                to="/create-raffle"
                className="btn bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Criar Rifa
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-900">
            Por que escolher o RifaSorte?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🎫',
                title: 'Crie Rifas',
                description: 'Configure rifas personalizadas com prêmios, números e preços definidos por você.'
              },
              {
                icon: '⚡',
                title: 'Sorteios Justos',
                description: 'Sistema de sorteio transparente e aleatório garantindo resultados imparciais.'
              },
              {
                icon: '🏆',
                title: 'Ganhadores',
                description: 'Anuncie vencedores e celebre os sucessos com toda a comunidade.'
              }
            ].map((feature, index) => (
              <div key={index} className="card text-center hover:border-blue-200">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { number: '1000+', label: 'Rifas Criadas' },
              { number: '50K+', label: 'Participantes' },
              { number: '2M+', label: 'Em Prêmios' },
              { number: '100%', label: 'Seguro' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-lg opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Comece Agora!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Participe de rifas emocionantes e tenha a chance de ganhar prêmios incríveis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/raffle" className="btn btn-primary px-8 py-3 text-lg font-semibold rounded-xl">
                  Ver Rifas
                </Link>
                <Link to="/login" className="btn btn-secondary px-8 py-3 text-lg font-semibold rounded-xl">
                  Entrar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
