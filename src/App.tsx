import { GmailGenerator } from './components/GmailGenerator'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
    return (
        <ThemeProvider defaultTheme="dark">
            <main className="min-h-screen bg-background py-12">
                <div className="container px-4">

                    <GmailGenerator />
                </div>
                <Toaster />
            </main>
        </ThemeProvider>
    )
}

export default App 