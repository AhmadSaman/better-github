import { getUserStarredRepositories } from '@/app/users/[username]/actions'
import RepositoriesList from '@/components/user/users-repositories-list'

export default async function UserStarredRepositories({
    username,
}: {
    username: string
}) {
    const data = await getUserStarredRepositories({ username })

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
