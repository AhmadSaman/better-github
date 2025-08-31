import { getUsers } from '@/app/users/actions'
import { Users } from 'lucide-react'
import UsersList from './users-list'
import { UserFilterParams } from '@/types/users'

export default async function UsersContent({
    search,
    location,
    min_followers,
    max_followers,
    min_repos,
    max_repos,
}: UserFilterParams) {
    const data = await getUsers({
        search,
        page: 1,
        location,
        min_followers,
        max_followers,
        min_repos,
        max_repos,
    })

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="mb-6 text-2xl font-bold">Users</h1>
                <p className="text-muted-foreground">Failed to load users.</p>
            </div>
        )
    }

    const { users, totalCount } = data

    return (
        <section className="flex flex-col gap-1">
            <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                <Users size={14} />
                <span className="font-semibold">{totalCount}</span>
            </div>
            <div className="mx-auto w-full lg:mx-0">
                <UsersList
                    users={users}
                    search={search}
                    location={location}
                    min_followers={min_followers}
                    max_followers={max_followers}
                    min_repos={min_repos}
                    max_repos={max_repos}
                />
            </div>
        </section>
    )
}
