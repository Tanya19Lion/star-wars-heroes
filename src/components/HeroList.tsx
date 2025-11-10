import { useState } from 'react';
import { useHeroes, useHeroesCount } from '../hooks/useHeroes';
import { HeroCard } from './HeroCard';
import { Skeleton } from './Skeleton';

type HeroListProps = {
    onSelect: (id: string) => void;
    selectedHeroId: string | null;
};

export const HeroList = ({ onSelect, selectedHeroId }: HeroListProps) => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useHeroes(page);
    const { data: total } = useHeroesCount();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-2 px-4 pb-4">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
        );
    }

    const getHeroId = (url: string) => url.split('/').filter(Boolean).pop()!;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 pb-4 w-full max-w-6xl">
                {data?.map(hero => {
                    const url = hero.url;
                    if (!url) return null;

                    const heroId = getHeroId(url);

                    return (
                        <HeroCard
                            key={url}
                            hero={hero}
                            heroId={heroId}
                            isSelected={selectedHeroId === heroId}
                            onSelect={() => onSelect(heroId)}
                        />
                    );
                })}
            </div>
            
            {/* Pagination */}
            <div className="w-full flex justify-center items-center gap-6 mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="bg-gray-700 text-sw-yellow px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-40"
                >
                    Prev
                </button>
                <button
                    disabled={data && total ? page >= Math.ceil(total / 10) : false}
                    onClick={() => setPage(p => p + 1)}
                    className="bg-gray-700 text-sw-yellow px-3 py-1 rounded hover:bg-gray-600 disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </div>        
    );
};

