import React from 'react'
import UserCard from './user-card'

const UsersList = ({
    users,
}: {
    users: { name: string; avatarUrl: string }[]
}) => {
    return (
        <section className="flex flex-wrap gap-5">
            {users.map((user) => (
                <UserCard
                    key={user.name}
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                />
            ))}
        </section>
    )
}

export default UsersList
