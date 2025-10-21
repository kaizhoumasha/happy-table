import { GridPlugin, CapabilityGetter, GridAPI } from '../index';
import { PluginError } from './plugin-error';
export interface RecoveryContext {
    plugin: GridPlugin;
    api: GridAPI;
    get: CapabilityGetter;
    errorHistory: PluginError[];
    retryCount: number;
    maxRetries: number;
}
export interface RecoveryResult {
    success: boolean;
    action: string;
    details?: string;
    nextRetryDelay?: number;
    requiresUserIntervention?: boolean;
    fallbackMode?: boolean;
}
export interface DependencyInfo {
    name: string;
    available: boolean;
    version?: string;
    alternativeSources?: string[];
}
/**
 * Enhanced error recovery system with comprehensive strategies
 */
export declare class EnhancedErrorRecovery {
    private logger;
    private dependencyResolver;
    private fallbackManager;
    private retryManager;
    constructor();
    /**
     * Attempt comprehensive recovery for a failed plugin
     */
    attemptRecovery(context: RecoveryContext): Promise<RecoveryResult>;
    /**
     * Enable fallback mode for a plugin
     */
    enableFallbackMode(pluginName: string, reason: string): void;
    /**
     * Check if plugin is in fallback mode
     */
    isInFallbackMode(pluginName: string): boolean;
    /**
     * Get fallback configuration for a plugin
     */
    getFallbackConfig(pluginName: string, originalConfig: any): any;
    private recoverFromDependencyError;
    private recoverFromInstallationError;
    private recoverFromRuntimeError;
    private recoverFromCapabilityError;
    private recoverFromApiError;
    private genericRecovery;
}
/**
 * Factory function to create enhanced error recovery
 */
export declare function createEnhancedErrorRecovery(): EnhancedErrorRecovery;
