import { GridPlugin } from '..';
/**
 * Core Plugin Presets
 *
 * Pre-configured plugin combinations for common use cases.
 * Uses factory functions to create fresh plugin instances for each grid.
 *
 * IMPORTANT: Plugin instances MUST NOT be shared between multiple grid instances
 * as they contain internal state (e.g., currentColumns, sort config).
 * Always use the factory functions to create new instances.
 */
/**
 * Plugin preset factory functions
 * These create fresh plugin instances for each grid to avoid state sharing
 */
export declare const pluginPresets: {
    readonly basic: GridPlugin[];
    readonly enhanced: GridPlugin[];
    readonly full: GridPlugin[];
    readonly editing: GridPlugin[];
    readonly accessible: GridPlugin[];
};
