import { GridPlugin, CapabilityGetter, GridAPI } from '../index';
import { PluginError } from './plugin-error';
export interface ErrorBoundaryOptions {
    /** Timeout for plugin operations in milliseconds */
    timeout?: number;
    /** Maximum retry attempts for recoverable errors */
    maxRetries?: number;
    /** Whether to isolate plugin errors from core system */
    isolateErrors?: boolean;
    /** Custom error recovery strategies */
    recoveryStrategies?: Map<string, ErrorRecoveryStrategy>;
    /** Error reporting callback */
    onError?: (error: PluginError, context: ErrorContext) => void;
}
export interface ErrorContext {
    operation: 'install' | 'cleanup' | 'runtime' | 'capability-access';
    pluginName: string;
    timestamp: number;
    retryCount?: number;
    metadata?: Record<string, any>;
}
export interface ErrorRecoveryStrategy {
    canRecover: (error: PluginError, context: ErrorContext) => boolean;
    recover: (error: PluginError, context: ErrorContext) => Promise<boolean>;
    maxAttempts: number;
    backoffMs?: number;
}
/**
 * Enhanced plugin error boundary with comprehensive error handling
 */
export declare class PluginErrorBoundary {
    private logger;
    private options;
    private circuitBreakers;
    private recoveryAttempts;
    private errorHistory;
    constructor(options?: ErrorBoundaryOptions);
    /**
     * Safely execute plugin installation with error boundary
     */
    safeInstall(plugin: GridPlugin, api: GridAPI, get: CapabilityGetter): Promise<boolean>;
    /**
     * Safely execute plugin cleanup with error boundary
     */
    safeCleanup(plugin: GridPlugin): Promise<boolean>;
    /**
     * Safely execute plugin runtime operations with error boundary
     */
    safeRuntimeOperation<T>(pluginName: string, operation: () => T | Promise<T>, operationName?: string): Promise<T | null>;
    /**
     * Safely access plugin capabilities with error boundary
     */
    safeGetCapability<T>(pluginName: string, capabilityName: string, get: CapabilityGetter): T | null;
    /**
     * Get plugin health status
     */
    getPluginHealth(pluginName: string): {
        healthy: boolean;
        circuitState: string;
        errorCount: number;
        lastError?: PluginError;
        recoveryAttempts: number;
    };
    /**
     * Get comprehensive error report for all plugins
     */
    getErrorReport(): {
        totalErrors: number;
        pluginErrors: Map<string, PluginError[]>;
        circuitStates: Map<string, any>;
        recoveryStats: Map<string, number>;
    };
    /**
     * Attempt to recover a failed plugin
     */
    attemptRecovery(pluginName: string, _plugin: GridPlugin, _api: GridAPI, _get: CapabilityGetter): Promise<boolean>;
    /**
     * Clear error history for a plugin (manual reset)
     */
    clearPluginErrors(pluginName: string): void;
    /**
     * Core execution method with comprehensive error boundary
     */
    private executeWithBoundary;
    private performInstallation;
    private performCleanup;
    private handleError;
    private convertToPluginError;
    private getOrCreateCircuitBreaker;
    private findRecoveryStrategy;
    private initializeDefaultRecoveryStrategies;
}
/**
 * Factory function to create a plugin error boundary
 */
export declare function createPluginErrorBoundary(options?: ErrorBoundaryOptions): PluginErrorBoundary;
