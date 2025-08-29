import { OctokitUsersType, OctokitUserType } from '@/config'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

if (!BASE_URL) {
    throw new Error(
        'Please set Base URL in .env.local, If its running locally you can use your localhost URL, example:http://localhost:3000'
    )
}

export const buildUrl = (pathname: string, searchParams?: URLSearchParams) => {
    const url = new URL(BASE_URL)
    url.pathname += pathname
    if (searchParams !== undefined) url.search = searchParams.toString()

    return url.href
}

export const getHeaders = () => {
    const headers = new Headers()
    return headers
}

export async function fetchGitHubUsers({ search }: { search: string }) {
    const searchParams = new URLSearchParams({
        q: `${search}`,
    })
    const response = await fetch(buildUrl('/api/users', searchParams), {
        headers: getHeaders(),
        cache: 'force-cache',
    })

    if (!response.ok) {
        console.error('Failed to fetch users')
        return null
    }
    const { data }: OctokitUsersType = await response.json()

    return {
        totalCount: data.total_count,
        users: data.items.map(
            (item: { login: string; avatar_url: string }) => ({
                name: item.login,
                avatarUrl: item.avatar_url,
            })
        ),
    }
}

export async function fetchGitHubUser({ username }: { username: string }) {
    const response = await fetch(buildUrl(`/api/users/${username}`), {
        headers: getHeaders(),
        cache: 'force-cache',
    })

    if (!response.ok) {
        return null
    }
    const data: OctokitUserType = await response.json()

    return {
        username: data.login,
        name: data.name,
        company: data.company,
        blog: data.blog,
        email: data.email,
        avatarUrl: data.avatar_url,
        github: data.html_url,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
        hireable: data.hireable,
        location: data.location,
        publicRepos: data.public_repos,
        joined: data.created_at,
    }
}
