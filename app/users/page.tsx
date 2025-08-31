import SkeletonWrapper from '@/components/skeleton-list-wrapper'
import UsersListSkeleton from '@/components/user/users-list-skeleton'
import { Users } from 'lucide-react'
import SearchFilter from '@/components/search-filter'
import UserAdvancedFilters from '@/components/user/user-advanced-filters'

import React, { Suspense } from 'react'
import UsersContent from '@/components/user/users-content'

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
        <div className="container m-4 mx-auto flex flex-col gap-6 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Users size={24} />
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <SearchFilter placeholder="Search for GitHub users by name">
                    <UserAdvancedFilters />
                </SearchFilter>
            </div>
            <main className="flex flex-col gap-2">
                {search ? (
                    <Suspense
                        key={`${search}-${location || ''}-${min_followers || ''}-${max_followers || ''}-${min_repos || ''}-${max_repos || ''}`}
                        fallback={
                            <SkeletonWrapper>
                                <UsersListSkeleton />
                            </SkeletonWrapper>
                        }
                    >
                        <UsersContent
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
        </div>
    )
}

export const revalidate = 0
