import { GridEvents } from '../types';
type OnFn = <K extends keyof GridEvents>(event: K, handler: (payload: GridEvents[K]) => void) => void;
type OffFn = <K extends keyof GridEvents>(event: K) => void;
export interface GridEventsBinding {
    on: OnFn;
    off: OffFn;
}
export declare function useGridEvents(bind: GridEventsBinding): {
    onEvent: <K extends keyof GridEvents>(event: K, handler: (p: GridEvents[K]) => void) => void;
    onceEvent: <K extends keyof GridEvents>(event: K, handler: (p: GridEvents[K]) => void) => void;
    onCellClick: (h: (p: GridEvents["cell-click"]) => void) => void;
    onceCellClick: (h: (p: GridEvents["cell-click"]) => void) => void;
    offCellClick: () => void;
    onCellDoubleClick: (h: (p: GridEvents["cell-double-click"]) => void) => void;
    offCellDoubleClick: () => void;
    onCellRightClick: (h: (p: GridEvents["cell-right-click"]) => void) => void;
    offCellRightClick: () => void;
    onRowClick: (h: (p: GridEvents["row-click"]) => void) => void;
    onceRowClick: (h: (p: GridEvents["row-click"]) => void) => void;
    offRowClick: () => void;
    onRowSelect: (h: (p: GridEvents["row-select"]) => void) => void;
    offRowSelect: () => void;
    onMultiSortChange: (h: (p: GridEvents["multi-sort-change"]) => void) => void;
    offMultiSortChange: () => void;
    onFilterChange: (h: (p: GridEvents["filter-change"]) => void) => void;
    offFilterChange: () => void;
    onScroll: (h: (p: GridEvents["scroll"]) => void) => void;
    offScroll: () => void;
    onColumnResizeStart: (h: (p: GridEvents["column-resize-start"]) => void) => void;
    onColumnResize: (h: (p: GridEvents["column-resize"]) => void) => void;
};
export {};
