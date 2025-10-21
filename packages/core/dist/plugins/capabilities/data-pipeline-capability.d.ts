import { GridAPI } from '../../types';
export type DataInterceptorType = 'filter' | 'sort' | 'transform' | 'grouping' | 'aggregation';
export interface DataInterceptor {
    name: string;
    type: DataInterceptorType;
    priority: number;
    transform: (data: any[]) => any[];
    enabled?: boolean;
    metadata?: Record<string, any>;
}
export interface DataPipelineCapability {
    registerDataInterceptor: (type: DataInterceptorType, interceptor: DataInterceptor) => void;
    removeDataInterceptor: (type: DataInterceptorType, name: string) => void;
    getDataPipeline: () => DataInterceptor[];
    processData: (data: any[], type: DataInterceptorType) => any[];
    clearPipeline: (type?: DataInterceptorType) => void;
}
/**
 * Creates and returns a Data Pipeline capability implementation
 */
export declare function createDataPipelineCapability(api: GridAPI): DataPipelineCapability;
