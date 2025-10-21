import { ColumnDef, RowData, GridState, GridAPI, GridInteractionContract } from '../../types';
export type { GridInteractionContract };
/**
 * Interaction events that renderers must dispatch to core logic.
 * These represent user intentions, not raw DOM events.
 */
export type InteractionEvent = 'selectionChanged' | 'activeChanged' | 'editRequested' | 'editSubmitted' | 'editCancelled' | 'contextMenu' | 'columnResize' | 'columnReorder';
/**
 * Virtual row representation for renderers.
 * Contains positioning and data needed for rendering.
 */
export interface VirtualRow {
    id: string | number;
    index: number;
    data: RowData;
    top: number;
    height: number;
    visible: boolean;
}
/**
 * Core renderer interface that all renderers must implement.
 * Provides lifecycle management and rendering coordination.
 */
export interface GridRenderer {
    /** Unique renderer identifier */
    readonly name: 'table' | 'excel' | string;
    /** Interaction contract implementation */
    readonly interactionContract: GridInteractionContract;
    /**
     * Mount renderer to DOM host element.
     * Called when renderer becomes active.
     */
    mount(host: HTMLElement, api: GridAPI): void | Promise<void>;
    /**
     * Unmount renderer and cleanup resources.
     * Called when switching to different renderer.
     */
    unmount(): void | Promise<void>;
    /**
     * Render current state to mounted DOM.
     * Called on every state update.
     */
    render(state: GridState, columns: ColumnDef[], rows: VirtualRow[]): void;
    /**
     * Handle resize events.
     * Called when container dimensions change.
     */
    resize?(width: number, height: number): void;
    /**
     * Get renderer configuration schema.
     * Used for dynamic configuration UI.
     */
    getConfigSchema?(): Record<string, unknown>;
    /**
     * Update renderer-specific configuration.
     * Called when renderer options change.
     */
    updateConfig?(config: Record<string, unknown>): void;
}
/**
 * Renderer factory function type.
 * Used by plugins to create renderer instances.
 */
export type RendererFactory = (options?: RendererOptions) => GridRenderer;
/**
 * Renderer creation options.
 */
export interface RendererOptions {
    /** Performance optimizations */
    performance?: {
        enableRAF?: boolean;
        batchUpdates?: boolean;
        maxConcurrentRenders?: number;
    };
    /** Accessibility settings */
    accessibility?: {
        enableAria?: boolean;
        announceChanges?: boolean;
        keyboardNavigation?: boolean;
    };
    /** Layout configuration */
    layout?: {
        showHeader?: boolean;
        showFooter?: boolean;
        enablePanes?: boolean;
        stickyHeader?: boolean;
    };
    /** Custom styling */
    theme?: {
        className?: string;
        customStyles?: Record<string, string>;
    };
    /** Renderer-specific options */
    [key: string]: unknown;
}
/**
 * Runtime renderer instance with metadata.
 */
export interface RendererInstance {
    renderer: GridRenderer;
    factory: RendererFactory;
    options: RendererOptions;
    metadata: {
        createdAt: Date;
        lastUsed: Date;
        renderCount: number;
    };
}
