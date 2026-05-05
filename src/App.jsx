import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Raffle from './pages/Raffle';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRaffle from './pages/CreateRaffle';
import PaymentSystem from './pages/PaymentSystem';
import LegalPage from './pages/LegalPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex flex-col">
        {/* Skip to main content link for screen readers */}
        <a href="#main-content" className="skip-link">
          Pular para o conteúdo principal
        </a>

        <Navbar />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/raffle" element={<Raffle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-raffle" element={<CreateRaffle />} />
            <Route path="/payment-system" element={<PaymentSystem />} />
            <Route path="/legal/:fileName" element={<LegalPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
