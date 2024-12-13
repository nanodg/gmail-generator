import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Download } from "lucide-react"
import { EmailVariation } from "@/types/email"

interface VariationsResultProps {
    type: string;
    variations: string[];
    onCopy: (text: string) => Promise<void>;
    onDownload: (type: keyof EmailVariation) => void;
}

export function VariationsResult({ type, variations, onCopy, onDownload }: VariationsResultProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Variations
                </Label>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload(`${type}Variations` as keyof EmailVariation)}
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCopy(variations.join('\n'))}
                        className="gap-2"
                    >
                        <Copy className="h-4 w-4" />
                        Copy All
                    </Button>
                </div>
            </div>
            <Card className="border bg-muted/50">
                <CardContent className="p-3">
                    <Textarea
                        readOnly
                        value={variations.join('\n')}
                        className="min-h-[200px] font-mono text-sm bg-background"
                        placeholder={`${type.charAt(0).toUpperCase() + type.slice(1)} variations will appear here...`}
                    />
                </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">
                Total: {variations.length} variations
            </p>
        </div>
    )
} 