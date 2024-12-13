import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Copy, Download } from "lucide-react"
import { EmailVariation } from "@/types/email"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState, useMemo, useEffect } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FixedSizeList as List } from 'react-window'


interface VariationsResultProps {
    type: string;
    variations: string[];
    onCopy: (text: string) => Promise<void>;
    onDownload: (type: keyof EmailVariation) => void;
    viewMode: 'list' | 'grid';
    sortBy: 'alpha' | 'length';
}

const PAGE_SIZE_OPTIONS = [9, 18, 27, 45, 54]
const DEFAULT_PAGE_SIZE = 18

export function VariationsResult({ type, variations, onCopy, onDownload, viewMode, sortBy }: VariationsResultProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_PAGE_SIZE);

    useEffect(() => {
        setCurrentPage(1);
    }, [variations, sortBy, itemsPerPage]);

    const sortedVariations = useMemo(() => {
        return [...variations].sort((a, b) => {
            if (sortBy === 'alpha') return a.localeCompare(b);
            return a.length - b.length;
        });
    }, [variations, sortBy]);

    const totalPages = Math.ceil(sortedVariations.length / itemsPerPage);

    const paginatedVariations = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedVariations.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedVariations, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const getVisiblePages = () => {
            const delta = 2;
            const range = [];
            const rangeWithDots = [];

            for (let i = 1; i <= totalPages; i++) {
                if (
                    i === 1 ||
                    i === totalPages ||
                    (i >= currentPage - delta && i <= currentPage + delta)
                ) {
                    range.push(i);
                }
            }

            let l;
            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }

            return rangeWithDots;
        };

        return (
            <div className="mt-4">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center">
                        <Pagination>
                            <PaginationContent className="flex flex-wrap justify-center gap-1">
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} select-none`}
                                    />
                                </PaginationItem>

                                {getVisiblePages().map((page, index) => (
                                    <PaginationItem key={index}>
                                        {page === '...' ? (
                                            <PaginationEllipsis />
                                        ) : (
                                            <PaginationLink
                                                onClick={() => handlePageChange(page as number)}
                                                isActive={currentPage === page}
                                                className="select-none"
                                            >
                                                {page}
                                            </PaginationLink>
                                        )}
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} select-none`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                                Items per page:
                            </span>
                            <Select
                                value={itemsPerPage.toString()}
                                onValueChange={(value) => setItemsPerPage(Number(value))}
                            >
                                <SelectTrigger className="w-[80px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAGE_SIZE_OPTIONS.map((size) => (
                                        <SelectItem key={size} value={size.toString()}>
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>

                </div>
            </div>
        );
    };

    const renderGridItem = (variation: string, index: number) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const displayNumber = startIndex + index + 1;

        return (
            <Card
                key={variation}
                className="group relative overflow-hidden hover:shadow-md transition-all duration-200"
            >
                <CardContent className="p-4">
                    <div className="relative">
                        {/* Background Number */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                            <span className="text-6xl font-bold">
                                {displayNumber}
                            </span>
                        </div>

                        <div className="relative">
                            {/* Email and Copy Button Container */}
                            <div className="flex items-start justify-between gap-2">
                                <p className="font-mono text-sm break-all flex-1">
                                    {variation}
                                </p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onCopy(variation)}
                                    className="h-7 w-7 shrink-0 opacity-60 hover:opacity-100 hover:bg-primary hover:text-primary-foreground transition-all"
                                    title="Copy to clipboard"
                                >
                                    <Copy className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const renderListView = () => {
        const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
            <div style={style} className="py-1">
                <div className="font-mono text-sm">{sortedVariations[index]}</div>
            </div>
        )

        return (
            <Card className="border bg-muted/50">
                <CardContent className="p-3">
                    <List
                        height={400}
                        itemCount={sortedVariations.length}
                        itemSize={35}
                        width="100%"
                    >
                        {Row}
                    </List>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Variations
                </Label>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload(`${type}Variations` as keyof EmailVariation)}
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCopy(sortedVariations.join('\n'))}
                        className="gap-2"
                    >
                        <Copy className="h-4 w-4" />
                        Copy All
                    </Button>
                </div>
            </div>
            <div className={cn(
                viewMode === 'grid' &&
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            )}>
                {viewMode === 'grid' ? (
                    paginatedVariations.map((variation, index) => (
                        <div key={variation}>
                            {renderGridItem(variation, index)}
                        </div>
                    ))
                ) : (
                    renderListView()
                )}
            </div>
            {viewMode === 'grid' && renderPagination()}
            <p className="text-sm text-muted-foreground">
                {viewMode === 'grid' ? (
                    <span>
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedVariations.length)} of{' '}
                    </span>
                ) : null}
                Total: {sortedVariations.length} variations
            </p>
        </div>
    )
} 