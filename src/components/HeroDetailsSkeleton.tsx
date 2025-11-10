import { Skeleton } from './Skeleton';

export const HeroDetailsSkeleton = () => {
    const filmCount = 3;
    const starshipsPerFilm = 2;

    return (
        <div className="w-full h-[80vh] relative z-10 rounded border border-gray-700 overflow-hidden bg-[url('/stars-bg.jpg')] bg-cover bg-center flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-20">
                {/* Hero node */}
                <Skeleton className="w-24 h-24" roundedFull />

                {/* Films */}
                <div className="flex justify-center gap-24">
                    {Array.from({ length: filmCount }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-10">
                            <Skeleton className="w-20 h-8" roundedFull={false} /> 

                            {/* Starships */}
                            <div className="flex gap-6 mt-4">
                                {Array.from({ length: starshipsPerFilm }).map((_, j) => (
                                    <Skeleton key={j} className="w-16 h-6" roundedFull={false} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
