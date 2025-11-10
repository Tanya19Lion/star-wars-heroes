import { api } from './client';
import type { Hero, HeroDetailsType, FilmSimplified, StarshipSimplified } from '../types/index.ts';

type HeroesResponse = {
    count: number;
    results: Hero[];
};

export const getHeroesCount = async (): Promise<number> => {
    const { data } = await api.get<HeroesResponse>('/people/');
    return data.count;
};

export const getHeroes = async (page = 1): Promise<Hero[]> => {
    const { data } = await api.get(`/people/?page=${page}`);
    return data.results;
};

export const getHeroDetails = async (id: number): Promise<HeroDetailsType> => {
    const { data } = await api.get(`/people/${id}`);
    return data;
};

export const getFilm = async (id: number): Promise<FilmSimplified> => {
    const { data } = await api.get(`/films/${id}/`);
    if (!data) throw new Error('Failed to fetch film ' + id);
    return data;
};

export const getStarship = async (id: number): Promise<StarshipSimplified> => {
    const { data } = await api.get(`/starships/${id}/`);
    if (!data) throw new Error('Failed to fetch starship ' + id);
    return data;
};