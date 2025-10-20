// src/hooks/useUser.js
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useApi } from './useApi';

export function useUser() {
  const { user } = useAuth();
  const { get } = useApi();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const data = await get('/api/user/profile');
      setUserData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const refetch = () => {
    loadUserData();
  };

  return {
    userData,
    loading,
    error,
    updateUserData,
    refetch,
  };
}