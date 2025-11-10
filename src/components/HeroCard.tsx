import type { Hero } from '../types/index.ts';

type HeroCardProps = {
    hero: Hero;
    heroId: string;
    isSelected: boolean;
    onSelect: () => void;
};

export const HeroCard = ({ hero, isSelected, onSelect }: HeroCardProps) => {
    return (
        <div
            className={`bg-gray-800 border border-gray-700 rounded-md p-3 cursor-pointer hover:bg-gray-700 transition-all hover:shadow-lg hover:shadow-yellow-400/20
                 ${isSelected 
                    ? "bg-yellow-500 shadow-md scale-105" 
                    : "bg-gray-800 hover:bg-gray-700"}
            `}
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelect()}
        >
            <h3 className={`font-semibold text-lg ${isSelected ? "text-black" : "text-sw-yellow"}`}>{hero.name}</h3>
            <p className={`text-sm mt-1 ${isSelected ? "text-black" : "text-gray-400"}`}>Click to view details</p>
        </div>
    );
};
