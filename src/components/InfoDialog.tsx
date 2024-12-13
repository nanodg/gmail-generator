import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"
import { Button } from "./ui/button"

export function InfoDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent hover:text-primary"
                >
                    <Info className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3 sm:space-y-4">
                    <DialogTitle className="text-xl sm:text-2xl text-center">
                        Tentang Gmail Generator Tool
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm sm:text-base leading-6">
                        Tool untuk menghasilkan variasi alamat Gmail yang valid menggunakan teknik dot (.) dan plus (+).
                        Semua variasi akan tetap mengirim email ke alamat Gmail utama Anda.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
                    <div className="grid gap-4 sm:gap-6">
                        <div className="bg-muted/50 p-3 sm:p-4 rounded-lg space-y-2">
                            <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm sm:text-base">1</span>
                                Dot Variations (.)
                            </h4>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Gmail mengabaikan titik dalam alamat email.
                                <span className="block mt-1 font-mono bg-background p-2 rounded text-xs sm:text-sm">
                                    j.ohn.doe@gmail.com = johndoe@gmail.com
                                </span>
                            </p>
                        </div>

                        <div className="bg-muted/50 p-3 sm:p-4 rounded-lg space-y-2">
                            <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm sm:text-base">2</span>
                                Plus Variations (+)
                            </h4>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Gmail mengabaikan semua karakter setelah tanda plus.
                                <span className="block mt-1 font-mono bg-background p-2 rounded text-xs sm:text-sm">
                                    johndoe+shop@gmail.com = johndoe@gmail.com
                                </span>
                            </p>
                        </div>

                        <div className="bg-muted/50 p-3 sm:p-4 rounded-lg space-y-2">
                            <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                                <span className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm sm:text-base">3</span>
                                Mix Variations
                            </h4>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Kombinasi dari kedua teknik di atas.
                                <span className="block mt-1 font-mono bg-background p-2 rounded text-xs sm:text-sm">
                                    j.ohn.doe+shop@gmail.com = johndoe@gmail.com
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-primary/5 p-3 sm:p-4 rounded-lg">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            <span className="font-medium text-primary">Catatan:</span> Semua email variations yang dihasilkan akan tetap mengirim ke inbox utama Gmail Anda.
                            Fitur ini berguna untuk membuat filter email, tracking sumber email, atau mendaftar di berbagai layanan.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}