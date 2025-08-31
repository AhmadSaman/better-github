import { octokit } from '@/config/octokit'
import { PER_PAGE } from '@/constants/general'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')

    const response = await octokit.rest.search.users({
        q: query || '',
        per_page: PER_PAGE,
        page,
    })

    return NextResponse.json(response)
}
