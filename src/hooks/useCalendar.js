import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getDoctors,
  updateAppointment,
  createAppointment,
  getRoomPatients,
  getPatientDetails,
  getDoctorPatients,
  deleteAppointment
} from '../api/general-calendar';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });
};

export const useRoomPatients = (room) => {
  return useQuery({
    queryKey: ['roomPatients', room],
    queryFn: () => getRoomPatients(room),
    enabled: !!room,
  });
};

export const usePatientDetails = (patientId) => {
  return useQuery({
    queryKey: ['patientDetails', patientId],
    queryFn: () => getPatientDetails(patientId),
    enabled: !!patientId,
  });
};

export const useDoctorPatients = (doctorId) => {
  return useQuery({
    queryKey: ['doctorPatients', doctorId],
    queryFn: () => getDoctorPatients(doctorId),
    enabled: !!doctorId,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['createAppointment'],
    mutationFn: createAppointment,
    onSuccess: () => {
      // Invalidate relevant queries after successful creation
      queryClient.invalidateQueries({ queryKey: ['roomPatients'] });
      queryClient.invalidateQueries({ queryKey: ['doctorPatients'] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['updateAppointment'],
    mutationFn: updateAppointment,
    onSuccess: () => {
      // Invalidate relevant queries after successful update
      queryClient.invalidateQueries({ queryKey: ['roomPatients'] });
      queryClient.invalidateQueries({ queryKey: ['doctorPatients'] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ['deleteAppointment'],
    mutationFn: deleteAppointment,
    onSuccess: () => {
      // Invalidate relevant queries after successful deletion
      queryClient.invalidateQueries({ queryKey: ['roomPatients'] });
      queryClient.invalidateQueries({ queryKey: ['doctorPatients'] });
    },
  });
};
