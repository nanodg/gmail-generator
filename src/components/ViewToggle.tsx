import { Button } from "@/components/ui/button"
import { LayoutGrid, LayoutList } from "lucide-react"

interface ViewToggleProps {
    viewMode: 'list' | 'grid';
    onToggle: (mode: 'list' | 'grid') => void;
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => onToggle(viewMode === 'list' ? 'grid' : 'list')}
            className="gap-2"
            title={`Switch to ${viewMode === 'list' ? 'grid' : 'list'} view`}
        >
            {viewMode === 'list' ? (
                <>
                    <LayoutGrid className="h-4 w-4" />
                    Grid View
                </>
            ) : (
                <>
                    <LayoutList className="h-4 w-4" />
                    List View
                </>
            )}
        </Button>
    )
} 