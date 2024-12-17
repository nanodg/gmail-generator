import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BulkInputProps {
    onEmailsChange: (emails: string[]) => void;
    onGenerate: () => void;
}

export function BulkInput({ onEmailsChange }: BulkInputProps) {
    const [bulkText, setBulkText] = useState('')
    const [error, setError] = useState('')

    const isValidInput = (email: string) => {
        const local = email.replace('@gmail.com', '')
        if (!/^[a-zA-Z0-9]+$/.test(local)) return false
        return true
    }

    const processEmails = (text: string) => {
        const emails = text
            .split(/[\n,]/)
            .map(e => e.trim())
            .filter(e => e && e.length > 0)

        // Validasi setiap email
        const invalidEmails = emails.filter(email => !isValidInput(email))
        if (invalidEmails.length > 0) {
            setError('Email hanya boleh mengandung huruf dan angka')
            onEmailsChange([])
            return
        }

        setError('')
        onEmailsChange(emails)
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const text = e.target?.result as string
                setBulkText(text)
                processEmails(text)
            }
            reader.readAsText(file)
        }
    }

    const emailCount = bulkText.split(/[\n,]/).filter(e => e.trim()).length

    return (
        <Card className="p-4 border bg-muted/50">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        <label className="cursor-pointer">
                            Upload CSV/TXT
                            <input
                                type="file"
                                accept=".txt,.csv"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </Button>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            {emailCount} email{emailCount !== 1 ? 's' : ''} akan digenerate
                        </span>
                        {bulkText && (
                            <Button variant="outline" onClick={() => setBulkText('')} className="ml-2 h-8 w-9 shrink-0 opacity-60 hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all">
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        )}
                    </div>
                </div>

                <Textarea
                    placeholder="Masukkan multiple email (satu per baris atau dipisahkan koma tanpa @gmail.com)"
                    value={bulkText}
                    onChange={(e) => {
                        setBulkText(e.target.value)
                        processEmails(e.target.value)
                    }}
                    className={cn(
                        "min-h-[150px] bg-background",
                        error && "border-destructive focus-visible:ring-destructive"
                    )}
                />
                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}
            </div>
        </Card>
    )
} 