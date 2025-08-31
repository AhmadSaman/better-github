import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import RepositoriesListSkeleton from '@/components/repository/repositories-list-skeleton'

export default function Loading() {
    return (
        <section className="container m-4 mx-auto w-full rounded-xl p-8">
            <Button
                size={'icon'}
                className="rounded-full transition-all duration-200 hover:scale-105"
                variant={'outline'}
                disabled
            >
                <ArrowLeft />
            </Button>

            <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="size-20 rounded-full" />
                    <div className="flex flex-col gap-2 text-center">
                        <Skeleton className="h-8 w-32" />
                        <div className="mx-auto flex flex-col items-center gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-6 w-8" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-6 w-8" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-6 w-8" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-28" />
                </div>

                <Skeleton className="h-4 w-80" />

                <div className="mt-4 w-full">
                    <div className="mb-4 flex justify-center gap-4">
                        <Skeleton className="size-16" />
                        <Skeleton className="size-16" />
                        <Skeleton className="size-16" />
                    </div>
                    <div className="w-full">
                        <RepositoriesListSkeleton />
                    </div>
                </div>
            </div>
        </section>
    )
}
