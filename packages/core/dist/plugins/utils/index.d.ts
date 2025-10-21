import { GridAPI } from '../../types';
import { BasePlugin } from './base-plugin';
import { PluginEventEmitter } from './plugin-event-emitter';
import { CapabilityRegistry, createCapabilityRegistry } from './capability-registry';
import { PluginError } from './plugin-error';
import { createCapabilityMock, createTestEnvironment } from './capability-mock';
import { PluginErrorBoundary, createPluginErrorBoundary } from './plugin-error-boundary';
import { EnhancedErrorRecovery, createEnhancedErrorRecovery } from './enhanced-error-recovery';
import { GridPlugin } from '../index';
import { Logger } from '../../utils';
export { PluginEventEmitter } from './plugin-event-emitter';
export { BasePlugin } from './base-plugin';
export { PluginError, PluginErrors, ErrorRecovery, createPluginError } from './plugin-error';
export { TypedEventEmitter, PluginEventUtils, createTypedEventUtils, hasEventCapabilities, safeEmit, safeOn, createExtendedEventUtils } from './typed-event-helpers';
export type { ExtendedEventMap } from './typed-event-helpers';
export { PluginErrorBoundary, createPluginErrorBoundary, type ErrorBoundaryOptions, type ErrorContext, type ErrorRecoveryStrategy, } from './plugin-error-boundary';
export { EnhancedErrorRecovery, createEnhancedErrorRecovery, type RecoveryContext, type RecoveryResult, type DependencyInfo, } from './enhanced-error-recovery';
export { CapabilityRegistry, CapabilityUtils, createCapabilityRegistry, } from './capability-registry';
export { createCapabilityMock, CapabilityMockBuilder, createTestEnvironment, } from './capability-mock';
export { SortingUtils } from './sorting-utils';
export type { GridPlugin, CapabilityGetter, GridCapabilities, DataPipelineCapability, AsyncTasksCapability, WebSocketCapability, AICapability, DataInterceptor, DataInterceptorType, AsyncTask, TaskStatus, } from '../index';
export type PluginApiMethods = Pick<GridAPI, 'emit' | 'getData' | 'setData' | 'updateConfig'>;
export type PerformanceMetrics = {
    count: number;
    avgDuration: string;
    maxDuration: string;
    minDuration: string;
};
export type HealthCheckStatus = {
    timestamp: number;
    apiHealth: number;
    memoryUsage: number;
    availableMethods: string[];
};
export type ErrorInjectorConfig = {
    pluginName?: string;
    errorTypes?: string[];
    probability?: number;
    delayMs?: number;
};
export type { PluginErrorType } from './plugin-error';
export type { CapabilityInfo, CapabilityVersion, CapabilityName, CapabilityRegistryState, } from './capability-registry';
export type { EventHandler } from './plugin-event-emitter';
/**
 * Plugin Development Kit
 *
 * Convenient collection of the most commonly used utilities for plugin development.
 */
export declare const PluginDK: {
    BasePlugin: typeof BasePlugin;
    PluginEventEmitter: typeof PluginEventEmitter;
    CapabilityRegistry: typeof CapabilityRegistry;
    PluginError: typeof PluginError;
    PluginErrors: {
        dependency(pluginName: string, missingDeps: string[]): PluginError;
        installation(pluginName: string, reason: string, cause?: Error): PluginError;
        runtime(pluginName: string, operation: string, cause?: Error): PluginError;
        validation(pluginName: string, field: string, reason: string): PluginError;
        api(pluginName: string, method: string): PluginError;
        capability(pluginName: string, capability: string): PluginError;
    };
    ErrorRecovery: {
        logger: Logger;
        disablePlugin(pluginName: string, error: PluginError): void;
        attemptRecovery(pluginName: string, error: PluginError, retryCallback?: () => void): boolean;
    };
    PluginErrorBoundary: typeof PluginErrorBoundary;
    EnhancedErrorRecovery: typeof EnhancedErrorRecovery;
    CapabilityUtils: {
        inspectCapability(capability: any): {
            methods: string[];
            properties: string[];
            type: string;
        };
        generateDocs(registry: CapabilityRegistry): string;
        exportState(registry: CapabilityRegistry): any;
    };
    createCapabilityRegistry: typeof createCapabilityRegistry;
    createCapabilityMock: typeof createCapabilityMock;
    createTestEnvironment: typeof createTestEnvironment;
    createPluginErrorBoundary: typeof createPluginErrorBoundary;
    createEnhancedErrorRecovery: typeof createEnhancedErrorRecovery;
};
/**
 * Development and debugging helpers
 */
export declare const PluginDevUtils: {
    /**
     * Create a development plugin that logs all events
     */
    createEventLogger(): GridPlugin;
    /**
     * Create a performance monitoring plugin
     */
    createPerformanceMonitor(): GridPlugin;
    /**
     * Create an error injection plugin for testing error handling
     */
    createErrorInjector(config?: ErrorInjectorConfig): GridPlugin;
    /**
     * Create a plugin health checker
     */
    createHealthChecker(interval?: number): GridPlugin;
};
/**
 * Error handling utilities for plugin developers
 */
export declare const PluginErrorUtils: {
    /**
     * Wrap a function with error boundary
     */
    withErrorBoundary<T extends (...args: unknown[]) => unknown>(fn: T, pluginName: string, operationName?: string): T;
    /**
     * Create a retry wrapper for unreliable operations
     */
    withRetry<T extends (...args: unknown[]) => unknown>(fn: T, maxAttempts?: number, delayMs?: number): T;
    /**
     * Create a timeout wrapper for operations
     */
    withTimeout<T extends (...args: unknown[]) => unknown>(fn: T, timeoutMs: number): T;
};
