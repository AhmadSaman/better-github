'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft, UserRoundX } from 'lucide-react'
import Link from 'next/link'

function NotFound() {
    return (
        <section className="container m-4 mx-auto rounded-xl p-8">
            <Button
                size={'icon'}
                className="rounded-full transition-all duration-200 hover:scale-105"
                variant={'outline'}
                asChild
            >
                <Link href="/users">
                    <ArrowLeft />
                </Link>
            </Button>
            <div className="flex flex-col items-center gap-10">
                <span className="text-muted-foreground">
                    <UserRoundX />
                </span>
                <p className="text-lg">User not found</p>
            </div>
        </section>
    )
}

export default NotFound
