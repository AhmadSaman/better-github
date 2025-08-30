import React from 'react'
import RepositoryCard from './repository-card'
import { Repository } from '@/types/repository'

interface RepositoriesListProps {
    repositories: Repository[]
}

export default function RepositoriesList({
    repositories,
}: RepositoriesListProps) {
    return (
        <div>
            {repositories.length === 0 ? (
                <p>No Public repositories found.</p>
            ) : (
                <div
                    className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
                >
                    {repositories.map((repository, index) => (
                        <RepositoryCard key={index} repository={repository} />
                    ))}
                </div>
            )}
        </div>
    )
}
