import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { EmailVariation } from '@/types/email'
import { EmailInput } from './EmailInput'
import { VariationsResult } from './VariationsResult'
import { generateDotVariations, generateMixVariations, generatePlusVariations } from '@/lib/email-generator'
import { ModeToggle } from './mode-toggle'
import { InfoDialog } from './InfoDialog'

export function GmailGenerator() {
    const [localPart, setLocalPart] = useState('')
    const [result, setResult] = useState<EmailVariation>({
        dotVariations: [],
        plusVariations: [],
        mixVariations: []
    })
    const { toast } = useToast()

    // Helper functions
    const getFullEmail = (local: string) => {
        return local.includes('@gmail.com') ? local : `${local}@gmail.com`
    }

    const isValidInput = (input: string) => {
        const local = input.replace('@gmail.com', '')
        return local.length > 0 && /^[a-zA-Z0-9]+$/.test(local)
    }

    // Handlers
    const handleGenerate = () => {
        if (!localPart) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Mohon masukkan alamat email",
            })
            return
        }

        if (!isValidInput(localPart)) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Email hanya boleh mengandung huruf dan angka",
            })
            return
        }

        const fullEmail = getFullEmail(localPart)

        setResult({
            dotVariations: generateDotVariations(fullEmail),
            plusVariations: generatePlusVariations(fullEmail),
            mixVariations: generateMixVariations(fullEmail)
        })

        toast({
            variant: "success",
            title: "Berhasil",
            description: "Email variations berhasil di-generate!",
        })
    }

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({
                variant: "success",
                title: "Berhasil",
                description: "Teks berhasil disalin ke clipboard!",
            })
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Gagal menyalin teks",
            })
        }
    }

    const handleDownload = (type: keyof EmailVariation) => {
        try {
            const variations = result[type]

            if (!variations || variations.length === 0) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Tidak ada data untuk didownload. Silakan generate terlebih dahulu.",
                })
                return
            }

            const header = `Gmail ${type} Variations untuk ${localPart}@gmail.com\n` +
                `Generated pada: ${new Date().toLocaleString()}\n` +
                `Total: ${variations.length} variations\n\n`;

            const content = header + variations.join('\n')

            try {
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')

                link.href = url
                link.setAttribute('download', `gmail-${type}-${localPart}.txt`)
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()

                setTimeout(() => {
                    document.body.removeChild(link)
                    window.URL.revokeObjectURL(url)
                }, 100)

                toast({
                    variant: "success",
                    title: "Berhasil",
                    description: `File gmail-${type}-${localPart}.txt berhasil didownload!`,
                })
            } catch (fileErr) {
                console.error('File operation error:', fileErr)
                throw new Error('Gagal membuat file')
            }
        } catch (err) {
            console.error('Download error:', err)
            toast({
                variant: "destructive",
                title: "Error",
                description: "Gagal mendownload file. Silakan coba lagi.",
            })
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto border shadow-lg">
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
            <CardContent>
                <div className="space-y-4">
                    <EmailInput
                        localPart={localPart}
                        onLocalPartChange={setLocalPart}
                        onGenerate={handleGenerate}
                    />

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
                                    onCopy={handleCopy}
                                    onDownload={handleDownload}
                                />
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                    Dibuat dengan ❤️ oleh{" "}
                    <a
                        href="https://nanodg.my.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                        NanoDG
                    </a>
                </p>
            </CardFooter>
        </Card>
    )
} 