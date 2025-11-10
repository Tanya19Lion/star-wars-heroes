import type { FallbackProps } from 'react-error-boundary';

type ErrorFallbackProps = {
	error: Error;
	resetErrorBoundary: () => void;
} & FallbackProps;

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
	return (
		<div className="p-6 bg-gray-900 text-yellow-500 rounded-md text-center">
			<h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
			<p className="mb-4">{error.message}</p>
			<button
				onClick={resetErrorBoundary}
				className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400"
			>
				Try Again
			</button>
		</div>
	);
};

export const HeroListFallback = ({error, resetErrorBoundary}: ErrorFallbackProps) => (
	<div className="p-4 text-center text-red-400">
		<p>Failed to load heroes.</p>
		<button onClick={resetErrorBoundary} className="mt-2 underline">Try again</button>
	</div>
);

export const HeroDetailsFallback = ({error, resetErrorBoundary}: ErrorFallbackProps) => (
	<div className="p-4 text-center text-red-400">
		<p>Failed to load hero details.</p>
		<button onClick={resetErrorBoundary} className="mt-2 underline">Select another hero</button>
	</div>
);