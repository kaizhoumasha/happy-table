/**
 * useDebounceFn - 防抖函数工具
 *
 * 延迟函数执行直到指定时间内没有新的调用
 *
 * @param fn - 要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export declare function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
