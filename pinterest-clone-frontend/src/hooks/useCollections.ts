import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collectionsApi } from '../api/collectionsApi';
import toast from 'react-hot-toast';

// Query keys
export const collectionKeys = {
  all: ['collections'] as const,
  lists: () => [...collectionKeys.all, 'list'] as const,
  list: (filters: string) => [...collectionKeys.lists(), { filters }] as const,
  details: () => [...collectionKeys.all, 'detail'] as const,
  detail: (id: number) => [...collectionKeys.details(), id] as const,
  user: () => [...collectionKeys.all, 'user'] as const,
  pins: (id: number) => [...collectionKeys.detail(id), 'pins'] as const,
};

export const useUserCollections = () => {
  return useQuery({
    queryKey: collectionKeys.user(),
    queryFn: collectionsApi.getUserCollections,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCollection = (id: number) => {
  return useQuery({
    queryKey: collectionKeys.detail(id),
    queryFn: () => collectionsApi.getCollectionById(id),
    enabled: !!id,
  });
};

export const useCollectionPins = (id: number) => {
  return useQuery({
    queryKey: collectionKeys.pins(id),
    queryFn: () => collectionsApi.getCollectionById(id).then(collection => collection.pins),
    enabled: !!id,
  });
};

// Mutations
export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: collectionsApi.createCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.user() });
      toast.success('Collection created successfully!');
    },
    onError: (error) => {
      console.error('Failed to create collection:', error);
      toast.error('Failed to create collection');
    },
  });
};

export const useAddPinToCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ collectionId, pinId }: { collectionId: number; pinId: number }) =>
      collectionsApi.addPinToCollection(collectionId, pinId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.detail(collectionId) });
      queryClient.invalidateQueries({ queryKey: collectionKeys.pins(collectionId) });
      toast.success('Pin added to collection!');
    },
    onError: (error) => {
      console.error('Failed to add pin to collection:', error);
      toast.error('Failed to add pin to collection');
    },
  });
};

export const useRemovePinFromCollection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ collectionId, pinId }: { collectionId: number; pinId: number }) =>
      collectionsApi.removePinFromCollection(collectionId, pinId),
    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries({ queryKey: collectionKeys.detail(collectionId) });
      queryClient.invalidateQueries({ queryKey: collectionKeys.pins(collectionId) });
      toast.success('Pin removed from collection!');
    },
    onError: (error) => {
      console.error('Failed to remove pin from collection:', error);
      toast.error('Failed to remove pin from collection');
    },
  });
};
