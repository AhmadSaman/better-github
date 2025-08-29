import { octokit } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    const response = await octokit.rest.search.users({
        q: query || '',
    })

    const data = response
    return NextResponse.json(data)
}
