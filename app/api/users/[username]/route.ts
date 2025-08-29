import { octokit } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } }
) {
    const response = await octokit.rest.users.getByUsername({
        username: await params.username!,
    })

    const data = response
    return NextResponse.json(data)
}
