import { useQuery } from '@tanstack/react-query';
import { getHeroDetails } from '../api/starwars';
import type { HeroDetails } from '../types';

export const useHeroDetails = (heroId: string) => {
    return useQuery<HeroDetails>({
        queryKey: ['heroDetails', heroId],
        queryFn: () => getHeroDetails(heroId),
    });
};
