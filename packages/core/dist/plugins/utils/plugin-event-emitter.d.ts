/**
 * Plugin Event Emitter Utility
 *
 * Simple event emitter for plugin-internal communication.
 * Provides a clean interface for event-driven plugin architecture.
 */
export type EventHandler = (...args: any[]) => void;
export declare class PluginEventEmitter {
    private logger;
    private listeners;
    /**
     * Add an event listener
     */
    on(event: string, handler: EventHandler): void;
    /**
     * Add a one-time event listener
     */
    once(event: string, handler: EventHandler): void;
    /**
     * Remove an event listener
     */
    off(event: string, handler: EventHandler): void;
    /**
     * Remove all listeners for an event, or all events if no event specified
     */
    removeAllListeners(event?: string): void;
    /**
     * Emit an event to all listeners
     */
    emit(event: string, ...args: any[]): void;
    /**
     * Get the number of listeners for an event
     */
    listenerCount(event: string): number;
    /**
     * Get all event names that have listeners
     */
    eventNames(): string[];
    /**
     * Check if there are any listeners for an event
     */
    hasListeners(event: string): boolean;
    /**
     * Create a promise that resolves when an event is emitted
     */
    waitFor(event: string, timeout?: number): Promise<any[]>;
    /**
     * Create a filtered event listener that only fires when a condition is met
     */
    onWhen(event: string, condition: (...args: any[]) => boolean, handler: EventHandler): void;
    /**
     * Create a debounced event listener
     */
    onDebounced(event: string, handler: EventHandler, delay: number): EventHandler;
    /**
     * Create a throttled event listener
     */
    onThrottled(event: string, handler: EventHandler, delay: number): EventHandler;
}
