import { render, screen, fireEvent } from '@testing-library/react';
import { HeroCard } from '../components/HeroCard';
import type { Hero } from '../types';
import { describe, it, vi } from 'vitest';

describe('HeroCard', () => {
    const hero: Hero = {
        id: 1,
        name: 'Luke Skywalker',
        gender: 'male',
        birth_year: '19BBY',
        films: [],
        starships: [],
        url: "https://sw-api.starnavi.io/people/1/",
    };

    it('renders hero name and subtitle', () => {
        render(<HeroCard hero={hero} heroId={1} isSelected={false} onSelect={() => {}} />);
        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
        expect(screen.getByText('Click to view details')).toBeInTheDocument();
    });

    it('calls onSelect when clicked', () => {
        const handleSelect = vi.fn();
        render(<HeroCard hero={hero} heroId={1} isSelected={false} onSelect={handleSelect} />);

        fireEvent.click(screen.getByText('Luke Skywalker'));
        expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('calls onSelect when Enter key is pressed', () => {
        const handleSelect = vi.fn();
        render(<HeroCard hero={hero} heroId={1} isSelected={false} onSelect={handleSelect} />);

        screen.getByText('Luke Skywalker').focus();
        fireEvent.keyDown(screen.getByText('Luke Skywalker'), { key: 'Enter' });

        expect(handleSelect).toHaveBeenCalledTimes(1);
    });
});
