/**
 * DragAutoScroller - Automatic scrolling during drag operations
 *
 * Provides smooth auto-scrolling when dragging near container edges
 * Supports both vertical and horizontal scrolling with configurable zones
 */
export interface AutoScrollOptions {
    /** Distance from edge to trigger scrolling (px) */
    scrollZone?: number;
    /** Scroll speed (px per frame) */
    scrollSpeed?: number;
    /** Enable horizontal scrolling */
    horizontal?: boolean;
    /** Enable vertical scrolling */
    vertical?: boolean;
}
export declare class DragAutoScroller {
    private scrollContainer;
    private scrollInterval;
    private readonly scrollZone;
    private readonly scrollSpeed;
    private readonly horizontal;
    private readonly vertical;
    private currentScrollX;
    private currentScrollY;
    constructor(container: HTMLElement, options?: AutoScrollOptions);
    start(event: DragEvent): void;
    private ensureInterval;
    stop(): void;
    destroy(): void;
}
