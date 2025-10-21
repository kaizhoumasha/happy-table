import { GridInteractionContract } from '../base/renderer-interface';
import { GridAPI } from '../../types';
/**
 * Cell position interface
 */
interface CellPosition {
    rowIndex: number;
    columnIndex: number;
    rowId: string | number;
    columnId: string;
}
/**
 * TableInteractionHandler - Manages all user interactions for TableRenderer
 */
export declare class TableInteractionHandler {
    private keyboardNavEnabled;
    private mouseNavEnabled;
    private editMode;
    private currentFocus;
    private isDestroyed;
    private readonly interactionContract;
    private readonly gridAPI;
    constructor(interactionContract: GridInteractionContract, gridAPI: GridAPI);
    /**
     * Initialize interaction handling for a container element
     */
    initialize(container: HTMLElement): void;
    /**
     * Enable keyboard navigation
     */
    enableKeyboardNavigation(container: HTMLElement): void;
    /**
     * Enable mouse interactions
     */
    enableMouseInteractions(container: HTMLElement): void;
    /**
     * Handle keyboard events
     */
    private handleKeyboardEvent;
    /**
     * Handle mouse events
     */
    private handleMouseEvent;
    /**
     * Get navigation direction from keyboard event
     */
    private getNavigationDirection;
    /**
     * Navigate to a cell based on direction
     */
    private navigateCell;
    /**
     * Set focus to a specific cell
     */
    private setFocus;
    /**
     * Activate a cell (enter edit mode or trigger action)
     */
    private activateCell;
    /**
     * Exit edit mode
     */
    private exitEditMode;
    /**
     * Toggle cell selection
     */
    private toggleCellSelection;
    /**
     * Handle cell click
     */
    private handleCellClick;
    /**
     * Handle cell double-click
     */
    private handleCellDoubleClick;
    /**
     * Handle cell right-click
     */
    private handleCellRightClick;
    /**
     * Get cell information from DOM event
     */
    private getCellFromEvent;
    /**
     * Setup event listeners for interaction contract
     */
    private setupEventListeners;
    /**
     * Enable/disable keyboard navigation
     */
    setKeyboardNavigationEnabled(enabled: boolean): void;
    /**
     * Enable/disable mouse interactions
     */
    setMouseInteractionsEnabled(enabled: boolean): void;
    /**
     * Get current focus position
     */
    getCurrentFocus(): CellPosition | null;
    /**
     * Check if in edit mode
     */
    isInEditMode(): boolean;
    /**
     * Cleanup and destroy handler
     */
    destroy(): void;
}
/**
 * Factory function to create table interaction handler
 */
export declare function createTableInteractionHandler(interactionContract: GridInteractionContract, gridAPI: GridAPI): TableInteractionHandler;
export default createTableInteractionHandler;
