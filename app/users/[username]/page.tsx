import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { fetchGitHubUser } from '@/lib/github'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import UserTabs from '@/components/user-tabs'
import UserBadges from '@/components/user-badges'
import { notFound } from 'next/navigation'

interface PageProps {
    params: {
        username: string
    }
}

export default async function Page({ params }: PageProps) {
    const { username } = await params
    const userInfo = await fetchGitHubUser({ username })

    if (!userInfo) {
        return notFound()
    }

    return (
        <section className="container m-4 mx-auto rounded-xl p-8">
            <Button
                size={'icon'}
                className="rounded-full transition-all duration-100 hover:scale-110"
                variant={'outline'}
                asChild
            >
                <Link href="/users">
                    <ArrowLeft />
                </Link>
            </Button>
            <div className="flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="size-20">
                        <AvatarImage src={userInfo.avatarUrl} alt={username} />
                        <AvatarFallback />
                    </Avatar>
                    <div className="flex flex-col gap-2 text-center">
                        <p
                            title={username}
                            className="truncate text-2xl font-semibold"
                        >
                            {userInfo.name}
                        </p>
                        <div>
                            <p className="text-sm">@{userInfo.username}</p>
                            <p className="text-[10px]">
                                Joined {format(userInfo.joined, 'yyyy-MM-dd')}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-10">
                        <div>
                            <p className="text-xl font-medium">
                                {userInfo.publicRepos}
                            </p>
                            <p className="text-primary text-xs">
                                Public Repositories
                            </p>
                        </div>
                        <div>
                            <p className="text-xl font-medium">
                                {userInfo.followers}
                            </p>
                            <p className="text-primary text-xs">Followers</p>
                        </div>
                        <div>
                            <p className="text-xl font-medium">
                                {userInfo.following}
                            </p>
                            <p className="text-primary text-xs">Following</p>
                        </div>
                    </div>
                </div>
                <UserBadges
                    email={userInfo.email}
                    location={userInfo.location}
                    company={userInfo.company}
                    blog={userInfo.blog}
                    hireable={userInfo.hireable}
                    name={userInfo.name}
                />
                {userInfo.bio && (
                    <p className="w-1/2 text-center">{userInfo.bio}</p>
                )}
                <UserTabs />
            </div>
        </section>
    )
}
