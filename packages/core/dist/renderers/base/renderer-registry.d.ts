import { RendererFactory, RendererInstance, RendererOptions } from './renderer-interface';
import { GridAPI, GridState, ColumnDef, RowData } from '../../types';
/**
 * Registry for managing renderer instances
 */
export declare class RendererRegistry {
    private renderers;
    private instances;
    private currentRenderer;
    private logger;
    /**
     * Register a renderer factory
     */
    register(name: string, factory: RendererFactory): void;
    /**
     * Unregister a renderer
     */
    unregister(name: string): void;
    /**
     * Get available renderer names
     */
    getAvailable(): string[];
    /**
     * Check if a renderer is registered
     */
    has(name: string): boolean;
    /**
     * Create or get a renderer instance
     */
    getInstance(name: string, _host: HTMLElement, _api: GridAPI, options?: RendererOptions): RendererInstance | null;
    /**
     * Switch to a different renderer
     */
    switchTo(name: string, host: HTMLElement, api: GridAPI, options?: RendererOptions): Promise<RendererInstance | null>;
    /**
     * Get the current active renderer
     */
    getCurrent(): RendererInstance | null;
    /**
     * Get the current renderer name
     */
    getCurrentName(): string | null;
    /**
     * Force render on current renderer
     */
    render(state: GridState, columns: ColumnDef[], rows: RowData[]): void;
    /**
     * Update size on current renderer
     */
    updateSize(width: number, height: number): void;
    /**
     * Cleanup all renderer instances
     */
    cleanup(): void;
    /**
     * Get renderer statistics
     */
    getStats(): {
        registered: number;
        instances: number;
        current: string | null;
        renderers: Array<{
            name: string;
            hasInstance: boolean;
            renderCount: number;
            lastUsed?: Date;
        }>;
    };
    private buildVirtualRows;
}
/**
 * Global renderer registry instance
 */
export declare const rendererRegistry: RendererRegistry;
/**
 * Helper function to register common renderers
 */
export declare function registerCommonRenderers(): void;
/**
 * Helper to check renderer compatibility
 */
export declare function checkRendererCompatibility(name: string, state: GridState): {
    compatible: boolean;
    issues: string[];
    recommendations: string[];
};
/**
 * Performance monitoring for renderer switching
 */
export declare class RendererPerformanceMonitor {
    private metrics;
    recordSwitch(rendererName: string, duration: number, success: boolean): void;
    getMetrics(): Map<string, any>;
    reset(): void;
}
/**
 * Default renderer selection logic
 */
export declare function selectOptimalRenderer(state: GridState): string;
/**
 * Create a renderer registry instance
 */
export declare function createRendererRegistry(): RendererRegistry;
/**
 * Switch to a different renderer using the global registry
 */
export declare function switchRenderer(name: string, host: HTMLElement, api: GridAPI, options?: RendererOptions): Promise<RendererInstance | null>;
/**
 * Get the current active renderer from global registry
 */
export declare function getCurrentRenderer(): RendererInstance | null;
/**
 * Get all available renderers from global registry
 */
export declare function getAvailableRenderers(): string[];
