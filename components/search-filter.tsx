'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSearchParams, useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const SearchFilter = () => {
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
        <section className="flex flex-col gap-2">
            <div className="sticky top-0 flex gap-2">
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
                <div className="flex items-center space-x-1">
                    <Switch id="airplane-mode" className="scale-90" />
                    <Label
                        htmlFor="advanced-mode"
                        className="text-xs text-gray-500"
                    >
                        Advanced Mode
                    </Label>
                </div>
            </div>
        </section>
    )
}

export default SearchFilter
