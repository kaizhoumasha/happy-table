import { GridRenderer, RendererFactory, RendererOptions, RendererInstance, VirtualRow, InteractionEvent } from '../renderers/base/renderer-interface';
import { Ref, ComputedRef } from 'vue';
import { FunctionalColumnType, CheckboxColumnOptions, RadioColumnOptions, SeqColumnOptions, DragColumnOptions, ActionsColumnOptions, DragResult } from './functional-columns';
import { GridPlugin } from '../plugins/types';
/**
 * Happy Table TypeScript Definitions
 * Core types for the component library
 */
export type { ComponentSize, CoreVariant, ComponentState, ButtonVariant, ButtonSize, InputStyleProps, CheckboxStyleProps, ButtonStyleProps, HtButtonProps, HtInputProps, HtInputEmits, HtCheckboxProps, HtCheckboxEmits, } from './primitives';
export type { SelectOption, HtSelectBaseProps, SelectContext, } from './primitives/select';
export type { GridRenderer, RendererFactory, RendererOptions, RendererInstance, VirtualRow, InteractionEvent };
/** Base row data type with flexible properties but stricter typing */
export type { FunctionalColumnType, FunctionalColumnDef, BaseFunctionalColumnDef, SelectionContext, CheckboxColumnOptions, RadioColumnOptions, SeqColumnOptions, DragColumnOptions, DragContext, ActionsColumnOptions, DragResult, } from './functional-columns';
export { isFunctionalColumn, FUNCTIONAL_COLUMN_DEFAULTS, DEFAULT_LEFT_FUNCTIONAL_ORDER } from './functional-columns';
export type CellValue = string | number | boolean | Date | null | undefined;
export interface RowData {
    [key: string]: CellValue;
    id?: string | number;
}
/** Cell editor configuration interface */
export interface CellEditorConfig {
    component: unknown;
    props?: Record<string, unknown>;
    events?: Record<string, (value: CellValue) => void>;
}
/** Cell validator function type */
export type CellValidator = (value: CellValue, row: RowData, column: ColumnDef) => {
    valid: boolean;
    message?: string;
};
export interface ColumnDef {
    id: string;
    field: string;
    title: string;
    index?: number;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    visible?: boolean;
    isDraggable?: boolean;
    resizable?: boolean;
    sortable?: boolean | SortOptions;
    filterable?: boolean;
    pinned?: 'left' | 'right';
    /**
     * Functional column type (for built-in interactive columns)
     * - 'seq': Sequence/row number column
     * - 'checkbox': Multi-selection column
     * - 'radio': Single-selection column
     * - 'drag': Row drag handle column
     * - 'actions': Action buttons column
     */
    type?: FunctionalColumnType;
    /**
     * Configuration options for functional columns
     * Type depends on the `type` field value
     */
    functionalOptions?: CheckboxColumnOptions | RadioColumnOptions | SeqColumnOptions | DragColumnOptions | ActionsColumnOptions;
    dataType?: 'text' | 'number' | 'date' | 'datetime' | 'time' | 'interval' | 'boolean' | 'select' | 'custom' | 'currency' | 'percentage' | 'enum' | 'multiline' | 'json';
    formatter?: (value: CellValue, row: RowData) => string;
    cellRenderer?: string;
    cellSlot?: string;
    headerSlot?: string;
    /**
     * Condition function to determine row selectability (for checkbox/radio columns)
     * Returns true if the row can be selected, false otherwise
     * @example
     * condition: (row) => row.status !== 'Blocked'
     * condition: (row) => row.age >= 18 && row.verified === true
     */
    condition?: (row: RowData) => boolean;
    editable?: boolean;
    editor?: string;
    required?: boolean;
    placeholder?: string;
    maxLength?: number;
    min?: number;
    max?: number;
    step?: number;
    decimals?: number;
    options?: Array<{
        value: CellValue;
        label: string;
        disabled?: boolean;
    } | string | number>;
    searchable?: boolean;
    minDate?: Date | string;
    maxDate?: Date | string;
    locale?: string;
    dateOptions?: Intl.DateTimeFormatOptions;
    showQuickActions?: boolean;
    booleanDisplay?: 'checkbox' | 'toggle' | 'buttons';
    trueLabel?: string;
    falseLabel?: string;
    autoCommit?: boolean;
    validator?: (value: CellValue, row: RowData, column: ColumnDef) => {
        valid: boolean;
        message?: string;
    };
}
/**
 * @internal
 * Internal representation of a column, extending user-defined ColumnDef
 * with calculated properties for rendering and interaction.
 */
