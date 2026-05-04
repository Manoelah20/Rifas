import React, { useState, useEffect } from 'react';
import RaffleLogo from './RaffleLogo';

const PaymentWebhook = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    platform: '',
    url: '',
    secret: '',
    events: ['payment.completed', 'payment.failed'],
    active: true
  });

  const platforms = [
    { id: 'hotmart', name: 'Hotmart', color: 'bg-orange-500' },
    { id: 'mercadopago', name: 'Mercado Pago', color: 'bg-blue-500' },
    { id: 'pagseguro', name: 'PagSeguro', color: 'bg-green-500' },
    { id: 'paypal', name: 'PayPal', color: 'bg-blue-600' },
    { id: 'stripe', name: 'Stripe', color: 'bg-purple-500' },
    { id: 'pix', name: 'PIX', color: 'bg-teal-500' }
  ];

  const availableEvents = [
    { id: 'payment.completed', name: 'Pagamento Concluído', description: 'Disparado quando um pagamento é aprovado' },
    { id: 'payment.failed', name: 'Pagamento Falhou', description: 'Disparado quando um pagamento é rejeitado' },
    { id: 'payment.pending', name: 'Pagamento Pendente', description: 'Disparado quando um pagamento está em processamento' },
    { id: 'ticket.created', name: 'Bilhete Criado', description: 'Disparado quando um bilhete é reservado' },
    { id: 'ticket.paid', name: 'Bilhete Pago', description: 'Disparado quando um bilhete é pago' },
    { id: 'raffle.completed', name: 'Rifa Concluída', description: 'Disparado quando uma rifa é finalizada' }
  ];

  useEffect(() => {
    // Simulate loading webhooks
    setTimeout(() => {
      setWebhooks([
        {
          id: 1,
          name: 'Webhook Hotmart Principal',
          platform: 'hotmart',
          url: 'https://api.rifasorte.com/webhooks/hotmart',
          events: ['payment.completed', 'payment.failed'],
          active: true,
          lastTriggered: '2024-01-15T14:30:00Z',
          totalCalls: 1247,
          successRate: 98.5
        },
        {
          id: 2,
          name: 'Webhook PIX',
          platform: 'pix',
          url: 'https://api.rifasorte.com/webhooks/pix',
          events: ['payment.completed', 'ticket.paid'],
          active: true,
          lastTriggered: '2024-01-15T16:45:00Z',
          totalCalls: 892,
          successRate: 99.1
        },
        {
          id: 3,
          name: 'Webhook Mercado Pago',
          platform: 'mercadopago',
          url: 'https://api.rifasorte.com/webhooks/mercadopago',
          events: ['payment.completed', 'payment.failed', 'payment.pending'],
          active: false,
          lastTriggered: '2024-01-10T09:20:00Z',
          totalCalls: 456,
          successRate: 97.2
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateWebhook = () => {
    const webhook = {
      ...newWebhook,
      id: Date.now(),
      lastTriggered: null,
      totalCalls: 0,
      successRate: 0
    };
    setWebhooks([...webhooks, webhook]);
    setNewWebhook({
      name: '',
      platform: '',
      url: '',
      secret: '',
      events: ['payment.completed', 'payment.failed'],
      active: true
    });
    setShowCreateForm(false);
  };

  const handleToggleWebhook = (id) => {
    setWebhooks(webhooks.map(w => 
      w.id === id ? { ...w, active: !w.active } : w
    ));
  };

  const handleDeleteWebhook = (id) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  const handleEventToggle = (eventId) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(e => e !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const getPlatformInfo = (platformId) => {
    return platforms.find(p => p.id === platformId) || platforms[0];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando webhooks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <RaffleLogo size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Webhooks 💳
          </h2>
          <p className="text-gray-600">
            Configure webhooks para receber notificações em tempo real das plataformas de pagamento
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-primary-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Webhooks</p>
                <p className="text-2xl font-bold text-gray-900">{webhooks.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-success-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-success-600">
                  {webhooks.filter(w => w.active).length}
                </p>
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
                <p className="text-sm text-gray-600">Chamadas Hoje</p>
                <p className="text-2xl font-bold text-warning-600">1,247</p>
              </div>
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-accent-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa Sucesso</p>
                <p className="text-2xl font-bold text-accent-600">98.7%</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Create Webhook Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn btn-primary px-6 py-3 text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300 transform hover:scale-105"
          >
            <span className="mr-2">➕</span>
            Novo Webhook
          </button>
        </div>

        {/* Create Webhook Form */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Criar Novo Webhook</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Webhook
                </label>
                <input
                  type="text"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({...newWebhook, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="Webhook Hotmart Principal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plataforma
                </label>
                <select
                  value={newWebhook.platform}
                  onChange={(e) => setNewWebhook({...newWebhook, platform: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                >
                  <option value="">Selecione uma plataforma</option>
                  {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Webhook
                </label>
                <input
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook({...newWebhook, url: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="https://api.suaapp.com/webhooks/pagamento"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Segredo (Opcional)
                </label>
                <input
                  type="password"
                  value={newWebhook.secret}
                  onChange={(e) => setNewWebhook({...newWebhook, secret: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 bg-gray-50 focus:bg-white"
                  placeholder="chave-secreta-do-webhook"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Usado para verificar a autenticidade dos webhooks recebidos
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eventos
                </label>
                <div className="space-y-2">
                  {availableEvents.map(event => (
                    <label key={event.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event.id)}
                        onChange={() => handleEventToggle(event.id)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-700">{event.name}</span>
                        <p className="text-xs text-gray-500">{event.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateWebhook}
                className="px-6 py-2 border border-transparent rounded-lg text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
              >
                Criar Webhook
              </button>
            </div>
          </div>
        )}

        {/* Webhooks List */}
        <div className="space-y-4">
          {webhooks.map(webhook => {
            const platform = getPlatformInfo(webhook.platform);
            return (
              <div key={webhook.id} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 rounded-full ${platform.color} mr-3`}></div>
                      <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
                      <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                        webhook.active 
                          ? 'bg-success-100 text-success-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {webhook.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Plataforma</p>
                        <p className="font-medium text-gray-900">{platform.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">URL</p>
                        <p className="font-medium text-gray-900 text-sm truncate">{webhook.url}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Eventos</p>
                        <div className="flex flex-wrap gap-1">
                          {webhook.events.map(eventId => {
                            const event = availableEvents.find(e => e.id === eventId);
                            return (
                              <span key={eventId} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {event?.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Última Chamada</p>
                        <p className="font-medium text-gray-900">
                          {webhook.lastTriggered 
                            ? new Date(webhook.lastTriggered).toLocaleDateString('pt-BR')
                            : 'Nunca'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Chamadas</p>
                        <p className="font-medium text-gray-900">{webhook.totalCalls.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Taxa Sucesso</p>
                        <p className="font-medium text-gray-900">{webhook.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Segredo</p>
                        <p className="font-medium text-gray-900">
                          {webhook.secret ? 'Configurado' : 'Não configurado'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleToggleWebhook(webhook.id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        webhook.active
                          ? 'bg-warning-100 text-warning-800 hover:bg-warning-200'
                          : 'bg-success-100 text-success-800 hover:bg-success-200'
                      }`}
                    >
                      {webhook.active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button
                      onClick={() => handleDeleteWebhook(webhook.id)}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium hover:bg-red-200 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-primary-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Documentação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Formato do Payload</h4>
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`{
  "event": "payment.completed",
  "data": {
    "paymentId": "pay_123456",
    "raffleId": "raffle_789",
    "ticketNumber": 42,
    "amount": 50.00,
    "status": "paid",
    "timestamp": "2024-01-15T14:30:00Z"
  },
  "signature": "sha256=abc123..."
}`}
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Verificação de Assinatura</h4>
              <p className="text-sm text-gray-600 mb-2">
                Use o segredo do webhook para verificar a autenticidade:
              </p>
              <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto">
{`const crypto = require('crypto');
const signature = req.headers['x-webhook-signature'];
const payload = JSON.stringify(req.body);
const expectedSignature = crypto
  .createHmac('sha256', webhook.secret)
  .update(payload)
  .digest('hex');`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentWebhook;
