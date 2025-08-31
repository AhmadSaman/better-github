import { getUserStarredRepositories } from '@/app/users/[username]/actions'
import RepositoriesList from '../repository/repositories-list'

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
                type="user-starred"
                repositories={repos}
                params={{ username }}
            />
        </div>
    )
}