export interface InternalColumnDef extends ColumnDef {
    isLastPinned?: boolean;
    isFirstRightPinned?: boolean;
}
export interface SortField extends SortOptions {
    field: string;
    direction: 'asc' | 'desc';
    priority: number;
}
export interface SortConfig {
    field: string;
    direction: 'asc' | 'desc';
}
export interface MultiSortConfig {
    fields: SortField[];
    options?: {
        maxSortFields?: number;
        allowDuplicateFields?: boolean;
    };
}
export interface SortOptions {
    locale?: string;
    sensitivity?: 'accent' | 'base' | 'case' | 'variant';
    naturalSort?: boolean;
    nullsFirst?: boolean;
    customComparator?: (a: CellValue, b: CellValue) => number;
}
export interface FilterConfig {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte' | 'between' | 'in' | 'oneOf' | 'notIn' | 'isEmpty' | 'notEmpty';
    value: CellValue | CellValue[] | [CellValue, CellValue];
}
/**
 * 表格边框模式
 * - none: 无边框，极简现代风格
 * - outer: 仅外边框，适合卡片式布局
 * - full: 全边框（外边框 + 单元格边框），传统表格风格
 * - default: 仅水平分隔线（底边框），现代表格默认样式
 */
export type BorderMode = 'none' | 'outer' | 'full' | 'default';
export interface GridConfig {
    rowHeight: number;
    headerHeight: number;
    virtualizationThreshold: number;
    enableVirtualization: boolean;
    sort?: SortConfig | MultiSortConfig | null;
    filters?: FilterConfig[];
    renderer?: 'table' | 'excel';
    sortOptions?: SortOptions;
    /**
     * 边框模式配置
     * @default 'default'
     */
    border?: BorderMode;
    /**
     * 斑马纹显示模式
     * - true: 启用斑马纹（间隔行背景色）
     * - false: 禁用斑马纹
     * @default false
     */
    stripe?: boolean;
}
export interface GridState {
    data: RowData[];
    columns: InternalColumnDef[];
    config: GridConfig;
    selectedRows: Set<string | number>;
    focusedCell: {
        rowId: string | number;
        columnId: string;
    } | null;
    scrollPosition: {
        top: number;
        left: number;
    };
    loading: boolean;
    error: string | null;
}
export type { GridPlugin };
export interface PluginRegistry {
    register: (plugin: GridPlugin) => void;
    unregister: (name: string) => void;
    get: (name: string) => GridPlugin | undefined;
    list: () => GridPlugin[];
}
export interface GridAPI {
    setData: (data: RowData[]) => void;
    getData: () => RowData[];
    getFilteredData: () => RowData[];
    selectRow: (rowId: string | number) => void;
    selectRows: (rowIds: (string | number)[]) => void;
    clearSelection: () => void;
    setColumns: (columns: ColumnDef[]) => void;
    updateColumn: (columnId: string, updates: Partial<ColumnDef>) => void;
    getState: () => GridState;
    updateConfig: (updates: Partial<GridConfig>) => void;
    emit: <K extends keyof GridEvents>(event: K, payload: GridEvents[K]) => void;
    on?: <K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void) => () => void;
    off?: <K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void) => void;
    loadPlugin: (plugin: GridPlugin) => boolean | Promise<boolean>;
    unloadPlugin: (pluginName: string) => boolean | Promise<boolean>;
    getPlugin: (pluginName: string) => GridPlugin | undefined;
    listPlugins: () => GridPlugin[];
    getPluginErrors: () => Map<string, Error>;
    registerCellRenderer?: (name: string, component: unknown) => void;
    unregisterCellRenderer?: (name: string) => void;
    registerRenderer?: (name: string, factory: RendererFactory) => void;
    setRenderer?: (name: string) => Promise<boolean>;
    getRenderer?: () => string;
    renderWithActiveRenderer?: () => void;
    initializeRenderer?: (hostElement: HTMLElement) => Promise<boolean>;
    resizeRenderer?: (width: number, height: number) => void;
    getAvailableRenderers?: () => string[];
    getActiveRendererInstance?: () => RendererInstance | null;
    registerMemoryCleanup?: (cleanup: () => void) => void;
    registerCellEditor?: (type: string, config: CellEditorConfig) => void;
    unregisterCellEditor?: (type: string) => void;
    getCellEditor?: (type: string) => CellEditorConfig | undefined;
    listCellEditors?: () => string[];
    registerCellValidator?: (columnId: string, validator: CellValidator) => void;
    unregisterCellValidator?: (columnId: string) => void;
    startCellEdit?: (rowId: string | number, columnId: string) => boolean;
    commitCellEdit?: () => Promise<boolean>;
    cancelCellEdit?: () => void;
    updateCellEditValue?: (value: CellValue) => void;
    isEditingCell?: (rowId?: string | number, columnId?: string) => boolean;
    getEditingCell?: () => {
        rowId: string | number;
        columnId: string;
    } | null;
    getEditValue?: () => CellValue;
    getCellEditError?: () => string | null;
    handleCellEditKeydown?: (event: KeyboardEvent) => boolean;
    handleCellDoubleClick?: (rowId: string | number, columnId: string) => boolean;
    sortByColumn?: (field: string, direction?: 'asc' | 'desc') => void;
    addSortField?: (field: string, direction?: 'asc' | 'desc') => void;
    removeSortField?: (field: string) => void;
    changeSortPriority?: (field: string, newPriority: number) => void;
    getSortConfig?: () => SortConfig | MultiSortConfig | null;
    getMultiSortConfig?: () => MultiSortConfig | null;
    addFilter?: (filter: FilterConfig) => string | null;
    removeFilter?: (filterId: string) => boolean;
    updateFilter?: (filterId: string, updates: Partial<FilterConfig>) => boolean;
    clearFilters?: () => void;
    getActiveFilters?: () => FilterConfig[];
    toggleFilter?: (filterId: string) => boolean;
    quickFilter?: (searchTerm: string, fields?: string[]) => void;
}
export interface DataGridProps {
    data?: RowData[];
    columns?: ColumnDef[];
    config?: Partial<GridConfig>;
    loading?: boolean;
    height?: number | string;
    class?: string;
    plugins?: GridPlugin[];
    renderer?: 'table' | 'excel';
    showKeyboardShortcuts?: boolean;
    keyboardHelpHint?: boolean;
}
export interface GridEvents {
    'row-click': {
        row: RowData;
        index: number;
    };
    'row-select': {
        rowId: string | number;
        selected: boolean;
        selectedRows: (string | number)[];
        row?: RowData;
    };
    'cell-click': {
        row: RowData;
        column: InternalColumnDef;
        value: CellValue;
    };
    'cell-double-click': {
        row: RowData;
        column: InternalColumnDef;
        value: CellValue;
    };
    'cell-right-click': {
        row: RowData;
        column: InternalColumnDef;
        value: CellValue;
    };
    'cell-edit': {
        row: RowData;
        column: InternalColumnDef;
        oldValue: CellValue;
        newValue: CellValue;
    };
    'filter-change': FilterConfig[];
    'filter-progress': {
        processed: number;
        total: number;
    };
    'filter-cancel': null;
    scroll: {
        top: number;
        left: number;
    };
    'column-sort': {
        columnId: string;
        field: string;
        ctrlKey: boolean;
    };
    'column-resize-start': {
        columnId: string;
        startX: number;
        currentWidth: number;
    };
    'column-open-filter': {
        field: string;
        __skipHeader?: boolean;
    };
    'cell-focus-change': {
        rowId: string | number | null;
        columnId: string | null;
    };
    'cell-edit-start': {
        rowId: string | number;
        columnId: string;
        value: CellValue;
    };
    'cell-edit-complete': {
        rowId: string | number;
        columnId: string;
        oldValue: CellValue;
        newValue: CellValue;
    };
    'cell-edit-cancel': {
        rowId: string | number;
        columnId: string;
        value: CellValue;
    };
    'plugin-loaded': {
        pluginName: string;
    };
    'plugin-unloaded': {
        pluginName: string;
    };
    'plugin-error': {
        pluginName: string;
        error: Error;
    };
    'data-processed': {
        stage: string;
        data: RowData[];
    };
    'data-intercepted': {
        type: string;
        interceptor: string;
    };
    'data-pipeline-complete': {
        originalCount: number;
        processedCount: number;
        processingTime: number;
        stagesCompleted: number;
    };
    'data-pipeline-error': {
        error: unknown;
        stage: number;
    };
    'data-interceptor-added': {
        name: string;
        type: string;
    };
    'data-interceptor-removed': {
        name: string;
        type: string;
    };
    'data-pipeline-cleared': {
        type?: string;
    };
    'sort-field-added': {
        field: SortField;
        sortConfig: MultiSortConfig;
    };
    'sort-field-removed': {
        field: string;
        sortConfig: MultiSortConfig;
    };
    'sort-priority-changed': {
        field: string;
        oldPriority: number;
        newPriority: number;
    };
    'multi-sort-change': MultiSortConfig;
    'selection-mode-change': {
        mode: string;
    };
    'range-select': {
        start: number;
        end: number;
    };
    'select-all': {
        count: number;
    };
    'selection-clear': {
        previousCount: number;
    };
    'conditional-select': {
        condition: string;
        count: number;
    };
    'selection-restore': {
        count: number;
    };
    'selection-cleanup': {
        message: string;
    };
    'toggle-selection': {
        rowId: string | number | null;
        rowIndex: number;
        selectionType: 'checkbox' | 'radio';
        row?: RowData;
    };
    'clear-selection': {
        reason?: string;
    };
    'data-listener-add': string;
    'row-drag-start': {
        rowId: string | number;
        rowIndex: number;
        row: RowData;
        event?: DragEvent;
    };
    'row-drag-over': {
        sourceIndex: number;
        targetIndex: number;
        sourceId?: string | number;
        targetId?: string | number;
    };
    'row-drag-end': {
        result: DragResult;
        sourceId?: string | number;
        targetId?: string | number;
    };
    'data-refresh-requested': {
        source: string;
    };
    'data-interceptor-registered': {
        type: string;
        interceptor: unknown;
    };
    'data-processing-error': {
        error: unknown;
        interceptor: string;
    };
    'data-pipeline-filtered': unknown[];
    'keyboard-config-change': unknown;
    'key-binding-registered': {
        key: string;
        binding: unknown;
    };
    'key-binding-unregistered': {
        key: string;
    };
    'keyboard-custom-action': {
        action: string;
        context: unknown;
    };
    'websocket-connected': {
        connection: unknown;
    };
    'websocket-disconnected': unknown;
    'column-move': {
        fromIndex: number;
        toIndex: number;
    };
    'column-swap': {
        index1: number;
        index2: number;
    };
    'column-resize': {
        columnId: string;
        width: number;
    };
    'column-hide': {
        columnId: string;
    };
    'column-show': {
        columnId: string;
    };
    'column-pin': {
        columnId: string;
        side: 'left' | 'right';
    };
    'column-unpin': {
        columnId: string;
    };
    'column-order-change': {
        oldOrder: string[];
        newOrder: string[];
    };
    'columns-reset': {
        columns: InternalColumnDef[];
    };
    'columns-changed': InternalColumnDef[];
    'column-updated': {
        columnId: string;
        updates: Partial<ColumnDef>;
    };
    'column-state-change': {
        state: unknown;
    };
    'config-changed': GridConfig;
    'cell-edit-error': {
        rowId: string | number;
        columnId: string;
        error: string;
    };
    'capability-added': {
        name: string;
    };
    'dev-health-check': unknown;
    'dev-health-check-error': Error;
    'async-task-completed': {
        taskId: string;
        result: unknown;
    };
    'async-task-failed': {
        taskId: string;
        error: Error;
    };
    'async-task-scheduled': {
        taskId: string;
        task: unknown;
    };
    'async-task-cancelled': {
        taskId: string;
    };
    'completed-tasks-cleared': unknown;
    'ai-analysis-complete': {
        results: unknown;
    };
    'ai-analysis-error': {
        error: Error;
    };
    'anomalies-detected': {
        anomalies: unknown[];
        count?: number;
    };
    'optimization-suggestions': {
        suggestions: unknown[];
    };
    'data-summary-ready': {
        summary: unknown;
        taskId?: string;
    };
    'data-summary-error': {
        error: Error;
        taskId?: string;
    };
    'trends-predicted': {
        field: string;
        prediction: unknown;
    };
    'data-classified': {
        field: string;
        classification: unknown;
    };
    'data-changed': {
        change: string;
    };
    'ai-analysis-completed': {
        insights: unknown;
    };
    'ai-anomalies-detected': {
        anomalies: unknown[];
    };
    'ai-optimizations-suggested': {
        suggestions: unknown[];
    };
    'async-processing-complete': {
        taskId: string;
        result: unknown;
    };
    'async-processing-error': {
        error: Error;
        taskId: string;
    };
    'user-notification': {
        type: 'info' | 'warn' | 'error' | 'success';
        message: string;
        details?: string;
    };
    'multi-sort-disabled-warning': {
        attempted: boolean;
        message: string;
    };
}
export type GridEventName = keyof GridEvents;
export interface VirtualItem {
    index: number;
    start: number;
    size: number;
    end: number;
}
export interface VirtualColumn {
    index: number;
    start: number;
    size: number;
    end: number;
}
export interface VirtualizerOptions {
    count: ComputedRef<number>;
    getItemSize: (index: number) => number;
    estimateItemSize?: () => number;
    overscan?: number;
    enabled?: Ref<boolean>;
}
export interface VirtualizerReturn {
    scrollElement: Ref<HTMLElement | null>;
    totalSize: ComputedRef<number>;
    virtualItems: ComputedRef<VirtualItem[]>;
    startIndex: ComputedRef<number>;
    endIndex: ComputedRef<number>;
    scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void;
    setContainerSize: (size: {
        height: number;
        width: number;
    }) => void;
    updateScrollPosition: (scrollTop: number) => void;
}
/**
 * Cell position interface for interaction events
 */
