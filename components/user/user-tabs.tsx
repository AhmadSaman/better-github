import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartBar, Star, Warehouse } from 'lucide-react'
import UserRepositories from './user-repositories'

export default function UserTabs({ username }: { username: string }) {
    return (
        <Tabs
            defaultValue="repositories"
            className="relative w-full items-center"
        >
            <TabsList className="h-auto gap-10 rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                    value="repositories"
                    className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    <Warehouse
                        className="mb-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                    Repositories
                </TabsTrigger>

                <TabsTrigger
                    value="charts"
                    className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    <ChartBar
                        className="mb-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                    Charts
                </TabsTrigger>
                <TabsTrigger
                    value="starred"
                    className="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                    <Star
                        className="mb-1.5 opacity-60"
                        size={16}
                        aria-hidden="true"
                    />
                    Starred
                </TabsTrigger>
            </TabsList>
            <TabsContent value="repositories">
                <UserRepositories username={username} />
            </TabsContent>
            <TabsContent value="charts">
                <p className="text-muted-foreground p-4 text-center text-xs">
                    charts goes here
                </p>
            </TabsContent>
            <TabsContent value="starred">
                <p className="text-muted-foreground p-4 text-center text-xs">
                    starred repos goe here
                </p>
            </TabsContent>
        </Tabs>
    )
}
