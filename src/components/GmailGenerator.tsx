import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { EmailVariation } from '@/types/email'
import { generateDotVariations, generateMixVariations, generatePlusVariations } from '@/lib/email-generator'
import { GmailHeader } from './GmailHeader'
import { TabsContainer } from './TabsContainer'
import { ResetDialog } from './ResetDialog'
import { VariationsManager } from './VariationsManager'
import { clipboard, dialog, fs } from '@tauri-apps/api';
import { isTauri } from '@/lib/utils';

export function GmailGenerator() {
    const [localPart, setLocalPart] = useState('')
    const [result, setResult] = useState<EmailVariation>({
        dotVariations: [],
        plusVariations: [],
        mixVariations: []
    })
    const { toast } = useToast()
    const [customSuffixes, setCustomSuffixes] = useState<string[]>([])
    const [bulkEmails, setBulkEmails] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showResetDialog, setShowResetDialog] = useState(false)
    const [pendingTabValue, setPendingTabValue] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState("single")
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
    const [sortBy, setSortBy] = useState<'alpha' | 'length'>('alpha') // Tambahkan state sortBy
    const [maxVariations, setMaxVariations] = useState<number>(100); // Default 100

    // Helper functions
    const getFullEmail = (local: string) => {
        return local.includes('@gmail.com') ? local : `${local}@gmail.com`
    }

    const isValidInput = (input: string) => {
        const local = input.replace('@gmail.com', '')
        if (local.length < 3) return false // Minimal 3 karakter
        if (!/^[a-zA-Z0-9]+$/.test(local)) return false // Hanya huruf dan angka
        return true
    }

    // Handlers
    const handleGenerate = async () => {
        if (bulkEmails.length > 0) {
            setIsLoading(true)
            try {
                await new Promise(resolve => setTimeout(resolve, 1000))
                const allResults = bulkEmails.reduce((acc, email) => {
                    const fullEmail = getFullEmail(email)
                    let plusVariationsAll: string[] = []
                    let mixVariationsAll: string[] = []

                    customSuffixes.forEach(suffix => {
                        plusVariationsAll = [...plusVariationsAll, ...generatePlusVariations(fullEmail, suffix)]
                        mixVariationsAll = [...mixVariationsAll, ...generateMixVariations(fullEmail, suffix)]
                    })

                    const variations = {
                        dotVariations: generateDotVariations(fullEmail).slice(0, maxVariations),
                        plusVariations: plusVariationsAll.slice(0, maxVariations),
                        mixVariations: mixVariationsAll.slice(0, maxVariations)
                    }
                    return {
                        dotVariations: [...acc.dotVariations, ...variations.dotVariations],
                        plusVariations: [...acc.plusVariations, ...variations.plusVariations],
                        mixVariations: [...acc.mixVariations, ...variations.mixVariations]
                    }
                }, { dotVariations: [], plusVariations: [], mixVariations: [] } as EmailVariation)

                setResult(allResults)
                toast({
                    variant: "success",
                    title: "Berhasil",
                    description: "Email variations berhasil di-generate!",
                })
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Gagal generate email variations",
                })
            } finally {
                setIsLoading(false)
            }
            return
        }

        if (!localPart) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Mohon masukkan alamat email",
            })
            return
        }

        const local = localPart.replace('@gmail.com', '')
        if (!isValidInput(localPart)) {
            toast({
                variant: "destructive",
                title: "Error",
                description: local.length < 3
                    ? "Username email minimal 3 karakter"
                    : "Email hanya boleh mengandung huruf dan angka",
            })
            return
        }

        setIsLoading(true)
        try {
            // Simulasi proses yang memakan waktu
            await new Promise(resolve => setTimeout(resolve, 1000))

            const fullEmail = getFullEmail(localPart)
            let plusVariationsAll: string[] = []
            let mixVariationsAll: string[] = []

            customSuffixes.forEach(suffix => {
                plusVariationsAll = [...plusVariationsAll, ...generatePlusVariations(fullEmail, suffix)]
                mixVariationsAll = [...mixVariationsAll, ...generateMixVariations(fullEmail, suffix)]
            })

            setResult({
                dotVariations: generateDotVariations(fullEmail).slice(0, maxVariations),
                plusVariations: plusVariationsAll.slice(0, maxVariations),
                mixVariations: mixVariationsAll.slice(0, maxVariations)
            })

            toast({
                variant: "success",
                title: "Berhasil",
                description: "Email variations berhasil di-generate!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Gagal generate email variations",
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = async (text: string) => {
        try {
            if (isTauri) {
                // Gunakan Tauri API untuk desktop
                await clipboard.writeText(text);
            } else {
                // Gunakan Browser API untuk web
                await navigator.clipboard.writeText(text);
            }

            toast({
                variant: "success",
                title: "Berhasil",
                description: "Teks berhasil disalin ke clipboard!",
            });
        } catch (err) {
            console.error('Copy error:', err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Gagal menyalin teks",
            });
        }
    };

    const handleDownload = async (type: keyof EmailVariation) => {
        try {
            const variations = result[type];
            if (!variations || variations.length === 0) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Tidak ada data untuk didownload",
                });
                return;
            }

            // Tambahkan header ke konten
            const header = `Gmail ${type} Variations\nGenerated: ${new Date().toLocaleString()}\nTotal: ${variations.length}\n\n`;
            const content = header + variations.join('\n');

            if (isTauri) {
                // Gunakan Tauri API untuk desktop
                const filePath = await dialog.save({
                    filters: [{
                        name: 'Text',
                        extensions: ['txt']
                    }]
                });

                if (filePath) {
                    await fs.writeFile({
                        contents: content,
                        path: filePath
                    });

                    toast({
                        variant: "success",
                        title: "Berhasil",
                        description: "File berhasil disimpan!",
                    });
                }
            } else {
                // Gunakan browser API untuk web
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = url;
                link.download = `gmail-${type}-variations.txt`;
                document.body.appendChild(link);
                link.click();

                // Cleanup
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                }, 100);

                toast({
                    variant: "success",
                    title: "Berhasil",
                    description: "File berhasil didownload!",
                });
            }
        } catch (err) {
            console.error('Download error:', err);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Gagal menyimpan file",
            });
        }
    };

    const handleTabChange = (value: string) => {
        // Jika ada hasil yang sudah digenerate, tampilkan dialog
        if (result.dotVariations.length > 0 ||
            result.plusVariations.length > 0 ||
            result.mixVariations.length > 0) {
            setShowResetDialog(true)
            setPendingTabValue(value)
            return
        }

        // Jika tidak ada hasil, langsung pindah tab
        setActiveTab(value)
        handleTabChangeConfirmed(value)
    }

    const handleTabChangeConfirmed = (value: string) => {
        // Reset semua state
        setResult({
            dotVariations: [],
            plusVariations: [],
            mixVariations: []
        })

        // Reset input sesuai tab
        if (value === 'single') {
            setBulkEmails([])
        } else {
            setLocalPart('')
        }

        // Reset suffix
        setCustomSuffixes([])

        setActiveTab(value)
        setPendingTabValue(null)
        setShowResetDialog(false)
    }

    const handleDialogCancel = () => {
        setPendingTabValue(null)
        setShowResetDialog(false)
    }

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // Generate dengan Ctrl + Enter
            if (e.ctrlKey && e.key === 'Enter') {
                handleGenerate()
            }
            // Toggle view mode dengan Ctrl + V
            if (e.ctrlKey && e.key === 'v') {
                setViewMode((prev: 'list' | 'grid') => prev === 'list' ? 'grid' : 'list')
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [])

    return (
        <>
            <Card className="w-full max-w-4xl mx-auto border shadow-lg">
                <GmailHeader />
                <CardContent>
                    <div className="space-y-6">
                        <TabsContainer
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                            localPart={localPart}
                            onLocalPartChange={setLocalPart}
                            onGenerate={handleGenerate}
                            bulkEmails={bulkEmails}
                            onBulkEmailsChange={setBulkEmails}
                            customSuffixes={customSuffixes}
                            onSuffixesChange={setCustomSuffixes}
                        />

                        <VariationsManager
                            isLoading={isLoading}
                            result={result}
                            onCopy={handleCopy}
                            onDownload={handleDownload}
                            viewMode={viewMode}
                            onViewModeChange={setViewMode}
                            sortBy={sortBy}
                            onSortByChange={setSortBy}
                            maxVariations={maxVariations}
                            onMaxVariationsChange={setMaxVariations}
                        />
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

            <ResetDialog
                open={showResetDialog}
                onOpenChange={setShowResetDialog}
                onCancel={handleDialogCancel}
                onConfirm={() => pendingTabValue && handleTabChangeConfirmed(pendingTabValue)}
            />
        </>
    )
}