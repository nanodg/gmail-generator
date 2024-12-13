import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ResetDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCancel: () => void;
    onConfirm: () => void;
}

export function ResetDialog({
    open,
    onCancel,
    onConfirm
}: ResetDialogProps) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={(open) => {
                if (!open) onCancel()
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Reset Data?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Pindah tab akan mereset semua hasil yang sudah digenerate.
                        Apakah Anda yakin ingin melanjutkan?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Lanjutkan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}