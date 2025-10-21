import { Ref, ComputedRef } from 'vue';
import { RowData, GridAPI } from '../types';
export interface DataPipelineInterceptor {
    type: 'filter' | 'sort' | 'transform' | 'grouping' | 'aggregation';
    priority: number;
    name: string;
    process: (data: RowData[], context?: unknown) => RowData[] | Promise<RowData[]>;
    enabled: boolean;
}
export interface DataPipelineStage {
    name: string;
    interceptors: DataPipelineInterceptor[];
    metrics: {
        processedCount: number;
        averageTime: number;
        lastProcessTime: number;
        errorCount: number;
    };
}
export interface DataPipelineMetrics {
    totalProcessTime: number;
    stagesCompleted: number;
    itemsProcessed: number;
    errorCount: number;
    lastRunTime: number;
    throughputPerSecond: number;
}
export interface DataPipelineOptions {
    enableMetrics?: boolean;
    maxBatchSize?: number;
    asyncProcessing?: boolean;
    errorHandling?: 'throw' | 'log' | 'ignore';
    debounceMs?: number;
}
export interface DataPipelineReturn {
    isProcessing: ComputedRef<boolean>;
    metrics: ComputedRef<DataPipelineMetrics>;
    stages: ComputedRef<DataPipelineStage[]>;
    lastError: Ref<Error | null>;
    processData: (data: RowData[], context?: unknown) => Promise<RowData[]>;
    addInterceptor: (interceptor: DataPipelineInterceptor) => void;
    removeInterceptor: (name: string) => void;
    enableInterceptor: (name: string) => void;
    disableInterceptor: (name: string) => void;
    getInterceptors: (type?: DataPipelineInterceptor['type']) => DataPipelineInterceptor[];
    clearPipeline: (type?: DataPipelineInterceptor['type']) => void;
    resetMetrics: () => void;
    benchmark: (data: RowData[], iterations?: number) => Promise<DataPipelineBenchmarkResult>;
}
export interface DataPipelineBenchmarkResult {
    averageTime: number;
    minTime: number;
    maxTime: number;
    totalTime: number;
    throughput: number;
    iterations: number;
}
export declare function useDataPipeline(api?: GridAPI, options?: DataPipelineOptions): DataPipelineReturn;
export declare const DataPipelineUtils: {
    createFilterInterceptor: (name: string, filterFn: (row: RowData) => boolean, priority?: number) => DataPipelineInterceptor;
    createSortInterceptor: (name: string, sortFn: (a: RowData, b: RowData) => number, priority?: number) => DataPipelineInterceptor;
    createTransformInterceptor: (name: string, transformFn: (row: RowData) => RowData, priority?: number) => DataPipelineInterceptor;
    createAsyncInterceptor: (name: string, type: DataPipelineInterceptor["type"], asyncProcess: (data: RowData[], onProgress?: (progress: number) => void) => Promise<RowData[]>, priority?: number) => DataPipelineInterceptor;
};
