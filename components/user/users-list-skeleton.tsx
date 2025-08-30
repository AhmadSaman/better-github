import React from 'react'
import { Users } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const UsersListSkeleton = () => {
    const skeletons = Array.from({ length: 100 })

    return (
        <section className="flex flex-col gap-1">
            <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                <Users size={14} />
                <span>
                    <Skeleton className="h-[16px] w-[88px] rounded-xl" />
                </span>
            </div>
            <div className="grid grid-cols-2 justify-center gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {skeletons.map((_, index) => (
                    <Skeleton key={index} className="h-[134px] rounded-xl" />
                ))}
            </div>
        </section>
    )
}

export default UsersListSkeleton
