import { type RefObject, useCallback, useRef } from 'react'

type UseDebounceReturns = [
    (callback: () => void, timeout: number) => void,
    RefObject<NodeJS.Timeout | null>,
]

export default function useDebounce(): UseDebounceReturns {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const trigger = useCallback((callback: () => void, timeout: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => {
            callback()
            timeoutRef.current = null
        }, timeout)
    }, [])

    return [trigger, timeoutRef]
}
