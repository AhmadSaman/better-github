'use client'

import React, { ReactNode, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSearchParams, useRouter } from 'next/navigation'

const SearchFilter = ({ children }: { children: ReactNode }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [value, setValue] = useState(searchParams.get('search') || '')

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (value.trim()) {
            params.set('search', value.trim())
        } else {
            params.delete('search')
        }

        router.push(`?${params.toString()}`)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
        }
    }

    return (
        <section className="flex flex-col">
            <div className="flex gap-2">
                <Input
                    className="w-full"
                    placeholder="Search for Github Users"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <div>
                <div className="bg-card mt-4 space-y-4 rounded-lg border p-4">
                    {children}
                </div>
            </div>
        </section>
    )
}

export default SearchFilter
