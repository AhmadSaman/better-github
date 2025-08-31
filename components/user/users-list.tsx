'use client'
import UserCard from './user-card'
import ScrollToTop from '../scroll-to-top'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Skeleton } from '../ui/skeleton'
import { getUsers } from '@/app/users/actions'
import { UserFilterParams } from '@/types/users'
import { useCallback } from 'react'

const UsersList = ({
    users,
    search,
    location,
    min_followers,
    max_followers,
    min_repos,
    max_repos,
}: {
    users: { name: string; avatarUrl: string }[]
} & UserFilterParams) => {
    const fetchFunction = useCallback(
        async (page: number) => {
            const response = await getUsers({
                search,
                page,
                location,
                min_followers,
                max_followers,
                min_repos,
                max_repos,
            })

            return response?.users || []
        },
        [search, location, min_followers, max_followers, min_repos, max_repos]
    )

    const { data, ref, hasMore } = useInfiniteScroll<{
        name: string
        avatarUrl: string
    }>({
        initialData: users,
        fetchFunction,
    })

    return (
        <section className="flex w-full flex-col gap-1">
            {data.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                    {data.map((user) => (
                        <UserCard
                            key={user.name}
                            name={user.name}
                            avatarUrl={user.avatarUrl}
                        />
                    ))}
                    {hasMore && (
                        <Skeleton
                            ref={ref}
                            className="col-span-1 h-full w-full"
                        ></Skeleton>
                    )}
                </div>
            ) : (
                <div className="h-full">
                    <p className="text-center font-semibold">No result Found</p>
                </div>
            )}

            <ScrollToTop />
        </section>
    )
}

export default UsersList
