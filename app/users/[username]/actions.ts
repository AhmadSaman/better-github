'use server'

import { buildUrl, getHeaders } from '@/config/url'
import { OctokitUserRepositoriesType, OctokitUserType } from '@/types/github'
import { Repository } from '@/types/repository'

export async function getUser({ username }: { username: string }) {
    const response = await fetch(buildUrl(`/api/users/${username}`), {
        headers: getHeaders(),
        cache: 'force-cache',
    })

    if (!response.ok) {
        return null
    }
    const data: OctokitUserType['data'] = await response.json()

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

export async function getUserStarredRepositories({
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

export async function getUserRepositories({
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
