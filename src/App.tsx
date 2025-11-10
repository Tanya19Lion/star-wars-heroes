import { useState } from 'react';
import { HeroList } from './components/HeroList';
import { HeroDetails } from './components/HeroDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { HeroListFallback, HeroDetailsFallback } from './components/ErrorFallback';

const queryClient = new QueryClient();

const App = () => {
	const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);

	return (
		<QueryClientProvider client={queryClient}>
			 <div className="min-h-screen bg-black text-gray-100 flex flex-col items-center">
				{/* Sidebar */}
				{/* <aside className="md:w-80 w-full bg-sw-gray border-b md:border-b-0 md:border-r border-gray-800 flex flex-col"> */}
					<h1 className="text-sw-yellow text-3xl md:text-4xl font-bold text-center py-6 tracking-widest">
						Star Wars Explorer
					</h1>
					<ErrorBoundary FallbackComponent={HeroListFallback} onReset={() => window.location.reload()}>
						<HeroList onSelect={(id) => setSelectedHeroId(id)} selectedHeroId={selectedHeroId}/>
					</ErrorBoundary>
				{/* </aside> */}

				{/* Main panel */}
				<main className="w-full flex justify-center mt-6 px-4 relative">
					<ErrorBoundary FallbackComponent={HeroDetailsFallback} onReset={() => setSelectedHeroId(null)}>
						{selectedHeroId ? (
							<HeroDetails heroId={selectedHeroId} />
						) : (
							<div className="text-center text-gray-400">
								<p>Select a hero to explore their universe</p>
							</div>
						)}
						<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
					</ErrorBoundary>
				</main>
			</div>
		</QueryClientProvider>
	);
};

export default App;
