import { GridRenderer, GridInteractionContract, VirtualRow, RendererOptions } from '../base/renderer-interface';
import { GridAPI, GridState, ColumnDef } from '../../types';
/**
 * ExcelRenderer stub implementation
 *
 * This class provides the interface contract but throws errors when used,
 * indicating that the Excel plugin needs to be loaded.
 */
export declare class ExcelRenderer implements GridRenderer {
    readonly name: "excel";
    readonly interactionContract: GridInteractionContract;
    private readonly options;
    constructor(options?: RendererOptions);
    /**
     * Mount renderer - throws error for stub
     */
    mount(_host: HTMLElement, _api: GridAPI): Promise<void>;
    /**
     * Unmount renderer - stub implementation
     */
    unmount(): Promise<void>;
    /**
     * Render state - throws error for stub
     */
    render(_state: GridState, _columns: ColumnDef[], _rows: VirtualRow[]): void;
    /**
     * Handle resize - stub implementation
     */
    resize(_width: number, _height: number): void;
    /**
     * Get configuration schema
     */
    getConfigSchema(): Record<string, any>;
    /**
     * Update configuration - stub implementation
     */
    updateConfig(config: Record<string, any>): void;
}
/**
 * Factory function to create ExcelRenderer stub
 */
export declare function createExcelRenderer(options?: RendererOptions): ExcelRenderer;
/**
 * Excel-specific interaction contract interface
 *
 * Extends the base GridInteractionContract with Excel-specific methods
 * that will be implemented by the Excel plugin.
 */
export interface ExcelInteractionContract extends GridInteractionContract {
    /**
     * Select a range of cells (Excel-style)
     */
    selectRange(start: {
        row: number;
        col: number;
    }, end: {
        row: number;
        col: number;
    }): void;
    /**
     * Add a range to multi-selection
     */
    addToSelection(range: {
        start: {
            row: number;
            col: number;
        };
        end: {
            row: number;
            col: number;
        };
    }): void;
    /**
     * Clear all selections
     */
    clearSelections(): void;
    /**
     * Start fill operation (drag handle)
     */
    startFill(sourceRange: {
        start: {
            row: number;
            col: number;
        };
        end: {
            row: number;
            col: number;
        };
    }): void;
    /**
     * Complete fill operation
     */
    completeFill(targetRange: {
        start: {
            row: number;
            col: number;
        };
        end: {
            row: number;
            col: number;
        };
    }): void;
    /**
     * Show formula bar
     */
    showFormulaBar(cellId: string, formula: string): void;
    /**
     * Hide formula bar
     */
    hideFormulaBar(): void;
    /**
     * Update cell coordinate display (A1, B2, etc.)
     */
    updateCoordinateDisplay(coordinate: string): void;
}
/**
 * Excel renderer configuration interface
 */
export interface ExcelRendererConfig extends RendererOptions {
    grid?: {
        showGridLines?: boolean;
        showRowHeaders?: boolean;
        showColumnHeaders?: boolean;
        headerStyle?: 'excel' | 'google-sheets';
        gridLineColor?: string;
        headerBackgroundColor?: string;
    };
    selection?: {
        multiRange?: boolean;
        showFillHandle?: boolean;
        enableRangeSelection?: boolean;
        selectionColor?: string;
        activeColor?: string;
    };
    editing?: {
        enableInCellEditing?: boolean;
        enableFormulaBar?: boolean;
        autoCommitOnEnter?: boolean;
        formulaBarHeight?: number;
    };
    coordinates?: {
        showCoordinates?: boolean;
        coordinateFormat?: 'A1' | 'R1C1';
        startRow?: number;
        startColumn?: string;
    };
}
/**
 * Plugin information for Excel renderer
 */
export declare const EXCEL_PLUGIN_INFO: {
    name: string;
    version: string;
    description: string;
    features: string[];
    installation: string;
    usage: string;
};
/**
 * Default export for convenience
 */
export default createExcelRenderer;
