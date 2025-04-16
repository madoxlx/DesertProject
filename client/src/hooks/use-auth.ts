import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
};

type AuthStatus = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
};

export function useAuth(): AuthStatus {
  const { data, isLoading, refetch } = useQuery<{isAuthenticated: boolean, user?: User}>({
    queryKey: ['/api/auth/status'],
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const logout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      // Force a refetch of the auth status
      refetch();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return {
    isAuthenticated: data?.isAuthenticated || false,
    user: data?.user || null,
    isLoading,
    logout
  };
}