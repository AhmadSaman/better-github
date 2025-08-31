'use server'

import { buildUrl, getHeaders } from '@/config/url'
import { OctokitRepositoriesType } from '@/types/github'
import { Repository, RepositoryFilterParams } from '@/types/repository'

export async function getRepositories({
    search,
    username,
    min_stars,
    max_stars,
    languages,
    page = 1,
}: {
    page?: number
} & RepositoryFilterParams) {
    let query = search

    if (username) {
        query += ` user:${username}`
    }

    if (min_stars || max_stars) {
        if (min_stars && max_stars) {
            query += ` stars:${min_stars}..${max_stars}`
        } else if (min_stars) {
            query += ` stars:>=${min_stars}`
        } else if (max_stars) {
            query += ` stars:<=${max_stars}`
        }
    }

    if (languages) {
        const languageList = languages.split(',').map((lang) => lang.trim())
        languageList.forEach((lang) => {
            query += ` language:${lang}`
        })
    }
    const searchParams = new URLSearchParams({
        q: query.trim(),
        page: page.toString(),
    })

    const response = await fetch(buildUrl('/api/repositories', searchParams), {
        headers: getHeaders(),
        cache: 'no-cache',
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
