import { octokit } from '@/config/octokit'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')

    const response = await octokit.rest.search.repos({
        q: query || '',
        page,
        per_page: 30,
    })

    return NextResponse.json(response)
}
