import { Ref, ComputedRef } from 'vue';
import { SelectOption, QuickCreateConfig } from '../../../../types/primitives/select';
/**
 * useQuickCreate - Quick Create 管理
 *
 * 职责:
 * - 生成 Quick Create 选项
 * - 执行快速创建流程
 * - 管理创建状态和错误
 *
 * @param config - Quick Create 配置
 * @param canCreate - 是否允许创建
 * @param inputValue - 搜索输入值
 * @param filteredOptions - 过滤后的选项列表
 * @param emit - 事件触发函数
 * @returns Quick Create 管理对象
 */
export declare function useQuickCreate(config: QuickCreateConfig | undefined, canCreate: Ref<boolean>, inputValue: Ref<string>, filteredOptions: Ref<SelectOption[]>, emit: (event: string, ...args: any[]) => void): {
    creating: ComputedRef<boolean>;
    createError: ComputedRef<Error | null>;
    quickCreateOption: ComputedRef<SelectOption | null>;
    executeQuickCreate: (inputValue: string) => Promise<SelectOption | null>;
};
