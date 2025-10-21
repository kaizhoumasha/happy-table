import { GridAPI } from '../../types';
export type DataRecord = Record<string, unknown>;
export type GridConfiguration = Record<string, unknown>;
export type FieldValue = string | number | boolean | Date | null | undefined;
export type MetadataObject = Record<string, unknown>;
export interface FieldDistribution {
    min?: number;
    max?: number;
    mean?: number;
    median?: number;
    mode?: string | number;
    standardDeviation?: number;
    quartiles?: [number, number, number];
    histogram?: Array<{
        range: string;
        count: number;
    }>;
}
export interface AnalysisOptions {
    fields?: string[];
    sampleSize?: number;
    algorithms?: string[];
    confidence?: number;
}
export interface AnomalyDetectionOptions {
    sensitivity?: number;
    algorithms?: ('statistical' | 'isolation-forest' | 'clustering')[];
    fields?: string[];
}
export interface OptimizationContext {
    performance?: {
        memory: number;
        cpu: number;
        renderTime: number;
    };
    usage?: {
        dataSize: number;
        userInteractions: string[];
        commonOperations: string[];
    };
}
export interface DataInsights {
    summary: string;
    patterns: InsightPattern[];
    recommendations: string[];
    statistics: DataStatistics;
    confidence: number;
}
export interface InsightPattern {
    name: string;
    description: string;
    confidence: number;
    fields: string[];
    type: 'correlation' | 'trend' | 'outlier' | 'distribution' | 'seasonal';
    metadata?: MetadataObject;
}
export interface DataStatistics {
    totalRecords: number;
    fields: {
        [field: string]: {
            type: 'numeric' | 'string' | 'date' | 'boolean';
            nullCount: number;
            uniqueCount: number;
            distribution?: FieldDistribution;
        };
    };
}
export interface Anomaly {
    rowIndex: number;
    field: string;
    value: FieldValue;
    reason: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    metadata?: MetadataObject;
}
export interface OptimizationSuggestion {
    type: 'performance' | 'usability' | 'memory' | 'accessibility';
    description: string;
    impact: 'low' | 'medium' | 'high';
    implementation: string;
    effort: 'low' | 'medium' | 'high';
    priority: number;
}
export interface DataSummary {
    recordCount: number;
    fieldSummaries: FieldSummary[];
    insights: string[];
    quality: {
        completeness: number;
        consistency: number;
        accuracy: number;
    };
}
export interface FieldSummary {
    field: string;
    type: string;
    summary: string;
    keyMetrics: Record<string, string | number | boolean>;
}
export interface TrendPrediction {
    field: string;
    predictions: Array<{
        period: string;
        value: number;
        confidence: number;
    }>;
    trend: 'increasing' | 'decreasing' | 'stable' | 'cyclical';
    accuracy: number;
}
export interface DataClassification {
    field: string;
    categories: Array<{
        name: string;
        count: number;
        percentage: number;
        examples: FieldValue[];
    }>;
    confidence: number;
}
export interface AICapability {
    analyzeData: (data: DataRecord[], options?: AnalysisOptions) => Promise<DataInsights>;
    detectAnomalies: (data: DataRecord[], options?: AnomalyDetectionOptions) => Promise<Anomaly[]>;
    suggestOptimizations: (config: GridConfiguration, context?: OptimizationContext) => Promise<OptimizationSuggestion[]>;
    generateSummary: (data: DataRecord[], fields?: string[]) => Promise<DataSummary>;
    predictTrends: (data: DataRecord[], field: string, periods?: number) => Promise<TrendPrediction>;
    classifyData: (data: DataRecord[], field: string) => Promise<DataClassification>;
}
/**
 * Creates and returns an AI capability implementation
 * Note: This is currently a stub implementation with realistic interfaces
 */
export declare function createAICapability(api: GridAPI): AICapability;
