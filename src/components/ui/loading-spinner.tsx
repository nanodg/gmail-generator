import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'sm' | 'default' | 'lg';
}

export function LoadingSpinner({ size = 'default', className, ...props }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8'
    }

    return (
        <div className={cn("animate-spin text-muted-foreground", sizeClasses[size], className)} {...props}>
            <Loader2 className="h-full w-full" />
        </div>
    )
} 