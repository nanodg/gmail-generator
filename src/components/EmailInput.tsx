import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"

interface EmailInputProps {
    localPart: string;
    onLocalPartChange: (value: string) => void;
    onGenerate: () => void;
}

export function EmailInput({ localPart, onLocalPartChange, onGenerate }: EmailInputProps) {
    return (
        <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
                <Input
                    className="w-full pr-[85px]"
                    placeholder="Masukkan username Gmail..."
                    value={localPart}
                    onChange={(e) => onLocalPartChange(e.target.value.toLowerCase())}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    @gmail.com
                </span>
            </div>
            <Button
                onClick={onGenerate}
                className="md:w-auto w-full gap-2"
            >
                <Wand2 className="h-4 w-4" />
                Generate
            </Button>
        </div>
    )
} 