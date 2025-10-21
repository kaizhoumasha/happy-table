/**
 * Browser Performance Optimization Utilities
 *
 * Features:
 * - Hardware acceleration management
 * - Passive event listeners
 * - Critical rendering path optimization
 * - Browser-specific optimizations
 * - Intersection Observer pooling
 * - RequestAnimationFrame utilities
 */
export declare const BrowserFeatures: {
    readonly hasIntersectionObserver: boolean;
    readonly hasResizeObserver: boolean;
    readonly hasPassiveEvents: boolean;
    readonly hasWebWorkers: boolean;
    readonly hasOffscreenCanvas: boolean;
    readonly hasContainment: boolean;
    readonly hasTransforms: boolean;
    readonly browser: "chrome" | "firefox" | "safari" | "edge" | "other";
};
export declare class HardwareAcceleration {
    private acceleratedElements;
    enable(element: HTMLElement, force?: boolean): void;
    disable(element: HTMLElement): void;
    isEnabled(element: HTMLElement): boolean;
}
export declare class CriticalRenderingOptimizer {
    private styleSheets;
    private criticalCSS;
    inlineCriticalCSS(css: string, id: string): void;
    loadNonCriticalCSS(href: string, id: string): Promise<void>;
    preloadResource(href: string, as: string, type?: string): void;
    optimizeFontLoading(fontFamily: string, fontDisplay?: string): void;
}
export declare class OptimizedEventManager {
    private listeners;
    addEventListener(target: EventTarget, type: string, listener: EventListener, options?: AddEventListenerOptions | boolean): void;
    removeEventListener(target: EventTarget, type: string, listener: EventListener, options?: EventListenerOptions | boolean): void;
    private getOptimizedOptions;
    cleanup(): void;
}
export declare class RAFScheduler {
    private callbacks;
    private currentId;
    private isRunning;
    schedule(callback: () => void): number;
    cancel(id: number): void;
    private start;
    scheduleWithPriority(callback: () => void, priority?: 'high' | 'normal' | 'low'): number;
}
export declare class IntersectionObserverPool {
    private observers;
    private elementCallbacks;
    observe(element: Element, callback: IntersectionObserverCallback, options?: IntersectionObserverInit): () => void;
    private getObserverKey;
    cleanup(): void;
}
export declare class BrowserOptimizations {
    private hardwareAccel;
    private renderOptimizer;
    private _eventManager;
    private rafScheduler;
    private intersectionPool;
    optimizeForBrowser(element: HTMLElement): void;
    private optimizeForChrome;
    private optimizeForFirefox;
    private optimizeForSafari;
    private optimizeForEdge;
    optimizeCriticalPath(): void;
    addOptimizedListener(target: EventTarget, type: string, listener: EventListener, options?: AddEventListenerOptions): void;
    cleanup(): void;
    get hardwareAcceleration(): HardwareAcceleration;
    get renderingOptimizer(): CriticalRenderingOptimizer;
    get eventManager(): OptimizedEventManager;
    get scheduler(): RAFScheduler;
    get intersectionObserver(): IntersectionObserverPool;
}
export declare const browserOptimizations: BrowserOptimizations;
export declare function initializeBrowserOptimizations(): void;
export declare const PerformanceHints: {
    shouldAccelerate: (element: HTMLElement) => boolean;
    shouldUsePassive: (eventType: string) => boolean;
    shouldUseContainment: (element: HTMLElement) => boolean;
};
