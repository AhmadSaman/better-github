import { Warehouse } from 'lucide-react'
import SearchFilter from '@/components/search-filter'
import RepositoryAdvancedFilters from '@/components/repository/repository-advanced-filters'

export default function RepositoriesLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container m-4 mx-auto flex flex-col gap-6 rounded-xl p-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Warehouse size={24} />
                    <h1 className="text-2xl font-bold">Repositories</h1>
                </div>
                <SearchFilter placeholder="Search for GitHub repositories by name, or other criteria">
                    <RepositoryAdvancedFilters />
                </SearchFilter>
            </div>
            {children}
        </div>
    )
}
