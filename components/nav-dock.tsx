'use client'

import { Moon, Sun, Users, Warehouse } from 'lucide-react'
import { Dock, DockIcon } from './ui/dock'
import Link from 'next/link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

const setCookie = (name: string, value: string) => {
    if (typeof document === 'undefined') return

    const expires = new Date()
    expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

function NavDock() {
    const [isDark, setIsDark] = useState(false)
    const pathname = usePathname()

    const isActiveRoute = (route: string) => {
        if (route === '/') {
            return pathname === '/'
        }
        return pathname === route || pathname.startsWith(route + '/')
    }

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
    }, [])

    const toggleDarkMode = () => {
        const newDarkMode = !isDark
        setIsDark(newDarkMode)

        if (newDarkMode) {
            document.documentElement.classList.add('dark')
            setCookie('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            setCookie('theme', 'light')
        }
    }

    return (
        <Dock
            direction="middle"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 gap-2 shadow-md"
            iconMagnification={50}
        >
            <DockIcon>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={
                                isActiveRoute('/repositories')
                                    ? 'default'
                                    : 'ghost'
                            }
                            asChild
                        >
                            <Link href="/repositories">
                                <Warehouse size={16} />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Repositories</p>
                    </TooltipContent>
                </Tooltip>
            </DockIcon>
            <DockIcon>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={
                                isActiveRoute('/users') ? 'default' : 'ghost'
                            }
                            asChild
                        >
                            <Link href="/users">
                                <Users size={16} />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Users</p>
                    </TooltipContent>
                </Tooltip>
            </DockIcon>
            <Separator orientation="vertical" className="h-full" />
            <DockIcon>
                <Button variant={'ghost'} onClick={toggleDarkMode}>
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
            </DockIcon>
        </Dock>
    )
}

export default NavDock
