import { EmailVariation } from '@/types/email'
import { VariationsControls } from './VariationsControls'
import { VariationsResultTabs } from './VariationsResultTabs'

interface VariationsManagerProps {
    isLoading: boolean;
    result: EmailVariation;
    onCopy: (text: string) => Promise<void>;
    onDownload: (type: keyof EmailVariation) => void;
    viewMode: 'list' | 'grid';
    onViewModeChange: (mode: 'list' | 'grid') => void;
    sortBy: 'alpha' | 'length';
    onSortByChange: (value: 'alpha' | 'length') => void;
    maxVariations: number;
    onMaxVariationsChange: (value: number) => void;
}

export function VariationsManager({
    isLoading,
    result,
    onCopy,
    onDownload,
    viewMode,
    onViewModeChange,
    sortBy,
    onSortByChange,
    maxVariations,
    onMaxVariationsChange
}: VariationsManagerProps) {
    return (
        <div className="space-y-6">
            <VariationsControls
                maxVariations={maxVariations}
                onMaxVariationsChange={onMaxVariationsChange}
                sortBy={sortBy}
                onSortByChange={onSortByChange}
                viewMode={viewMode}
                onViewModeChange={onViewModeChange}
            />

            <VariationsResultTabs
                isLoading={isLoading}
                result={result}
                onCopy={onCopy}
                onDownload={onDownload}
                viewMode={viewMode}
                sortBy={sortBy}
            />
        </div>
    )
} 