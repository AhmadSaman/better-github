import UserFilter from '@/components/user/user-filter'
import UsersList from '@/components/user/users-list'
import UsersListSkeleton from '@/components/user/users-list-skeleton'
import { fetchGitHubUsers } from '@/lib/github'

import React, { Suspense } from 'react'

export default async function Page({
    searchParams,
}: {
    searchParams: { search: string }
}) {
    const { search } = await searchParams
    return (
        <main className="container mx-auto flex flex-col gap-6 p-4">
            <UserFilter />
            <Suspense key={search} fallback={<UsersListSkeleton />}>
                <UsersListContent search={search} />
            </Suspense>
        </main>
    )
}

async function UsersListContent({ search }: { search: string }) {
    const data = await fetchGitHubUsers({ search })
    return <UsersList users={data?.users || []} total={data?.totalCount || 0} />
}

export const revalidate = 0
