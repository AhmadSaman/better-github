import React from 'react'
import UserCard from './user-card'
import { Users } from 'lucide-react'
import ScrollToTop from '../scroll-to-top'

const UserList = ({
    users,
    total,
}: {
    users: { name: string; avatarUrl: string }[]
    total: number
}) => {
    return (
        <section className="flex flex-col gap-1">
            <div className="mx-1 flex items-center gap-1 text-xs font-medium text-gray-400">
                <Users size={14} />
                <span className="font-semibold">{total}</span>
            </div>
            {users.length > 0 ? (
                <div className="grid grid-cols-2 justify-center gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                    {users.map((user) => (
                        <UserCard
                            key={user.name}
                            name={user.name}
                            avatarUrl={user.avatarUrl}
                        />
                    ))}
                </div>
            ) : (
                <div className="h-full">
                    <p className="text-center font-semibold">No result Found</p>
                </div>
            )}

            <ScrollToTop />
        </section>
    )
}

export default UserList
