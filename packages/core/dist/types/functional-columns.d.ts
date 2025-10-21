import { RowData, ColumnDef } from './index';
/**
 * Functional column types
 */
export type FunctionalColumnType = 'seq' | 'checkbox' | 'radio' | 'drag' | 'actions';
/**
 * Context passed to selection filter and validator functions
 */
export interface SelectionContext {
    /** Zero-based row index in the current view */
    rowIndex: number;
    /** The row data object */
    rowData: RowData;
    /** Whether the row is currently filtered */
    isFiltered: boolean;
    /** Whether the row is part of a group */
    isGrouped: boolean;
    /** Number of rows currently selected (if available) */
    selectedCount?: number;
}
/**
 * Options for checkbox column (multi-selection)
 */
export interface CheckboxColumnOptions {
    /** Whether to show indeterminate state in header */
    showIndeterminate?: boolean;
}
/**
 * Options for radio column (single-selection)
 */
export interface RadioColumnOptions {
    /** Shared group name for radio inputs */
    radioGroupName?: string;
    /** Optional header label */
    headerLabel?: string;
}
/**
 * Options for sequence column
 */
export interface SeqColumnOptions {
    /** Starting number (default: 1) */
    baseNumber?: number;
    /** Custom formatter for sequence numbers */
    formatter?: (index: number, baseNumber: number) => string | number;
}
/**
 * Result of a drag operation
 */
export interface DragResult {
    /** Source row index */
    sourceIndex: number;
    /** Destination row index */
    destinationIndex: number;
    /** The dragged row data */
    rowData: RowData;
}
/**
 * Context provided when determining drag availability
 */
export interface DragContext {
    /** Zero-based row index in the current view */
    rowIndex: number;
}
/**
 * Options for drag column
 */
export interface DragColumnOptions {
    /** Callback when drag operation completes */
    onDragEnd?: (result: DragResult) => void;
    /** Whether to enable cross-table dragging (requires plugin) */
    crossTable?: boolean;
    /** Guard to determine whether a row can be dragged */
    isRowDraggable?: (row: RowData, context: DragContext) => boolean | {
        disabled: boolean;
        reason?: string;
    };
    /** Provide a custom drag image element */
    dragImageElement?: (row: RowData) => HTMLElement | null;
    /** Customize the text content shown in the default drag preview */
    dragPreviewContent?: (row: RowData) => string;
}
/**
 * Options for actions column
 */
export interface ActionsColumnOptions {
    /** Default button configurations (if not using slots) */
    buttons?: Array<{
        label: string;
        icon?: string;
        onClick: (row: RowData) => void;
        disabled?: (row: RowData) => boolean;
        visible?: (row: RowData) => boolean;
    }>;
}
/**
 * Base functional column definition (shared properties)
 */
export interface BaseFunctionalColumnDef extends Omit<ColumnDef, 'dataType' | 'field'> {
    /** Functional column type */
    type: FunctionalColumnType;
    /** Field is auto-generated for functional columns, but can be overridden */
    field: string;
    /** Override default pinning (functional columns default to 'left', actions to 'right') */
    pinned?: 'left' | 'right';
    /** Override default width */
    width?: number;
    /** Minimum width */
    minWidth?: number;
    /** Maximum width */
    maxWidth?: number;
    /** Whether the column can be resized (default: false for functional columns) */
    resizable?: boolean;
    /** Whether the column can be reordered (default: false for functional columns) */
    isDraggable?: boolean;
    /** Custom cell slot name */
    cellSlot?: string;
    /** Custom header slot name */
    headerSlot?: string;
}
/**
 * Discriminated union of all functional column types
 * This provides type-safe access to functionalOptions based on column type
 */
export type FunctionalColumnDef = (BaseFunctionalColumnDef & {
    type: 'checkbox';
    functionalOptions?: CheckboxColumnOptions;
}) | (BaseFunctionalColumnDef & {
    type: 'radio';
    functionalOptions?: RadioColumnOptions;
}) | (BaseFunctionalColumnDef & {
    type: 'seq';
    functionalOptions?: SeqColumnOptions;
}) | (BaseFunctionalColumnDef & {
    type: 'drag';
    functionalOptions?: DragColumnOptions;
}) | (BaseFunctionalColumnDef & {
    type: 'actions';
    functionalOptions?: ActionsColumnOptions;
});
/**
 * Type guard to check if a column is a functional column
 */
export declare function isFunctionalColumn(column: ColumnDef): column is ColumnDef & {
    type: FunctionalColumnType;
};
/**
 * Default widths for functional columns (in pixels)
 */
export declare const FUNCTIONAL_COLUMN_DEFAULTS: {
    readonly seq: {
        readonly width: 48;
        readonly minWidth: 40;
        readonly pinned: "left";
    };
    readonly checkbox: {
        readonly width: 52;
        readonly minWidth: 52;
        readonly pinned: "left";
    };
    readonly radio: {
        readonly width: 52;
        readonly minWidth: 52;
        readonly pinned: "left";
    };
    readonly drag: {
        readonly width: 48;
        readonly minWidth: 48;
        readonly pinned: "left";
    };
    readonly actions: {
        readonly width: 120;
        readonly minWidth: 80;
        readonly pinned: "right";
    };
};
/**
 * Default order for left-pinned functional columns
 */
export declare const DEFAULT_LEFT_FUNCTIONAL_ORDER: FunctionalColumnType[];
