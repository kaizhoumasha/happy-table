import { SelectContext, HtSelectBaseProps } from '../../../../types/primitives/select';
export declare const SELECT_GROUP_KEY: unique symbol;
/**
 * Provide Select Context
 * 在 HtSelect 根组件中调用,提供状态管理
 */
export declare function provideSelectContext(props: any, emit: any): SelectContext;
/**
 * Inject Select Context
 * 在子组件中调用,获取共享状态
 */
export declare function injectSelectContext(): SelectContext;
/**
 * Provide Select Props
 * 在 HtSelect 根组件中调用,提供 props 给子组件
 */
export declare function provideSelectProps(props: HtSelectBaseProps): void;
/**
 * Inject Select Props
 * 在子组件(如 HtSelectTrigger)中调用,获取父组件 props
 */
export declare function injectSelectProps(): HtSelectBaseProps;
