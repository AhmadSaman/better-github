'use client'
import UserCard from './user-card'
import { Users } from 'lucide-react'
import ScrollToTop from '../scroll-to-top'
import useInfiniteScroll from '@/hooks/use-infinite-scroll'
import { Skeleton } from '../ui/skeleton'
import { getUsers } from '@/app/users/actions'

const UserList = ({
    users,
    total,
    search,
    location,
    min_followers,
    max_followers,
    min_repos,
    max_repos,
}: {
    users: { name: string; avatarUrl: string }[]
    total: number
    search: string
    location?: string
    min_followers?: string
    max_followers?: string
    min_repos?: string
    max_repos?: string
}) => {
    const { data, ref, hasMore } = useInfiniteScroll<{
        name: string
        avatarUrl: string
    }>({
        initialData: users,
        fetchFunction: async (page: number) => {
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
    })

    return (
        <section className="flex flex-col gap-1">
            <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                <Users size={14} />
                <span className="font-semibold">{total}</span>
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-2 justify-center gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                    {data.map((user) => (
                        <div key={user.name}>
                            <UserCard
                                name={user.name}
                                avatarUrl={user.avatarUrl}
                            />
                        </div>
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

export default UserList
