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

export async function fetchGitHubUsers() {
    const searchParams = new URLSearchParams({
        q: 'location:iraq',
    })
    const response = await fetch(buildUrl('/api/users', searchParams), {
        headers: getHeaders(),
    })

    if (!response.ok) {
        throw new Error('Failed to fetch users')
    }
    const { data } = await response.json()
    console.log(data)
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
