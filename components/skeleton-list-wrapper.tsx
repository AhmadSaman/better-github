import { Skeleton } from '@/components/ui/skeleton'
import { ReactNode } from 'react'

interface SkeletonWrapperProps {
    children: ReactNode
    className?: string
}

export default function SkeletonWrapper({
    children,
    className,
}: SkeletonWrapperProps) {
    return (
        <section className="flex flex-col gap-1">
            <div className="text-muted-foreground mx-1 flex items-center gap-1 text-xs font-medium">
                <Skeleton className="h-4 w-15" />
            </div>
            <div className={className}>{children}</div>
        </section>
    )
}
