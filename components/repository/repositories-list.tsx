'use client'
import RepositoryCard from './repository-card'
import { Repository } from '@/types/repository'
import ScrollToTop from '../scroll-to-top'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Skeleton } from '../ui/skeleton'

import { getRepositories } from '@/app/repositories/actions'
import {
    getUserRepositories,
    getUserStarredRepositories,
} from '@/app/users/[username]/actions'

type RepoType = 'user-starred' | 'user-public' | 'public'

interface RepositoriesListProps {
    repositories: Repository[]
    type?: RepoType
    className?: string
    params: { [key: string]: string }
}

export default function RepositoriesList({
    repositories,
    params,
    type = 'public',
    className = 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3',
}: RepositoriesListProps) {
    const { data, ref, hasMore } = useInfiniteScroll<Repository>({
        initialData: repositories,
        fetchFunction: async (page: number) => {
            if (type === 'public') {
                const response = await getRepositories({
                    search: params.search || '',
                    username: params.username,
                    min_stars: params.min_stars,
                    max_stars: params.max_stars,
                    languages: params.languages,
                    page,
                })
                return response?.repos || []
            }

            if (!params.username) {
                throw new Error('Username required for user repositories')
            }

            const getRepo =
                type === 'user-public'
                    ? getUserRepositories
                    : getUserStarredRepositories
            const response = await getRepo({
                username: params.username,
                page,
            })
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
