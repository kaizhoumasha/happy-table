import { Ref } from 'vue';
/**
 * 下拉选项定义
 */
export interface SelectOption {
    /**
     * 选项值
     * 当使用 valueField 自定义映射时，此字段可选
     */
    value?: any;
    /**
     * 选项标签
     * 当使用 labelField 自定义映射时，此字段可选
     */
    label?: string;
    /**
     * 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * 分组标识 (用于自动分组)
     * 当提供此字段时，options 会自动按 group 分组
     */
    group?: string;
    /**
     * 支持任意扩展字段 (用于自定义 groupBy)
     */
    [key: string]: any;
}
/**
 * HtSelect 基础 Props - Phase 1 MVP + Phase 2 Async
 * 包含单选功能、Props模式、异步数据源所需的核心属性
 */
export interface HtSelectBaseProps {
    /**
     * 选中值 (双向绑定)
     */
    modelValue?: any;
    /**
     * 禁用状态
     * @default false
     */
    disabled?: boolean;
    /**
     * 必填标记
     * @default false
     */
    required?: boolean;
    /**
     * 表单字段名
     */
    name?: string;
    /**
     * 尺寸
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 外观变体
     * @default 'outline'
     */
    variant?: 'default' | 'filled' | 'outline' | 'ghost' | 'link';
    /**
     * 状态
     * @default 'default'
     */
    state?: 'default' | 'error' | 'success' | 'warning';
    /**
     * 宽度
     * 支持任意 CSS 宽度值 (e.g., '200px', '100%', 'auto')
     * 应用于 HtSelect 根组件和下拉框（下拉框始终与 HtSelect 同宽）
     */
    width?: string;
    /**
     * 下拉选项显示行数
     * - 1: 单行截断，显示省略号（默认）
     * - >1: 多行显示，最多显示指定行数
     * @default 1
     */
    showMultiLines?: number;
    /**
     * 是否可清除
     * @default false
     */
    clearable?: boolean;
    /**
     * 是否可搜索 (使用 Combobox 模式 - 输入框 Trigger)
     * @default false
     */
    searchable?: boolean;
    /**
     * 搜索字段配置 (仅当 searchable=true 时生效)
     * - 'auto': 智能搜索 (推荐)
     *   - 无 optionRender: 搜索 label
     *   - 有 optionRender: 搜索 title + description + meta + badge
     * - 'basic': 仅搜索 label (性能最佳)
     * - 'full': 搜索所有字段 (label + title + description + meta + badge)
     * - string[]: 自定义搜索字段列表
     *   - 支持的字段: 'label', 'title', 'description', 'meta', 'badge'
     * @default 'auto'
     * @example
     * // 智能搜索 (默认)
     * searchFields: 'auto'
     *
     * // 仅搜索 label (性能优先)
     * searchFields: 'basic'
     *
     * // 搜索所有字段 (功能最全)
     * searchFields: 'full'
     *
     * // 自定义搜索字段
     * searchFields: ['title', 'description']
     */
    searchFields?: 'auto' | 'basic' | 'full' | Array<'label' | 'title' | 'description' | 'meta' | 'badge'>;
    /**
     * 值比较逻辑
     * - string: 按对象字段比较 (e.g., "id")
     * - function: 自定义比较函数
     * @default 引用相等 (===)
     */
    by?: string | ((a: any, b: any) => boolean);
    /**
     * Props 模式: 选项数组
     * 提供此 prop 时自动启用 Props 模式，自动渲染选项
     * 支持 string[] | number[] | SelectOption[]
     */
    options?: (string | number | SelectOption)[];
    /**
     * Props 模式: 占位符文本
     * @default 'Select...'
     */
    placeholder?: string;
    /**
     * Props 模式: 分组字段名
     * 当 options 中的对象包含此字段时，自动按该字段分组
     * @default 'group'
     * @example
     * // 自动检测 group 字段
     * options: [{ value: 'cn', label: 'China', group: 'Asia' }]
     *
     * // 自定义分组字段
     * options: [{ value: 'cn', label: 'China', region: 'Asia' }]
     * groupBy: 'region'
    */
    groupBy?: string;
    /**
     * 控制分组标签是否在滚动过程中保持吸附在顶部
     * @default false
     */
    groupLabelSticky?: boolean;
    /**
     * Props 模式: 空数据文本
     * @default 'No options available'
     */
    emptyText?: string;
    /**
     * Props 模式: 搜索无结果文本
     * @default 'No results found'
     */
    emptySearchText?: string;
    /**
     * Props 模式: 默认分组名称
     * 当选项没有分组字段值时使用的默认分组名
     * @default 'Other'
     */
    defaultGroupName?: string;
    /**
     * Props 模式: 值字段名
     * 指定哪个字段作为选项的 value
     * @default 'value'
     * @example
     * // 自定义字段映射
     * options: [{ id: 1, country: 'China', continent: 'Asia' }]
     * valueField: 'id'
     * labelField: 'country'
     * groupBy: 'continent'
     */
    valueField?: string;
    /**
     * Props 模式: 标签字段名
     * 指定哪个字段作为选项的显示文本
     * @default 'label'
     */
    labelField?: string;
    /**
     * Props 模式: 选项禁用判断函数
     * 自定义逻辑判断选项是否应该被禁用
     * @param option - 当前选项对象
     * @returns true 表示禁用该选项
     * @example
     * // 简单字段判断
     * :option-disabled="opt => opt.disabled"
     *
     * // 逻辑反转
     * :option-disabled="opt => !opt.valid"
     *
     * // 复杂条件
     * :option-disabled="opt => opt.status === 'blocked' || opt.stock === 0"
     */
    optionDisabled?: (option: any) => boolean;
    /**
     * Props 模式: 自定义选项渲染函数
     * 提供完全自定义的选项内容渲染
     * @param option - 当前选项对象（已标准化）
     * @param info - 额外信息（索引等）
     * @returns 渲染函数需要的数据结构
     * @example
     * // 复杂布局渲染（如材料选择）
     * :option-render="(option) => ({
     *   title: option.title,
     *   code: option.code,
     *   specs: option.specs, // JSON 数组
     *   badge: option.compatible ? '完全兼容' : null
     * })"
     */
    optionRender?: (option: SelectOption, info: {
        index: number;
    }) => OptionRenderData | null;
    /**
     * 异步数据源函数
     * 提供此 prop 时自动启用异步模式
     *
     * 🎯 设计原则: 用户负责请求,HtSelect 负责展示
     */
    source?: AsyncDataSource;
    /**
     * 防抖延迟 (ms)
     * @default 250
     */
    debounce?: number;
    /**
     * 搜索阈值 (最小字符数)
     * @default 0
     */
    searchThreshold?: number;
    /**
     * 搜索阈值提示文本
     * 当输入字符数未达到 searchThreshold 时显示
     * 支持 {n} 占位符表示阈值数字
     * @default 'Type {n} or more characters to search...'
     * @example
     * searchThresholdHint: 'Please enter at least {n} characters'
     */
    searchThresholdHint?: string;
    /**
     * 缓存策略
     * @default 'memory'
     */
    cacheStrategy?: 'none' | 'memory' | 'session' | 'custom';
    /**
     * 自定义缓存实现
     */
    cache?: AsyncCache;
    /**
     * 初始选项 (异步模式下的预加载数据)
     */
    initialOptions?: SelectOption[];
    /**
     * 最小搜索结果数
     * @default 0
     */
    minResults?: number;
    /**
     * 搜索结果过少提示文本
     * @default 'Too few results. Try a different search term.'
     */
    minResultsText?: string;
    /**
     * 搜索占位符文本 (Combobox 模式)
     */
    searchPlaceholder?: string;
}
/**
 * optionRender 返回的数据结构
 */
