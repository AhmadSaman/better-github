'use client'
import RepositoryCard from './repository-card'
import { Repository } from '@/types/repository'
import ScrollToTop from '../scroll-to-top'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Skeleton } from '../ui/skeleton'
import { getRepositories } from '@/app/repositories/actions'

interface RepositoriesListProps {
    repositories: Repository[]
    search: string
    className?: string
}

export default function RepositoriesList({
    repositories,
    search,
    className = 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3',
}: RepositoriesListProps) {
    const { data, ref, hasMore } = useInfiniteScroll<Repository>({
        initialData: repositories,
        fetchFunction: async (page: number) => {
            const response = await getRepositories({ search, page })
            return response?.repos || []
        },
    })

    return (
        <section className="flex flex-col gap-1">
            {data.length > 0 ? (
                <div className={className}>
                    {data.map((repository, index) => (
                        <RepositoryCard key={index} repository={repository} />
                    ))}
                    {hasMore && <Skeleton ref={ref}></Skeleton>}
                </div>
            ) : (
                <div className="h-full">
                    <p className="text-center font-semibold">
                        No Public repositories found.
                    </p>
                </div>
            )}

            <ScrollToTop />
        </section>
    )
}
