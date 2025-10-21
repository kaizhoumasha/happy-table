import { GridRenderer, GridInteractionContract, VirtualRow, RendererOptions } from '../base/renderer-interface';
import { GridAPI, GridState, ColumnDef } from '../../types';
/**
 * Interface for the Vue component instance methods
 */
/**
 * TableRenderer implementation using Vue component
 */
export declare class TableRenderer implements GridRenderer {
    readonly name: "table";
    readonly interactionContract: GridInteractionContract;
    private logger;
    private app;
    private componentInstance;
    private hostElement;
    private isDestroyed;
    private readonly options;
    private currentState;
    private currentColumns;
    private currentRows;
    constructor(options?: RendererOptions);
    /**
     * Mount renderer to host element
     */
    mount(host: HTMLElement, api: GridAPI): Promise<void>;
    /**
     * Unmount renderer and cleanup
     */
    unmount(): Promise<void>;
    /**
     * Render current state
     */
    render(state: GridState, columns: ColumnDef[], rows: VirtualRow[]): void;
    /**
     * Handle resize events
     */
    resize(width: number, height: number): void;
    /**
     * Get renderer configuration schema
     */
    getConfigSchema(): Record<string, any>;
    /**
     * Update configuration
     */
    updateConfig(config: Record<string, any>): void;
    /**
     * Get current state (for debugging)
     */
    getCurrentState(): {
        state: GridState | null;
        columns: ColumnDef[];
        rows: VirtualRow[];
    };
    /**
     * Setup core logic callbacks for interaction contract
     */
    private setupCoreCallbacks;
    /**
     * Cleanup resources
     */
    private cleanup;
    /**
     * Mark renderer as destroyed
     */
    destroy(): void;
}
/**
 * Factory function to create TableRenderer instances
 */
export declare function createTableRenderer(options?: RendererOptions): TableRenderer;
/**
 * Default export for convenience
 */
export default createTableRenderer;
