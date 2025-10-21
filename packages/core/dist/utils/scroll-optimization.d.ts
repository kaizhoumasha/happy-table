/**
 * scroll-optimization.ts - RAF-based scroll optimization with velocity tracking
 *
 * Features:
 * 1. requestAnimationFrame for smooth scroll handling
 * 2. Debouncing for scroll end detection
 * 3. Velocity tracking for adaptive performance optimization
 * 4. Memory-efficient event handling
 */
/**
 * Scroll velocity information
 */
export interface ScrollVelocity {
    /** Horizontal velocity in pixels per millisecond */
    horizontal: number;
    /** Vertical velocity in pixels per millisecond */
    vertical: number;
    /** Overall scroll speed */
    magnitude: number;
}
/**
 * RAF-based scroll handler with debouncing
 * Combines requestAnimationFrame for smooth updates with debouncing for scroll end detection
 */
export declare function createRAFScrollHandler(options: {
    /** Callback for scroll events (throttled by RAF) */
    onScroll: (event: Event, velocity: ScrollVelocity) => void;
    /** Callback when scrolling ends (debounced) */
    onScrollEnd?: (event: Event) => void;
    /** Debounce delay in ms for scroll end detection (default: 150ms) */
    debounceDelay?: number;
    /** Enable velocity tracking (default: true) */
    trackVelocity?: boolean;
}): {
    handleScroll: (event: Event) => void;
    cleanup: () => void;
    getVelocity: () => ScrollVelocity;
};
/**
 * Composable for RAF-based scroll handling in Vue components
 */
export declare function useRAFScroll(options: {
    onScroll: (event: Event, velocity: ScrollVelocity) => void;
    onScrollEnd?: (event: Event) => void;
    debounceDelay?: number;
    trackVelocity?: boolean;
}): {
    handleScroll: (event: Event) => void;
    cleanup: () => void;
    getVelocity: () => ScrollVelocity;
};
