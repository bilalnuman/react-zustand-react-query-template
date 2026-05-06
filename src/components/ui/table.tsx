import React, { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "./icons";
import Checkbox from "./checkbox";

export interface Column<T> {
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    render?: (value: any, item: T) => React.ReactNode;
    className?: string;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    classNames?: {
        table?: string;
        container?: string
    };
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
    selectable?: boolean;
    onSelectionChange?: (selectedItems: T[]) => void;
    isZebra?: boolean;
    isHeadingSticky?: boolean;
}

type SortOrder = "asc" | "desc" | null;

const Table = <T extends Record<string, any>>({
    columns,
    data,
    classNames,
    onRowClick,
    emptyMessage = "No data available",
    selectable = false,
    isZebra = true,
    onSelectionChange,
    isHeadingSticky = false,

}: TableProps<T>) => {
    // Sorting State
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Selection State
    const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

    const handleSort = (key: string) => {
        if (sortKey === key) {
            if (sortOrder === "asc") setSortOrder("desc");
            else if (sortOrder === "desc") {
                setSortKey(null);
                setSortOrder(null);
            }
        } else {
            setSortKey(key);
            setSortOrder("asc");
        }
    };

    const sortedData = useMemo(() => {
        if (!sortKey || !sortOrder) return data;

        return [...data].sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];

            if (aValue === bValue) return 0;

            const comparison = aValue > bValue ? 1 : -1;
            return sortOrder === "asc" ? comparison : -comparison;
        });
    }, [data, sortKey, sortOrder]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return sortedData.slice(start, start + pageSize);
    }, [sortedData, currentPage, pageSize]);

    const totalPages = Math.ceil(data.length / pageSize);

    // Selection Handlers
    const toggleAll = () => {
        if (selectedIndices.size === data.length) {
            setSelectedIndices(new Set());
            onSelectionChange?.([]);
        } else {
            const all = new Set(data.map((_, i) => i));
            setSelectedIndices(all);
            onSelectionChange?.(data);
        }
    };

    const toggleRow = (index: number) => {
        const newSelection = new Set(selectedIndices);
        if (newSelection.has(index)) {
            newSelection.delete(index);
        } else {
            newSelection.add(index);
        }
        setSelectedIndices(newSelection);
        onSelectionChange?.(Array.from(newSelection).map(i => data[i]));
    };

    return (
        <div className={twMerge("w-full flex flex-col rounded-lg border border-gray-200 bg-white",classNames?.container)}>
            <div className={twMerge("w-full overflow-x-auto", isHeadingSticky && "overflow-y-auto",classNames?.table)}>
                <table className="w-full text-left text-sm border-collapse">
                    <thead className={twMerge(
                        "bg-gray-50 text-gray-600 font-medium border-b border-gray-200",
                        isHeadingSticky && "sticky top-0 z-10 shadow-sm"
                    )}>
                        <tr>
                            {selectable && (
                                <th className={twMerge(
                                    "px-4 py-3 w-10",
                                    isHeadingSticky && "bg-gray-50 sticky top-0 z-10"
                                )}>
                                    <Checkbox
                                        checked={data.length > 0 && selectedIndices.size === data.length}
                                        onCheckedChange={toggleAll}
                                        aria-label="Select all"
                                    />
                                </th>
                            )}
                            {columns.map((column) => (
                                <th
                                    key={column.key as string}
                                    className={twMerge(
                                        "px-4 py-3 font-semibold transition-colors",
                                        isHeadingSticky && "bg-gray-50 sticky top-0 z-10",
                                        column.sortable && "cursor-pointer hover:bg-gray-100",
                                        column.className
                                    )}
                                    onClick={() => column.sortable && handleSort(column.key as string)}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.label}
                                        {column.sortable && (
                                            <div className="flex items-center gap-0.5">
                                                <Icons.sortIcon
                                                    size={15}
                                                    className={twMerge(
                                                        "transition-colors",
                                                        sortKey === column.key && sortOrder === "asc" ? "text-blue-600" : "text-gray-700",
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((item, rowIndex) => {
                                const globalIndex = (currentPage - 1) * pageSize + rowIndex;
                                const isSelected = selectedIndices.has(globalIndex);

                                return (
                                    <tr
                                        key={globalIndex}
                                        onClick={() => onRowClick?.(item)}
                                        className={twMerge(
                                            "transition-colors",
                                            onRowClick ? "cursor-pointer hover:bg-gray-50" : "",
                                            isSelected && "bg-blue-50/50",
                                            isZebra && "even:bg-gray-50 odd:bg-white"
                                        )}
                                    >
                                        {selectable && (
                                            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={() => toggleRow(globalIndex)}
                                                    aria-label={`Select row ${globalIndex + 1}`}
                                                />
                                            </td>
                                        )}
                                        {columns.map((column) => (
                                            <td key={column.key as string} className={twMerge("px-4 py-3 text-gray-700", column.className)}>
                                                {column.render
                                                    ? column.render(item[column.key], item)
                                                    : item[column.key]}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-gray-500 italic">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 text-sm text-gray-700 stick bottom-0 bg-white z-10    ">
                <div className="flex-1 text-gray-500">
                    {selectable && `${selectedIndices.size} of ${data.length} row(s) selected.`}
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <span>Rows per page</span>
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="h-8 w-16 rounded border border-gray-300 bg-white px-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            {[5, 10, 20, 50, 100].map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="min-w-[80px] text-center">
                            Page {currentPage} of {totalPages || 1}
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Icons.chevronsLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Icons.chevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Icons.chevronRight size={16} />
                            </button>
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 rotate-180 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Icons.chevronsLeft size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;