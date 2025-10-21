import { GridAPI } from '../../types';
export interface AsyncTask {
    name: string;
    execute: () => Promise<any>;
    priority: 'low' | 'normal' | 'high';
    timeout?: number;
    retries?: number;
    metadata?: Record<string, any>;
}
export interface TaskStatus {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
    result?: any;
    error?: Error;
    progress?: number;
    startTime?: number;
    endTime?: number;
    metadata?: Record<string, any>;
}
export interface AsyncTasksCapability {
    scheduleAsyncTask: (task: AsyncTask) => Promise<string>;
    cancelTask: (taskId: string) => boolean;
    getTaskStatus: (taskId: string) => TaskStatus;
    getAllTasks: () => Map<string, TaskStatus>;
    onTaskComplete: (taskId: string, callback: (result: any) => void) => void;
    onTaskError: (taskId: string, callback: (error: Error) => void) => void;
    clearCompletedTasks: () => void;
}
/**
 * Creates and returns an Async Tasks capability implementation
 */
export declare function createAsyncTasksCapability(api: GridAPI): AsyncTasksCapability;
