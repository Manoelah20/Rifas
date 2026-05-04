import React, { useState, useEffect } from 'react';
import RaffleLogo from './RaffleLogo';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    platform: 'all',
    dateRange: '30days'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading transactions
    setTimeout(() => {
      setTransactions([
        {
          id: 'txn_001',
          paymentId: 'pay_hotmart_123456',
          raffleId: 'raffle_cafeteira_001',
          raffleTitle: 'Rifa de Cafeteira Elétrica',
          ticketNumber: 42,
          buyerName: 'João Silva',
          buyerEmail: 'joao@email.com',
          platform: 'hotmart',
          amount: 50.00,
          status: 'completed',
          paymentMethod: 'credit_card',
          createdAt: '2024-01-15T14:30:00Z',
          completedAt: '2024-01-15T14:32:00Z',
          webhookTriggered: true,
          webhookStatus: 'success'
        },
        {
          id: 'txn_002',
          paymentId: 'pay_pix_789012',
          raffleId: 'raffle_smartphone_002',
          raffleTitle: 'Rifa de Smartphone Galaxy S23',
          ticketNumber: 15,
          buyerName: 'Maria Santos',
          buyerEmail: 'maria@email.com',
          platform: 'pix',
          amount: 25.00,
          status: 'pending',
          paymentMethod: 'pix',
          createdAt: '2024-01-15T16:45:00Z',
          completedAt: null,
          webhookTriggered: false,
          webhookStatus: null
        },
        {
          id: 'txn_003',
          paymentId: 'pay_mp_345678',
          raffleId: 'raffle_notebook_003',
          raffleTitle: 'Rifa de Notebook Dell Inspiron',
          ticketNumber: 88,
          buyerName: 'Pedro Costa',
          buyerEmail: 'pedro@email.com',
          platform: 'mercadopago',
          amount: 100.00,
          status: 'failed',
          paymentMethod: 'bank_transfer',
          createdAt: '2024-01-14T10:20:00Z',
          completedAt: null,
          webhookTriggered: true,
          webhookStatus: 'failed'
        },
        {
          id: 'txn_004',
          paymentId: 'pay_stripe_901234',
          raffleId: 'raffle_gamer_004',
          raffleTitle: 'Rifa de Console PlayStation 5',
          ticketNumber: 23,
          buyerName: 'Ana Oliveira',
          buyerEmail: 'ana@email.com',
          platform: 'stripe',
          amount: 75.00,
          status: 'completed',
          paymentMethod: 'credit_card',
          createdAt: '2024-01-13T09:15:00Z',
          completedAt: '2024-01-13T09:18:00Z',
          webhookTriggered: true,
          webhookStatus: 'success'
        },
        {
          id: 'txn_005',
          paymentId: 'pay_pagseguro_567890',
          raffleId: 'raffle_tablet_005',
          raffleTitle: 'Rifa de Tablet iPad Pro',
          ticketNumber: 67,
          buyerName: 'Carlos Ferreira',
          buyerEmail: 'carlos@email.com',
          platform: 'pagseguro',
          amount: 80.00,
          status: 'completed',
          paymentMethod: 'boleto',
          createdAt: '2024-01-12T15:30:00Z',
          completedAt: '2024-01-12T18:45:00Z',
          webhookTriggered: true,
          webhookStatus: 'success'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-100 text-success-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      case 'failed': return 'bg-danger-100 text-danger-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'pending': return 'Pendente';
      case 'failed': return 'Falhou';
      default: return 'Desconhecido';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'hotmart': return 'bg-orange-100 text-orange-800';
      case 'pix': return 'bg-teal-100 text-teal-800';
      case 'mercadopago': return 'bg-blue-100 text-blue-800';
      case 'stripe': return 'bg-purple-100 text-purple-800';
      case 'pagseguro': return 'bg-green-100 text-green-800';
      case 'paypal': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWebhookStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-success-100 text-success-800';
      case 'failed': return 'bg-danger-100 text-danger-800';
      case 'pending': return 'bg-warning-100 text-warning-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.raffleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.paymentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status === 'all' || transaction.status === filters.status;
    const matchesPlatform = filters.platform === 'all' || transaction.platform === filters.platform;

    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = filteredTransactions.filter(t => t.status === 'completed');
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending');
  const failedTransactions = filteredTransactions.filter(t => t.status === 'failed');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando transações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <RaffleLogo size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Histórico de Transações 💰
          </h2>
          <p className="text-gray-600">
            Visualize e gerencie todas as transações de pagamento das rifas
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Transações</p>
                <p className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-success-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-success-600">{completedTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-warning-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-warning-600">{pendingTransactions.length}</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-accent-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-accent-600">
                  R$ {totalAmount.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por rifa, comprador, email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              >
                <option value="all">Todos</option>
                <option value="completed">Concluídos</option>
                <option value="pending">Pendentes</option>
                <option value="failed">Falharam</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plataforma</label>
              <select
                value={filters.platform}
                onChange={(e) => setFilters({...filters, platform: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              >
                <option value="all">Todas</option>
                <option value="hotmart">Hotmart</option>
                <option value="pix">PIX</option>
                <option value="mercadopago">Mercado Pago</option>
                <option value="stripe">Stripe</option>
                <option value="pagseguro">PagSeguro</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
              >
                <option value="7days">Últimos 7 dias</option>
                <option value="30days">Últimos 30 dias</option>
                <option value="90days">Últimos 90 dias</option>
                <option value="all">Todo período</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Transação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rifa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comprador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bilhete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plataforma
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Webhook
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.paymentId}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {transaction.raffleTitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.raffleId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {transaction.buyerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.buyerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        #{transaction.ticketNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlatformColor(transaction.platform)}`}>
                        {transaction.platform.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        R$ {transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                        {getStatusText(transaction.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.webhookTriggered ? (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getWebhookStatusColor(transaction.webhookStatus)}`}>
                          {transaction.webhookStatus === 'success' ? 'Sucesso' : transaction.webhookStatus === 'failed' ? 'Falha' : 'Pendente'}
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          Não disparado
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(transaction.createdAt).toLocaleDateString('pt-BR')}</div>
                      <div className="text-xs">
                        {new Date(transaction.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Options */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300">
            📊 Exportar CSV
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300">
            📄 Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
