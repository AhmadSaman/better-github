import { Warehouse } from 'lucide-react'
import { Suspense } from 'react'
import RepositoriesListSkeleton from '@/components/repository/repositories-list-skeleton'
import SkeletonWrapper from '@/components/skeleton-list-wrapper'

import { RepositoryFilterParams } from '@/types/repository'
import RepositoriesContent from '@/components/repository/repositories-content'

export default async function Page({
    searchParams,
}: {
    searchParams: RepositoryFilterParams
}) {
    const { search, username, min_stars, max_stars, languages } =
        await searchParams

    return search ? (
        <Suspense
            key={`${search}-${username || ''}-${min_stars || ''}-${max_stars || ''}-${languages || ''}`}
            fallback={
                <SkeletonWrapper>
                    <RepositoriesListSkeleton />
                </SkeletonWrapper>
            }
        >
            <RepositoriesContent
                search={search}
                username={username}
                min_stars={min_stars}
                max_stars={max_stars}
                languages={languages}
            />
        </Suspense>
    ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <Warehouse size={64} className="text-gray-300" />
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-700">
                    No search criteria
                </h2>
                <p className="max-w-md text-gray-500">
                    Use the search bar above to find repositories.
                </p>
            </div>
        </div>
    )
}

export const revalidate = 0
