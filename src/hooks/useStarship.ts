import { useQuery } from '@tanstack/react-query';
import { getStarship } from '../api/starwars';

import type { StarshipSimplified } from '../types/index.ts';

export const useStarships = (starshipIds: number[]) => {
    return useQuery<StarshipSimplified[]>({
        queryKey: ['starships', starshipIds],
        queryFn: () => Promise.all(starshipIds.map(getStarship)),
        enabled: starshipIds.length > 0,
    });
};
