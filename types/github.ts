import { octokit } from '@/config/octokit'
import { GetResponseTypeFromEndpointMethod } from '@octokit/types'

export type OctokitUserType = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.users.getByUsername
>

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

export type OctokitRepositoriesType = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.search.repos
>

export type OctokitAuthenticatedUser = GetResponseTypeFromEndpointMethod<
    typeof octokit.rest.users.getAuthenticated
>
