import { CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import { InfoDialog } from './InfoDialog'
import { ModeToggle } from './mode-toggle'

export function GmailHeader() {
    return (
        <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-center flex-1 gap-2">
                    <CardTitle className="text-2xl font-bold text-center">
                        Gmail Generator Tool
                    </CardTitle>
                    <InfoDialog />
                </div>
                <ModeToggle />
            </div>
            <CardDescription className="text-base">
                Generate variasi email Gmail dengan dot (.) dan plus (+)
            </CardDescription>
        </CardHeader>
    )
}