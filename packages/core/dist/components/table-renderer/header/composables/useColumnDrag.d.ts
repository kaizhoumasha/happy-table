import { Ref, ComputedRef } from 'vue';
import { ColumnDef, DragPosition, ColumnDragContext, PinnedLocation } from '../../../../types';
interface ColumnDragEmit {
    (event: 'column-drag-start', payload: ColumnDragContext): void;
    (event: 'column-drop', payload: {
        columnId: string;
        position: DragPosition;
    }): void;
    (event: 'column-drag-end'): void;
}
interface UseColumnDragOptions {
    columnRef: Ref<ColumnDef>;
    dragContextRef: Ref<ColumnDragContext | null | undefined>;
    emit: ColumnDragEmit;
}
export declare function useColumnDrag({ columnRef, dragContextRef, emit }: UseColumnDragOptions): {
    pinnedSide: ComputedRef<PinnedLocation>;
    isColumnDraggable: ComputedRef<boolean>;
    isDragSource: Ref<boolean, boolean>;
    dragOverPosition: Ref<DragPosition | null, DragPosition | null>;
    isDropBlocked: Ref<boolean, boolean>;
    handleColumnDragStart: (event: DragEvent) => void;
    handleColumnDragEnd: () => void;
    handleColumnDragOver: (event: DragEvent) => void;
    handleColumnDragLeave: () => void;
    handleColumnDrop: (event: DragEvent) => void;
};
export {};
