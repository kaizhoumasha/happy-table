import { ComputedRef, Ref } from 'vue';
import { VirtualItem } from './virtualization';
import { ColumnDef, VirtualColumn } from '../types';
export type VirtualColumn = VirtualColumn & {
    column: ColumnDef;
    key: string;
};
export interface BiDirectionalVirtualCell {
    rowIndex: number;
    columnIndex: number;
    rowStart: number;
    rowSize: number;
    columnStart: number;
    columnSize: number;
    key: string;
    column: ColumnDef;
}
export type VirtualCell = BiDirectionalVirtualCell;
export interface BiDirectionalVirtualizerOptions {
    rowCount: ComputedRef<number>;
    getRowSize: (index: number) => number;
    columns: ComputedRef<ColumnDef[]>;
    getColumnWidth: (index: number) => number;
    overscan?: {
        rows?: number;
        columns?: number;
    };
    enabled?: {
        vertical?: Ref<boolean>;
        horizontal?: Ref<boolean>;
    };
    frozenColumns?: {
        left?: ComputedRef<ColumnDef[]>;
        right?: ComputedRef<ColumnDef[]>;
    };
}
export interface BiDirectionalVirtualizerReturn {
    virtualMatrix: ComputedRef<VirtualCell[][]>;
    virtualRows: ComputedRef<VirtualItem[]>;
    virtualColumns: ComputedRef<VirtualColumn[]>;
    virtualColumnsLeft: ComputedRef<VirtualColumn[]>;
    virtualColumnsCenter: ComputedRef<VirtualColumn[]>;
    virtualColumnsRight: ComputedRef<VirtualColumn[]>;
    totalSize: {
        height: ComputedRef<number>;
        width: ComputedRef<number>;
    };
    scrollElement: Ref<HTMLElement | null>;
    visibleRange: {
        rows: ComputedRef<{
            start: number;
            end: number;
        }>;
        columns: ComputedRef<{
            start: number;
            end: number;
        }>;
    };
    scrollToCell: (row: number, column: number, align?: 'start' | 'center' | 'end') => void;
    scrollToRow: (index: number, align?: 'start' | 'center' | 'end') => void;
    scrollToColumn: (index: number, align?: 'start' | 'center' | 'end') => void;
    setContainerSize: (size: {
        width: number;
        height: number;
    }) => void;
    updateScrollPosition: (scroll: {
        top: number;
        left: number;
    }) => void;
    metrics: ComputedRef<{
        rowVirtualization: boolean;
        columnVirtualization: boolean;
        virtualCells: number;
        visibleCells: number;
        renderTime: number;
    }>;
}
export declare function useBiDirectionalVirtualizer(options: BiDirectionalVirtualizerOptions): BiDirectionalVirtualizerReturn;
/**
 * Calculate optimal virtualization thresholds based on data characteristics
 */
export declare function calculateVirtualizationThresholds(rowCount: number, columnCount: number, containerSize: {
    width: number;
    height: number;
}, averageRowHeight?: number, averageColumnWidth?: number): {
    shouldVirtualizeRows: boolean;
    shouldVirtualizeColumns: boolean;
    recommendedOverscan: {
        rows: number;
        columns: number;
    };
};
/**
 * Create optimized column width calculator with caching
 */
export declare function createColumnWidthCalculator(columns: ColumnDef[]): {
    getWidth: (index: number) => number;
    clearCache: () => void;
    updateColumn: (index: number, width: number) => void;
};
