import { Ref, ComputedRef } from 'vue';
import { VirtualizerOptions, VirtualizerReturn, VirtualColumn, ColumnDef } from '../types';
export type { VirtualItem, VirtualizerOptions, VirtualizerReturn, VirtualColumn } from '../types';
export declare function useVirtualizer(options: VirtualizerOptions): VirtualizerReturn;
export declare function estimateItemSize(data: unknown[], sampleSize?: number): number;
export declare function createVirtualScrollElement(totalSize: number): {
    height: string;
    position: "relative";
    overflow: string;
};
export interface HorizontalVirtualizerOptions {
    columns: ComputedRef< ColumnDef[]>;
    getColumnWidth: (index: number) => number;
    overscan?: number;
    enabled?: Ref<boolean>;
}
export interface HorizontalVirtualizerReturn {
    scrollElement: Ref<HTMLElement | null>;
    totalWidth: ComputedRef<number>;
    virtualColumns: ComputedRef<VirtualColumn[]>;
    startIndex: ComputedRef<number>;
    endIndex: ComputedRef<number>;
    scrollToColumn: (index: number, align?: 'start' | 'center' | 'end') => void;
    setContainerSize: (size: {
        width: number;
        height: number;
    }) => void;
    updateScrollPosition: (scrollLeft: number) => void;
}
export declare function useHorizontalVirtualizer(options: HorizontalVirtualizerOptions): HorizontalVirtualizerReturn;
export declare function estimateColumnWidth(columns: unknown[], sampleSize?: number): number;
export declare function createHorizontalVirtualScrollElement(totalWidth: number): {
    width: string;
    position: "relative";
    overflow: string;
};
