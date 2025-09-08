import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pinsApi } from '../api/pinsApi';
import toast from 'react-hot-toast';

export const pinKeys = {
  all: ['pins'] as const,
  lists: () => [...pinKeys.all, 'list'] as const,
  list: (filters: string) => [...pinKeys.lists(), { filters }] as const,
  details: () => [...pinKeys.all, 'detail'] as const,
  detail: (id: string) => [...pinKeys.details(), id] as const,
  user: () => [...pinKeys.all, 'user'] as const,
};

export const usePins = () => {
  return useQuery({
    queryKey: pinKeys.lists(),
    queryFn: pinsApi.getAllPins,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePin = (id: string) => {
  return useQuery({
    queryKey: pinKeys.detail(id),
    queryFn: () => pinsApi.getPinById(id),
    enabled: !!id,
  });
};

export const useUserPins = () => {
  return useQuery({
    queryKey: pinKeys.user(),
    queryFn: pinsApi.getUserPins,
  });
};

export const useCreatePin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pinsApi.createPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pinKeys.all });
      toast.success('Pin created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create pin:', error);
      toast.error('Failed to create pin');
    },
  });
};

export const useCreateMockPins = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: pinsApi.createMockPins,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pinKeys.all });
      toast.success(`Created mock pins!`);
    },
    onError: (error) => {
      console.error('Failed to create mock pins:', error);
      toast.error('Failed to create mock pins');
    },
  });
};
