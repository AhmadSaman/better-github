import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, GitFork, GitBranch, Calendar, Globe, Github } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Repository } from '@/types/repository'
import { useState } from 'react'
import RepositoryDialog from './repository-dialog'
import { ExternalLink } from '@/components/ui/external-link'

interface RepositoryCardProps {
    repository: Repository
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {
        name,
        starCount,
        githubUrl,
        fork,
        languages,
        topics,
        issues,
        isTemplate,
        createdAt,
        link,
        owner,
    } = repository

    const handleCardClick = () => {
        setIsDialogOpen(true)
    }

    return (
        <>
            <Card
                className="cursor-pointer gap-3 transition-all duration-200 hover:scale-105"
                onClick={handleCardClick}
            >
                <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex-1">
                            <CardTitle>
                                <p
                                    className={
                                        'whitespace-wrap overflow-hidden text-lg font-semibold break-all text-ellipsis'
                                    }
                                    title={name}
                                >
                                    {name}
                                </p>
                            </CardTitle>
                            {owner?.name && (
                                <div className="text-muted-foreground mt-1 flex items-center gap-1 text-[12px]">
                                    <Avatar className="size-4">
                                        <AvatarImage
                                            src={owner.avatarUrl}
                                            alt={name}
                                        />
                                        <AvatarFallback />
                                    </Avatar>
                                    {owner.name}
                                </div>
                            )}
                        </div>
                        {isTemplate && (
                            <Badge variant="secondary" className="text-[10px]">
                                Template
                            </Badge>
                        )}
                        {link && (
                            <Button
                                asChild
                                className="size-6 rounded-full transition-all duration-200 hover:scale-110"
                                variant={'secondary'}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink
                                    href={link}
                                    className="text-muted-foreground text-xs"
                                    showIcon={false}
                                >
                                    <Globe className="h-3 w-3" />
                                </ExternalLink>
                            </Button>
                        )}
                        {githubUrl && (
                            <Button
                                asChild
                                className="size-6 rounded-full transition-all duration-200 hover:scale-110"
                                variant={'secondary'}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink
                                    href={githubUrl}
                                    className="text-muted-foreground text-xs"
                                    showIcon={false}
                                >
                                    <Github className="h-3 w-3" />
                                </ExternalLink>
                            </Button>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{starCount?.toString() || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <GitFork className="h-4 w-4" />
                            <span>{fork?.toString() || 0}</span>
                        </div>
                        {!!issues && issues > 0 && (
                            <div className="flex items-center gap-1">
                                <GitBranch className="h-4 w-4" />
                                <span>{issues}</span>
                            </div>
                        )}
                        {createdAt && (
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span className="text-[10px]">
                                    {formatDistanceToNow(new Date(createdAt), {
                                        addSuffix: false,
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {languages && (
                            <Badge variant="outline" className="text-[10px]">
                                {languages}
                            </Badge>
                        )}
                        {topics &&
                            topics.slice(0, 2).map((topic, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-[10px]"
                                >
                                    {topic}
                                </Badge>
                            ))}
                        {topics && topics.length > 2 && (
                            <Badge variant="secondary" className="text-[10px]">
                                +{topics.length - 2} more
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            <RepositoryDialog
                repository={repository}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </>
    )
}
