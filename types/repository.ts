export interface Repository {
    name: string
    githubUrl: string
    starCount?: number
    fork?: number
    languages?: string | null
    topics?: string[]
    issues?: number
    isTemplate?: boolean
    createdAt?: string | null
    link?: string | null
    owner?: {
        name?: string | null
        avatarUrl?: string
    }
}
