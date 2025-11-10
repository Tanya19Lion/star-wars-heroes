import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HeroDetails } from '../components/HeroDetails';

// Mock React Flow (so we don’t load the whole graph engine)
vi.mock('reactflow', () => ({
    ReactFlow: ({ children }: any) => <div data-testid="react-flow">{children}</div>,
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

import { useHeroDetails } from '../hooks/useHeroDetails';
import { useFilms } from '../hooks/useFilms';
import { useStarships } from '../hooks/useStarship';

// Helper to render with React Query provider
const renderWithQuery = (ui: React.ReactElement) => {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('HeroDetails', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders React Flow with hero and related data', async () => {
        (useHeroDetails as any).mockReturnValue({
            data: { id: '1', name: 'Luke Skywalker', films: ['10'], starships: ['100'] },
            isLoading: false,
        });

        (useFilms as any).mockReturnValue({
            data: [{ id: '10', title: 'A New Hope' }],
            isLoading: false,
        });

        (useStarships as any).mockReturnValue({
            data: [{ id: '100', name: 'X-wing', films: ['10'] }],
            isLoading: false,
        });

        renderWithQuery(<HeroDetails heroId="1" />);

        // The React Flow container should appear
        expect(await screen.findByTestId('react-flow')).toBeInTheDocument();

        // Ensure that minimap and controls also render
        expect(screen.getByTestId('mini-map')).toBeInTheDocument();
        expect(screen.getByTestId('controls')).toBeInTheDocument();
    });

    it('renders correctly when hero has no films or starships', async () => {
        (useHeroDetails as any).mockReturnValue({
            data: { id: '2', name: 'Yoda', films: [], starships: [] },
            isLoading: false,
        });
        (useFilms as any).mockReturnValue({ data: [], isLoading: false });
        (useStarships as any).mockReturnValue({ data: [], isLoading: false });

        renderWithQuery(<HeroDetails heroId="2" />);

        expect(await screen.findByTestId('react-flow')).toBeInTheDocument();
    });
});
