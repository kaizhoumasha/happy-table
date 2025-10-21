import { ComputedRef, Ref } from 'vue';
import { ColumnDef, RowData, VirtualColumn } from '../types';
import { PaneConfig } from '../types/layout';
import { VirtualItem } from './virtualization';
export type VirtualColumn = VirtualColumn & {
    column: ColumnDef;
};
export interface ThreePaneVirtualCell {
    rowIndex: number;
    columnIndex: number;
    column: ColumnDef;
    value: unknown;
    rowData: RowData;
}
export type VirtualCell = ThreePaneVirtualCell;
export interface ThreePaneVirtualizerOptions {
    /** Existing three-pane configuration from TableRenderer */
    paneConfig: ComputedRef<PaneConfig>;
    /** Row configuration (reuse existing) */
    rowCount: ComputedRef<number>;
    getRowSize: (index: number) => number;
    /** Container and performance */
    containerSize: Ref<{
        width: number;
        height: number;
    }>;
    overscan?: {
        rows?: number;
        columns?: number;
    };
    /** Row data for cell virtualization */
    rowData: ComputedRef<RowData[]>;
}
export interface PaneVirtualData {
    columns: ColumnDef[];
    rows: VirtualItem[];
    width: number;
}
export interface CenterPaneVirtualData {
    virtualColumns: VirtualColumn[];
    virtualRows: VirtualItem[];
    virtualCells: VirtualCell[][];
    width: number;
    totalWidth: number;
}
export interface ThreePaneVirtualizerReturn {
    /** Per-pane virtual data */
    leftPane: ComputedRef<PaneVirtualData>;
    centerPane: ComputedRef<CenterPaneVirtualData>;
    rightPane: ComputedRef<PaneVirtualData>;
    /** Navigation and scroll control */
    scrollToCell: (row: number, column: number) => void;
    scrollToColumn: (column: number, align?: 'start' | 'center' | 'end') => void;
    updateScrollPosition: (scroll: {
        top: number;
        left: number;
    }) => void;
    /** Integration with TableRenderer */
    headerScrollSync: ComputedRef<number>;
    totalDimensions: ComputedRef<{
        width: number;
        height: number;
    }>;
    /** Internal scroll state for coordination */
    scrollLeft: Ref<number>;
    scrollTop: Ref<number>;
}
export declare function useThreePaneVirtualizer(options: ThreePaneVirtualizerOptions): ThreePaneVirtualizerReturn;
/**
 * Calculate the optimal column overscan based on container size and column sizes
 */
export declare function calculateOptimalColumnOverscan(containerWidth: number, averageColumnWidth?: number): number;
/**
 * Estimate the total width of a column array
 */
export declare function estimateColumnsWidth(columns: ColumnDef[]): number;
/**
 * Find the column index by horizontal position
 */
export declare function findColumnAtPosition(columns: ColumnDef[], position: number): {
    index: number;
    offset: number;
};
