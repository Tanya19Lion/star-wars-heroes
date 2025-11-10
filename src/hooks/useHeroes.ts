import { useQuery } from '@tanstack/react-query';
import { getHeroesCount, getHeroes } from '../api/starwars';

export const useHeroesCount = () => {
    return useQuery({
        queryKey: ['heroes', 'count'],
        queryFn: getHeroesCount,
    });
};

export const useHeroes = (page: number) => {
    return useQuery({
        queryKey: ['heroes', page],
        queryFn: () => getHeroes(page),
        placeholderData: (prevData) => prevData,
    });
};
