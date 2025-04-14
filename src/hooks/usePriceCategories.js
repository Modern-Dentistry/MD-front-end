import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  createPriceCategory,
  readPriceCategories,
  readPriceCategoryById,
  updatePriceCategory,
  updatePriceCategoryStatus,
  deletePriceCategory,
  searchPriceCategories,
  exportPriceCategoriesToExcel
} from '../api/price-categories';

export const usePriceCategories = (id = null) => {
  return useQuery({
    queryKey: ['priceCategories', id],
    queryFn: () => id ? readPriceCategoryById(id) : readPriceCategories(),
  });
};

export const useCreatePriceCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createPriceCategory'],
    mutationFn: createPriceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['priceCategories'] });
    },
  });
};

export const useUpdatePriceCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updatePriceCategory'],
    mutationFn: ({ id, data }) => updatePriceCategory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['priceCategories'] });
      queryClient.invalidateQueries({ queryKey: ['priceCategory', variables.id] });
    },
  });
};

export const useUpdatePriceCategoryStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updatePriceCategoryStatus'],
    mutationFn: ({ id, data }) => updatePriceCategoryStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['priceCategories'] });
      queryClient.invalidateQueries({ queryKey: ['priceCategory', variables.id] });
    },
  });
};

export const useDeletePriceCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['deletePriceCategory'],
    mutationFn: deletePriceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['priceCategories'] });
    },
  });
};

export const useSearchPriceCategories = (searchParams) => {
  return useQuery({
    queryKey: ['priceCategories', 'search', searchParams],
    queryFn: () => searchPriceCategories(searchParams),
    enabled: !!searchParams,
  });
};

export const useExportPriceCategories = () => {
  return useMutation({
    mutationKey: ['exportPriceCategories'],
    mutationFn: exportPriceCategoriesToExcel,
  });
};
