import { GridPlugin } from '..';
/**
 * Example Plugins Collection
 *
 * Advanced plugins demonstrating capability system usage across different versions.
 * These serve as reference implementations for plugin developers.
 */
export { asyncDataProcessorPlugin } from './async-data-processor-plugin';
export { aiInsightsPlugin } from './ai-insights-plugin';
export declare const examplePlugins: {
    advancedProcessing: () => Promise< GridPlugin>;
    aiInsights: () => Promise< GridPlugin>;
};
export declare function createPluginSet(scenario: 'basic' | 'advanced' | 'ai-powered'): Promise<any[]>;
