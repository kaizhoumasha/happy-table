import { GridInteractionContract, GridEvents, CellPosition, InteractionPayload, CoreLogicCallbacks } from '../../types';
export type InteractionEvent = 'cell-click' | 'cell-double-click' | 'cell-right-click' | 'cell-hover' | 'cell-focus' | 'cell-edit-start' | 'cell-edit-complete' | 'cell-edit-cancel' | 'row-select' | 'toggle-selection' | 'clear-selection' | 'column-resize' | 'column-sort' | 'column-move' | 'scroll' | 'keyboard-navigation';
/**
 * Concrete implementation of GridInteractionContract
 */
export declare class InteractionContractImpl implements GridInteractionContract {
    private eventEmitter;
    private coreCallbacks;
    private destroyed;
    constructor(rendererId: string);
    /**
     * Register event emitter (from GridInteractionContract)
     */
    registerEventEmitter<K extends keyof GridEvents>(emit: (eventName: K, payload: GridEvents[K]) => void): void;
    /**
     * Update visual selection state
     */
    updateSelection(_selectedIds: Set<string | number>, _reason: 'programmatic' | 'user'): void;
    /**
     * Set or clear the active focus item
     */
    setActive(_activeId: string | number | null): void;
    /**
     * Ensure specified item is visible in viewport
     */
    ensureVisible(_id: string | number, _behavior: 'smooth' | 'auto'): void;
    /**
     * Toggle edit mode for specified cell/item
     */
    toggleEditMode(_id: string | number, _mode: 'enter' | 'exit'): Promise<boolean>;
    /**
     * Update scroll position in core state
     */
    updateScrollPosition?(_position: {
        top: number;
        left: number;
    }): void;
    /**
     * Force re-render of all visible content
     */
    refresh?(): void;
    /**
     * Register core logic callbacks (override method)
     */
    registerCoreCallbacks(callbacks: Partial<CoreLogicCallbacks>): void;
    /**
     * Emit an interaction event
     */
    emit<K extends keyof GridEvents>(eventName: K, payload: GridEvents[K]): void;
    /**
     * Destroy the contract and cleanup
     */
    destroy(): void;
    /**
     * Check if contract is destroyed
     */
    isDestroyed(): boolean;
}
/**
 * Factory function to create interaction contracts
 */
export declare function createInteractionContract(rendererId: string): GridInteractionContract;
/**
 * Utility functions for common interaction patterns
 */
export declare const InteractionUtils: {
    /**
     * Create cell position from DOM event
     */
    getCellPositionFromEvent(event: Event, renderer: {
        getCellPosition?: (event: Event) => CellPosition | null;
    }): CellPosition | null;
    /**
     * Create standardized interaction payload
     */
    createPayload(position?: CellPosition, event?: Event, additionalData?: Record<string, any>): InteractionPayload;
    /**
     * Check if interaction should be handled
     */
    shouldHandleInteraction(event: Event, contract: GridInteractionContract): boolean;
};
export type { CellPosition, InteractionPayload, CoreLogicCallbacks } from '../../types';
