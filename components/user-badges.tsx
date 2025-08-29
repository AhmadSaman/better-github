import React from 'react'
import { Badge } from './ui/badge'
import {
    Mail,
    MapPin,
    Building,
    Link as LinkIcon,
    UserRoundCheck,
} from 'lucide-react'
import Link from 'next/link'

interface PropsType {
    email: string | null
    location: string | null
    company: string | null
    blog: string | null
    hireable: boolean | null
    name: string | null
}

interface BadgeConfig {
    icon: React.ComponentType<{ size: number }>
    label: string
    value: string | boolean
    isLink?: boolean
    linkText?: string
}

export default function UserBadges(props: PropsType) {
    const badgeConfigs: BadgeConfig[] = [
        {
            icon: Mail,
            label: 'Email',
            value: props.email || '',
        },
        {
            icon: MapPin,
            label: 'Location',
            value: props.location || '',
        },
        {
            icon: Building,
            label: 'Company',
            value: props.company || '',
        },
        {
            icon: LinkIcon,
            label: 'Blog',
            value: props.blog || '',
            isLink: true,
            linkText: props.name || 'Blog',
        },
        {
            icon: UserRoundCheck,
            label: 'Hireable',
            value: props.hireable || false,
        },
    ]

    return (
        <div className="flex flex-wrap justify-center gap-5">
            {badgeConfigs.map((config, index) => {
                if (!config.value) return null

                const IconComponent = config.icon

                return (
                    <Badge
                        key={index}
                        variant="secondary"
                        className="flex gap-1"
                    >
                        <IconComponent size={16} />
                        {config.isLink && typeof config.value === 'string' ? (
                            <Link
                                href={`https://${config.value}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs hover:underline"
                            >
                                {config.linkText}
                            </Link>
                        ) : (
                            <p className="text-xs">
                                {typeof config.value === 'boolean'
                                    ? config.label
                                    : config.value}
                            </p>
                        )}
                    </Badge>
                )
            })}
        </div>
    )
}
