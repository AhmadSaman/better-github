'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
    Calendar,
    MapPin,
    Link as LinkIcon,
    Users,
    GitBranch,
    Mail,
    Loader2,
} from 'lucide-react'
import { getAuthenticatedUser } from '@/app/user/actions'
import Link from 'next/link'
import { format } from 'date-fns'
import { ExternalLink } from '@/components/ui/external-link'

export function UserProfileDialog() {
    const [userInfo, setUserInfo] = useState<{
        username: string
        name: string | null
        company: string | null
        blog: string | null
        email: string | null
        avatarUrl: string
        github: string
        followers: number
        following: number
        bio: string | null
        hireable: boolean | null
        location: string | null
        publicRepos: number
        joined: string
    } | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const fetchUserInfo = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getAuthenticatedUser()

            setUserInfo(data)
        } catch (error) {
            console.error('Failed to fetch user info:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUserInfo()
    }, [fetchUserInfo])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full p-0"
                >
                    <Avatar className="h-8 w-8 cursor-pointer">
                        {userInfo?.avatarUrl ? (
                            <AvatarImage
                                src={userInfo?.avatarUrl}
                                alt={userInfo.name || userInfo.username}
                            />
                        ) : (
                            <AvatarFallback />
                        )}
                    </Avatar>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">
                        Profile
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : userInfo ? (
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                            <Avatar className="mx-auto h-16 w-16 sm:mx-0">
                                <AvatarImage
                                    src={userInfo.avatarUrl}
                                    alt={userInfo.name || userInfo.username}
                                />
                                <AvatarFallback />
                            </Avatar>
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg font-semibold">
                                    {userInfo.name || userInfo.username}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    @{userInfo.username}
                                </p>
                                {userInfo.bio && (
                                    <p className="mt-1 text-sm">
                                        {userInfo.bio}
                                    </p>
                                )}
                            </div>
                        </div>

                        <Separator />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-muted-foreground text-xs font-medium sm:text-sm">
                                        Repositories
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                        <GitBranch className="text-muted-foreground h-4 w-4" />
                                        <span className="text-xl font-bold sm:text-2xl">
                                            {userInfo.publicRepos}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-muted-foreground text-xs font-medium sm:text-sm">
                                        Followers
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                        <Users className="text-muted-foreground h-4 w-4" />
                                        <span className="text-xl font-bold sm:text-2xl">
                                            {userInfo.followers}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-muted-foreground text-xs font-medium sm:text-sm">
                                        Following
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center space-x-2 sm:justify-start">
                                        <Users className="text-muted-foreground h-4 w-4" />
                                        <span className="text-xl font-bold sm:text-2xl">
                                            {userInfo.following}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-3">
                            {userInfo.email && (
                                <div className="flex items-center space-x-3 text-sm">
                                    <Mail className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                    <span className="break-all">
                                        {userInfo.email}
                                    </span>
                                </div>
                            )}
                            {userInfo.location && (
                                <div className="flex items-center space-x-3 text-sm">
                                    <MapPin className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                    <span className="break-words">
                                        {userInfo.location}
                                    </span>
                                </div>
                            )}
                            {userInfo.company && (
                                <div className="flex items-center space-x-3 text-sm">
                                    <Users className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                    <span className="break-words">
                                        {userInfo.company}
                                    </span>
                                </div>
                            )}
                            {userInfo.blog && (
                                <div className="flex items-center space-x-3 text-sm">
                                    <LinkIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                    <ExternalLink
                                        href={userInfo.blog}
                                        className="break-all"
                                    >
                                        {userInfo.blog}
                                    </ExternalLink>
                                </div>
                            )}
                            <div className="flex items-center space-x-3 text-sm">
                                <Calendar className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                                <span className="break-words">
                                    Joined{' '}
                                    {format(
                                        new Date(userInfo.joined),
                                        'MMMM d, yyyy'
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="flex w-full space-x-2 pt-2">
                            <Button
                                asChild
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => setIsOpen(false)}
                            >
                                <Link href={`/users/${userInfo.username}`}>
                                    <span>View Profile</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-muted-foreground py-8 text-center">
                        Failed to load user information
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
