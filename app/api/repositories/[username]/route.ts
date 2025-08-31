import { octokit } from '@/config/octokit'
import { PER_PAGE } from '@/constants/general'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ username: string }> }
) {
    const { username } = await context.params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const response = await octokit.rest.repos.listForUser({
        username: username,
        page,
        per_page: PER_PAGE,
    })

    return NextResponse.json(response)
}
