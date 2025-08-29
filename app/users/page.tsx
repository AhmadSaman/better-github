import UserFilter from '@/components/user-filter'
import UsersList from '@/components/users-list'
import UsersListSkeleton from '@/components/users-list-skeleton'
import { fetchGitHubUsers } from '@/lib/github'

import React, { Suspense } from 'react'

export default async function UsersPage({
    searchParams,
}: {
    searchParams: { username: string }
}) {
    return (
        <main className="container mx-auto flex flex-col gap-6 p-4">
            <UserFilter />
            <Suspense
                key={searchParams.username || 'users-default'}
                fallback={<UsersListSkeleton />}
            >
                <UsersListContent username={searchParams.username} />
            </Suspense>
        </main>
    )
}

async function UsersListContent({ username }: { username: string }) {
    const { users, totalCount } = await fetchGitHubUsers({ username })
    return <UsersList users={users} total={totalCount} />
}

export const revalidate = 0
