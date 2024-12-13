import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailInput } from './EmailInput'
import { CustomVariationsInput } from './CustomVariationsInput'
import { BulkInput } from './BulkInput'
import { Button } from "@/components/ui/button"
import { Wand2 } from 'lucide-react'

interface TabsContainerProps {
    activeTab: string;
    onTabChange: (value: string) => void;
    localPart: string;
    onLocalPartChange: (value: string) => void;
    onGenerate: () => void;
    bulkEmails: string[];
    onBulkEmailsChange: (emails: string[]) => void;
    customSuffixes: string[];
    onSuffixesChange: (suffixes: string[]) => void;
}

export function TabsContainer({
    activeTab,
    onTabChange,
    localPart,
    onLocalPartChange,
    onGenerate,
    bulkEmails,
    onBulkEmailsChange,
    customSuffixes,
    onSuffixesChange
}: TabsContainerProps) {
    return (
        <Tabs value={activeTab} className="w-full" onValueChange={onTabChange}>
            <TabsList>
                <TabsTrigger value="single">Single Email</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Generate</TabsTrigger>
            </TabsList>
            <TabsContent value="single">
                <div className="space-y-6">
                    <EmailInput
                        localPart={localPart}
                        onLocalPartChange={onLocalPartChange}
                        onGenerate={onGenerate}
                    />
                    <CustomVariationsInput
                        onSuffixesChange={onSuffixesChange}
                        suffixes={customSuffixes}
                    />
                </div>
            </TabsContent>
            <TabsContent value="bulk">
                <div className="space-y-6">
                    <BulkInput
                        onEmailsChange={onBulkEmailsChange}
                        onGenerate={onGenerate}
                    />
                    <CustomVariationsInput
                        onSuffixesChange={onSuffixesChange}
                        suffixes={customSuffixes}
                    />
                    <Button
                        onClick={onGenerate}
                        className="w-full gap-2 py-3"
                        size="lg"
                        disabled={bulkEmails.length === 0}
                    >
                        <Wand2 className="h-5 w-5" />
                        Generate {bulkEmails.length > 0 ? `${bulkEmails.length} Email` : ''}
                    </Button>
                </div>
            </TabsContent>
        </Tabs>
    )
}