export interface OptionRenderData {
    /**
     * 主标题
     */
    title?: string;
    /**
     * 副标题/描述
     */
    description?: string;
    /**
     * 元数据列表（通用键值对数组）
     * @example
     * meta: [
     *   { label: '品牌', value: '坚朗' },
     *   { label: '材质', value: '锌合金' },
     *   { label: '数量', value: 100 },
     *   { label: '在库', value: true }
     * ]
     */
    meta?: Array<{
        label: string;
        value: string | number | boolean;
    }>;
    /**
     * 徽章文本（显示在右侧）
     */
    badge?: string | null;
    /**
     * 徽章样式类型
     */
    badgeType?: 'primary' | 'success' | 'warning' | 'info' | 'default';
    /**
     * 支持任意扩展字段
     */
    [key: string]: any;
}
/**
 * Select Context 类型
 * 用于组件间状态共享
 */
export interface NavigableOption {
    /**
     * Index of the option in the rendered order
     */
    index: number;
    /**
     * Option value used for selection
     */
    value: any;
    /**
     * Whether the option is disabled
     */
    disabled: boolean;
}
export interface SelectContext {
    /**
     * 下拉是否打开
     */
    open: Ref<boolean>;
    /**
     * 当前选中值
     */
    selectedValue: Ref<any>;
    /**
     * 当前高亮项索引 (键盘导航)
     */
    highlightedIndex: Ref<number>;
    /**
     * Trigger 元素引用 (供 BasePopover 定位)
     */
    triggerRef: Ref<HTMLElement | null>;
    /**
     * 选项映射表 (value -> textValue)
     * 用于在 HtSelectValue 中显示正确的文本
     */
    optionsMap: Ref<Map<any, string>>;
    /**
     * 输入框值 (搜索查询)
     */
    inputValue: Ref<string>;
    /**
     * 稳定的可访问性 id 集
     * - triggerId: 触发器元素 id
     * - contentId: 列表容器（listbox）id
     */
    ids: {
        triggerId: string;
        contentId: string;
    };
    /**
     * 切换下拉状态
     */
    toggle: () => void;
    /**
     * 关闭下拉
     */
    close: () => void;
    /**
     * 打开下拉 (若未打开)
     */
    openDropdown: () => void;
    /**
     * 选择选项
     */
    select: (value: any) => void;
    /**
     * 判断是否选中
     */
    isSelected: (value: any) => boolean;
    /**
     * 注册选项 (由 HtSelectItem 调用)
     */
    registerOption: (value: any, textValue: string) => void;
    /**
     * 注销选项 (由 HtSelectItem 调用)
     */
    unregisterOption: (value: any) => void;
    /**
     * Update the navigable options for keyboard support
     */
    setNavigableOptions: (options: NavigableOption[]) => void;
    /**
     * Move highlight to next/previous enabled option
     */
    moveHighlight: (direction: 1 | -1) => void;
    /**
     * Highlight first enabled option
     */
    highlightFirst: () => void;
    /**
     * Highlight last enabled option
     */
    highlightLast: () => void;
    /**
     * Select currently highlighted option if available
     */
    selectHighlighted: () => void;
    /**
     * Clear the current highlight index
     */
    clearHighlight: () => void;
}
/**
 * 异步数据源函数签名
 *
 * 设计原则: 只接受数据,不处理请求
 *
 * @param query - 搜索查询字符串
 * @param signal - AbortSignal 用于取消请求
 * @returns Promise<SelectOption[]> - 用户负责发起请求和转换数据
 */
