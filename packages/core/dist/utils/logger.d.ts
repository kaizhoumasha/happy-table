/**
 * Lightweight logging utility for Happy Table
 *
 * IMPORTANT: To preserve source locations, this logger is designed as a development tool.
 * In production, most logging will be disabled anyway.
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogContext = string | {
    module: string;
    operation?: string;
    [key: string]: unknown;
};
export declare class ScopedLogger {
    private context;
    constructor(context: LogContext);
    private _log;
    get debug(): (..._args: any[]) => void;
    get info(): (..._args: any[]) => void;
    get warn(): (..._args: any[]) => void;
    get error(): (..._args: any[]) => void;
    /**
     * Get formatted message for direct console use (preserves source location)
     * Usage: console.info(logger.format('info', 'message'))
     */
    format(level: LogLevel, message: string): string;
    /**
     * Check if logging is enabled for this logger's context
     */
    enabled(level: LogLevel): boolean;
    operation(operation: string): ScopedLogger;
    time(label: string): void;
    timeEnd(label: string): void;
    group(label: string): void;
    groupEnd(): void;
    table(data: any): void;
}
export declare function createLogger(context: LogContext): ScopedLogger;
export declare const devTools: {
    setLevel: (level: LogLevel) => void;
    enableContexts: (contexts: string[]) => void;
    enableAllContexts: () => void;
};
export declare const logger: {
    scope: typeof createLogger;
    configure: (options: {
        level?: LogLevel;
        contexts?: string[];
    }) => void;
};
export { ScopedLogger as Logger };
