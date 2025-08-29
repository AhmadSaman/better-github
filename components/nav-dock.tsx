'use client'

import { Moon, Users, Warehouse } from 'lucide-react'
import { Dock, DockIcon } from './ui/dock'
import Link from 'next/link'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

function NavDock() {
    return (
        <Dock
            direction="middle"
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 shadow-md"
            iconMagnification={50}
        >
            <DockIcon>
                <Button variant={'ghost'} asChild>
                    <Link href="/repositories">
                        <Warehouse size={16} />
                    </Link>
                </Button>
            </DockIcon>
            <DockIcon>
                <Button variant={'ghost'} asChild>
                    <Link href="/users">
                        <Users size={16} />
                    </Link>
                </Button>
            </DockIcon>
            <Separator orientation="vertical" className="h-full" />
            <DockIcon>
                <Button variant={'ghost'}>
                    <Moon size={16} />
                </Button>
            </DockIcon>
        </Dock>
    )
}

export default NavDock
