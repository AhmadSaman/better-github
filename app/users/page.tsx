import { Skeleton } from '@/components/ui/skeleton'
import SearchFilter from '@/components/search-filter'
import UsersList from '@/components/user/users-list'
import UsersListSkeleton from '@/components/user/users-list-skeleton'
import { Users } from 'lucide-react'

import { getGitHubUsers } from '@/app/users/actions'

import React, { Suspense } from 'react'

export default async function Page({
    searchParams,
}: {
    searchParams: { search: string }
}) {
    const { search } = await searchParams
    return (
        <main className="container m-4 mx-auto flex flex-col gap-2 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Users size={24} />
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <SearchFilter />
            </div>
            <Suspense
                key={search}
                fallback={
                    <section className="flex flex-col gap-1">
                        <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                            <Users size={14} />
                            <span>
                                <Skeleton className="h-[16px] w-[88px] rounded-xl" />
                            </span>
                        </div>
                        <UsersListSkeleton />
                    </section>
                }
            >
                <UsersListContent search={search} />
            </Suspense>
        </main>
    )
}

async function UsersListContent({ search }: { search: string }) {
    const data = await getGitHubUsers({ search, page: 1 })
    return (
        <UsersList
            users={data?.users || []}
            total={data?.totalCount || 0}
            search={search}
        />
    )
}

export const revalidate = 0
