import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12" role="contentinfo" aria-label="Rodapé">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">RifaSorte</h3>
            <p className="text-sm leading-relaxed">
              A plataforma mais segura para criar e participar de rifas online.
              Transparência e diversão garantidas.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/raffle" className="hover:text-white transition-colors">Rifas</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Entrar</Link>
              </li>
              <li>
                <Link to="/create-raffle" className="hover:text-white transition-colors">Criar Rifa</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 contato@rifasorte.com</li>
              <li>📱 (11) 99999-9999</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RifaSorte. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
