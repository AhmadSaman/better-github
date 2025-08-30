import RepositoriesList from '@/components/user/users-repositories-list'
import { getGithubUserStarredRepositories } from '@/app/repositories/actions'

export default async function UserStarredRepositories({
    username,
}: {
    username: string
}) {
    const data = await getGithubUserStarredRepositories({ username })

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
            <RepositoriesList
                type="starred"
                repositories={repos}
                username={username}
            />
        </div>
    )
}
