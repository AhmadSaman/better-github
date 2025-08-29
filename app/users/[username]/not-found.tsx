'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Error() {
    return (
        <section className="container m-4 mx-auto rounded-xl p-8">
            <Button
                size={'icon'}
                className="rounded-full transition-all duration-100 hover:scale-110"
                variant={'outline'}
                asChild
            >
                <Link href="/users">
                    <ArrowLeft />
                </Link>
            </Button>
            <div className="flex flex-col items-center gap-10">
                <p className="text-lg text-red-500">User not found</p>
            </div>
        </section>
    )
}

export default Error
