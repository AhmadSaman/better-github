'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function UserCard({ name, avatarUrl }: { name: string; avatarUrl: string }) {
    const searchParams = useSearchParams()

    const currentParams = searchParams.toString()
    const href = currentParams
        ? `/users/${name}?${currentParams}`
        : `/users/${name}`

    return (
        <Link href={href}>
            <Card className="transition-all duration-200 hover:scale-105">
                <CardHeader className="gap-3 p-1">
                    <Avatar className="mx-auto size-16">
                        <AvatarImage src={avatarUrl} alt={name} />
                        <AvatarFallback />
                    </Avatar>
                    <CardTitle title={name} className="truncate text-center">
                        {name}
                    </CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}

export default UserCard
