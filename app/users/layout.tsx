import { Users } from 'lucide-react'
import SearchFilter from '@/components/search-filter'
import UserAdvancedFilters from '@/components/user/user-advanced-filters'

export default function UsersLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container m-4 mx-auto flex flex-col gap-6 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Users size={24} />
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <SearchFilter placeholder="Search for GitHub users by name">
                    <UserAdvancedFilters />
                </SearchFilter>
            </div>
            {children}
        </div>
    )
}
