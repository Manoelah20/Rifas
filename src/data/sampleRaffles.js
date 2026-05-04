// Sample raffle data for demonstration
export const sampleRaffles = [
  {
    id: 'example-coffee-maker',
    title: 'Rifa de Cafeteira Elétrica',
    description: 'Participe e concorra a uma cafeteira elétrica moderna! Sorteio eletrônico garantido. Perfeita para começar o dia com o melhor café!',
    prize: 'Cafeteira Elétrica Premium 110V - Cor Inox',
    prizeImage: '/images/celebracao.png',
    totalNumbers: 50,
    pricePerNumber: 5.00,
    status: 'active',
    drawDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    createdBy: {
      _id: 'demo-user',
      name: 'Maria Silva',
      email: 'maria.silva@email.com'
    },
    paymentPlatform: 'pix',
    pixKey: 'maria.silva@email.com',
    pixKeyType: 'email',
    paymentInstructions: 'Após o pagamento PIX, envie o comprovante para maria.silva@email.com com seu nome e números escolhidos. Os números serão confirmados em até 24h.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    soldNumbers: [
      { number: 5, userId: 'user1', status: 'paid', paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { number: 12, userId: 'user2', status: 'paid', paidAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
      { number: 18, userId: 'user3', status: 'reserved', reservedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { number: 23, userId: 'user4', status: 'paid', paidAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { number: 31, userId: 'user5', status: 'paid', paidAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { number: 37, userId: 'user6', status: 'reserved', reservedAt: new Date(Date.now() - 12 * 60 * 60 * 1000) },
      { number: 42, userId: 'user7', status: 'paid', paidAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
      { number: 48, userId: 'user8', status: 'reserved', reservedAt: new Date(Date.now() - 8 * 60 * 60 * 1000) }
    ],
    isActive: true,
    drawType: 'electronic',
    drawLocation: 'Online - Transmissão ao vivo'
  },
  {
    id: 'example-smartphone',
    title: 'Rifa de Smartphone',
    description: 'Concorra a um smartphone moderno! Câmera de alta resolução, bateria de longa duração e design elegante.',
    prize: 'Smartphone Galaxy Pro 128GB - Azul',
    prizeImage: '/images/vencedora.png',
    totalNumbers: 100,
    pricePerNumber: 10.00,
    status: 'active',
    drawDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    createdBy: {
      _id: 'demo-user-2',
      name: 'João Santos',
      email: 'joao.santos@email.com'
    },
    paymentPlatform: 'mercadopago',
    paymentLink: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=123456789',
    paymentInstructions: 'Clique no botão para ser redirecionado ao Mercado Pago. Após o pagamento, os números serão liberados automaticamente.',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    soldNumbers: [
      { number: 15, userId: 'user9', status: 'paid', paidAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
      { number: 28, userId: 'user10', status: 'paid', paidAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) },
      { number: 33, userId: 'user11', status: 'reserved', reservedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { number: 67, userId: 'user12', status: 'paid', paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { number: 89, userId: 'user13', status: 'paid', paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
    ],
    isActive: true,
    drawType: 'electronic',
    drawLocation: 'Online - YouTube Live'
  },
  {
    id: 'example-laptop',
    title: 'Rifa de Notebook',
    description: 'Notebook potente para trabalho ou estudos! Processador rápido, SSD e tela Full HD.',
    prize: 'Notebook Ultra Slim 15.6" Intel Core i5 - 8GB RAM - 256GB SSD',
    prizeImage: '/images/sorteio.png',
    totalNumbers: 200,
    pricePerNumber: 25.00,
    status: 'active',
    drawDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    createdBy: {
      _id: 'demo-user-3',
      name: 'Ana Costa',
      email: 'ana.costa@email.com'
    },
    paymentPlatform: 'hotmart',
    paymentLink: 'https://pay.hotmart.com/X123456',
    paymentInstructions: 'Acesso seguro via Hotmart. Após a confirmação do pagamento, você receberá um e-mail com os detalhes dos seus números.',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    soldNumbers: [
      { number: 45, userId: 'user14', status: 'paid', paidAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
      { number: 78, userId: 'user15', status: 'paid', paidAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
      { number: 123, userId: 'user16', status: 'reserved', reservedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { number: 156, userId: 'user17', status: 'paid', paidAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      { number: 189, userId: 'user18', status: 'paid', paidAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) }
    ],
    isActive: true,
    drawType: 'electronic',
    drawLocation: 'Online - Instagram Live'
  }
];

// Helper function to get raffle by ID
export const getRaffleById = (id) => {
  return sampleRaffles.find(raffle => raffle.id === id);
};

// Helper function to calculate raffle progress
export const calculateRaffleProgress = (raffle) => {
  const soldCount = raffle.soldNumbers.filter(ticket => ticket.status === 'paid').length;
  const reservedCount = raffle.soldNumbers.filter(ticket => ticket.status === 'reserved').length;
  const totalCount = soldCount + reservedCount;
  
  return {
    sold: soldCount,
    reserved: reservedCount,
    total: totalCount,
    percentage: (totalCount / raffle.totalNumbers) * 100,
    available: raffle.totalNumbers - totalCount
  };
};

// Helper function to get available numbers
export const getAvailableNumbers = (raffle) => {
  const soldNumbers = raffle.soldNumbers.map(ticket => ticket.number);
  return Array.from({ length: raffle.totalNumbers }, (_, i) => i + 1)
    .filter(number => !soldNumbers.includes(number));
};

// Helper function to check if number is available
export const isNumberAvailable = (raffle, number) => {
  return !raffle.soldNumbers.some(ticket => ticket.number === number);
};

// Helper function to get number status
export const getNumberStatus = (raffle, number, selectedNumbers = []) => {
  const soldTicket = raffle.soldNumbers.find(ticket => ticket.number === number);
  
  if (soldTicket) {
    return soldTicket.status === 'paid' ? 'paid' : 'reserved';
  }
  
  if (selectedNumbers.includes(number)) {
    return 'selected';
  }
  
  return 'available';
};
