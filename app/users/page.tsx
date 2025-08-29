import UsersList from '@/components/users-list'
import { fetchGitHubUsers } from '@/lib/github'

export default async function UsersPage() {
    const { users, totalCount } = await fetchGitHubUsers()
    console.log(users)
    return (
        <main className="container mx-auto">
            total count:{totalCount}
            <UsersList users={users} />
        </main>
    )
}
