'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Lightbulb, MapPin, Users, GitBranch } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import Range from '@/components/ui/range'
import { Separator } from '../ui/separator'

import useDebounce from '@/hooks/use-debounce'

const UserAdvancedFilters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const [location, setLocation] = useState('')

    const [followerRange, setFollowerRange] = useState({ min: '', max: '' })
    const [repoRange, setRepoRange] = useState({ min: '', max: '' })

    const [debouncedUpdateParams] = useDebounce()

    const hasSearch = searchParams.get('search')?.trim()

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLocation = e.target.value
        setLocation(newLocation)
        debouncedUpdateParams(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (newLocation.trim()) {
                params.set('location', newLocation.trim())
            } else {
                params.delete('location')
            }
            router.push(`?${params.toString()}`)
        }, 500)
    }

    const handleFollowerRangeChange = (range: { min: string; max: string }) => {
        setFollowerRange(range)
        debouncedUpdateParams(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (range.min || range.max) {
                if (range.min) params.set('min_followers', range.min)
                if (range.max) params.set('max_followers', range.max)
            } else {
                params.delete('min_followers')
                params.delete('max_followers')
            }
            router.push(`?${params.toString()}`)
        }, 500)
    }

    const handleRepoRangeChange = (range: { min: string; max: string }) => {
        setRepoRange(range)
        debouncedUpdateParams(() => {
            const params = new URLSearchParams(searchParams.toString())
            if (range.min || range.max) {
                if (range.min) params.set('min_repos', range.min)
                if (range.max) params.set('max_repos', range.max)
            } else {
                params.delete('min_repos')
                params.delete('max_repos')
            }
            router.push(`?${params.toString()}`)
        }, 500)
    }

    const removeFilter = (filterType: string) => {
        const params = new URLSearchParams(searchParams.toString())

        switch (filterType) {
            case 'location':
                setLocation('')
                params.delete('location')
                break
            case 'followerRange':
                setFollowerRange({ min: '', max: '' })
                params.delete('min_followers')
                params.delete('max_followers')
                break
            case 'repoRange':
                setRepoRange({ min: '', max: '' })
                params.delete('min_repos')
                params.delete('max_repos')
                break
        }

        router.push(`?${params.toString()}`)
    }

    const handleClearAll = () => {
        setLocation('')

        setFollowerRange({ min: '', max: '' })
        setRepoRange({ min: '', max: '' })

        const params = new URLSearchParams(searchParams.toString())
        params.delete('location')

        params.delete('min_followers')
        params.delete('max_followers')
        params.delete('min_repos')
        params.delete('max_repos')

        router.push(`?${params.toString()}`)
    }

    const hasActiveFilters =
        location ||
        followerRange.min ||
        followerRange.max ||
        repoRange.min ||
        repoRange.max

    useEffect(() => {
        const existingLocation = searchParams.get('location')
        const minFollowers = searchParams.get('min_followers')
        const maxFollowers = searchParams.get('max_followers')
        const minRepos = searchParams.get('min_repos')
        const maxRepos = searchParams.get('max_repos')

        if (existingLocation) setLocation(existingLocation)

        if (minFollowers || maxFollowers) {
            setFollowerRange({
                min: minFollowers || '',
                max: maxFollowers || '',
            })
        }
        if (minRepos || maxRepos) {
            setRepoRange({
                min: minRepos || '',
                max: maxRepos || '',
            })
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex w-full flex-col gap-1">
                    <Input
                        placeholder="City, Country"
                        value={location}
                        onChange={handleLocationChange}
                        disabled={!hasSearch}
                        className="disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div className="flex w-full flex-col gap-1">
                    <Range
                        value={followerRange}
                        onChange={handleFollowerRangeChange}
                        minPlaceholder="Min followers"
                        maxPlaceholder="Max followers"
                        minAriaLabel="Minimum followers"
                        maxAriaLabel="Maximum followers"
                        className="w-full disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!hasSearch}
                    />
                </div>

                <div className="flex w-full flex-col gap-1">
                    <Range
                        value={repoRange}
                        onChange={handleRepoRangeChange}
                        minPlaceholder="Min repos"
                        maxPlaceholder="Max repos"
                        minAriaLabel="Minimum repositories"
                        maxAriaLabel="Maximum repositories"
                        className="w-full disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={!hasSearch}
                    />
                </div>
            </div>
            {hasActiveFilters && hasSearch && (
                <>
                    <Separator />
                    <div className="flex h-6 flex-wrap gap-2">
                        {location && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                <MapPin size={12} />
                                {location}
                                <button
                                    onClick={() => removeFilter('location')}
                                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        )}

                        {(followerRange.min || followerRange.max) && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                <Users size={12} />
                                Followers: {followerRange.min || '0'} -{' '}
                                {followerRange.max || '∞'}
                                <button
                                    onClick={() =>
                                        removeFilter('followerRange')
                                    }
                                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        )}

                        {(repoRange.min || repoRange.max) && (
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                            >
                                <GitBranch size={12} />
                                Repos: {repoRange.min || '0'} -{' '}
                                {repoRange.max || '∞'}
                                <button
                                    onClick={() => removeFilter('repoRange')}
                                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                                >
                                    <X size={12} />
                                </button>
                            </Badge>
                        )}

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearAll}
                            className="ml-auto flex h-full items-center gap-2 text-xs"
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

export default UserAdvancedFilters
