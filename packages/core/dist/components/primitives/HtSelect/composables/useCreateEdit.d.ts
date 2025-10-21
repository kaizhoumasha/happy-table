import { Ref, ComputedRef } from 'vue';
import { SelectOption, CreateEditConfig } from '../../../../types/primitives/select';
/**
 * useCreateEdit - Create & Edit 管理
 *
 * 职责:
 * - 生成 Create & Edit 选项
 * - 执行创建/编辑流程
 * - 管理操作状态和错误
 *
 * @param config - Create & Edit 配置
 * @param canCreate - 是否允许创建
 * @param canEdit - 是否允许编辑
 * @param inputValue - 搜索输入值
 * @param filteredOptions - 过滤后的选项列表
 * @param emit - 事件触发函数
 * @returns Create & Edit 管理对象
 */
export declare function useCreateEdit(config: CreateEditConfig | undefined, canCreate: Ref<boolean>, canEdit: Ref<boolean>, inputValue: Ref<string>, filteredOptions: Ref<SelectOption[]>, emit: (event: string, ...args: any[]) => void): {
    operating: ComputedRef<boolean>;
    operationError: ComputedRef<Error | null>;
    createEditOption: ComputedRef<SelectOption | null>;
    executeCreate: (inputValue: string) => Promise<SelectOption | null>;
    executeEdit: (option: SelectOption) => Promise<SelectOption | null>;
};
