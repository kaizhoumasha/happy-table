import { Ref } from 'vue';
/**
 * useEventListener - 自动管理事件监听器的生命周期
 *
 * 在组件挂载时添加事件监听器，卸载时自动移除
 *
 * @param target - 事件目标（元素、window、document 或其 ref）
 * @param event - 事件名称
 * @param handler - 事件处理函数
 * @param options - 事件监听器选项
 * @returns cleanup 函数
 */
export declare function useEventListener<K extends keyof WindowEventMap>(target: Window | Document | Ref<Element | undefined | null> | Element, event: K, handler: (event: WindowEventMap[K]) => void, options?: AddEventListenerOptions): () => void;
