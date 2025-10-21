import { ColumnDef, ColumnDragContext, PinnedLocation } from '../types';
/**
 * 判断拖拽中的列是否允许在目标列附近释放
 */
export declare function isColumnDropBlocked(dragContext: ColumnDragContext | null | undefined, targetColumn: ColumnDef | null | undefined): boolean;
/**
 * 读取列的固定区域
 */
export declare function getColumnPinnedLocation(column: ColumnDef | null | undefined): PinnedLocation;
