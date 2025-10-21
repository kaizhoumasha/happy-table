/**
 * Portal Utilities - DOM portal management for overlays
 *
 * Provides utilities for creating and managing DOM portals for overlay components
 * like cell editors that need to render outside their normal component hierarchy.
 */
interface PortalInstance {
    container: HTMLElement;
    destroy: () => void;
}
/**
 * Create a portal container element
 */
export declare function createPortal(id: string, targetElement?: HTMLElement, className?: string): PortalInstance;
/**
 * Destroy a portal and cleanup
 */
export declare function destroyPortal(id: string): boolean;
/**
 * Get an existing portal
 */
export declare function getPortal(id: string): PortalInstance | undefined;
/**
 * Cleanup all portals
 */
export declare function destroyAllPortals(): void;
/**
 * Position an element within a portal container
 */
export declare function positionElement(element: HTMLElement, rect: DOMRect, options?: {
    offset?: {
        x: number;
        y: number;
    };
    zIndex?: number;
    viewport?: 'clamp' | 'scroll' | 'none';
}): void;
/**
 * Portal manager for component cleanup
 */
export declare class PortalManager {
    private portals;
    createPortal(id: string, targetElement?: HTMLElement, className?: string): PortalInstance;
    destroyPortal(id: string): boolean;
    cleanup(): void;
}
/**
 * Vue composable for portal management
 */
export declare function usePortal(id?: string): {
    id: string;
    create: (targetElement?: HTMLElement, className?: string) => PortalInstance;
    destroy: () => boolean;
    cleanup: () => void;
    position: typeof positionElement;
};
export {};
