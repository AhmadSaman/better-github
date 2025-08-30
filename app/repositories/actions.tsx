'use server'

import { OctokitRepositoriesType, OctokitUserRepositoriesType } from '@/config'
import { buildUrl, getHeaders } from '@/lib/github'
import { Repository } from '@/types/repository'

export async function getGithubUserRepositories({
    username,
    page = 1,
}: {
    username: string
    page?: number
}) {
    const searchParams = new URLSearchParams({
        page: page.toString(),
    })
    const response = await fetch(
        buildUrl(`/api/repositories/${username}`, searchParams),
        {
            headers: getHeaders(),
            cache: 'force-cache',
        }
    )

    if (!response.ok) {
        return null
    }
    const { data }: OctokitUserRepositoriesType = await response.json()

    return {
        repos: data.map((repo) => ({
            name: repo.name,
            owner: { name: repo.owner.login, avatarUrl: repo.owner.avatar_url },
            starCount: repo.stargazers_count,
            fork: repo.forks_count,
            languages: repo.language,
            topics: repo.topics,
            issues: repo.open_issues_count,
            isTemplate: repo.is_template,
            createdAt: repo.created_at,
            description: repo.description,
            link: repo.homepage,
            githubUrl: repo.html_url,
        })),
    } satisfies { repos: Repository[] }
}

export async function getGithubUserStarredRepositories({
    username,
    page = 1,
}: {
    username: string
    page?: number
}) {
    const searchParams = new URLSearchParams({
        page: page.toString(),
    })
    const response = await fetch(
        buildUrl(`/api/repositories/${username}/starred`, searchParams),
        {
            headers: getHeaders(),
            cache: 'force-cache',
        }
    )

    if (!response.ok) {
        return null
    }
    const { data }: OctokitUserRepositoriesType = await response.json()

    return {
        repos: data.map((repo) => ({
            name: repo.name,
            owner: { name: repo.owner.login, avatarUrl: repo.owner.avatar_url },
            starCount: repo.stargazers_count,
            fork: repo.forks_count,
            languages: repo.language,
            topics: repo.topics,
            description: repo.description,
            issues: repo.open_issues_count,
            isTemplate: repo.is_template,
            createdAt: repo.created_at,
            link: repo.homepage,
            githubUrl: repo.html_url,
        })),
    } satisfies { repos: Repository[] }
}

export async function getGithubRepositories({
    search,
    page = 1,
}: {
    search: string
    page?: number
}) {
    const searchParams = new URLSearchParams({
        q: `${search}`,
        page: page.toString(),
    })
    const response = await fetch(buildUrl('/api/repositories', searchParams), {
        headers: getHeaders(),
        cache: 'force-cache',
    })

    if (!response.ok) {
        console.error('Failed to fetch users')
        return null
    }
    const { data }: OctokitRepositoriesType = await response.json()

    return {
        totalCount: data.total_count,
        repos: data.items.map((repo) => ({
            name: repo.name,
            owner: {
                name: repo.owner?.login,
                avatarUrl: repo.owner?.avatar_url,
            },
            starCount: repo.stargazers_count,
            fork: repo.forks_count,
            languages: repo.language,
            topics: repo.topics,
            description: repo.description,
            issues: repo.open_issues_count,
            isTemplate: repo.is_template,
            createdAt: repo.created_at,
            link: repo.homepage,
            githubUrl: repo.html_url,
        })),
    } satisfies { totalCount: number; repos: Repository[] }
}
