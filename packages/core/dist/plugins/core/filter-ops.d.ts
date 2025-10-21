import { FilterConfig, RowData, ColumnDef } from '../../types';
export type CompiledPredicate = (row: RowData) => boolean;
export interface CompileContext {
    columns?: ColumnDef[];
    locale?: string;
    timezoneOffset?: number;
}
export declare function compilePredicate(rule: FilterConfig): CompiledPredicate;
export declare function combinePredicates(preds: CompiledPredicate[], join?: 'AND' | 'OR'): CompiledPredicate;
export declare function compileFilterSet(filters: FilterConfig[]): CompiledPredicate;
export declare function signatureForFilters(filters: FilterConfig[]): string;
