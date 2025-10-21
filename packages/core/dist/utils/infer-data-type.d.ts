import { ColumnDef, RowData } from '../types';
export type InferredDataType = NonNullable<ColumnDef['dataType']> | 'text';
interface InferOptions {
    sampleSize?: number;
    enumMaxUnique?: number;
    enumMaxUniqueRatio?: number;
    locale?: string;
}
export declare function inferDataType(values: unknown[], opts?: InferOptions): InferredDataType;
export declare function inferDataTypeForColumn(data: RowData[], column: ColumnDef, opts?: InferOptions): InferredDataType;
export {};
