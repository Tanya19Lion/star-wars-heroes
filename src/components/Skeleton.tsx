type SkeletonProps = {
  className?: string;
  roundedFull?: boolean;
};

export const Skeleton = ({ className = '', roundedFull = false }: SkeletonProps) => {
    return (
        <div className={`bg-gray-700 animate-pulse ${roundedFull ? 'rounded-full' : 'rounded'} ${className}`} />
    );
};
