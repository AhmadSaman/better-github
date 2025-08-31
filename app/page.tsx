import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Warehouse } from 'lucide-react'

export default function Home() {
    return (
        <div className="container mx-auto flex h-screen flex-col justify-center">
            <div className="mx-auto flex max-w-3xl flex-col gap-5 md:w-1/3">
                <div className="flex items-center gap-4 p-4">
                    <div className="flex flex-col gap-4 text-center">
                        <h1 className="text-4xl font-bold">Better GitHub</h1>
                        <p>
                            A lightweight web app that uses the GitHub API to
                            fetch repositories and users with advanced
                            filtering, helpful UI components for fast
                            exploration.
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Explore public GitHub repositories and users. Apply
                            filters like stars, languages, followers and
                            repositories to narrow results.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-2 p-4 md:flex-row">
                    <Button
                        className="h-fit rounded-lg border p-4"
                        size={'lg'}
                        variant={'secondary'}
                        asChild
                    >
                        <Link
                            href="/repositories"
                            className="flex flex-col no-underline"
                            aria-label="View users"
                        >
                            <Warehouse className="size-6" />
                            <p className="">Explore Repositories</p>
                        </Link>
                    </Button>
                    <Button
                        className="h-fit rounded-lg border p-4"
                        size={'lg'}
                        variant={'secondary'}
                        asChild
                    >
                        <Link
                            href="/users"
                            className="flex flex-col no-underline"
                            aria-label="View users"
                        >
                            <Users className="size-6" />
                            <p className="">Explore Users</p>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
