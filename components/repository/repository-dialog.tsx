import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Star,
    GitFork,
    GitBranch,
    Calendar,
    Github,
    ExternalLink,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Repository } from '@/types/repository'

interface RepositoryDialogProps {
    repository: Repository
    isOpen: boolean
    onClose: () => void
}

export default function RepositoryDialog({
    repository,
    isOpen,
    onClose,
}: RepositoryDialogProps) {
    if (!repository) return null

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
        description,
    } = repository
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <DialogTitle className="text-left text-xl font-bold">
                                {name}
                            </DialogTitle>
                            {owner?.name && (
                                <div className="mt-2 flex items-center gap-2">
                                    <Avatar className="size-6">
                                        <AvatarImage
                                            src={owner.avatarUrl}
                                            alt={owner.name}
                                        />
                                        <AvatarFallback />
                                    </Avatar>
                                    <span className="text-muted-foreground text-sm">
                                        {owner.name}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2">
                            {isTemplate && (
                                <Badge variant="secondary" className="text-xs">
                                    Template
                                </Badge>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                {description ? (
                    <div className="text-muted-foreground bg-muted/30 border-primary/20 rounded-lg border-l-4 p-4 text-sm leading-relaxed">
                        {description}
                    </div>
                ) : (
                    <div className="text-muted-foreground bg-muted/30 border-muted rounded-lg border-l-4 p-4 text-sm italic">
                        No description available
                    </div>
                )}

                <div className="space-y-6">
                    <div className="bg-muted/50 flex justify-between gap-4 rounded-lg px-12 py-4">
                        <div className="flex flex-col items-center gap-1">
                            <Star className="text-muted-foreground h-5 w-5" />
                            <span className="text-sm font-medium">
                                {starCount || 0}
                            </span>
                            <span className="text-muted-foreground text-xs">
                                Stars
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <GitFork className="text-muted-foreground h-5 w-5" />
                            <span className="text-sm font-medium">
                                {fork || 0}
                            </span>
                            <span className="text-muted-foreground text-xs">
                                Forks
                            </span>
                        </div>
                        {!!issues && issues > 0 && (
                            <div className="flex flex-col items-center gap-1">
                                <GitBranch className="text-muted-foreground h-5 w-5" />
                                <span className="text-sm font-medium">
                                    {issues}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Issues
                                </span>
                            </div>
                        )}
                        {createdAt && (
                            <div className="flex flex-col items-center gap-1">
                                <Calendar className="text-muted-foreground h-5 w-5" />
                                <span className="text-sm font-medium">
                                    {formatDistanceToNow(new Date(createdAt), {
                                        addSuffix: false,
                                    })}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                    Created
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {languages && (
                            <div>
                                <h3 className="mb-2 text-sm font-medium">
                                    Primary Language
                                </h3>
                                <Badge variant="outline" className="text-sm">
                                    {languages}
                                </Badge>
                            </div>
                        )}

                        {topics && topics.length > 0 && (
                            <div>
                                <h3 className="mb-2 text-sm font-medium">
                                    Topics
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {topics.map((topic, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 border-t pt-4">
                        {githubUrl && (
                            <Button asChild className="flex-1 gap-2 rounded-xl">
                                <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-4 w-4" />
                                    View on GitHub
                                </a>
                            </Button>
                        )}
                        {link && (
                            <Button
                                asChild
                                variant="outline"
                                className="flex-1 gap-2 rounded-xl"
                            >
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Visit Website
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
