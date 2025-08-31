import RepositoriesList from '@/components/repository/repositories-list'
import { Warehouse } from 'lucide-react'
import { Suspense } from 'react'
import RepositoriesListSkeleton from '@/components/repository/repositories-list-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import SearchFilter from '@/components/search-filter'
import { getRepositories } from './actions'
import RepositoryAdvancedFilters from '@/components/repository/repository-advanced-filters'

export default async function Page({
    searchParams,
}: {
    searchParams: {
        search?: string
        username?: string
        min_stars?: string
        max_stars?: string
        languages?: string
    }
}) {
    const { search, username, min_stars, max_stars, languages } =
        await searchParams

    return (
        <div className="container m-4 mx-auto flex flex-col gap-6 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Warehouse size={24} />
                    <h1 className="text-2xl font-bold">Repositories</h1>
                </div>
                <SearchFilter>
                    <RepositoryAdvancedFilters />
                </SearchFilter>
            </div>
            {search ? (
                <Suspense
                    key={`${search}-${username || ''}-${min_stars || ''}-${max_stars || ''}-${languages || ''}`}
                    fallback={
                        <section className="flex flex-col gap-1">
                            <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                                <Warehouse size={14} />
                                <Skeleton className="h-2.5 w-10" />
                            </div>
                            <RepositoriesListSkeleton className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" />
                        </section>
                    }
                >
                    <RepositoriesListContent
                        search={search}
                        username={username}
                        min_stars={min_stars}
                        max_stars={max_stars}
                        languages={languages}
                    />
                </Suspense>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <Warehouse size={64} className="text-gray-300" />
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No search criteria
                        </h2>
                        <p className="max-w-md text-gray-500">
                            Use the search bar above to find repositories.
                        </p>
                    </div>
                </div>
            )}{' '}
        </div>
    )
}

async function RepositoriesListContent({
    search,
    username,
    min_stars,
    max_stars,
    languages,
}: {
    search: string
    username?: string
    min_stars?: string
    max_stars?: string
    languages?: string
}) {
    const repositoriesData = await getRepositories({
        search,
        username,
        min_stars,
        max_stars,
        languages,
    })

    if (!repositoriesData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-2xl font-bold">Repositories</h1>
                <p className="text-muted-foreground">
                    Failed to load repositories.
                </p>
            </div>
        )
    }

    const { repos, totalCount } = repositoriesData

    return (
        <section className="flex flex-col gap-1">
            <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                <Warehouse size={14} />
                <span className="font-semibold">{totalCount}</span>
            </div>
            <div className="mx-auto lg:mx-0">
                <RepositoriesList
                    search={search}
                    className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    repositories={repos}
                />
            </div>
        </section>
    )
}

export const revalidate = 0
