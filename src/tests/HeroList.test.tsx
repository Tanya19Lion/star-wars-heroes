import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroList } from '../components/HeroList';
import type { Hero } from '../types';
import { useHeroes, useHeroesCount } from '../hooks/useHeroes';

// Mocked hero data
const heroes: Hero[] = [
    { id: 1, name: 'Luke Skywalker', gender: 'male', birth_year: '19BBY', films: [], starships: [], url: 'http://swapi.dev/api/people/1/' },
    { id: 2, name: 'C-3PO', gender: 'n/a', birth_year: '112BBY', films: [], starships: [], url: 'http://swapi.dev/api/people/2/' },
];

// Mock React Query hooks
vi.mock('../hooks/useHeroes', () => ({
    useHeroes: vi.fn(),
    useHeroesCount: vi.fn(),
}));

// Helper to render with React Query provider
const renderWithQuery = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('HeroList', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders a list of heroes', async () => {
        (useHeroes as any).mockReturnValue({ data: heroes, isLoading: false });
        (useHeroesCount as any).mockReturnValue({ data: heroes.length });

        renderWithQuery(<HeroList onSelect={() => {}} selectedHeroId={null} />);

        for (const hero of heroes) {
            expect(await screen.findByText(hero.name)).toBeInTheDocument();
        }
    });

    it('calls onSelect with heroId when a hero is clicked', async () => {
        const handleSelect = vi.fn();
        (useHeroes as any).mockReturnValue({ data: heroes, isLoading: false });
        (useHeroesCount as any).mockReturnValue({ data: heroes.length });

        renderWithQuery(<HeroList onSelect={handleSelect} selectedHeroId={null} />);

        const heroElement = await screen.findByText('Luke Skywalker');
        fireEvent.click(heroElement);

        expect(handleSelect).toHaveBeenCalledTimes(1);
        expect(handleSelect).toHaveBeenCalledWith('1');
    });

    it('disables Prev button on first page and enables Next', async () => {
        (useHeroes as any).mockReturnValue({ data: heroes, isLoading: false });
        (useHeroesCount as any).mockReturnValue({ data: 20 });

        renderWithQuery(<HeroList onSelect={() => {}} selectedHeroId={null} />);

        const prevButton = await screen.findByRole('button', { name: /Prev/i });
        const nextButton = await screen.findByRole('button', { name: /Next/i });

        expect(prevButton).toBeDisabled();
        expect(nextButton).not.toBeDisabled();
    });

    it('shows skeletons when loading', () => {
        (useHeroes as any).mockReturnValue({ isLoading: true });
        (useHeroesCount as any).mockReturnValue({ data: 0 });

        renderWithQuery(<HeroList onSelect={() => {}} selectedHeroId={null} />);
    });

    it('matches snapshot', async () => {
        (useHeroes as any).mockReturnValue({ data: heroes, isLoading: false });
        (useHeroesCount as any).mockReturnValue({ data: heroes.length });

        const { asFragment } = renderWithQuery(<HeroList onSelect={() => {}} selectedHeroId={null} />);
        await waitFor(() => screen.getByText('Luke Skywalker'));
        expect(asFragment()).toMatchSnapshot();
    });
});