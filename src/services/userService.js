// src/services/userService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userService = {
  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  },

  async updateProfile(profileData) {
    const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  },

  async getJourneyProgress() {
    const response = await fetch(`${API_BASE_URL}/api/user/journey-progress`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch journey progress');
    }

    return await response.json();
  },

  async getRecentActivity(limit = 5) {
    const response = await fetch(`${API_BASE_URL}/api/user/recent-activity?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recent activity');
    }

    return await response.json();
  },

  async getUserStats() {
    const response = await fetch(`${API_BASE_URL}/api/user/stats`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }

    return await response.json();
  }
};