import { ColumnDef, RowData, GridAPI, GridInteractionContract, GridRenderer, RendererOptions as RendererOpts } from './index';
/**
 * Configuration for three-pane layout system (left frozen, center scrollable, right frozen)
 *
 * Used by:
 * - GridHeader.vue
 * - GridBody.vue
 * - TableRendererComponent.vue
 */
export interface PaneConfig {
    left: {
        columns: ColumnDef[];
        width: number;
    };
    center: {
        columns: ColumnDef[];
        width: number;
    };
    right: {
        columns: ColumnDef[];
        width: number;
    };
}
/**
 * Virtual scrolling data structure containing processed rows and metadata
 *
 * Used by:
 * - GridBody.vue
 * - TableRendererComponent.vue
 * - Virtual scrolling system
 */
export interface VirtualData {
    /** Rows currently visible in the viewport */
    visibleRows: RowData[];
    /** Start index in the original data array */
    startIndex: number;
    /** End index in the original data array */
    endIndex: number;
    /** Total virtual height for scrollbar calculation */
    totalHeight: number;
}
/**
 * Extended virtual item with row data and positioning
 *
 * Used by virtualization system for rendering optimization
 */
export interface VirtualRowItem {
    /** Virtual item metadata */
    index: number;
    start: number;
    size: number;
    end: number;
    /** Associated row data */
    row: RowData;
    /** Index in the filtered/processed array */
    rowArrayIndex: number;
}
/**
 * Props for TableRenderer component
 *
 * Standardized interface replacing the generic 'Props' interface
 */
export interface TableRendererProps {
    /** TableRenderer instance */
    renderer: GridRenderer;
    /** Interaction contract for event delegation */
    interactionContract: GridInteractionContract;
    /** Grid API for state and operations */
    gridAPI: GridAPI;
    /** Renderer configuration options */
    options: RendererOpts;
}
/**
 * Layout metrics for grid rendering calculations
 */
export interface LayoutMetrics {
    /** Total width of all columns */
    totalWidth: number;
    /** Height of header row */
    headerHeight: number;
    /** Height of each data row */
    rowHeight: number;
    /** Calculated height for body section */
    bodyHeight: string | number;
}
/**
 * Scroll state for synchronized scrolling between panes
 */
export interface ScrollState {
    /** Horizontal scroll position */
    scrollLeft: number;
    /** Vertical scroll position */
    scrollTop: number;
}
/**
 * Selection state for multi-pane rendering
 */
export interface SelectionState {
    /** Set of selected row IDs */
    selectedIds: Set<string | number>;
    /** Currently active/focused cell or row ID */
    activeId: string | number | null;
}
/**
 * Simplified render metrics for footer display
 *
 * Used by GridFooter.vue for performance monitoring
 */
export interface RenderMetrics {
    /** Time taken for last render operation (ms) */
    lastRenderTime: number;
    /** Average frames per second */
    averageFPS: number;
    /** Total number of renders performed */
    renderCount: number;
    /** Average render time over recent operations */
    avgRenderTime: number;
}
/**
 * Helper type for creating pane-specific data
 */
export type PaneData<T> = {
    [K in keyof PaneConfig]: T;
};
/**
 * Helper type for pane names
 */
export type PaneName = keyof PaneConfig;
/**
 * Helper type for making renderer options partial
 */
export type PartialRendererOptions = Partial<RendererOpts>;
