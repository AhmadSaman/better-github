import { fetchGitHubUserRepositories } from '@/lib/github'

import RepositoriesList from '@/components/repository/repositories-list'
import { Suspense } from 'react'
import RepositoriesListSkeleton from '../repository/repositories-list-skeleton'

export default async function UserRepositories({
    username,
}: {
    username: string
}) {
    return (
        <div className="p-3">
            <Suspense key={username} fallback={<RepositoriesListSkeleton />}>
                <RepositoriesListContent username={username} />
            </Suspense>
        </div>
    )
}

async function RepositoriesListContent({ username }: { username: string }) {
    const data = await fetchGitHubUserRepositories({ username })
    if (!data) {
        return (
            <div className="p-3">
                <p className="text-muted-foreground">
                    Failed to load repositories.
                </p>
            </div>
        )
    }

    const { repos } = data

    return <RepositoriesList repositories={repos} />
}
