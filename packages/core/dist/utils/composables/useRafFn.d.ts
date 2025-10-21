import { Ref } from 'vue';
/**
 * useRafFn - requestAnimationFrame 包装器
 *
 * 提供便捷的 RAF 调度，支持暂停/恢复和自动清理
 *
 * @param fn - 要在每一帧执行的函数
 * @param options - 配置选项
 * @returns 控制方法和状态
 */
export declare function useRafFn(fn: (delta: number) => void, options?: {
    immediate?: boolean;
}): {
    isActive: Ref<boolean, boolean>;
    pause: () => void;
    resume: () => void;
};
