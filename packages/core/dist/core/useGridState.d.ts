import { ComputedRef } from 'vue';
import { GridConfig, ColumnDef, RowData, GridAPI, GridPlugin, FunctionalColumnType, DragResult, DragContext } from '../types';
import { CellValue, BorderMode } from '..';
import { CorePluginRegistry } from '../plugins/unified-plugin-registry';
declare class OptimizedSelection {
    private selection;
    private callbacks;
    add(id: string | number): boolean;
    delete(id: string | number): boolean;
    clear(): void;
    has(id: string | number): boolean;
    toArray(): (string | number)[];
    get size(): number;
    private notifyChange;
    subscribe(callback: () => void): () => void;
}
declare class EventEmitter {
    private listeners;
    private logger;
    on(event: string, handler: (...args: unknown[]) => void): () => void;
    off(event: string, handler: (...args: unknown[]) => void): void;
    emit(event: string, ...args: unknown[]): void;
    clear(): void;
}
export declare function useGridState(initialConfig?: Partial<GridConfig>, initialPlugins?: GridPlugin[]): {
    data: ComputedRef<{
        visibleRows: RowData[];
        startIndex: number;
        endIndex: number;
        totalHeight: number;
    }>;
    columns: ComputedRef<{
        isLastPinned?: boolean | undefined;
        isFirstRightPinned?: boolean | undefined;
        id: string;
        field: string;
        title: string;
        index?: number | undefined;
        width?: number | undefined;
        minWidth?: number | undefined;
        maxWidth?: number | undefined;
        visible?: boolean | undefined;
        isDraggable?: boolean | undefined;
        resizable?: boolean | undefined;
        sortable?: boolean | {
            locale?: string | undefined;
            sensitivity?: "accent" | "base" | "case" | "variant" | undefined;
            naturalSort?: boolean | undefined;
            nullsFirst?: boolean | undefined;
            customComparator?: ((a: CellValue, b: CellValue) => number) | undefined;
        } | undefined;
        filterable?: boolean | undefined;
        pinned?: "left" | "right" | undefined;
        type?: FunctionalColumnType | undefined;
        functionalOptions?: {
            showIndeterminate?: boolean | undefined;
        } | {
            radioGroupName?: string | undefined;
            headerLabel?: string | undefined;
        } | {
            baseNumber?: number | undefined;
            formatter?: ((index: number, baseNumber: number) => string | number) | undefined;
        } | {
            onDragEnd?: ((result: DragResult) => void) | undefined;
            crossTable?: boolean | undefined;
            isRowDraggable?: ((row: RowData, context: DragContext) => boolean | {
                disabled: boolean;
                reason?: string;
            }) | undefined;
            dragImageElement?: ((row: RowData) => HTMLElement | null) | undefined;
            dragPreviewContent?: ((row: RowData) => string) | undefined;
        } | {
            buttons?: {
                label: string;
                icon?: string | undefined;
                onClick: (row: RowData) => void;
                disabled?: ((row: RowData) => boolean) | undefined;
                visible?: ((row: RowData) => boolean) | undefined;
            }[] | undefined;
        } | undefined;
        dataType?: "text" | "number" | "date" | "datetime" | "time" | "interval" | "boolean" | "select" | "custom" | "currency" | "percentage" | "enum" | "multiline" | "json" | undefined;
        formatter?: ((value: CellValue, row: RowData) => string) | undefined;
        cellRenderer?: string | undefined;
        cellSlot?: string | undefined;
        headerSlot?: string | undefined;
        condition?: ((row: RowData) => boolean) | undefined;
        editable?: boolean | undefined;
        editor?: string | undefined;
        required?: boolean | undefined;
        placeholder?: string | undefined;
        maxLength?: number | undefined;
        min?: number | undefined;
        max?: number | undefined;
        step?: number | undefined;
        decimals?: number | undefined;
        options?: (string | number | {
            value: CellValue;
            label: string;
            disabled?: boolean | undefined;
        })[] | undefined;
        searchable?: boolean | undefined;
        minDate?: (Date | string) | undefined;
        maxDate?: (Date | string) | undefined;
        locale?: string | undefined;
        dateOptions?: {
            localeMatcher?: "best fit" | "lookup" | undefined | undefined;
            weekday?: "long" | "short" | "narrow" | undefined | undefined;
            era?: "long" | "short" | "narrow" | undefined | undefined;
            year?: "numeric" | "2-digit" | undefined | undefined;
            month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined | undefined;
            day?: "numeric" | "2-digit" | undefined | undefined;
            hour?: "numeric" | "2-digit" | undefined | undefined;
            minute?: "numeric" | "2-digit" | undefined | undefined;
            second?: "numeric" | "2-digit" | undefined | undefined;
            timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined | undefined;
            formatMatcher?: "best fit" | "basic" | undefined | undefined;
            hour12?: boolean | undefined | undefined;
            timeZone?: string | undefined | undefined;
            calendar?: string | undefined | undefined;
            dayPeriod?: "narrow" | "short" | "long" | undefined | undefined;
            numberingSystem?: string | undefined | undefined;
            dateStyle?: "full" | "long" | "medium" | "short" | undefined | undefined;
            timeStyle?: "full" | "long" | "medium" | "short" | undefined | undefined;
            hourCycle?: "h11" | "h12" | "h23" | "h24" | undefined | undefined;
        } | undefined;
        showQuickActions?: boolean | undefined;
        booleanDisplay?: "checkbox" | "toggle" | "buttons" | undefined;
        trueLabel?: string | undefined;
        falseLabel?: string | undefined;
        autoCommit?: boolean | undefined;
        validator?: ((value: CellValue, row: RowData, column: ColumnDef) => {
            valid: boolean;
            message?: string;
        }) | undefined;
    }[]>;
    selectedRows: ComputedRef<(string | number)[]>;
    loading: ComputedRef<boolean>;
    error: ComputedRef<string | null>;
    scrollPosition: ComputedRef<{
        top: number;
        left: number;
    }>;
    focusedCell: ComputedRef<{
        rowId: string | number;
        columnId: string;
    } | null>;
    config: ComputedRef<{
        rowHeight: number;
        headerHeight: number;
        virtualizationThreshold: number;
        enableVirtualization: boolean;
        sort?: {
            fields: {
                field: string;
                direction: "asc" | "desc";
                priority: number;
                locale?: string | undefined;
                sensitivity?: "accent" | "base" | "case" | "variant" | undefined;
                naturalSort?: boolean | undefined;
                nullsFirst?: boolean | undefined;
                customComparator?: ((a: CellValue, b: CellValue) => number) | undefined;
            }[];
            options?: {
                maxSortFields?: number | undefined;
                allowDuplicateFields?: boolean | undefined;
            } | undefined;
        } | {
            field: string;
            direction: "asc" | "desc";
        } | null | undefined;
        filters?: {
            field: string;
            operator: "equals" | "notEquals" | "contains" | "startsWith" | "endsWith" | "gt" | "lt" | "gte" | "lte" | "between" | "in" | "oneOf" | "notIn" | "isEmpty" | "notEmpty";
            value: CellValue | CellValue[] | [ CellValue, CellValue];
        }[] | undefined;
        renderer?: "table" | "excel" | undefined;
        sortOptions?: {
            locale?: string | undefined;
            sensitivity?: "accent" | "base" | "case" | "variant" | undefined;
            naturalSort?: boolean | undefined;
            nullsFirst?: boolean | undefined;
            customComparator?: ((a: CellValue, b: CellValue) => number) | undefined;
        } | undefined;
        border?: BorderMode | undefined;
        stripe?: boolean | undefined;
    }>;
    virtualizationEnabled: ComputedRef<boolean>;
    renderMetrics: ComputedRef<{
        lastRenderTime: number;
        avgRenderTime: number;
        renderCount: number;
    }>;
    api: GridAPI;
    __internal: {
        state: {
            scrollPosition: {
                top: number;
                left: number;
            };
            focusedCell: {
                rowId: string | number;
                columnId: string;
            } | null;
            rawData: {
                [x: string]: CellValue;
                id?: string | number | undefined;
            }[];
            processedData: {
                [x: string]: CellValue;
                id?: string | number | undefined;
            }[];
            columns: {
                isLastPinned?: boolean | undefined;
                isFirstRightPinned?: boolean | undefined;
                id: string;
                field: string;
                title: string;
                index?: number | undefined;
                width?: number | undefined;
                minWidth?: number | undefined;
                maxWidth?: number | undefined;
                visible?: boolean | undefined;
                isDraggable?: boolean | undefined;
                resizable?: boolean | undefined;
                sortable?: boolean | {
                    locale?: string | undefined;
                    sensitivity?: "accent" | "base" | "case" | "variant" | undefined;
                    naturalSort?: boolean | undefined;
                    nullsFirst?: boolean | undefined;
                    customComparator?: ((a: CellValue, b: CellValue) => number) | undefined;
                } | undefined;
                filterable?: boolean | undefined;
                pinned?: "left" | "right" | undefined;
                type?: FunctionalColumnType | undefined;
                functionalOptions?: {
                    showIndeterminate?: boolean | undefined;
                } | {
                    radioGroupName?: string | undefined;
                    headerLabel?: string | undefined;
                } | {
                    baseNumber?: number | undefined;
                    formatter?: ((index: number, baseNumber: number) => string | number) | undefined;
                } | {
                    onDragEnd?: ((result: DragResult) => void) | undefined;
                    crossTable?: boolean | undefined;
                    isRowDraggable?: ((row: RowData, context: DragContext) => boolean | {
                        disabled: boolean;
                        reason?: string;
                    }) | undefined;
                    dragImageElement?: ((row: RowData) => HTMLElement | null) | undefined;
                    dragPreviewContent?: ((row: RowData) => string) | undefined;
                } | {
                    buttons?: {
                        label: string;
                        icon?: string | undefined;
                        onClick: (row: RowData) => void;
                        disabled?: ((row: RowData) => boolean) | undefined;
                        visible?: ((row: RowData) => boolean) | undefined;
                    }[] | undefined;
                } | undefined;
                dataType?: "text" | "number" | "date" | "datetime" | "time" | "interval" | "boolean" | "select" | "custom" | "currency" | "percentage" | "enum" | "multiline" | "json" | undefined;
                formatter?: ((value: CellValue, row: RowData) => string) | undefined;
                cellRenderer?: string | undefined;
                cellSlot?: string | undefined;
                headerSlot?: string | undefined;
                condition?: ((row: RowData) => boolean) | undefined;
                editable?: boolean | undefined;
                editor?: string | undefined;
                required?: boolean | undefined;
                placeholder?: string | undefined;
                maxLength?: number | undefined;
                min?: number | undefined;
                max?: number | undefined;
                step?: number | undefined;
                decimals?: number | undefined;
                options?: (string | number | {
                    value: CellValue;
                    label: string;
                    disabled?: boolean | undefined;
                })[] | undefined;
                searchable?: boolean | undefined;
                minDate?: (Date | string) | undefined;
                maxDate?: (Date | string) | undefined;
                locale?: string | undefined;
                dateOptions?: {
                    localeMatcher?: "best fit" | "lookup" | undefined | undefined;
                    weekday?: "long" | "short" | "narrow" | undefined | undefined;
                    era?: "long" | "short" | "narrow" | undefined | undefined;
                    year?: "numeric" | "2-digit" | undefined | undefined;
                    month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined | undefined;
                    day?: "numeric" | "2-digit" | undefined | undefined;
                    hour?: "numeric" | "2-digit" | undefined | undefined;
                    minute?: "numeric" | "2-digit" | undefined | undefined;
                    second?: "numeric" | "2-digit" | undefined | undefined;
                    timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined | undefined;
                    formatMatcher?: "best fit" | "basic" | undefined | undefined;
                    hour12?: boolean | undefined | undefined;
                    timeZone?: string | undefined | undefined;
                    calendar?: string | undefined | undefined;
                    dayPeriod?: "narrow" | "short" | "long" | undefined | undefined;
                    numberingSystem?: string | undefined | undefined;
                    dateStyle?: "full" | "long" | "medium" | "short" | undefined | undefined;
                    timeStyle?: "full" | "long" | "medium" | "short" | undefined | undefined;
                    hourCycle?: "h11" | "h12" | "h23" | "h24" | undefined | undefined;
                } | undefined;
                showQuickActions?: boolean | undefined;
                booleanDisplay?: "checkbox" | "toggle" | "buttons" | undefined;
                trueLabel?: string | undefined;
                falseLabel?: string | undefined;
                autoCommit?: boolean | undefined;
                validator?: ((value: CellValue, row: RowData, column: ColumnDef) => {
                    valid: boolean;
                    message?: string;
                }) | undefined;
            }[];
            config: {
                rowHeight: number;
                headerHeight: number;
                virtualizationThreshold: number;
                enableVirtualization: boolean;
                sort?: {
                    fields: {
                        field: string;
                        direction: "asc" | "desc";
                        priority: number;
                        locale?: string | undefined;
                        sensitivity?: "accent" | "base" | "case" | "variant" | undefined;
                        naturalSort?: boolean | undefined;
                        nullsFirst?: boolean | undefined;
                        customComparator?: ((a: CellValue, b: CellValue) => number) | undefined;
                    }[];
                    options?: {
                        maxSortFields?: number | undefined;
                        allowDuplicateFields?: boolean | undefined;
                    } | undefined;
                } | {
                    field: string;
                    direction: "asc" | "desc";
                } | null | undefined;
                filters?: {
                    field: string;
                    operator: "equals" | "notEquals" | "contains" | "startsWith" | "endsWith" | "gt" | "lt" | "gte" | "lte" | "between" | "in" | "oneOf" | "notIn" | "isEmpty" | "notEmpty";
                    value: CellValue | CellValue[] | [ CellValue, CellValue];
                }[] | undefined;
                renderer?: "table" | "excel" | undefined;
                sortOptions?: {
                    locale?: string | undefined;
                    sensitivity?: "accent" | "base" | "case" | "variant" | undefined;
                    naturalSort?: boolean | undefined;
                    nullsFirst?: boolean | undefined;
                    customComparator?: ((a: CellValue, b: CellValue) => number) | undefined;
                } | undefined;
                border?: BorderMode | undefined;
                stripe?: boolean | undefined;
            };
            loading: boolean;
            error: string | null;
            virtualizationEnabled: boolean;
            renderMetrics: {
                lastRenderTime: number;
                avgRenderTime: number;
                renderCount: number;
            };
        };
        selectionManager: OptimizedSelection;
        pluginRegistry: CorePluginRegistry;
        eventEmitter: EventEmitter;
        processDataThroughPipeline: (data: RowData[]) => void;
        updateScrollPosition: (position: {
            top: number;
            left: number;
        }) => void;
        setFocusedCell: (cell: {
            rowId: string | number;
            columnId: string;
        } | null) => void;
        setLoading: (loading: boolean) => void;
        setError: (error: string | null) => void;
        clearCache: () => void;
    };
};
export type UseGridStateReturn = ReturnType<typeof useGridState>;
export type GridStateInternal = UseGridStateReturn['__internal'];
export {};
