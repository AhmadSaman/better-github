import { octokit } from '@/config/octokit'
import { NextResponse } from 'next/server'

export async function GET() {
    const response = await octokit.rest.users.getAuthenticated()
    return NextResponse.json(response.data)
}
