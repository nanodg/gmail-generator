import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { VariationsResult } from "./VariationsResult"
import { EmailVariation } from "@/types/email"

interface VariationsResultTabsProps {
    isLoading: boolean;
    result: EmailVariation;
    onCopy: (text: string) => Promise<void>;
    onDownload: (type: keyof EmailVariation) => void;
    viewMode: 'list' | 'grid';
    sortBy: 'alpha' | 'length';
}

export function VariationsResultTabs({
    isLoading,
    result,
    onCopy,
    onDownload,
    viewMode,
    sortBy
}: VariationsResultTabsProps) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-muted-foreground">Generating email variations...</p>
            </div>
        )
    }

    return (
        <Tabs defaultValue="dot" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="dot">Dot Variations</TabsTrigger>
                <TabsTrigger value="plus">Plus Variations</TabsTrigger>
                <TabsTrigger value="mix">Mix Variations</TabsTrigger>
            </TabsList>

            {['dot', 'plus', 'mix'].map((type) => (
                <TabsContent key={type} value={type}>
                    <VariationsResult
                        type={type}
                        variations={result[`${type}Variations` as keyof EmailVariation]}
                        onCopy={onCopy}
                        onDownload={onDownload}
                        viewMode={viewMode}
                        sortBy={sortBy}
                    />
                </TabsContent>
            ))}
        </Tabs>
    )
} 