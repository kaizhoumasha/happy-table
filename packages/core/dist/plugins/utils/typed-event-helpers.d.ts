import { GridAPI, GridEvents } from '../../types';
/**
 * Type-safe event emitter helper for plugins
 * Ensures event names and payloads match the GridEvents interface
 */
export declare class TypedEventEmitter {
    private api;
    constructor(api: GridAPI);
    /**
     * Emit a typed event with full type safety
     */
    emit<K extends keyof GridEvents>(event: K, payload: GridEvents[K]): void;
    /**
     * Register a typed event listener with full type safety
     */
    on<K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void): (() => void) | undefined;
    /**
     * Remove a typed event listener
     */
    off<K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void): void;
}
/**
 * Plugin event emission utilities - provides convenient methods for common plugin events
 */
export declare class PluginEventUtils {
    private emitter;
    constructor(api: GridAPI);
    emitMultiSortChange(config: GridEvents['multi-sort-change']): void;
    emitSortFieldAdded(data: GridEvents['sort-field-added']): void;
    emitSortFieldRemoved(data: GridEvents['sort-field-removed']): void;
    emitSortPriorityChanged(data: GridEvents['sort-priority-changed']): void;
    emitSelectionModeChange(mode: GridEvents['selection-mode-change']): void;
    emitRangeSelect(data: GridEvents['range-select']): void;
    emitSelectAll(data: GridEvents['select-all']): void;
    emitSelectionClear(data: GridEvents['selection-clear']): void;
    emitDataProcessed(data: GridEvents['data-processed']): void;
    emitDataPipelineComplete(data: GridEvents['data-pipeline-complete']): void;
    emitDataPipelineError(error: GridEvents['data-pipeline-error']): void;
    emitCellFocusChange(data: GridEvents['cell-focus-change']): void;
    emitCellEditStart(data: GridEvents['cell-edit-start']): void;
    emitCellEditComplete(data: GridEvents['cell-edit-complete']): void;
    emitCellEditCancel(data: GridEvents['cell-edit-cancel']): void;
    emitPluginLoaded(data: GridEvents['plugin-loaded']): void;
    emitPluginUnloaded(data: GridEvents['plugin-unloaded']): void;
    emitPluginError(data: GridEvents['plugin-error']): void;
    emit<K extends keyof GridEvents>(event: K, payload: GridEvents[K]): void;
    on<K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void): (() => void) | undefined;
    off<K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void): void;
}
/**
 * Factory function to create typed event utilities for plugins
 */
export declare function createTypedEventUtils(api: GridAPI): PluginEventUtils;
/**
 * Type guard to check if API has event emission capabilities
 */
export declare function hasEventCapabilities(api: GridAPI): api is GridAPI & Required<Pick<GridAPI, 'emit' | 'on' | 'off'>>;
/**
 * Generic type-safe event emission helper
 * Use this when you need maximum type safety with minimal overhead
 */
export declare function safeEmit<K extends keyof GridEvents>(api: GridAPI, event: K, payload: GridEvents[K]): void;
/**
 * Generic type-safe event listener registration helper
 */
export declare function safeOn<K extends keyof GridEvents>(api: GridAPI, event: K, handler: (payload: GridEvents[K]) => void): (() => void) | undefined;
/**
 * Extension helper types for plugins that need to add custom events
 * This allows plugins to extend the GridEvents interface safely
 */
export type ExtendedEventMap<T extends Record<string, unknown>> = GridEvents & T;
/**
 * Helper to create type-safe custom event emitters for plugins with extended events
 */
export declare function createExtendedEventUtils<T extends Record<string, unknown>>(api: GridAPI): {
    emit<K extends keyof ExtendedEventMap<T>>(event: K, payload: ExtendedEventMap<T>[K]): void;
    on<K extends keyof ExtendedEventMap<T>>(event: K, handler: (payload: ExtendedEventMap<T>[K]) => void): (() => void) | undefined;
    off<K extends keyof ExtendedEventMap<T>>(event: K, handler: (payload: ExtendedEventMap<T>[K]) => void): void;
};
