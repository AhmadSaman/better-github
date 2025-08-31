'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Plus, Lightbulb } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import Range from '@/components/ui/range'
import { Separator } from '../ui/separator'
import useDebounce from '@/hooks/use-debounce'

const RepositoryAdvancedFilters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [starredRange, setStarredRange] = useState({ min: '', max: '' })
    const [languages, setLanguages] = useState<
        { value: string; label: string }[]
    >([])
    const [languageInput, setLanguageInput] = useState('')

    const [debouncedUpdateParams] = useDebounce()

    const hasSearch = searchParams.get('search')?.trim()

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value
        setUsername(newUsername)
        debouncedUpdateParams(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (newUsername.trim()) {
                params.set('username', newUsername.trim())
            } else {
                params.delete('username')
            }
            router.push(`?${params.toString()}`)
        }, 500)
    }

    const handleStarredRangeChange = (range: { min: string; max: string }) => {
        setStarredRange(range)
        debouncedUpdateParams(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (range.min || range.max) {
                if (range.min) params.set('min_stars', range.min)
                if (range.max) params.set('max_stars', range.max)
            } else {
                params.delete('min_stars')
                params.delete('max_stars')
            }
            router.push(`?${params.toString()}`)
        }, 500)
    }

    const handleLanguagesChange = (
        selectedLanguages: { value: string; label: string }[]
    ) => {
        setLanguages(selectedLanguages)
        debouncedUpdateParams(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (selectedLanguages.length > 0) {
                params.set(
                    'languages',
                    selectedLanguages.map((lang) => lang.value).join(',')
                )
            } else {
                params.delete('languages')
            }
            router.push(`?${params.toString()}`)
        }, 500)
    }

    const addLanguage = () => {
        const trimmedInput = languageInput.trim()
        if (
            trimmedInput &&
            !languages.some(
                (lang) =>
                    lang.value.toLowerCase() === trimmedInput.toLowerCase()
            )
        ) {
            const newLanguage = {
                value: trimmedInput.toLowerCase(),
                label:
                    trimmedInput.charAt(0).toUpperCase() +
                    trimmedInput.slice(1),
            }
            const updatedLanguages = [...languages, newLanguage]
            handleLanguagesChange(updatedLanguages)
            setLanguageInput('')
        }
    }

    const handleLanguageInputKeyPress = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addLanguage()
        }
    }

    const removeFilter = (filterType: string, filterValue?: string) => {
        const params = new URLSearchParams(searchParams.toString())

        switch (filterType) {
            case 'username':
                setUsername('')
                params.delete('username')
                break
            case 'starredRange':
                setStarredRange({ min: '', max: '' })
                params.delete('min_stars')
                params.delete('max_stars')
                break
            case 'languages':
                if (filterValue) {
                    const newLanguages = languages.filter(
                        (lang) => lang.value !== filterValue
                    )
                    setLanguages(newLanguages)
                    if (newLanguages.length > 0) {
                        params.set(
                            'languages',
                            newLanguages.map((lang) => lang.value).join(',')
                        )
                    } else {
                        params.delete('languages')
                    }
                }
                break
        }

        router.push(`?${params.toString()}`)
    }

    const handleClearAll = () => {
        setUsername('')
        setStarredRange({ min: '', max: '' })
        setLanguages([])

        const params = new URLSearchParams(searchParams.toString())
        params.delete('username')
        params.delete('min_stars')
        params.delete('max_stars')
        params.delete('languages')

        router.push(`?${params.toString()}`)
    }

    const hasActiveFilters =
        username || starredRange.min || starredRange.max || languages.length > 0

    useEffect(() => {
        const existingUsername = searchParams.get('username')
        const minStars = searchParams.get('min_stars')
        const maxStars = searchParams.get('max_stars')
        const existingLanguages = searchParams.get('languages')

        if (existingUsername) setUsername(existingUsername)
        if (minStars || maxStars) {
            setStarredRange({
                min: minStars || '',
                max: maxStars || '',
            })
        }
        if (existingLanguages) {
            const languageValues = existingLanguages.split(',')
            const languageOptions = languageValues.map((lang) => ({
                value: lang.trim(),
                label:
                    lang.trim().charAt(0).toUpperCase() + lang.trim().slice(1),
            }))
            setLanguages(languageOptions)
        }
    }, [searchParams])

    return (
        <div className="space-y-4">
            {!hasSearch && (
                <div className="bg-muted text-muted-foreground flex w-fit items-center gap-1 rounded-md p-2 text-center text-xs">
                    <span className="inline-flex items-center">
                        <Lightbulb size={14} />
                    </span>
                    Enter a search query above to enable advanced filters
                </div>
            )}
            <div className="flex flex-col items-center gap-3 md:flex-row">
                <div className="flex w-full flex-1 flex-col gap-1">
                    <Input
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        disabled={!hasSearch}
                        className={
                            'disabled:cursor-not-allowed disabled:opacity-50'
                        }
                    />
                </div>

                <div className="flex w-full flex-1 flex-col gap-1">
                    <Range
                        value={starredRange}
                        onChange={handleStarredRangeChange}
                        minPlaceholder="Min stars"
                        maxPlaceholder="Max stars"
                        minAriaLabel="Minimum stars"
                        maxAriaLabel="Maximum stars"
                        className={
                            'w-full disabled:cursor-not-allowed disabled:opacity-50'
                        }
                        disabled={!hasSearch}
                    />
                </div>

                <div className="flex w-full flex-1 flex-col gap-1">
                    <div className="relative">
                        <Input
                            placeholder="Programming language..."
                            value={languageInput}
                            onChange={(e) => setLanguageInput(e.target.value)}
                            onKeyDown={handleLanguageInputKeyPress}
                            className={
                                'disabled:cursor-not-allowed disabled:opacity-50'
                            }
                            disabled={!hasSearch}
                        />
                        <Button
                            type="button"
                            size="sm"
                            onClick={addLanguage}
                            disabled={!languageInput.trim() || !hasSearch}
                            className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0"
                        >
                            <Plus size={16} />
                        </Button>
                    </div>
                </div>
            </div>
            {hasActiveFilters && hasSearch && (
                <>
                    <Separator />
                    <div className="flex h-6 flex-wrap gap-2">
                        {username && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                Username: {username}
                                <button
                                    onClick={() => removeFilter('username')}
                                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        )}

                        {(starredRange.min || starredRange.max) && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                Stars: {starredRange.min || '0'} -{' '}
                                {starredRange.max || '∞'}
                                <button
                                    onClick={() => removeFilter('starredRange')}
                                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        )}

                        {languages.map((lang) => (
                            <Badge
                                key={lang.value}
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                {lang.label}
                                <button
                                    onClick={() =>
                                        removeFilter('languages', lang.value)
                                    }
                                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearAll}
                            className="ml-auto flex h-full items-center gap-2"
                        >
                            <X size={16} />
                            Clear All
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default RepositoryAdvancedFilters
