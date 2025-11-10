export type Hero = {
    id: number;
    name: string;
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    url: string;
    films: number[];
    starships: number[];
}

/** Full hero details for graph view */
export type HeroDetails = {
    id: number;
    name: string;
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    birth_year?: string;
    gender?: string;
    url: string;
    films: number[];
    starships: number[];
}

/** Simplified Film type (for graph node linking) */
export type FilmSimplified = {
    id: number;
    title: string;
    url: string;
    starships?: number[];
}

/** Simplified Starship type (for graph node linking) */
export type StarshipSimplified = {
    id: number;
    name: string;
    url: string;
    model?: string;
    films: number[];
}
