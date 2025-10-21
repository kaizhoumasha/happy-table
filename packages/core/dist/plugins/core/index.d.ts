import { GridPlugin } from '..';
/**
 * Core Plugins Collection
 *
 * Built-in plugins that provide essential grid functionality.
 * These plugins use only v1.0+ capabilities and serve as examples for plugin development.
 *
 * Available plugins:
 * - sortingPlugin: Unified sorting with configurable capabilities (v2.0)
 * - filteringPlugin: Data filtering capabilities
 * - selectionPlugin: Row selection management
 * - columnManagementPlugin: Column operations and state management
 * - cellEditingPlugin: In-cell editing capabilities
 * - keyboardNavigationPlugin: Comprehensive keyboard navigation with WCAG compliance
 */
export { sortingPlugin, createSortingPlugin, basicSortingPlugin, enhancedSortingPlugin, } from './sorting-plugin';
export { filteringPlugin } from './filtering-plugin';
export { selectionPlugin } from './selection-plugin';
export { columnManagementPlugin } from './column-management-plugin';
export { cellEditingPlugin } from './cell-editing-plugin';
export { keyboardNavigationPlugin } from './keyboard-navigation-plugin';
export { dragDropPlugin } from './drag-drop-plugin';
export declare const corePlugins: {
    sorting: () => Promise< GridPlugin>;
    filtering: () => Promise< GridPlugin>;
    selection: () => Promise< GridPlugin>;
    columnManagement: () => Promise< GridPlugin>;
    cellEditing: () => Promise< GridPlugin>;
    keyboardNavigation: () => Promise< GridPlugin>;
    dragDrop: () => Promise< GridPlugin>;
};
export { pluginPresets } from './presets';
