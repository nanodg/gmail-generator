import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface CustomVariationsInputProps {
    onSuffixesChange: (suffixes: string[]) => void;
    suffixes?: string[];
}

export function CustomVariationsInput({ onSuffixesChange, suffixes = [] }: CustomVariationsInputProps) {
    const [suffixInput, setSuffixInput] = useState('')
    const [customSuffixes, setCustomSuffixes] = useState<string[]>(suffixes)
    const [error, setError] = useState('')

    useEffect(() => {
        setCustomSuffixes(suffixes)
    }, [suffixes])

    const isValidSuffix = (suffix: string) => {
        if (!suffix) return false
        if (!/^[a-zA-Z0-9]+$/.test(suffix)) return false
        return true
    }

    const handleAddSuffix = () => {
        if (!isValidSuffix(suffixInput)) {
            setError('Suffix hanya boleh mengandung huruf dan angka')
            return
        }

        if (customSuffixes.includes(suffixInput)) {
            setError('Suffix sudah ada')
            return
        }

        setError('')
        const newSuffixes = [...customSuffixes, suffixInput]
        setCustomSuffixes(newSuffixes)
        onSuffixesChange(newSuffixes)
        setSuffixInput('')
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddSuffix()
        }
    }

    const handleRemoveSuffix = (suffix: string) => {
        const newSuffixes = customSuffixes.filter(s => s !== suffix)
        setCustomSuffixes(newSuffixes)
        onSuffixesChange(newSuffixes)
    }

    const handleClearAll = () => {
        setCustomSuffixes([])
        onSuffixesChange([])
    }

    return (
        <div>
            <div className="space-y-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <Input
                            placeholder="Add custom suffix (e.g. work, shop)"
                            value={suffixInput}
                            onChange={(e) => {
                                setSuffixInput(e.target.value)
                                setError('')
                            }}
                            onKeyPress={handleKeyPress}
                            className={cn(
                                error && "border-destructive focus-visible:ring-destructive"
                            )}
                        />
                        {error && (
                            <p className="text-sm text-destructive mt-1">
                                {error}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleAddSuffix}
                            className="gap-2"
                            disabled={!suffixInput || customSuffixes.includes(suffixInput)}
                        >
                            <Plus className="h-4 w-4" />
                            Add
                        </Button>
                        {customSuffixes.length > 0 && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleClearAll}
                                title="Clear all suffixes"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {customSuffixes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {customSuffixes.map((suffix) => (
                            <Badge key={suffix} variant="secondary" className="px-3 py-1">
                                {suffix}
                                <button
                                    onClick={() => handleRemoveSuffix(suffix)}
                                    className="ml-2 hover:text-destructive"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
            <Separator className="my-6" />
        </div>
    )
} 