import { RowData, ColumnDef } from './types';
/**
 * Happy Table - High-Performance Vue 3 Data Grid
 *
 * Optimized for 60FPS scrolling with 100k+ rows
 * Memory efficient with <200MB usage
 * Plugin-first architecture with capability system
 * Dual rendering system: Table (default) + Excel (plugin)
 */
export { default as DataGrid } from './components/DataGrid.vue';
export { HtButton, HtInput, HtCheckbox, HtRadio, HtSelect, HtSelectTrigger, HtSelectValue, HtSelectContent, HtSelectItem, HtSelectGroup, HtSelectLabel, HtSelectSeparator, } from './components/primitives';
export { default as KeyboardShortcuts } from './components/shared/KeyboardShortcuts.vue';
export { default as AccessibilityAnnouncer } from './components/shared/AccessibilityAnnouncer.vue';
export { useGridState } from './core/useGridState';
export { useHappyTable } from './core/useHappyTable';
export { useGridEvents } from './core/useGridEvents';
export { createTableRenderer, RendererRegistry, createRendererRegistry, switchRenderer, getCurrentRenderer, getAvailableRenderers, } from './renderers';
export type { GridRenderer, GridInteractionContract, InteractionEvent } from './renderers';
export type { RendererFactory, RendererInstance, RendererOptions, VirtualRow, InteractionPayload, CoreLogicCallbacks, } from './renderers';
export { createExcelRenderer, EXCEL_PLUGIN_INFO } from './renderers/excel/ExcelRenderer';
export type { ExcelInteractionContract, ExcelRendererConfig } from './renderers/excel/ExcelRenderer';
export { createTableInteractionHandler } from './renderers/table/table-interactions';
export type { GridPlugin, CapabilityGetter, GridCapabilities, DataPipelineCapability, } from './plugins';
export { corePlugins, pluginPresets, sortingPlugin, enhancedSortingPlugin, cellEditingPlugin, keyboardNavigationPlugin, selectionPlugin, dragDropPlugin, } from './plugins/core';
export { CellTextEditor, CellNumberEditor, CellSelectEditor, CellDateEditor, CellBooleanEditor, CellEditorOverlay, } from './components/table-renderer/overlays';
export { BasePlugin } from './plugins/utils';
export { useVirtualizer, useHorizontalVirtualizer } from './utils/virtualization';
export { useAdvancedVirtualizer } from './utils/advanced-virtualization';
export { useThreePaneVirtualizer } from './utils/three-pane-virtualization';
export { usePerformanceMonitoring, benchmarkOperation } from './utils/performance-monitoring';
export { useMemoryManagement } from './utils/memory-management';
export { ElementPool, DOMBatcher, EventDelegator, createVirtualRowFactory, } from './utils/dom-optimization';
export { useDataPipeline, DataPipelineUtils } from './utils/data-pipeline';
export type { DataPipelineInterceptor, DataPipelineStage, DataPipelineMetrics, DataPipelineOptions, DataPipelineReturn, DataPipelineBenchmarkResult, } from './utils/data-pipeline';
export { browserOptimizations, initializeBrowserOptimizations, BrowserFeatures, } from './utils/browser-optimization';
export { initializeUtilities, getUtilityInfo, quickStartUtils, UtilityFeatures } from './utils';
export { SORT_PRESETS, LOCALE_PRESETS, createSortOptions } from './utils/sort-presets';
export { detectPlatform, hasModifierKey, getModifierKeyText, getModifierKeySymbol, formatShortcut, formatShortcutSymbol, type PlatformInfo, } from './utils';
export type { RowData, ColumnDef, CellValue, GridConfig, GridAPI, DataGridProps, GridEvents, VirtualItem, VirtualizerOptions, UseGridStateReturn, GridStateInternal, SortConfig, SortField, MultiSortConfig, SortOptions, FilterConfig, GridState, BorderMode, SelectOption, HtSelectBaseProps, SelectContext, } from './types';
export { GRID_EVENT_NAMES } from './types/events';
export type { GridEventName, PublicEventName, PublicEventMap } from './types/events';
export type { UseHappyTableOptions, UseHappyTableResult } from './core/useHappyTable';
export declare const version = "1.1.0-renderer-system";
export declare const features: {
    readonly ADVANCED_VIRTUALIZATION: true;
    readonly PERFORMANCE_MONITORING: true;
    readonly MEMORY_MANAGEMENT: true;
    readonly BROWSER_OPTIMIZATION: true;
    readonly PLUGIN_SYSTEM: true;
    readonly CAPABILITY_SYSTEM: true;
    readonly RENDERER_SYSTEM: true;
    readonly DUAL_RENDERING: true;
    readonly EXCEL_SUPPORT: true;
    readonly DATA_PIPELINE: true;
    readonly KEYBOARD_NAVIGATION: true;
    readonly ACCESSIBILITY: true;
};
export declare const PLUGIN_API_VERSION = "1.1.0";
export declare const RENDERER_API_VERSION = "1.0.0";
/**
 * Check if a plugin is compatible with the current API version
 */
export declare function isPluginCompatible(pluginVersion?: string): boolean;
/**
 * Check if a renderer is compatible with the current API version
 */
export declare function isRendererCompatible(rendererVersion?: string): boolean;
/**
 * Get information about the renderer system
 */
export declare function getRendererSystemInfo(): {
    apiVersion: string;
    supportedRenderers: string[];
    defaultRenderer: string;
    features: {
        dynamicSwitching: boolean;
        pluginProvided: boolean;
        statePreservation: boolean;
        hotSwapping: boolean;
    };
};
/**
 * Quick start helper for common use cases
 */
export declare const quickStart: {
    /**
     * Create a basic table setup
     */
    table: (data: RowData[], columns: ColumnDef[]) => {
        data: RowData[];
        columns: ColumnDef[];
        renderer: "table";
        config: {
            virtualizationThreshold: number;
            enableVirtualization: boolean;
        };
    };
    /**
     * Create an Excel-style setup (requires Excel plugin)
     */
    excel: (data: RowData[], columns: ColumnDef[]) => {
        data: RowData[];
        columns: ColumnDef[];
        renderer: "excel";
        config: {
            virtualizationThreshold: number;
            enableVirtualization: boolean;
        };
    };
    /**
     * Create a high-performance setup with all optimizations
     */
    highPerformance: (data: RowData[], columns: ColumnDef[]) => {
        data: RowData[];
        columns: ColumnDef[];
        config: {
            virtualizationThreshold: number;
            enableVirtualization: boolean;
            rowHeight: number;
            headerHeight: number;
        };
        utilities: {
            memoryManagement: boolean;
            performanceMonitoring: boolean;
            dataPipeline: boolean;
            browserOptimizations: boolean;
        };
    };
};
