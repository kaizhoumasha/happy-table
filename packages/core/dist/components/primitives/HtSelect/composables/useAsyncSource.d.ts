import { Ref, ComputedRef } from 'vue';
import { AsyncSourceConfig } from '../../../../types/primitives/select';
/**
 * useAsyncSource - 异步数据源管理
 *
 * 职责边界:
 * - HtSelect 负责: 调用函数、管理状态、取消请求、防抖缓存
 * - 用户代码负责: HTTP请求、认证、重试、数据转换
 *
 * @param config - 异步数据源配置
 * @param inputValue - 搜索输入值
 * @param emit - 事件触发函数
 * @returns 异步数据源管理对象
 */
export declare function useAsyncSource(config: AsyncSourceConfig, inputValue: Ref<string>, emit: (event: string, ...args: any[]) => void): {
    loading: ComputedRef<boolean>;
    error: ComputedRef<Error | null>;
    options: ComputedRef<{
        [x: string]: any;
        value?: any;
        label?: string | undefined;
        disabled?: boolean | undefined;
        group?: string | undefined;
    }[]>;
    loadOptions: (query: string) => Promise<void>;
    cleanup: () => void;
    clearCache: () => void;
};
