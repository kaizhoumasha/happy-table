import { Logger } from '../../utils';
/**
 * Plugin Error Utilities
 *
 * Standardized error handling for plugins with error classification
 * and recovery suggestions.
 */
export type PluginErrorType = 'dependency' | 'installation' | 'runtime' | 'validation' | 'api' | 'capability';
export declare class PluginError extends Error {
    readonly type: PluginErrorType;
    readonly pluginName: string;
    readonly timestamp: number;
    readonly recovery?: string;
    readonly code?: string;
    constructor(type: PluginErrorType, message: string, pluginName: string, options?: {
        recovery?: string;
        code?: string;
        cause?: Error;
    });
    /**
     * Get a user-friendly error message
     */
    getUserMessage(): string;
    /**
     * Get error details for debugging
     */
    getDebugInfo(): Record<string, any>;
    /**
     * Convert to a serializable object
     */
    toJSON(): Record<string, any>;
}
/**
 * Create a standardized plugin error
 */
export declare function createPluginError(type: PluginErrorType, message: string, pluginName: string, options?: {
    recovery?: string;
    code?: string;
    cause?: Error;
}): PluginError;
/**
 * Common plugin error factories
 */
export declare const PluginErrors: {
    /**
     * Dependency error
     */
    dependency(pluginName: string, missingDeps: string[]): PluginError;
    /**
     * Installation error
     */
    installation(pluginName: string, reason: string, cause?: Error): PluginError;
    /**
     * Runtime error
     */
    runtime(pluginName: string, operation: string, cause?: Error): PluginError;
    /**
     * Validation error
     */
    validation(pluginName: string, field: string, reason: string): PluginError;
    /**
     * API error
     */
    api(pluginName: string, method: string): PluginError;
    /**
     * Capability error
     */
    capability(pluginName: string, capability: string): PluginError;
};
/**
 * Error recovery strategies
 */
export declare const ErrorRecovery: {
    logger: Logger;
    /**
     * Disable plugin with notification
     */
    disablePlugin(pluginName: string, error: PluginError): void;
    /**
     * Attempt to recover from error
     */
    attemptRecovery(pluginName: string, error: PluginError, retryCallback?: () => void): boolean;
};
