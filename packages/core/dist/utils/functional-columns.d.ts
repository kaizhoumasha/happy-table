import { ColumnDef, InternalColumnDef, FunctionalColumnDef, FunctionalColumnType } from '../types';
import { isFunctionalColumn } from '../types/functional-columns';
export { isFunctionalColumn };
/**
 * Generate a unique ID for a functional column
 */
export declare function generateFunctionalColumnId(type: FunctionalColumnType, index?: number): string;
/**
 * Normalize a functional column definition with defaults
 */
export declare function normalizeFunctionalColumn(col: FunctionalColumnDef, index?: number): InternalColumnDef;
/**
 * Create a default functional column definition
 */
export declare function createDefaultFunctionalColumn(type: FunctionalColumnType, index?: number): FunctionalColumnDef;
/**
 * Merge functional columns from props and columnDefs
 * Deduplicates by type and maintains order
 */
export declare function mergeFunctionalColumns(propsColumns: FunctionalColumnType[] | boolean | undefined, columnDefs: ColumnDef[]): ColumnDef[];
/**
 * Sort functional columns by default order
 * Left-pinned functional columns: drag → checkbox → radio → seq
 * Right-pinned: actions
 * Non-functional: preserved order
 */
export declare function sortFunctionalColumns(columns: InternalColumnDef[]): InternalColumnDef[];
/**
 * Enforce mutual exclusivity for selection columns (checkbox/radio).
 * If both exist or duplicates exist, keep the first encountered among
 * checkbox/radio in the original input order and remove the rest.
 * Also deduplicate multiple instances of the same selection type.
 */
export declare function enforceSelectionColumnExclusivity(columns: InternalColumnDef[]): InternalColumnDef[];
/**
 * Validate functional column dependencies
 * Returns validation result with error message if invalid
 */
export interface FunctionalColumnValidation {
    valid: boolean;
    error?: string;
    columnId?: string;
}
export declare function validateFunctionalColumn(col: FunctionalColumnDef, hasPlugin: (name: string) => boolean): FunctionalColumnValidation;
/**
 * Check if selection mode is compatible with functional columns
 */
export declare function validateSelectionMode(columns: ColumnDef[], selectionMode: string | undefined): {
    valid: boolean;
    warning?: string;
    suggestedMode?: string;
};
