import RepositoryCard from './repository-card'
import { Repository } from '@/types/repository'

interface RepositoriesListProps {
    repositories: Repository[]
    className?: string
}

export default function RepositoriesList({
    repositories,
    className = 'grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3',
}: RepositoriesListProps) {
    return (
        <div>
            {repositories.length === 0 ? (
                <p>No Public repositories found.</p>
            ) : (
                <div className={className}>
                    {repositories.map((repository, index) => (
                        <RepositoryCard key={index} repository={repository} />
                    ))}
                </div>
            )}
        </div>
    )
}
