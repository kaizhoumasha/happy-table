import { Ref } from 'vue';
/**
 * Memory Management and Leak Prevention
 *
 * Features:
 * - Automatic cleanup on component unmount
 * - WeakMap-based caching to prevent memory leaks
 * - Resource pooling and recycling
 * - Memory usage monitoring
 * - Automatic garbage collection triggers
 */
export declare class WeakCache<K extends object, V> {
    private cache;
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    has(key: K): boolean;
    delete(key: K): void;
}
export declare class ResourceManager {
    private resources;
    private timers;
    private intervals;
    private listeners;
    register(cleanup: () => void): void;
    setTimeout(callback: () => void, delay: number): number;
    setInterval(callback: () => void, interval: number): number;
    addEventListener(target: EventTarget, event: string, handler: EventListener, options?: AddEventListenerOptions): void;
    clearTimeout(id: number): void;
    clearInterval(id: number): void;
    cleanup(): void;
}
export declare class MemoryMonitor {
    private measurements;
    private interval;
    private onThreshold?;
    private threshold;
    constructor(intervalMs?: number, thresholdMB?: number);
    private measure;
    onMemoryThreshold(callback: (usageMB: number) => void): void;
    getCurrentUsage(): {
        used: number;
        total: number;
    } | null;
    getHistory(): Array<{
        timestamp: number;
        used: number;
        total: number;
    }>;
    destroy(): void;
}
export declare class ObjectPool<T> {
    private pool;
    private createFn;
    private resetFn;
    private maxSize;
    constructor(createFn: () => T, resetFn?: (obj: T) => void, maxSize?: number);
    acquire(): T;
    release(obj: T): void;
    clear(): void;
    get size(): number;
}
export declare class GCScheduler {
    private interval;
    private threshold;
    private lastGC;
    constructor(intervalMs?: number, memoryThresholdMB?: number);
    private checkAndGC;
    forceGC(): void;
    destroy(): void;
}
export declare class RowDataManager {
    private rowCache;
    private columnCache;
    private pool;
    getRowData(row: Record<string, unknown>, columnId: string): unknown;
    releaseRowData(row: object): void;
    clear(): void;
    getStats(): {
        poolSize: number;
        cacheSize: number;
    };
}
export declare function useMemoryManagement(): {
    resourceManager: ResourceManager;
    memoryUsage: Ref<{
        used: number;
        total: number;
    } | null, {
        used: number;
        total: number;
    } | {
        used: number;
        total: number;
    } | null>;
    memoryWarning: Ref<boolean, boolean>;
    getCurrentMemoryUsage: () => {
        used: number;
        total: number;
    } | null;
    getMemoryHistory: () => {
        timestamp: number;
        used: number;
        total: number;
    }[];
    forceCleanup: () => void;
};
export declare class LazyArray<T> {
    private data;
    private pendingOperations;
    private rafId;
    constructor(initialData?: T[]);
    push(item: T): void;
    pop(): T | undefined;
    splice(start: number, deleteCount?: number, ...items: T[]): T[];
    get(index: number): T | undefined;
    get length(): number;
    toArray(): T[];
    private scheduleOperation;
    flush(): void;
    clear(): void;
}
