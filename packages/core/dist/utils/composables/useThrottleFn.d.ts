/**
 * useThrottleFn - 节流函数工具
 *
 * 确保函数在指定时间内最多执行一次
 *
 * @param fn - 要节流的函数
 * @param delay - 节流时间（毫秒）
 * @returns 节流后的函数
 */
export declare function useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay: number): (...args: Parameters<T>) => void;
