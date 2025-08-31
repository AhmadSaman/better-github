import SkeletonWrapper from '@/components/skeleton-list-wrapper'
import UsersListSkeleton from '@/components/user/users-list-skeleton'
import { Users } from 'lucide-react'

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
    )
}

export const revalidate = 0
