import { GridPlugin } from '../types';
export interface SortingPluginOptions {
    /** Enable multi-field sorting capability (default: true) */
    enableMultiSort?: boolean;
    /** Maximum number of sort fields (default: 5) */
    maxSortFields?: number;
}
/**
 * Create a sorting plugin with specified configuration
 */
export declare function createSortingPlugin(options?: SortingPluginOptions): GridPlugin;
export declare const sortingPlugin: GridPlugin;
export declare const basicSortingPlugin: GridPlugin;
export declare const enhancedSortingPlugin: GridPlugin;
