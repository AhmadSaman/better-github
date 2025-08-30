import { fetchGitHubUserStarredRepositories } from '@/lib/github'

import RepositoriesList from '@/components/repository/repositories-list'

export default async function UserStarredRepositories({
    username,
}: {
    username: string
}) {
    const data = await fetchGitHubUserStarredRepositories({ username })

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

    return (
        <div className="p-3">
            <RepositoriesList repositories={repos} />
        </div>
    )
}
