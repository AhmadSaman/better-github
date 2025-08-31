import { Suspense } from 'react'
import RepositoriesListSkeleton from '../repository/repositories-list-skeleton'
import {
    getUserRepositories,
    getUserStarredRepositories,
} from '@/app/users/[username]/actions'
import RepositoriesList from '../repository/repositories-list'

type RepositoryType = 'public' | 'starred'

interface UserRepositoriesProps {
    username: string
    type: RepositoryType
}

export default function UserRepositories({
    username,
    type,
}: UserRepositoriesProps) {
    return (
        <div className="w-full p-3">
            <Suspense
                key={`${username}-${type}`}
                fallback={<RepositoriesListSkeleton />}
            >
                <RepositoriesListContent username={username} type={type} />
            </Suspense>
        </div>
    )
}

async function RepositoriesListContent({
    username,
    type,
}: {
    username: string
    type: RepositoryType
}) {
    let data

    if (type === 'starred') {
        data = await getUserStarredRepositories({ username })
    } else {
        data = await getUserRepositories({ username })
    }

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
    const listType = type === 'starred' ? 'user-starred' : 'user-public'

    return (
        <RepositoriesList
            type={listType}
            params={{ username }}
            repositories={repos}
        />
    )
}
