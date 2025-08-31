import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ArrowLeft } from 'lucide-react'

import { format } from 'date-fns'
import { Button } from '@/components/ui/button'

import { getUser } from './actions'
import Link from 'next/link'
import UserTabs from '@/components/user/user-tabs'
import UserBadges from '@/components/user/user-badges'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { UserFilterParams } from '@/types/users'

interface PageProps {
    params: {
        username: string
    }
    searchParams: UserFilterParams
}

export default async function Page({ params, searchParams }: PageProps) {
    const { username } = await params
    const sp = await searchParams
    const userInfo = await getUser({ username })
    const generateParams = new URLSearchParams({ ...sp })

    if (!userInfo) {
        return notFound()
    }

    return (
        <section className="container m-4 mx-auto rounded-xl p-8">
            <Button
                size={'icon'}
                className="rounded-full transition-all duration-200 hover:scale-105"
                variant={'outline'}
                asChild
            >
                <Link href={`/users?${generateParams.toString()}`}>
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

                <UserTabs username={username} />
            </div>
        </section>
    )
}

export async function generateMetadata({
    params,
}: {
    params: { username: string }
}): Promise<Metadata> {
    const { username } = await params
    const userInfo = await getUser({ username })

    if (!userInfo) {
        return {
            title: 'User Not Found',
            description: 'The requested user could not be found.',
        }
    }

    const title = `${userInfo.name || userInfo.username} (@${userInfo.username}) - GitHub Profile`
    const description = userInfo.bio
        ? `${userInfo.bio} - ${userInfo.publicRepos} public repositories, ${userInfo.followers} followers`
        : `${userInfo.name || userInfo.username} on GitHub - ${userInfo.publicRepos} public repositories, ${userInfo.followers} followers`

    return {
        title,
        description,
    }
}
