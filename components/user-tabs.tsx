import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChartBar, Star, Warehouse } from 'lucide-react'

export default function UserTabs() {
    return (
        <Tabs defaultValue="tab-1" className="relative w-full items-center">
            <Separator className="absolute right-0 bottom-1/2" />
            <TabsList className="h-auto gap-10 rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                    value="tab-1"
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
                    value="tab-3"
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
                    value="tab-2"
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
            <TabsContent value="tab-1">
                <p className="text-muted-foreground p-4 text-center text-xs">
                    Content for Tab 1
                </p>
            </TabsContent>
            <TabsContent value="tab-2">
                <p className="text-muted-foreground p-4 text-center text-xs">
                    Content for Tab 2
                </p>
            </TabsContent>
            <TabsContent value="tab-3">
                <p className="text-muted-foreground p-4 text-center text-xs">
                    Content for Tab 3
                </p>
            </TabsContent>
        </Tabs>
    )
}
