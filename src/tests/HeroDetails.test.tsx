import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect, type MockedFunction } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { HeroDetails } from '../components/HeroDetails';
import { useHeroDetails } from '../hooks/useHeroDetails';
import { useFilms } from '../hooks/useFilms';
import { useStarships } from '../hooks/useStarship';
import type { HeroDetailsType, FilmSimplified, StarshipSimplified } from '../types/index.ts';

// Mock React Flow (so we don’t load the whole graph engine)
vi.mock('reactflow', () => ({
    ReactFlow: ({ children }: { children?: React.ReactNode }) => <div data-testid="react-flow">{children}</div>,
    MiniMap: () => <div data-testid="mini-map" />,
    Controls: () => <div data-testid="controls" />,
}));

// Mock data hooks
vi.mock('../hooks/useHeroDetails', () => ({
    useHeroDetails: vi.fn(),
}));
vi.mock('../hooks/useFilms', () => ({
    useFilms: vi.fn(),
}));
vi.mock('../hooks/useStarship', () => ({
    useStarships: vi.fn(),
}));

// Helper to render with React Query provider
const renderWithQuery = (ui: React.ReactElement) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

type useHeroDetailsMockReturn = UseQueryResult<HeroDetailsType, Error> & {
    data: HeroDetailsType;
    isLoading: boolean;
};
type useFilmsMockReturn = UseQueryResult<FilmSimplified[], Error> & {
    data: FilmSimplified[];
    isLoading: boolean;
};
type useStarshipsMockReturn = UseQueryResult<StarshipSimplified[], Error> & {
    data: StarshipSimplified[];
    isLoading: boolean;
};

describe('HeroDetails', () => {
    let mockedUseHeroDetails: MockedFunction<typeof useHeroDetails>;
    let mockedUseFilms: MockedFunction<typeof useFilms>;
    let mockedUseStarships: MockedFunction<typeof useStarships>;

    beforeEach(() => {
        vi.clearAllMocks();

        mockedUseHeroDetails = useHeroDetails as MockedFunction<typeof useHeroDetails>;
        mockedUseFilms = useFilms as MockedFunction<typeof useFilms>;
        mockedUseStarships = useStarships as MockedFunction<typeof useStarships>;
    });

    it('renders React Flow with hero and related data', async () => {
        mockedUseHeroDetails.mockReturnValue({
            data: { id: 1, name: 'Luke Skywalker', films: [10], starships: [100] },
            isLoading: false,
        } as useHeroDetailsMockReturn);

        mockedUseFilms.mockReturnValue({
            data: [{ id: 10, title: 'A New Hope' }],
            isLoading: false,
        } as useFilmsMockReturn);

        mockedUseStarships.mockReturnValue({
            data: [{ id: 100, name: 'X-wing', films: [10] }],
            isLoading: false,
        } as useStarshipsMockReturn);

        renderWithQuery(<HeroDetails heroId={1} />);

        // The React Flow container should appear
        expect(await screen.findByTestId('react-flow')).toBeInTheDocument();

        // Ensure that minimap and controls also render
        expect(screen.getByTestId('mini-map')).toBeInTheDocument();
        expect(screen.getByTestId('controls')).toBeInTheDocument();
    });

    it('renders correctly when hero has no films or starships', async () => {
        mockedUseHeroDetails.mockReturnValue({
            data: { id: 2, name: 'Yoda', films: [], starships: [] },
            isLoading: false,
            status: 'success',
            error: null,
        } as unknown as useHeroDetailsMockReturn);

        mockedUseFilms.mockReturnValue({ 
            data: [],
            isLoading: false,
            status: 'success',
            error: null,
        } as unknown as useFilmsMockReturn);

        mockedUseStarships.mockReturnValue({ 
            data: [],
            isLoading: false,
            status: 'success',
            error: null,
        } as unknown as useStarshipsMockReturn);

        renderWithQuery(<HeroDetails heroId={2} />);

        expect(await screen.findByTestId('react-flow')).toBeInTheDocument();
    });
});
