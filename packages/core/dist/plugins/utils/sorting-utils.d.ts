import { CellValue, RowData, SortField, SortOptions, SortConfig, MultiSortConfig } from '../../types';
/**
 * Type guards for sort configurations
 */
export declare function isSingleSortConfig(config: unknown): config is SortConfig;
export declare function isMultiSortConfig(config: unknown): config is MultiSortConfig;
/**
 * Core sorting utilities
 */
export declare class SortingUtils {
    /**
     * Compare two cell values with optional locale and formatting options
     */
    static compareValues(a: CellValue, b: CellValue, options?: SortOptions): number;
    /**
     * Apply sorting for a single field
     */
    static applySortField(data: RowData[], sortField: SortField, globalOptions?: SortOptions): RowData[];
    /**
     * Apply multi-field sorting with priority handling
     * Supports per-field options (SortField extends SortOptions)
     */
    static applyMultiSort(data: RowData[], sortFields: SortField[], globalOptions?: SortOptions): RowData[];
    /**
     * Normalize sort configuration to multi-sort format
     */
    static normalizeToMultiSort(config: SortConfig | MultiSortConfig | null): MultiSortConfig | null;
    /**
     * Validate and normalize sort field priorities
     */
    static validateSortFields(fields: SortField[]): SortField[];
    /**
     * Normalize sort priorities ensuring sequential numbering
     */
    static normalizeSortPriorities(fields: SortField[]): SortField[];
    /**
     * Check if two sort configurations are equivalent
     */
    static areSortConfigsEqual(config1: SortConfig | MultiSortConfig | null, config2: SortConfig | MultiSortConfig | null): boolean;
}
