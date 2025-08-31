'use server'

import { buildUrl, getHeaders } from '@/config/url'
import { OctokitAuthenticatedUser } from '@/types/github'

export async function getAuthenticatedUser() {
    const response = await fetch(buildUrl('/api/user/authenticated'), {
        headers: getHeaders(),
    })
    if (!response.ok) {
        return null
    }

    const data: OctokitAuthenticatedUser['data'] = await response.json()
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
