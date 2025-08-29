import UserFilter from '@/components/user-filter'
import UsersList from '@/components/users-list'
import UsersListSkeleton from '@/components/users-list-skeleton'
import { fetchGitHubUsers } from '@/lib/github'

import React, { Suspense } from 'react'

export default async function Page({
    searchParams,
}: {
    searchParams: { search: string }
}) {
    return (
        <main className="container mx-auto flex flex-col gap-6 p-4">
            <UserFilter />
            <Suspense
                key={searchParams.search || 'users-default'}
                fallback={<UsersListSkeleton />}
            >
                <UsersListContent search={searchParams.search} />
            </Suspense>
        </main>
    )
}

async function UsersListContent({ search }: { search: string }) {
    const data = await fetchGitHubUsers({ search })
    return <UsersList users={data?.users || []} total={data?.totalCount || 0} />
}

export const revalidate = 0
