import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { cn } from "@/lib/utils"

interface EmailInputProps {
    localPart: string;
    onLocalPartChange: (value: string) => void;
    onGenerate: () => void;
    isLoading?: boolean;
}

export function EmailInput({ localPart, onLocalPartChange, onGenerate, isLoading }: EmailInputProps) {
    const local = localPart.replace('@gmail.com', '')
    const isInvalid = local.length > 0 && (
        local.length < 3 ||
        !/^[a-zA-Z0-9]+$/.test(local)
    )

    const getErrorMessage = () => {
        if (local.length < 3) return "Username email minimal 3 karakter"
        if (!/^[a-zA-Z0-9]+$/.test(local)) return "Email hanya boleh mengandung huruf dan angka"
        return ""
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                    <Input
                        className={cn(
                            "w-full pr-[85px]",
                            isInvalid && "border-destructive focus-visible:ring-destructive"
                        )}
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
                    disabled={!localPart.trim() || isLoading || isInvalid}
                >
                    {isLoading ? (
                        <LoadingSpinner size="sm" />
                    ) : (
                        <Wand2 className="h-4 w-4" />
                    )}
                    {isLoading ? 'Generating...' : 'Generate'}
                </Button>
            </div>
            {isInvalid && (
                <p className="text-sm text-destructive">
                    {getErrorMessage()}
                </p>
            )}
        </div>
    )
} 