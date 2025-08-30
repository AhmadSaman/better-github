'use client'

import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'

interface ScrollToTopProps {
    threshold?: number
    className?: string
    tooltipText?: string
}

const ScrollToTop = ({
    threshold = 300,
    className = 'fixed right-6 bottom-20 z-40',
    tooltipText = 'Scroll to top',
}: ScrollToTopProps) => {
    const { showScrollTop, scrollToTop } = useScrollToTop({ threshold })

    if (!showScrollTop) return null

    return (
        <div className={className}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="default"
                        size="icon"
                        onClick={scrollToTop}
                        className="h-10 w-10 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl"
                    >
                        <ArrowUp size={16} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltipText}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default ScrollToTop
