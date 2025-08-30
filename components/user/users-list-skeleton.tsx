import { Skeleton } from '@/components/ui/skeleton'

const UsersListSkeleton = () => {
    const skeletons = Array.from({ length: 100 })

    return (
        <div className="grid grid-cols-2 justify-center gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
            {skeletons.map((_, index) => (
                <Skeleton key={index} className="h-[134px] rounded-xl" />
            ))}
        </div>
    )
}

export default UsersListSkeleton
