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
            <Warehouse size={64} className="text-muted-foreground" />
            <div className="space-y-2">
                <h2 className="text-muted-foreground text-xl font-semibold">
                    No search criteria
                </h2>
                <p className="text-muted-foreground max-w-md">
                    Use the search bar above to find repositories.
                </p>
            </div>
        </div>
    )
}

export const revalidate = 0
