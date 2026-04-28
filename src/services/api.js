// API service for handling raffle-related requests

const API_BASE_URL = '/api';

class ApiService {
  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Raffle methods
  async getRaffles() {
    return this.request('/raffles');
  }

  async getRaffleById(id) {
    return this.request(`/raffles/${id}`);
  }

  async createRaffle(raffleData) {
    return this.request('/raffles', {
      method: 'POST',
      body: JSON.stringify(raffleData),
    });
  }

  async buyTicket(raffleId, ticketData) {
    return this.request(`/raffles/${raffleId}/tickets`, {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  }

  async getUserTickets(userId) {
    return this.request(`/users/${userId}/tickets`);
  }
}

export default new ApiService();
