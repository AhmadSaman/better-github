import { GetResponseTypeFromEndpointMethod } from '@octokit/types'
import { Octokit } from 'octokit'
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export const octokit = new Octokit({
    auth: `${GITHUB_TOKEN}`,
})

export type OctokitUserType = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.users.getByUsername
>['data']

export type OctokitUsersType = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.search.users
>

export type OctokitUserRepositoriesType = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.repos.listForUser
>

export type OctokitUserStarredRepositoriesType =
    GetResponseTypeFromEndpointMethod<
        typeof octokit.rest.activity.listReposStarredByUser
    >
