/**
 * ID生成工具
 * 为组件生成唯一且稳定的标识符
 *
 * 设计原则:
 * - 确定性: 使用计数器确保同一会话内 ID 递增
 * - 唯一性: 结合时间戳和随机数防止跨会话冲突
 * - 简洁性: 使用 36 进制缩短 ID 长度
 * - 性能优化: 减少随机数生成次数，使用位运算
 */
/**
 * 生成唯一的组件 ID
 * @param prefix - ID 前缀 (如 'ht-select', 'ht-input')
 * @returns 唯一的 ID 字符串
 * @example
 * generateComponentId('ht-select') // 'ht-select-1-l8x9k2mn'
 * generateComponentId('ht-input')  // 'ht-input-2-l8x9k2mn'
 */
export declare function generateComponentId(prefix: string): string;
/**
 * 为组件生成一组相关的 ID
 * @param prefix - ID 前缀
 * @param keys - ID 键名列表
 * @returns ID 映射对象
 * @example
 * generateIdGroup('ht-select', ['triggerId', 'contentId'])
 * // {
 * //   triggerId: 'ht-select-1-l8x9k2mn-triggerId',
 * //   contentId: 'ht-select-1-l8x9k2mn-contentId'
 * // }
 */
export declare function generateIdGroup<K extends string>(prefix: string, keys: readonly K[]): Record<K, string>;
