'use server'

import { buildUrl, getHeaders } from '@/config/url'
import { OctokitUsersType } from '@/types/github'

export async function getUsers({
    search,
    page,
    location,
    min_followers,
    max_followers,
    min_repos,
    max_repos,
}: {
    search: string
    page: number
    location?: string
    min_followers?: string
    max_followers?: string
    min_repos?: string
    max_repos?: string
}) {
    let query = search

    if (location) {
        query += ` location:${location}`
    }

    if (min_followers) {
        query += ` followers:>=${min_followers}`
    }

    if (max_followers) {
        query += ` followers:<=${max_followers}`
    }

    if (min_repos) {
        query += ` repos:>=${min_repos}`
    }

    if (max_repos) {
        query += ` repos:<=${max_repos}`
    }

    const searchParams = new URLSearchParams({
        q: query,
        page: `${page}`,
    })

    const response = await fetch(buildUrl('/api/users', searchParams), {
        headers: getHeaders(),
        cache: 'no-cache',
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
