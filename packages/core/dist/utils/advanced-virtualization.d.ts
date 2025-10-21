import { Ref, ComputedRef } from 'vue';
export interface AdvancedVirtualItem {
    index: number;
    start: number;
    size: number;
    end: number;
    key: string | number;
}
export interface VirtualizerMetrics {
    scrollVelocity: number;
    renderTime: number;
    visibleItems: number;
    totalHeight: number;
    lastUpdateTime: number;
}
export interface AdvancedVirtualizerOptions {
    count: ComputedRef<number>;
    getItemSize: (index: number) => number;
    estimateItemSize?: () => number;
    overscanCount?: number;
    enableDynamicOverscan?: boolean;
    scrollingDelay?: number;
    itemKey?: (index: number) => string | number;
    enabled?: Ref<boolean>;
}
export interface AdvancedVirtualizerReturn {
    scrollElement: Ref<HTMLElement | null>;
    totalSize: ComputedRef<number>;
    virtualItems: ComputedRef<AdvancedVirtualItem[]>;
    startIndex: ComputedRef<number>;
    endIndex: ComputedRef<number>;
    isScrolling: ComputedRef<boolean>;
    metrics: ComputedRef<VirtualizerMetrics>;
    scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void;
    scrollToOffset: (offset: number) => void;
    setContainerSize: (size: {
        height: number;
        width: number;
    }) => void;
}
export declare function useAdvancedVirtualizer(options: AdvancedVirtualizerOptions): AdvancedVirtualizerReturn;
export declare function createPerformanceMonitor(): {
    fps: ComputedRef<number>;
    frameTime: ComputedRef<number>;
    startMonitoring: () => void;
    stopMonitoring: () => void;
};
