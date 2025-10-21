import { GridCapabilities, CapabilityGetter } from '../index';
import { PluginError } from './plugin-error';
export type CapabilityVersion = string;
export type CapabilityName = keyof GridCapabilities;
export interface CapabilityInfo<T extends CapabilityName = CapabilityName> {
    name: T;
    version: CapabilityVersion;
    capability: GridCapabilities[T];
    installed: boolean;
    dependencies?: CapabilityName[];
    metadata: {
        description: string;
        author?: string;
        installDate: number;
        compatible: CapabilityVersion[];
        tags: string[];
    };
}
export interface CapabilityRegistryState {
    capabilities: Map<CapabilityName, CapabilityInfo>;
    dependencies: Map<CapabilityName, Set<CapabilityName>>;
    errors: Map<CapabilityName, PluginError>;
    loadOrder: CapabilityName[];
}
/**
 * Comprehensive Capability Registry
 */
export declare class CapabilityRegistry {
    private logger;
    private state;
    private versionComparator;
    /**
     * Register a capability with full lifecycle management
     */
    register<T extends CapabilityName>(name: T, capability: GridCapabilities[T], metadata: {
        version: CapabilityVersion;
        description: string;
        author?: string;
        compatible?: CapabilityVersion[];
        dependencies?: CapabilityName[];
        tags?: string[];
    }): boolean;
    /**
     * Unregister a capability with dependency checking
     */
    unregister(name: CapabilityName): boolean;
    /**
     * Get a capability with type safety
     */
    get<T extends CapabilityName>(name: T): GridCapabilities[T] | undefined;
    /**
     * Check if a capability is available
     */
    has(name: CapabilityName): boolean;
    /**
     * Get capability information
     */
    getInfo(name: CapabilityName): CapabilityInfo | undefined;
    /**
     * List all registered capabilities
     */
    list(): CapabilityInfo[];
    /**
     * List available capabilities (installed only)
     */
    listAvailable(): CapabilityInfo[];
    /**
     * Find capabilities by tag
     */
    findByTag(tag: string): CapabilityInfo[];
    /**
     * Get capabilities by version
     */
    getByVersion(version: CapabilityVersion): CapabilityInfo[];
    /**
     * Create a type-safe capability getter
     */
    createGetter(): CapabilityGetter;
    /**
     * Get dependency graph
     */
    getDependencyGraph(): Record<string, string[]>;
    /**
     * Get load order (topologically sorted)
     */
    getLoadOrder(): CapabilityName[];
    /**
     * Get capability errors
     */
    getErrors(): Map<CapabilityName, PluginError>;
    /**
     * Clear all errors
     */
    clearErrors(): void;
    /**
     * Validate system integrity
     */
    validateSystem(): {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    };
    /**
     * Get system statistics
     */
    getStats(): {
        total: number;
        installed: number;
        errored: number;
        byVersion: Record<CapabilityVersion, number>;
        byTag: Record<string, number>;
    };
    /**
     * Cleanup all capabilities
     */
    cleanup(): void;
    private validateCapability;
    private validateDependencies;
    private isVersionCompatible;
    private updateDependencyGraph;
    private getDependents;
    private detectCircularDependencies;
    private hasCircularDependency;
    private detectVersionConflicts;
}
/**
 * Create a global capability registry instance
 */
export declare function createCapabilityRegistry(): CapabilityRegistry;
/**
 * Capability discovery and inspection utilities
 */
export declare const CapabilityUtils: {
    /**
     * Inspect a capability's interface
     */
    inspectCapability(capability: any): {
        methods: string[];
        properties: string[];
        type: string;
    };
    /**
     * Generate capability documentation
     */
    generateDocs(registry: CapabilityRegistry): string;
    /**
     * Export registry state for debugging
     */
    exportState(registry: CapabilityRegistry): any;
};
