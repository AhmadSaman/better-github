'use client'

import SearchFilter from '@/components/search-filter'
import UserAdvancedFilters from '@/components/user/user-advanced-filters'
import { UserRoundX, Users } from 'lucide-react'

function NotFound() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Users size={24} />
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>
                <SearchFilter placeholder="Search for GitHub users by name">
                    <UserAdvancedFilters />
                </SearchFilter>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <UserRoundX size={64} className="text-muted-foreground" />
                <div className="space-y-2">
                    <h2 className="text-muted-foreground text-xl font-semibold">
                        Users
                    </h2>
                    <p className="text-muted-foreground max-w-md">
                        No Result Found.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NotFound
