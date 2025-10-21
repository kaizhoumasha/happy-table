import { Ref } from 'vue';
/**
 * DOM Performance Optimization Utilities
 *
 * Features:
 * - Element pooling for virtual scrolling
 * - Hardware acceleration utilities
 * - DOM batching for performance
 * - Intersection Observer for visibility
 * - Memory-efficient event delegation
 */
export declare class ElementPool<T extends HTMLElement = HTMLElement> {
    private pool;
    private activeElements;
    private createElement;
    private resetElement;
    private maxPoolSize;
    constructor(createElement: () => T, resetElement?: (element: T) => void, maxPoolSize?: number);
    acquire(): T;
    release(element: T): void;
    clear(): void;
    get stats(): {
        poolSize: number;
        activeElements: number;
        totalElements: number;
    };
}
export declare function enableHardwareAcceleration(element: HTMLElement): void;
export declare function disableHardwareAcceleration(element: HTMLElement): void;
export declare function applyCSSContainment(element: HTMLElement, types?: string[]): void;
export declare class DOMBatcher {
    private batches;
    private rafId;
    add(operation: () => void): void;
    private schedule;
    flush(): void;
    clear(): void;
}
export declare class EventDelegator {
    private listeners;
    private boundHandler;
    private container;
    constructor(container: HTMLElement);
    on(eventType: string, selector: string, handler: (event: Event, target: Element) => void): void;
    off(eventType: string, selector: string, handler: (event: Event, target: Element) => void): void;
    private handleEvent;
    destroy(): void;
}
export declare function useVisibilityObserver(threshold?: number, rootMargin?: string): {
    visibleElements: Ref<Set<Element> & Omit<Set<Element>, keyof Set<any>>, Set<Element> | (Set<Element> & Omit<Set<Element>, keyof Set<any>>)>;
    observe: (element: Element) => void;
    unobserve: (element: Element) => void;
    isVisible: (element: Element) => boolean;
};
export declare class StyleBatcher {
    private updates;
    private rafId;
    setStyle(element: HTMLElement, property: string, value: string): void;
    setStyles(element: HTMLElement, styles: Record<string, string>): void;
    private schedule;
    flush(): void;
}
export declare function createVirtualRowFactory(): {
    acquireRow: () => HTMLDivElement;
    releaseRow: (row: HTMLDivElement) => void;
    acquireCell: () => HTMLDivElement;
    releaseCell: (cell: HTMLDivElement) => void;
    batchStyle: (element: HTMLElement, styles: Record<string, string>) => void;
    flushStyles: () => void;
    getStats: () => {
        rows: {
            poolSize: number;
            activeElements: number;
            totalElements: number;
        };
        cells: {
            poolSize: number;
            activeElements: number;
            totalElements: number;
        };
    };
    cleanup: () => void;
};
export declare class MemoryLeakDetector {
    private elements;
    private callbacks;
    private checkInterval;
    constructor(intervalMs?: number);
    track(element: HTMLElement): void;
    onLeak(callback: () => void): void;
    private checkForLeaks;
    destroy(): void;
}
export declare function createOptimizedScrollHandler(callback: (scrollTop: number, scrollLeft: number) => void): {
    handler: (event: Event) => void;
    cleanup: () => void;
};
