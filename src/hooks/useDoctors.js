import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getDoctors
} from '../api/general-calendar';

export const useDoctors = () =>
{
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
  });
};

