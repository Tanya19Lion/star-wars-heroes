import { useQuery } from '@tanstack/react-query';
import { getHeroDetails } from '../api/starwars';
import type { HeroDetailsType } from '../types';

export const useHeroDetails = (heroId: number) => {
    return useQuery<HeroDetailsType>({
        queryKey: ['heroDetails', heroId],
        queryFn: () => getHeroDetails(heroId),
    });
};
