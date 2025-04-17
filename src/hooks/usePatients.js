import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  readPatients, 
  readPatientById, 
  createPatient, 
  updatePatient, 
  searchPatients, 
  deletePatient,
  exportPatientsToExcel 
} from '../api/patient';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: readPatients,
  });
};

export const usePatient = (id) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => readPatientById(id),
    enabled: !!id,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createPatient'],
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updatePatient'],
    mutationFn: updatePatient,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient', variables.id] });
    },
  });
};

export const useSearchPatients = (searchParams) => {
  return useQuery({
    queryKey: ['patients', 'search', searchParams],
    queryFn: () => searchPatients(searchParams),
    enabled: !!searchParams,
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['deletePatient'],
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export const useExportPatientsToExcel = () => {
  return useMutation({
    mutationKey: ['exportPatientsToExcel'],
    mutationFn: exportPatientsToExcel,
  });
};
