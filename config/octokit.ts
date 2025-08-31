import { Octokit } from 'octokit'
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export const octokit = new Octokit({
    auth: `${GITHUB_TOKEN}`,
})