export type AsyncDataSource = (query: string, signal: AbortSignal) => Promise<SelectOption[]>;
/**
 * 异步缓存接口
 */
export interface AsyncCache {
    get(key: string): Promise<SelectOption[] | null>;
    set(key: string, value: SelectOption[]): Promise<void>;
    clear(): Promise<void>;
}
/**
 * 异步加载状态
 */
export interface AsyncLoadingState {
    loading: boolean;
    error: Error | null;
    abortController: AbortController | null;
}
/**
 * 异步数据源配置
 */
export interface AsyncSourceConfig {
    /**
     * 异步数据源函数
     * 用户负责: HTTP请求、认证、重试、数据转换
     * HtSelect负责: 调用函数、管理状态、取消请求、防抖缓存
     */
    source: AsyncDataSource;
    /**
     * 防抖延迟 (ms)
     * @default 250
     */
    debounce?: number;
    /**
     * 搜索阈值 (最小字符数)
     * @default 0
     */
    searchThreshold?: number;
    /**
     * 搜索阈值提示文本
     * 当输入字符数未达到 searchThreshold 时显示
     * 支持 {n} 占位符表示阈值数字
     * @default 'Type {n} or more characters to search...'
     * @example
     * searchThresholdHint: 'Please enter at least {n} characters'
     */
    searchThresholdHint?: string;
    /**
     * 缓存策略
     * @default 'memory'
     */
    cacheStrategy?: 'none' | 'memory' | 'session' | 'custom';
    /**
     * 自定义缓存实现
     */
    cache?: AsyncCache;
    /**
     * 错误处理回调
     */
    onError?: (error: Error) => void;
    /**
     * 最大并发请求数
     * @default 1
     */
    maxConcurrentRequests?: number;
}
/**
 * Quick Create 配置
 */
export interface QuickCreateConfig {
    /**
     * 快速创建函数
     * @param inputValue - 用户输入的值
     * @returns 创建的选项
     */
    handler: (inputValue: string) => Promise<SelectOption>;
    /**
     * 自定义创建提示文本
     * @default (value) => `Create: ${value}`
     */
    formatLabel?: (inputValue: string) => string;
    /**
     * 是否在创建后清空输入
     * @default false
     */
    clearAfterCreate?: boolean;
    /**
     * 创建成功回调
     */
    onSuccess?: (option: SelectOption) => void;
    /**
     * 创建失败回调
     */
    onError?: (error: Error) => void;
}
/**
 * Create & Edit 配置
 */
