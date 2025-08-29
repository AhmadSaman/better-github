import { useState, useEffect } from 'react'

interface UseScrollToTopOptions {
    threshold?: number
}

export const useScrollToTop = ({
    threshold = 300,
}: UseScrollToTopOptions = {}) => {
    const [showScrollTop, setShowScrollTop] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > threshold)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [threshold])

    return {
        showScrollTop,
        scrollToTop,
    }
}
