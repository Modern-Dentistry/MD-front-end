import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  readWorkers, 
  readWorkerStatus, 
  getWorkerInfo, 
  createWorker, 
  updateWorker, 
  searchWorkers, 
  deleteWorker 
} from '../api/add-worker';

export const useWorkers = () => {
  return useQuery({
    queryKey: ['workers'],
    queryFn: readWorkers,
  });
};

export const useWorkerStatus = () => {
  return useQuery({
    queryKey: ['workerStatus'],
    queryFn: readWorkerStatus,
  });
};

export const useWorker = (id) => {
  return useQuery({
    queryKey: ['worker', id],
    queryFn: () => getWorkerInfo(id),
    enabled: !!id,
  });
};

export const useCreateWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createWorker'],
    mutationFn: createWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
};

export const useUpdateWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updateWorker'],
    mutationFn: updateWorker,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      queryClient.invalidateQueries({ queryKey: ['worker', variables.id] });
    },
  });
};

export const useSearchWorkers = (searchParams) => {
  return useQuery({
    queryKey: ['workers', 'search', searchParams],
    queryFn: () => searchWorkers(searchParams),
    enabled: !!searchParams,
  });
};

export const useDeleteWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['deleteWorker'],
    mutationFn: deleteWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
};
