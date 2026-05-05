import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12" role="contentinfo" aria-label="Rodapé">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid ajustado para 4 colunas em telas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Coluna 1: Sobre */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">RifaSorte</h3>
            <p className="text-sm leading-relaxed">
              A plataforma mais segura para criar e participar de rifas online.
              Transparência e diversão garantidas.
            </p>
          </div>

          {/* Coluna 2: Links Úteis */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/raffle" className="hover:text-white transition-colors">Rifas</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Entrar</Link></li>
              <li><Link to="/legal/user-guide" className="hover:text-white transition-colors">Guia do Usuário</Link></li>
              <li><Link to="/create-raffle" className="hover:text-white transition-colors">Criar Rifa</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Institucional / Legal (Nova Coluna) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/terms-of-use" className="hover:text-white transition-colors">Termos de Uso</Link>
              </li>
              <li>
                <Link to="/legal/privacy-policy" className="hover:text-white transition-colors">Política de Privacidade</Link>
              </li>
              <li>
                <Link to="/legal/platform-rules" className="hover:text-white transition-colors">Regras da Plataforma</Link>
              </li>
              <li>
                <Link to="/legal/security-summary" className="hover:text-white transition-colors">Segurança</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 contato@rifasorte.com</li>
              <li>📱 (21) 99999-9999</li>
              <li>📍 Rio de Janeiro, RJ</li>
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
