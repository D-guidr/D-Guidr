// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token && { Authorization: `Bearer ${user.token}` }),
          ...options.headers,
        },
        ...options,
      };

      if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, config);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const get = useCallback((url, options = {}) => 
    request(url, { ...options, method: 'GET' }), [request]);

  const post = useCallback((url, data, options = {}) => 
    request(url, { ...options, method: 'POST', body: data }), [request]);

  const put = useCallback((url, data, options = {}) => 
    request(url, { ...options, method: 'PUT', body: data }), [request]);

  const del = useCallback((url, options = {}) => 
    request(url, { ...options, method: 'DELETE' }), [request]);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
  };
}