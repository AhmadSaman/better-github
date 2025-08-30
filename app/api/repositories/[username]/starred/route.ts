import { octokit } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ username: string }> }
) {
    const { username } = await context.params

    const response = await octokit.rest.activity.listReposStarredByUser({
        username: username,
    })
    return NextResponse.json(response)
}
