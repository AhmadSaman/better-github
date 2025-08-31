import { Skeleton } from '../ui/skeleton'

interface RepositoriesListSkeletonProps {
    className?: string
}

export default function RepositoriesListSkeleton({
    className = 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
}: RepositoriesListSkeletonProps) {
    const skeletons = Array.from({ length: 100 })

    return (
        <div className={className}>
            {skeletons.map((_, index) => (
                <Skeleton key={index} className="h-[150px] w-full" />
            ))}
        </div>
    )
}
