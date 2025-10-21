/**
 * Happy Table Utility Modules
 *
 * Performance-optimized utilities for data grid operations
 * All utilities follow Vue 3 Composition API patterns
 */
export { useVirtualizer, useHorizontalVirtualizer } from './virtualization';
export { useAdvancedVirtualizer } from './advanced-virtualization';
export { useBiDirectionalVirtualizer } from './bidirectional-virtualization';
export { useThreePaneVirtualizer } from './three-pane-virtualization';
export type { VirtualItem, VirtualizerOptions, VirtualizerReturn, VirtualColumn, HorizontalVirtualizerOptions, HorizontalVirtualizerReturn } from './virtualization';
export type { AdvancedVirtualItem, VirtualizerMetrics, AdvancedVirtualizerOptions, AdvancedVirtualizerReturn, } from './advanced-virtualization';
export type { VirtualCell, BiDirectionalVirtualizerOptions, BiDirectionalVirtualizerReturn } from './bidirectional-virtualization';
export type { ThreePaneVirtualizerOptions, ThreePaneVirtualizerReturn, PaneVirtualData, CenterPaneVirtualData, VirtualCell as ThreePaneVirtualCell } from './three-pane-virtualization';
export { useMemoryManagement, WeakCache, ResourceManager, MemoryMonitor, ObjectPool, GCScheduler, RowDataManager, LazyArray, } from './memory-management';
export { usePerformanceMonitoring, benchmarkOperation, FPSCounter, RenderProfiler, ScrollPerformanceTracker, WebVitalsMonitor, PerformanceTestSuite, } from './performance-monitoring';
export type { PerformanceMetrics } from './performance-monitoring';
export { ElementPool, enableHardwareAcceleration, disableHardwareAcceleration, applyCSSContainment, DOMBatcher, EventDelegator, useVisibilityObserver, StyleBatcher, createVirtualRowFactory, MemoryLeakDetector, createOptimizedScrollHandler, } from './dom-optimization';
export { BrowserFeatures, HardwareAcceleration, CriticalRenderingOptimizer, OptimizedEventManager, RAFScheduler, IntersectionObserverPool, BrowserOptimizations, browserOptimizations, PerformanceHints, } from './browser-optimization';
export { useDataPipeline, DataPipelineUtils } from './data-pipeline';
export type { DataPipelineInterceptor, DataPipelineStage, DataPipelineMetrics, DataPipelineOptions, DataPipelineReturn, DataPipelineBenchmarkResult, } from './data-pipeline';
export { logger, Logger, ScopedLogger, createLogger, devTools } from './logger';
export type { LogLevel, LogContext } from './logger';
export { detectPlatform, hasModifierKey, getModifierKeyText, getModifierKeySymbol, formatShortcut, formatShortcutSymbol, type PlatformInfo, } from './platform';
export { DEFAULT_COLUMN_WIDTH, DEFAULT_MIN_COLUMN_WIDTH, DEFAULT_MAX_COLUMN_WIDTH, COLUMN_WIDTH_RANGE, normalizeColumn, } from './column-constants';
export { generateComponentId, generateIdGroup } from './id-generator';
export { isColumnDropBlocked, getColumnPinnedLocation, } from './column-reorder';
export declare const UTILS_VERSION = "1.1.0";
export declare const UtilityFeatures: {
    readonly ADVANCED_VIRTUALIZATION: true;
    readonly BIDIRECTIONAL_VIRTUALIZATION: true;
    readonly MEMORY_MANAGEMENT: true;
    readonly PERFORMANCE_MONITORING: true;
    readonly DOM_OPTIMIZATION: true;
    readonly BROWSER_OPTIMIZATION: true;
    readonly DATA_PIPELINE: true;
    readonly HARDWARE_ACCELERATION: boolean;
    readonly INTERSECTION_OBSERVER: boolean;
    readonly RESIZE_OBSERVER: boolean;
    readonly PERFORMANCE_OBSERVER: boolean;
    readonly WEB_WORKERS: boolean;
    readonly OFFSCREEN_CANVAS: boolean;
};
/**
 * Initialize all utility systems
 * Call this once during application startup for optimal performance
 */
export declare function initializeUtilities(): Promise<void>;
/**
 * Get information about available utility features
 */
export declare function getUtilityInfo(): {
    version: string;
    features: {
        readonly ADVANCED_VIRTUALIZATION: true;
        readonly BIDIRECTIONAL_VIRTUALIZATION: true;
        readonly MEMORY_MANAGEMENT: true;
        readonly PERFORMANCE_MONITORING: true;
        readonly DOM_OPTIMIZATION: true;
        readonly BROWSER_OPTIMIZATION: true;
        readonly DATA_PIPELINE: true;
        readonly HARDWARE_ACCELERATION: boolean;
        readonly INTERSECTION_OBSERVER: boolean;
        readonly RESIZE_OBSERVER: boolean;
        readonly PERFORMANCE_OBSERVER: boolean;
        readonly WEB_WORKERS: boolean;
        readonly OFFSCREEN_CANVAS: boolean;
    };
    modules: {
        virtualization: string;
        advancedVirtualization: string;
        bidirectionalVirtualization: string;
        threePaneVirtualization: string;
        memoryManagement: string;
        performanceMonitoring: string;
        domOptimization: string;
        browserOptimization: string;
        dataPipeline: string;
    };
};
/**
 * Quick start utilities for common scenarios
 */
export declare const quickStartUtils: {
    /**
     * Setup basic virtualization
     */
    basicVirtualization: (count: number, itemHeight?: number) => {
        count: number;
        getItemSize: () => number;
        overscan: number;
        enabled: boolean;
    };
    /**
     * Setup high-performance virtualization for large datasets
     */
    highPerformanceVirtualization: (count: number, itemHeight?: number) => {
        count: number;
        getItemSize: () => number;
        overscanCount: number;
        enableDynamicOverscan: boolean;
        scrollingDelay: number;
    };
    /**
     * Setup bidirectional virtualization for large grids
     */
    bidirectionalVirtualization: (rowCount: number, rowHeight?: number, columnWidth?: number) => {
        rowCount: number;
        getRowSize: () => number;
        columns: never[];
        getColumnWidth: () => number;
        overscan: {
            rows: number;
            columns: number;
        };
        enabled: {
            vertical: boolean;
            horizontal: boolean;
        };
    };
    /**
     * Setup memory management for large datasets
     */
    memoryOptimization: () => {
        enableGC: boolean;
        poolSize: number;
        cacheSize: number;
        cleanupInterval: number;
    };
    /**
     * Setup performance monitoring
     */
    performanceTracking: () => {
        enableFPS: boolean;
        enableRenderProfiling: boolean;
        enableMemoryTracking: boolean;
        enableWebVitals: boolean;
    };
};
export { createRAFScrollHandler, useRAFScroll, } from './scroll-optimization';
export type { ScrollVelocity } from './scroll-optimization';
export { inferDataType, inferDataTypeForColumn } from './infer-data-type';
