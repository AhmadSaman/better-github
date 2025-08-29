'use client'

import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useSearchParams, useRouter } from 'next/navigation'
import { Label } from './ui/label'
import { Switch } from './ui/switch'

const UserFilter = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [value, setValue] = useState(searchParams.get('username') || '')

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (value.trim()) {
            params.set('username', value.trim())
        } else {
            params.delete('username')
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

export default UserFilter
