import SkeletonWrapper from '@/components/skeleton-list-wrapper'
import SearchFilter from '@/components/search-filter'
import UsersList from '@/components/user/users-list'
import UsersListSkeleton from '@/components/user/users-list-skeleton'
import { Users } from 'lucide-react'

import { getUsers } from '@/app/users/actions'
import UserAdvancedFilters from '@/components/user/user-advanced-filters'

import React, { Suspense } from 'react'

export default async function Page({
    searchParams,
}: {
    searchParams: {
        search?: string
        location?: string
        min_followers?: string
        max_followers?: string
        min_repos?: string
        max_repos?: string
    }
}) {
    const {
        search,
        location,
        min_followers,
        max_followers,
        min_repos,
        max_repos,
    } = await searchParams

    return (
        <main className="container m-4 mx-auto flex flex-col gap-2 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Users size={24} />
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <SearchFilter placeholder="Search for GitHub users by name">
                    <UserAdvancedFilters />
                </SearchFilter>
            </div>
            {search ? (
                <Suspense
                    key={`${search}-${location || ''}-${min_followers || ''}-${max_followers || ''}-${min_repos || ''}-${max_repos || ''}`}
                    fallback={
                        <SkeletonWrapper>
                            <UsersListSkeleton />
                        </SkeletonWrapper>
                    }
                >
                    <UsersListContent
                        search={search}
                        location={location}
                        min_followers={min_followers}
                        max_followers={max_followers}
                        min_repos={min_repos}
                        max_repos={max_repos}
                    />
                </Suspense>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                    <Users size={64} className="text-gray-300" />
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No search criteria
                        </h2>
                        <p className="max-w-md text-gray-500">
                            Use the search bar above to find users by name,
                            location, following, followers, repositories.
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}

async function UsersListContent({
    search,
    location,
    min_followers,
    max_followers,
    min_repos,
    max_repos,
}: {
    search: string
    location?: string
    min_followers?: string
    max_followers?: string
    min_repos?: string
    max_repos?: string
}) {
    const data = await getUsers({
        search,
        page: 1,
        location,
        min_followers,
        max_followers,
        min_repos,
        max_repos,
    })
    return (
        <UsersList
            users={data?.users || []}
            total={data?.totalCount || 0}
            search={search}
            location={location}
            min_followers={min_followers}
            max_followers={max_followers}
            min_repos={min_repos}
            max_repos={max_repos}
        />
    )
}

export const revalidate = 0
