import React from 'react'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExternalLinkProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string
    children: React.ReactNode
    showIcon?: boolean
    iconSize?: 'sm' | 'md' | 'lg'
    className?: string
}

export function ExternalLink({
    href,
    children,
    showIcon = true,
    iconSize = 'sm',
    className,
    ...props
}: ExternalLinkProps) {
    const getSecureUrl = (url: string): string => {
        if (url.startsWith('https://') || url.startsWith('http://')) {
            return url
        }
        return `https://${url}`
    }

    const secureUrl = getSecureUrl(href)

    const iconSizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    }

    return (
        <a
            href={secureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                'text-primary inline-flex items-center space-x-1 hover:underline',
                className
            )}
            {...props}
        >
            <span>{children}</span>
            {showIcon && (
                <ExternalLinkIcon
                    className={cn('flex-shrink-0', iconSizeClasses[iconSize])}
                />
            )}
        </a>
    )
}
