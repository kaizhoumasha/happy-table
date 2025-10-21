import { Ref, ComputedRef } from 'vue';
import { ColumnDef, GridAPI } from '../../../../types';
interface UseColumnResizeOptions {
    columnRef: Ref<ColumnDef>;
    gridAPI: GridAPI;
    getCurrentWidth: () => number;
}
export declare function useColumnResize({ columnRef, gridAPI, getCurrentWidth }: UseColumnResizeOptions): {
    isColumnResizable: ComputedRef<boolean>;
    isResizeActive: Ref<boolean, boolean>;
    handleResize: (event: MouseEvent) => void;
    handleResizeDoubleClick: (event: MouseEvent) => void;
    handleResizeEndVisuals: () => void;
};
export {};
