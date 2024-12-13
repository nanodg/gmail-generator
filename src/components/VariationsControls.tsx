import { Input } from "@/components/ui/input"
import { ViewToggle } from "./ViewToggle"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface VariationsControlsProps {
    maxVariations: number;
    onMaxVariationsChange: (value: number) => void;
    sortBy: 'alpha' | 'length';
    onSortByChange: (value: 'alpha' | 'length') => void;
    viewMode: 'list' | 'grid';
    onViewModeChange: (mode: 'list' | 'grid') => void;
}

export function VariationsControls({
    maxVariations,
    onMaxVariationsChange,
    sortBy,
    onSortByChange,
    viewMode,
    onViewModeChange
}: VariationsControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Max variations:
                </span>
                <Input
                    type="number"
                    className="w-24"
                    value={maxVariations}
                    onChange={(e) => onMaxVariationsChange(parseInt(e.target.value) || 100)}
                    min={1}
                    max={1000}
                />
            </div>

            <Select value={sortBy} onValueChange={onSortByChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="alpha">Alphabetical</SelectItem>
                    <SelectItem value="length">Length</SelectItem>
                </SelectContent>
            </Select>

            <div className="sm:ml-auto">
                <ViewToggle
                    viewMode={viewMode}
                    onToggle={onViewModeChange}
                />
            </div>
        </div>
    )
} 