export interface CellPosition {
    rowId: string | number;
    columnId: string;
    rowIndex: number;
    columnIndex: number;
}
/**
 * Payload interface for interaction events
 */
export interface InteractionPayload {
    position?: CellPosition;
    event?: Event;
    value?: unknown;
    oldValue?: unknown;
    reason?: string;
    [key: string]: unknown;
}
/**
 * Core logic callbacks for renderer interaction
 */
export interface CoreLogicCallbacks {
    onCellClick: (payload: InteractionPayload) => void;
    onCellDoubleClick: (payload: InteractionPayload) => void;
    onCellRightClick: (payload: InteractionPayload) => void;
    onCellHover: (payload: InteractionPayload) => void;
    onCellFocus: (payload: InteractionPayload) => void;
    onCellEditStart: (payload: InteractionPayload) => void;
    onCellEditComplete: (payload: InteractionPayload) => void;
    onCellEditCancel: (payload: InteractionPayload) => void;
    onRowSelect: (payload: InteractionPayload) => void;
    onColumnResize: (payload: InteractionPayload) => void;
    onColumnSort: (payload: InteractionPayload) => void;
    onColumnMove: (payload: InteractionPayload) => void;
    onScroll: (payload: InteractionPayload) => void;
    onKeyboardNavigation: (payload: InteractionPayload) => void;
}
export interface GridInteractionContract {
    /**
     * [Core → Renderer]
     * Update visual selection state in the renderer.
     * @param selectedIds - Set of selected row/cell IDs
     * @param reason - Why selection changed (for optimization)
     */
    updateSelection(selectedIds: Set<string | number>, reason: 'programmatic' | 'user'): void;
    /**
     * [Core → Renderer]
     * Set or clear the active focus item.
     * For TableRenderer: highlights entire row
     * For ExcelRenderer: highlights individual cell
     */
    setActive(activeId: string | number | null): void;
    /**
     * [Core → Renderer]
     * Ensure specified item is visible in viewport.
     * Renderer handles scroll calculations and execution.
     */
    ensureVisible(id: string | number, behavior: 'smooth' | 'auto'): void;
    /**
     * [Core → Renderer]
     * Toggle edit mode for specified cell/item.
     * Renderer handles editor mounting/unmounting.
     */
    toggleEditMode(id: string | number, mode: 'enter' | 'exit'): Promise<boolean>;
    /**
     * [Renderer → Core]
     * Register event emitter for renderer to send interaction events.
     * Must be called during renderer initialization.
     */
    registerEventEmitter<K extends keyof GridEvents>(emit: (eventName: K, payload: GridEvents[K]) => void): void;
    /**
     * [Renderer → Core]
     * Update scroll position in core state.
     * Used for virtualization and state synchronization.
     */
    updateScrollPosition?(position: {
        top: number;
        left: number;
    }): void;
    /**
     * [Core → Renderer]
     * Force re-render of all visible content.
     * Used when data or configuration changes significantly.
     */
    refresh?(): void;
    /**
     * [Renderer → Core]
     * Emit interaction events to core logic.
     * Used for sending user interaction events.
     */
    emit?<K extends keyof GridEvents>(eventName: K, payload: GridEvents[K]): void;
    /**
     * [Core → Renderer]
     * Register core logic callbacks for interaction handling.
     * Used to setup bidirectional communication.
     */
    registerCoreCallbacks?(callbacks: Partial<CoreLogicCallbacks>): void;
    /**
     * [Core → Renderer]
     * Cleanup and destroy the interaction contract.
     * Called when renderer is being unmounted.
     */
    destroy?(): void;
}
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type { PaneConfig, VirtualData, VirtualRowItem, TableRendererProps, LayoutMetrics, ScrollState, SelectionState, RenderMetrics, PaneData, PaneName, PartialRendererOptions, } from './layout';
export type { UseGridStateReturn, GridStateInternal } from '../core/useGridState';
/** Position where a dragged item will be dropped */
export type DragPosition = 'before' | 'after';
/** Location of a pinned column */
export type PinnedLocation = 'left' | 'right' | 'center';
/** Context information for column drag operations */
export interface ColumnDragContext {
    columnId: string;
    pinned: PinnedLocation;
}
/** Cell renderer component or function */
export type CellRenderer = unknown;
/** Column state for persistence */
export interface ColumnState {
    order: string[];
    widths: Map<string, number>;
    visibility: Map<string, boolean>;
    pinned: Map<string, 'left' | 'right' | null>;
}
/** Extended GridAPI with column management methods */
export interface ExtendedGridAPI extends GridAPI {
    moveColumn?: (columnId: string, targetIndex: number) => boolean;
    swapColumns?: (columnId1: string, columnId2: string) => boolean;
    setColumnOrder?: (order: string[]) => boolean;
    resizeColumn?: (columnId: string, width: number) => boolean;
    autoSizeColumn?: (columnId: string) => boolean;
    hideColumn?: (columnId: string) => boolean;
    showColumn?: (columnId: string) => boolean;
    toggleColumnVisibility?: (columnId: string) => boolean;
    getHiddenColumns?: () => string[];
    pinColumn?: (columnId: string, position: 'left' | 'right') => boolean;
    unpinColumn?: (columnId: string) => boolean;
    getPinnedColumns?: () => {
        left: string[];
        right: string[];
    };
    resetColumns?: () => boolean;
    getColumnState?: () => ColumnState;
    setColumnState?: (state: Partial<ColumnState>) => boolean;
}
