import { GridAPI } from '../types';
import { GridPlugin, PluginError, GridCapabilities, CapabilityGetter } from './index';
export interface PluginOperationResult {
    success: boolean;
    error?: PluginError;
    metadata?: Record<string, any>;
}
export interface UnifiedRegistryExtension {
    name: string;
    install(registry: CorePluginRegistry): void;
    uninstall?(): void;
}
export interface PluginHealth {
    pluginName: string;
    healthy: boolean;
    errorCount: number;
    lastError?: PluginError;
    healthScore: number;
    recoveryAttempts: number;
}
export interface SystemHealth {
    overallHealth: number;
    totalPlugins: number;
    healthyPlugins: number;
    criticalIssues: number;
    recommendations: string[];
}
export interface UnifiedPluginRegistryOptions {
    mode?: 'development' | 'production' | 'auto';
    enableErrorHandling?: boolean;
    enableMonitoring?: boolean;
    enableDebugging?: boolean;
    enableCapabilities?: boolean;
    errorRetryLimit?: number;
    healthCheckInterval?: number;
    asyncTimeout?: number;
    onError?: (error: PluginError, context: string) => void;
    onRecovery?: (pluginName: string, success: boolean) => void;
    onHealthChange?: (health: SystemHealth) => void;
}
/**
 * Core Plugin Registry - Focused on essential plugin operations
 * Follows single responsibility principle
 */
export declare class CorePluginRegistry {
    private logger;
    private plugins;
    private loadOrder;
    private extensions;
    private api;
    constructor(api: GridAPI);
    register(plugin: GridPlugin): Promise<PluginOperationResult>;
    unregister(pluginName: string): Promise<PluginOperationResult>;
    get(pluginName: string): GridPlugin | undefined;
    list(): GridPlugin[];
    getLoadOrder(): string[];
    use(extension: UnifiedRegistryExtension): this;
    unuse(extensionName: string): this;
    getExtension<T extends UnifiedRegistryExtension>(name: string): T | undefined;
    private installPlugin;
    private notifyExtensions;
    cleanup(): Promise<void>;
}
/**
 * Capability Extension - Manages capability system
 */
export declare class CapabilityExtension implements UnifiedRegistryExtension {
    name: string;
    private capabilities;
    private logger;
    install(_registry: CorePluginRegistry): void;
    uninstall(): void;
    register<T extends keyof GridCapabilities>(name: T, capability: GridCapabilities[T]): void;
    get<T extends keyof GridCapabilities>(name: T): GridCapabilities[T] | undefined;
    list(): (keyof GridCapabilities)[];
    createGetter(): CapabilityGetter;
    private initializeDefaultCapabilities;
    private initializeDataPipelineCapability;
    private initializeAsyncTasksCapability;
    private initializeWebSocketCapability;
    private initializeAICapability;
}
/**
 * Error Handling Extension - Progressive error management
 */
export declare class ErrorHandlingExtension implements UnifiedRegistryExtension {
    name: string;
    private errors;
    private mode;
    private onErrorCallback?;
    private logger;
    constructor(options?: {
        mode?: 'development' | 'production';
        onError?: (error: PluginError, context: string) => void;
    });
    install(_registry: CorePluginRegistry): void;
    onEvent(event: string, data: any): void;
    private handleError;
    getErrors(): Map<string, PluginError>;
    clearErrors(): void;
    recover(pluginName: string): Promise<boolean>;
}
/**
 * Monitoring Extension - Performance and health tracking
 */
export declare class MonitoringExtension implements UnifiedRegistryExtension {
    name: string;
    private healthData;
    private metrics;
    install(_registry: CorePluginRegistry): void;
    onEvent(event: string, data: any): void;
    private recordError;
    private recordSuccess;
    getHealth(pluginName?: string): PluginHealth | SystemHealth;
    private generateRecommendations;
}
/**
 * Smart Factory Function - Zero Configuration with Progressive Enhancement
 */
export declare function createUnifiedPluginRegistry(api: GridAPI, options?: UnifiedPluginRegistryOptions): CorePluginRegistry;
export declare function withErrorHandling(registry: CorePluginRegistry, options?: {
    mode?: 'development' | 'production';
}): CorePluginRegistry;
export declare function withMonitoring(registry: CorePluginRegistry): CorePluginRegistry;
export declare function withCapabilities(registry: CorePluginRegistry): CorePluginRegistry;
export type UnifiedPluginRegistry = CorePluginRegistry;
export interface RegistryFeatures {
    errorHandling: boolean;
    monitoring: boolean;
    debugging: boolean;
    capabilities: boolean;
}
export declare const createPluginRegistry: typeof createUnifiedPluginRegistry;
