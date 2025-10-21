import { Ref } from 'vue';
/**
 * useElementSize - 响应式跟踪元素尺寸
 *
 * 使用 ResizeObserver API 监听元素尺寸变化
 *
 * @param target - 目标元素或其 ref
 * @param options - ResizeObserver 选项
 * @returns 响应式的 width 和 height
 */
export declare function useElementSize(target: Element | Ref<Element | undefined | null>, options?: ResizeObserverOptions): {
    width: Ref<number, number>;
    height: Ref<number, number>;
};
