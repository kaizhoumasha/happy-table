import { GridEvents } from './index';
export declare const GRID_EVENT_NAMES: readonly ["row-click", "row-select", "cell-click", "cell-double-click", "cell-right-click", "multi-sort-change", "filter-change", "scroll", "column-resize-start", "column-resize", "toggle-selection", "select-all", "clear-selection"];
export type PublicEventName = typeof GRID_EVENT_NAMES[number];
export type GridEventName = keyof GridEvents;
export type PublicEventMap = Pick<GridEvents, PublicEventName>;
