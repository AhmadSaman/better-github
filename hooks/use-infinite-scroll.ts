'use client'

import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function useInfiniteScroll<T>({
    initialData,
    fetchFunction,
}: {
    initialData: T[]
    fetchFunction: (page: number) => Promise<T[]>
}) {
    const [data, setData] = useState<T[]>(initialData)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [ref, inView] = useInView()

    const loadMoreData = useCallback(async () => {
        if (isLoading || !hasMore) return
        const next = page + 1
        setIsLoading(true)
        try {
            const resData = await fetchFunction(next)
            console.log(resData)
            if (resData?.length) {
                setPage(next)
                setData((prev: T[]) => [
                    ...(prev?.length ? prev : []),
                    ...resData,
                ])
            } else {
                setHasMore(false)
            }
        } finally {
            setIsLoading(false)
        }
    }, [fetchFunction, page, isLoading, hasMore])

    useEffect(() => {
        if (inView && hasMore) {
            loadMoreData()
        }
    }, [inView, loadMoreData, hasMore])

    return { ref, inView, data, hasMore, isLoading }
}
