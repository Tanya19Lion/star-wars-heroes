import { useEffect, useState } from 'react';
import type { Node, Edge } from 'reactflow';
import { ReactFlow, MiniMap, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { useHeroDetails } from '../hooks/useHeroDetails';
import { useFilms } from '../hooks/useFilms';
import { useStarships } from '../hooks/useStarship';
import type { Hero } from '../types/index.ts';
import { HeroDetailsSkeleton } from './HeroDetailsSkeleton';

type HeroDetailsProps = {
    heroId: string;
    hero?: Hero;
};

export const HeroDetails = ({ heroId }: HeroDetailsProps) => {
    const { data: heroDetails, isLoading: loadingHero } = useHeroDetails(heroId);

    const filmIds = heroDetails?.films || [];
  	const { data: films, isLoading: loadingFilms } = useFilms(filmIds);

  	const starshipIds = heroDetails?.starships || [];
  	const { data: starships, isLoading: loadingStarships } = useStarships(starshipIds);

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

	const isVerticalLayout = window.innerWidth < 768;
    
	useEffect(() => {
		if (!heroDetails) return;

		const newNodes: Node[] = [];
		const newEdges: Edge[] = [];

		const createLabelStyle = (title: string, name: string, color: string) => (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
				<span style={{ color, fontWeight: 'bold', fontSize: 14, textShadow: '0 0 2px rgba(0,0,0,0.5)' }}>
					{title}
				</span>
				<span style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
					{name}
				</span>
			</div>
		);

		// Hero node in the center
		newNodes.push({
			id: `hero-${heroDetails.id}`,
			data: { label: createLabelStyle('The hero is:', heroDetails.name, '#ffe81f') },
			position: { x: 0, y: 0 },
			style: {
				background: '#111',
				color: '#ffe81f',
				border: '2px solid #ffe81f',
				borderRadius: 8,
				padding: 10,
				fontWeight: 'bold',
			},
		});

		// Arrange films in a horizontal row
		if (!films) return;

		const filmSpacingX = 200;
		const startFilmX = -((films.length - 1) * filmSpacingX) / 2;
		
		films.forEach((film, i) => {
			const filmId = `film-${film.id}`;

			const filmX = startFilmX + i * filmSpacingX;
			const filmY = 200;

			newNodes.push({
				id: filmId,
				data: { label: createLabelStyle('Film:', film.title, '#38bdf8') },
				position: { x: filmX, y: filmY },
				style: {
					background: '#222',
					color: '#38bdf8',
					border: '1px solid #38bdf8',
					borderRadius: 8,
					padding: 8,
				},
			});

			newEdges.push({
				id: `edge-hero-${filmId}`,
				source: `hero-${heroDetails.id}`,
				target: filmId,
				animated: true,
				style: { stroke: '#ffe81f', strokeWidth: 2 },
			});

			// Starships fan out below each film
			if (!starships) return;

			const starshipsInFilm = starships.filter(starship => starship.films.includes(film.id));

			const maxStarshipsPerRow = 5;
			const starshipSpacingX = 150;
			const startY = filmY + 200;
			
			starshipsInFilm.forEach((ship, j) => {
				const shipId = `starship-${ship.id}`;
				const row = Math.floor(j / maxStarshipsPerRow);
				const col = j % maxStarshipsPerRow;

				const shipX = filmX - ((Math.min(maxStarshipsPerRow, starshipsInFilm.length) - 1) * starshipSpacingX) / 2 + col * starshipSpacingX;
				const shipY = startY + row * 100;

				newNodes.push({
					id: shipId,
					data: { label: createLabelStyle('Starship:', ship.name, '#9ae6b4') },
					position: { x: shipX, y: shipY },
					style: {
						background: '#333',
						color: '#9ae6b4',
						borderRadius: 8,
						padding: 8,
					},					
				});

				newEdges.push({
					id: `edge-${filmId}-${shipId}`,
					source: filmId,
					target: shipId,
					animated: true,
					style: { stroke: '#38bdf8', strokeWidth: 2 },
				});
			});
		});

		setNodes(newNodes);
		setEdges(newEdges);
	}, [heroDetails, films, starships]);

	if (loadingHero || loadingFilms || loadingStarships)
		return <HeroDetailsSkeleton />;

	return (
		<div className="w-full h-[80vh] relative z-10 rounded border border-gray-700 overflow-hidden bg-[url('/stars-bg.jpg')] bg-cover bg-center">
			<ReactFlow nodes={nodes} edges={edges} fitView fitViewOptions={{ padding: 0.2 }}>
				<MiniMap
					nodeColor={() => '#ffe81f'}
					maskColor="rgba(0,0,0,0.3)"
				/>
				<Controls />
			</ReactFlow>
		</div>
	);
};
