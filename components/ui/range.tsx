import { useId } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface RangeProps {
    value?: { min: string; max: string }
    onChange?: (value: { min: string; max: string }) => void
    label?: string
    minPlaceholder?: string
    maxPlaceholder?: string
    minAriaLabel?: string
    maxAriaLabel?: string
    className?: string
    disabled?: boolean
}

export default function Range({
    value = { min: '', max: '' },
    onChange,
    minPlaceholder = 'From',
    maxPlaceholder = 'To',
    minAriaLabel = 'Min Value',
    maxAriaLabel = 'Max Value',
    className,
    disabled = false,
}: RangeProps) {
    const id = useId()

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({ ...value, min: e.target.value })
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.({ ...value, max: e.target.value })
    }

    return (
        <div className={className}>
            <div className="flex">
                <Input
                    id={`${id}-1`}
                    className={cn(
                        'flex-1 rounded-e-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
                        { 'cursor-not-allowed opacity-50': disabled }
                    )}
                    placeholder={minPlaceholder}
                    type="number"
                    aria-label={minAriaLabel}
                    value={value.min}
                    onChange={handleMinChange}
                    disabled={disabled}
                />
                <Input
                    id={`${id}-2`}
                    className={
                        '-ms-px flex-1 rounded-s-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                    }
                    placeholder={maxPlaceholder}
                    type="number"
                    aria-label={maxAriaLabel}
                    value={value.max}
                    onChange={handleMaxChange}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}
