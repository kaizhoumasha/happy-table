import { GridAPI } from '../../types';
export interface WebSocketOptions {
    protocols?: string[];
    timeout?: number;
    reconnect?: boolean;
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    heartbeat?: {
        interval: number;
        message?: string;
    };
}
export interface WebSocketConnection {
    id: string;
    url: string;
    readyState: number;
    send: (data: any) => void;
    close: (code?: number, reason?: string) => void;
    addEventListener: (event: string, listener: EventListener) => void;
    removeEventListener: (event: string, listener: EventListener) => void;
}
export interface WebSocketCapability {
    connect: (url: string, options?: WebSocketOptions) => Promise<WebSocketConnection>;
    disconnect: () => void;
    subscribe: (event: string, handler: (data: any) => void) => () => void;
    unsubscribe: (event: string, handler?: (data: any) => void) => void;
    broadcast: (event: string, data: any) => void;
    getConnection: () => WebSocketConnection | null;
    getConnectionState: () => 'connecting' | 'connected' | 'disconnected' | 'error';
}
/**
 * Creates and returns a WebSocket capability implementation
 * Note: This is currently a stub implementation for development purposes
 */
export declare function createWebSocketCapability(api: GridAPI): WebSocketCapability;
