/**
 * Column Width Constants
 *
 * Centralized configuration for column width defaults across the codebase.
 * Following the Single Source of Truth principle.
 */
/**
 * Default column width in pixels
 * Used when column.width is not specified
 */
export declare const DEFAULT_COLUMN_WIDTH = 150;
/**
 * Minimum column width in pixels
 * Used for column resizing constraints
 */
export declare const DEFAULT_MIN_COLUMN_WIDTH = 50;
/**
 * Maximum column width in pixels
 * Used for column resizing constraints
 */
export declare const DEFAULT_MAX_COLUMN_WIDTH = 500;
/**
 * Column width estimation range
 */
export declare const COLUMN_WIDTH_RANGE: {
    readonly MIN: 80;
    readonly MAX: 300;
    readonly DEFAULT: 150;
};
/**
 * Normalize column definition with default width values
 * This ensures all columns have width/minWidth/maxWidth defined
 * @param column - Column definition to normalize
 * @returns Normalized column with default values applied
 */
export declare function normalizeColumn<T extends {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
}>(column: T): T & {
    width: number;
    minWidth: number;
    maxWidth: number;
};
