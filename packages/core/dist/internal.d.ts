import { UnifiedPluginRegistry as PluginRegistryType } from './plugins';
import { GridPlugin } from './plugins/types';
import { RowData } from './types';
import { DataPipelineBenchmarkResult, DataPipelineReturn } from './utils';
/**
 * Internal APIs for Happy Table
 *
 * This module exposes internal APIs that are needed by plugins and advanced integrations.
 * These APIs are not part of the public interface and may change between versions.
 *
 * WARNING: These APIs are for internal use only. Use at your own risk.
 */
export { createPluginRegistry, type UnifiedPluginRegistry, type ErrorHandlingExtension, type CapabilityExtension, type GridPlugin, type CapabilityGetter, type GridCapabilities, type DataPipelineCapability, type AsyncTasksCapability, type WebSocketCapability, type AICapability, } from './plugins';
export { BasePlugin, PluginError, PluginErrors, createPluginError, PluginEventEmitter, createCapabilityMock, createTestEnvironment, CapabilityMockBuilder, } from './plugins/utils';
export { corePlugins, sortingPlugin, filteringPlugin, selectionPlugin, columnManagementPlugin, } from './plugins/core';
export type { GridStateInternal, UseGridStateReturn } from './types';
export { usePerformanceMonitoring, benchmarkOperation } from './utils/performance-monitoring';
export { useMemoryManagement } from './utils/memory-management';
export { ElementPool, DOMBatcher, EventDelegator, createVirtualRowFactory, } from './utils/dom-optimization';
export { useDataPipeline, DataPipelineUtils, type DataPipelineInterceptor, type DataPipelineStage, type DataPipelineMetrics, type DataPipelineOptions, type DataPipelineReturn, type DataPipelineBenchmarkResult, } from './utils/data-pipeline';
export { initializeUtilities, getUtilityInfo, UtilityFeatures } from './utils';
export declare const INTERNAL_API_VERSION = "1.1.0";
/**
 * Plugin development helper to check internal API compatibility
 */
export declare function checkInternalAPICompatibility(requiredVersion: string): boolean;
/**
 * Development mode helpers
 */
export declare const DevTools: {
    /**
     * Enable debug mode for all plugins
     */
    enablePluginDebug(): void;
    /**
     * Disable debug mode
     */
    disablePluginDebug(): void;
    /**
     * Get plugin registry state for debugging
     */
    getPluginRegistryState(registry: PluginRegistryType): {
        plugins: Array<{
            name: string;
            version?: string;
        }>;
        loadOrder: string[];
        errors: Array<[string, Error]>;
        capabilities: string[];
    };
    /**
     * Validate plugin installation
     */
    validatePlugin(plugin: Partial<GridPlugin>): {
        valid: boolean;
        issues: string[];
    };
    /**
     * Test data pipeline performance
     */
    benchmarkDataPipeline: (data: RowData[], iterations?: number) => Promise< DataPipelineBenchmarkResult>;
};
/**
 * Experimental features (may change without notice)
 */
export declare const Experimental: {
    /**
     * Create a capability proxy for future compatibility
     */
    createCapabilityProxy<T>(name: string, fallbackImplementation: T): T;
    /**
     * Plugin hot-reload support (development only)
     */
    enableHotReload(_registry: PluginRegistryType): void;
    /**
     * Advanced data pipeline with async processing
     */
    createAdvancedDataPipeline: (options?: {
        enableStreaming?: boolean;
        maxConcurrency?: number;
        enableWorkers?: boolean;
    }) => Promise< DataPipelineReturn>;
};
