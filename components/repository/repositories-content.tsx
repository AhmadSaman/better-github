import { getRepositories } from '@/app/repositories/actions'
import RepositoriesList from '@/components/repository/repositories-list'
import { RepositoryFilterParams } from '@/types/repository'
import { Warehouse } from 'lucide-react'

export default async function RepositoriesContent({
    search,
    username,
    min_stars,
    max_stars,
    languages,
}: RepositoryFilterParams) {
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
            <div className="mx-auto w-full lg:mx-0">
                <RepositoriesList
                    repositories={repos}
                    params={{
                        search,
                        username: username!,
                        min_stars: min_stars!,
                        max_stars: max_stars!,
                        languages: languages!,
                    }}
                />
            </div>
        </section>
    )
}
