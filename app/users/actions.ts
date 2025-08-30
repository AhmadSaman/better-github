'use server'

import { OctokitUsersType } from '@/config'
import { buildUrl, getHeaders } from '@/lib/github'

export async function getGitHubUsers({
    search,
    page,
}: {
    search: string
    page: number
}) {
    const searchParams = new URLSearchParams({
        q: `${search}`,
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
