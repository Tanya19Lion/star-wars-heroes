import { useQuery } from '@tanstack/react-query';
import { getFilm } from '../api/starwars';

import type { FilmSimplified } from '../types/index.ts';

export const useFilms = (filmIds: number[]) => {
    return useQuery<FilmSimplified[]>({
        queryKey: ['films', filmIds],
        queryFn: async () => {
            const films = await Promise.all(filmIds.map(getFilm));
            return films;
        },
        enabled: filmIds.length > 0,
    });
};
