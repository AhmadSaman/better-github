import { NextRequest } from 'next/server'
import { Octokit } from 'octokit'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('q')
        const octokit = new Octokit({
            auth: `${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        })

        const response = await octokit.rest.search.users({
            q: query || '',
        })

        const data = response
        return Response.json(data)
    } catch (error) {
        console.log(error)
    }
}