export interface CreateEditConfig {
    /**
     * 创建/编辑函数
     * @param inputValue - 用户输入的值 (创建时)
     * @param option - 现有选项 (编辑时)
     * @returns 创建/编辑后的选项
     */
    handler: (inputValue?: string, option?: SelectOption) => Promise<SelectOption>;
    /**
     * 自定义创建提示文本
     * @default (value) => `Create and Edit: ${value}`
     */
    formatCreateLabel?: (inputValue: string) => string;
    /**
     * 自定义编辑提示文本
     * @default 'Edit'
     */
    formatEditLabel?: (option: SelectOption) => string;
    /**
     * 是否在创建/编辑后清空输入
     * @default false
     */
    clearAfterCreate?: boolean;
    /**
     * 成功回调
     */
    onSuccess?: (option: SelectOption, action: 'create' | 'edit') => void;
    /**
     * 失败回调
     */
    onError?: (error: Error, action: 'create' | 'edit') => void;
}
/**
 * 权限检查上下文
 */
export interface PermissionContext {
    /**
     * 当前用户
     */
    user?: any;
    /**
     * 当前记录
     */
    record?: any;
    /**
     * 自定义上下文数据
     */
    [key: string]: any;
}
/**
 * 权限控制配置
 */
export interface PermissionConfig {
    /**
     * 是否允许创建
     * @default true
     */
    canCreate?: boolean | ((context: PermissionContext) => boolean);
    /**
     * 是否允许编辑
     * @default true
     */
    canEdit?: boolean | ((context: PermissionContext) => boolean);
    /**
     * 权限检查上下文
     */
    context?: Record<string, any>;
}
/**
 * HtSelect 异步模式 Props
 */
export interface HtSelectAsyncProps {
    /**
     * 异步数据源函数
     * 提供此 prop 时自动启用异步模式
     *
     * 🎯 设计原则: 用户负责请求,HtSelect 负责展示
     */
    source?: AsyncDataSource;
    /**
     * 防抖延迟 (ms)
     * @default 250
     */
    debounce?: number;
    /**
     * 搜索阈值 (最小字符数)
     * @default 0
     */
    searchThreshold?: number;
    /**
     * 搜索阈值提示文本
     * 当输入字符数未达到 searchThreshold 时显示
     * 支持 {n} 占位符表示阈值数字
     * @default 'Type {n} or more characters to search...'
     * @example
     * searchThresholdHint: 'Please enter at least {n} characters'
     */
    searchThresholdHint?: string;
    /**
     * 缓存策略
     * @default 'memory'
     */
    cacheStrategy?: 'none' | 'memory' | 'session' | 'custom';
    /**
     * 自定义缓存实现
     */
    cache?: AsyncCache;
    /**
     * 初始选项 (异步模式下的预加载数据)
     */
    initialOptions?: SelectOption[];
    /**
     * 最小搜索结果数
     * @default 0
     */
    minResults?: number;
    /**
     * 搜索结果过少提示文本
     * @default 'Too few results. Try a different search term.'
     */
    minResultsText?: string;
}
/**
 * HtSelect CRUD Props
 */
export interface HtSelectCRUDProps {
    /**
     * 快速创建函数
     * 启用内联快速创建新记录功能
     */
    quickCreate?: QuickCreateConfig['handler'] | QuickCreateConfig;
    /**
     * 创建和编辑函数
     * 启用弹窗表单创建/编辑功能
     */
    createEdit?: CreateEditConfig['handler'] | CreateEditConfig;
    /**
     * 是否禁用 Quick Create
     * @default false
     */
    noQuickCreate?: boolean;
    /**
     * 是否禁用 Create & Edit
     * @default false
     */
    noCreateEdit?: boolean;
    /**
     * 是否允许创建
     */
    canCreate?: boolean | ((context: PermissionContext) => boolean);
    /**
     * 是否允许编辑
     */
    canEdit?: boolean | ((context: PermissionContext) => boolean);
    /**
     * 权限检查上下文
     */
    permissionContext?: Record<string, any>;
}
/**
 * HtSelect 事件类型
 */
export interface HtSelectEvents {
    'update:modelValue': [value: any];
    'change': [value: any];
    'loading-start': [query: string];
    'loading-end': [options: SelectOption[], query: string];
    'loading-error': [error: Error, query: string];
    'create-start': [inputValue: string, mode: 'quick' | 'edit'];
    'create-success': [option: SelectOption, mode: 'quick' | 'edit'];
    'create-error': [error: Error, mode: 'quick' | 'edit'];
    'edit-start': [option: SelectOption];
    'edit-success': [option: SelectOption];
    'edit-error': [error: Error];
}
