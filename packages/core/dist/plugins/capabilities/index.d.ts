import { createDataPipelineCapability, DataPipelineCapability } from './data-pipeline-capability';
import { createAsyncTasksCapability, AsyncTasksCapability } from './async-tasks-capability';
import { createWebSocketCapability, WebSocketCapability } from './websocket-capability';
import { createAICapability, AICapability } from './ai-capability';
export interface GridCapabilities {
    'data-pipeline': DataPipelineCapability;
    'async-tasks': AsyncTasksCapability;
    websocket: WebSocketCapability;
    ai: AICapability;
}
export type { CapabilityGetter } from '../types';
export declare const capabilityFactories: {
    readonly 'data-pipeline': typeof createDataPipelineCapability;
    readonly 'async-tasks': typeof createAsyncTasksCapability;
    readonly websocket: typeof createWebSocketCapability;
    readonly ai: typeof createAICapability;
};
export { createDataPipelineCapability, type DataPipelineCapability, type DataInterceptor, type DataInterceptorType, } from './data-pipeline-capability';
export { createAsyncTasksCapability, type AsyncTasksCapability, type AsyncTask, type TaskStatus, } from './async-tasks-capability';
export { createWebSocketCapability, type WebSocketCapability, type WebSocketConnection, type WebSocketOptions, } from './websocket-capability';
export { createAICapability, type AICapability, type AnalysisOptions, type AnomalyDetectionOptions, type OptimizationContext, type DataInsights, type InsightPattern, type DataStatistics, type Anomaly, type OptimizationSuggestion, type DataSummary, type FieldSummary, type TrendPrediction, type DataClassification, } from './ai-capability';
