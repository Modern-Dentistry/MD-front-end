import { useQuery } from '@tanstack/react-query';
import { getRooms } from '../api/general-calendar';

export const useRooms = () => {
    return useQuery({
        queryKey: ['rooms'],
        queryFn: getRooms,
    });
};
