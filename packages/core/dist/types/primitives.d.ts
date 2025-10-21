/**
 * Atomic Component System - Shared Type Definitions
 *
 * This module defines the shared types for Happy Table's atomic component system,
 * ensuring API consistency across HtButton, HtInput, HtCheckbox, HtSelect, and other primitives.
 *
 * Design principles:
 * - DRY: Single source of truth for component styling types
 * - Extensible: Core types can be extended for component-specific needs
 * - Type-safe: Full TypeScript support with IDE autocompletion
 *
 * @module types/primitives
 */
/**
 * Core size system shared by all atomic components
 * Aligns with Tailwind v4 spacing and Happy Table design tokens
 */
export type ComponentSize = 'sm' | 'md' | 'lg';
/**
 * Core variant system for component styling
 * Base variants that can be extended by specific components
 */
export type CoreVariant = 'default' | 'filled' | 'outline' | 'ghost';
/**
 * State system for form controls and interactive components
 * Used to communicate validation status and user feedback
 */
export type ComponentState = 'default' | 'error' | 'success' | 'warning';
/**
 * Button-specific variant extension
 * Includes core variants plus button-specific styles
 */
export type ButtonVariant = CoreVariant | 'primary' | 'secondary' | 'destructive' | 'link';
/**
 * Button-specific size extension
 * Includes core sizes plus icon-specific sizes and micro size
 */
export type ButtonSize = ComponentSize | 'micro' | 'xs' | 'icon-micro' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg';
/**
 * Input component style properties
 * Defines the styling API for HtInput and input-like components
 */
export interface InputStyleProps {
    /**
     * Visual variant of the input
     * @default 'default'
     */
    variant?: CoreVariant;
    /**
     * Size of the input (affects height and padding)
     * @default 'md'
     */
    size?: ComponentSize;
    /**
     * Visual state for validation feedback
     * @default 'default'
     */
    state?: ComponentState;
}
/**
 * Checkbox component style properties
 * Defines the styling API for HtCheckbox
 */
export interface CheckboxStyleProps {
    /**
     * Visual variant of the checkbox
     * @default 'default'
     */
    variant?: CoreVariant;
    /**
     * Size of the checkbox
     * @default 'md'
     */
    size?: ComponentSize;
    /**
     * Visual state for validation feedback
     * @default 'default'
     */
    state?: ComponentState;
}
/**
 * Button component style properties
 * Defines the styling API for HtButton
 */
export interface ButtonStyleProps {
    /**
     * Visual variant of the button
     * @default 'default'
     */
    variant?: ButtonVariant;
    /**
     * Size of the button
     * @default 'md'
     */
    size?: ButtonSize;
    /**
     * Whether button should take full width of container
     * @default false
     */
    block?: boolean;
}
/**
 * HtButton component props
 * Exported for external use
 */
export interface HtButtonProps extends ButtonStyleProps {
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
/**
 * HtInput component props
 * Exported for external use
 */
export interface HtInputProps extends InputStyleProps {
    modelValue?: string | number;
    type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'url' | 'tel';
    placeholder?: string;
    disabled?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    autocomplete?: string;
    maxlength?: number;
    minlength?: number;
    pattern?: string;
    required?: boolean;
}
/**
 * HtInput component emits
 * Exported for external use
 */
export interface HtInputEmits {
    'update:modelValue': [value: string | number];
    'clear': [];
    'focus': [event: FocusEvent];
    'blur': [event: FocusEvent];
    'keydown': [event: KeyboardEvent];
}
/**
 * HtCheckbox component props
 * Exported for external use
 */
export interface HtCheckboxProps extends CheckboxStyleProps {
    modelValue?: boolean | 'indeterminate';
    value?: string | number;
    disabled?: boolean;
    required?: boolean;
    indeterminate?: boolean;
    label?: string;
    description?: string;
    name?: string;
}
/**
 * HtCheckbox component emits
 * Exported for external use
 */
export interface HtCheckboxEmits {
    'update:modelValue': [value: boolean | 'indeterminate'];
    'change': [checked: boolean, event: Event];
}
/**
 * Radio component style properties
 * Defines the styling API for HtRadio (same as checkbox pattern)
 */
export interface RadioStyleProps {
    /**
     * Visual variant of the radio button
     * @default 'default'
     */
    variant?: CoreVariant;
    /**
     * Size of the radio button
     * @default 'md'
     */
    size?: ComponentSize;
    /**
     * Visual state for validation feedback
     * @default 'default'
     */
    state?: ComponentState;
}
/**
 * HtRadio component props
 * Exported for external use
 */
export interface HtRadioProps extends RadioStyleProps {
    modelValue?: any;
    value: any;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    description?: string;
    name?: string;
}
/**
 * HtRadio component emits
 * Exported for external use
 */
export interface HtRadioEmits {
    'update:modelValue': [value: any];
    'change': [value: any, event: Event];
}
