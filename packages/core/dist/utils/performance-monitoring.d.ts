import { Ref } from 'vue';
/**
 * Performance Monitoring and Testing Framework
 *
 * Features:
 * - Real-time FPS monitoring
 * - Render time tracking
 * - Memory usage analysis
 * - Performance regression detection
 * - Automated performance testing
 * - Core Web Vitals measurement
 */
export interface PerformanceMetrics {
    fps: number;
    avgRenderTime: number;
    memoryUsage: number;
    scrollLatency: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    interactionLatency: number;
    timestamp: number;
}
export declare class FPSCounter {
    private frames;
    private lastTime;
    private fps;
    private callbacks;
    private rafId;
    private isRunning;
    start(): void;
    stop(): void;
    onUpdate(callback: (fps: number) => void): () => void;
    get currentFPS(): number;
    private tick;
}
export declare class RenderProfiler {
    private measurements;
    private activeTimers;
    private maxMeasurements;
    start(name: string): void;
    end(name: string): number;
    getAverage(name: string, samples?: number): number;
    getAll(): Array<{
        name: string;
        duration: number;
        timestamp: number;
    }>;
    clear(): void;
}
export declare class ScrollPerformanceTracker {
    private scrollEvents;
    private frameCount;
    private lastFrame;
    private isTracking;
    start(): void;
    recordScroll(position: number): void;
    stop(): {
        avgFPS: number;
        scrollLatency: number;
        jankCount: number;
    };
}
export declare class WebVitalsMonitor {
    private metrics;
    constructor();
    private measureCoreWebVitals;
    getMetrics(): Ref<{
        lcp: number | null;
        fid: number | null;
        cls: number | null;
        fcp: number | null;
        ttfb: number | null;
    }, {
        lcp: number | null;
        fid: number | null;
        cls: number | null;
        fcp: number | null;
        ttfb: number | null;
    } | {
        lcp: number | null;
        fid: number | null;
        cls: number | null;
        fcp: number | null;
        ttfb: number | null;
    }>;
}
export declare class PerformanceTestSuite {
    private tests;
    private results;
    addTest(name: string, test: () => Promise<PerformanceMetrics>): void;
    runAll(): Promise<Array<{
        testName: string;
        metrics: PerformanceMetrics;
        passed: boolean;
    }>>;
    private evaluatePerformance;
    private getDefaultMetrics;
    getResults(): {
        testName: string;
        metrics: PerformanceMetrics;
        passed: boolean;
    }[];
    generateReport(): string;
}
export declare function usePerformanceMonitoring(): {
    currentFPS: Ref<number, number>;
    isMonitoring: Ref<boolean, boolean>;
    webVitalsMetrics: Ref<{
        lcp: number | null;
        fid: number | null;
        cls: number | null;
        fcp: number | null;
        ttfb: number | null;
    }, {
        lcp: number | null;
        fid: number | null;
        cls: number | null;
        fcp: number | null;
        ttfb: number | null;
    } | {
        lcp: number | null;
        fid: number | null;
        cls: number | null;
        fcp: number | null;
        ttfb: number | null;
    }>;
    startMonitoring: () => void;
    stopMonitoring: () => void;
    profileRender: (name: string, renderFn: () => Promise<void> | void) => Promise<number>;
    trackScrollStart: () => void;
    trackScrollEvent: (position: number) => void;
    trackScrollEnd: () => {
        avgFPS: number;
        scrollLatency: number;
        jankCount: number;
    };
    getMetrics: () => PerformanceMetrics;
    getRenderStats: () => {
        name: string;
        duration: number;
        timestamp: number;
    }[];
    createPerformanceTest: (_name: string, testFn: () => Promise<void>) => () => Promise<PerformanceMetrics>;
    createTestSuite: () => PerformanceTestSuite;
};
export declare function benchmarkOperation(name: string, operation: () => Promise<void> | void, iterations?: number): Promise<{
    name: string;
    avgTime: number;
    minTime: number;
    maxTime: number;
    totalTime: number;
}>;
