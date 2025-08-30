import { fetchGitHubRepositories } from '@/lib/github'
import RepositoriesList from '@/components/repository/repositories-list'
import { Warehouse } from 'lucide-react'
import { Suspense } from 'react'
import RepositoriesListSkeleton from '@/components/repository/repositories-list-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import SearchFilter from '@/components/search-filter'

export default async function Page({
    searchParams,
}: {
    searchParams: { search: string }
}) {
    const { search } = await searchParams

    return (
        <div className="container m-4 mx-auto flex flex-col gap-2 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Warehouse size={24} />
                    <h1 className="text-2xl font-bold">Repositories</h1>
                </div>{' '}
                <SearchFilter />
            </div>
            <Suspense
                key={search}
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
                <RepositoriesListContent search={search} />
            </Suspense>
        </div>
    )
}

async function RepositoriesListContent({ search }: { search: string }) {
    const repositoriesData = await fetchGitHubRepositories({
        search: search,
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
                    className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                    repositories={repos}
                />
            </div>
        </section>
    )
}

export const revalidate = 0
