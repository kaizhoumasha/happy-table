/**
 * Platform Detection Utilities
 *
 * Provides cross-platform compatibility helpers for Happy Table components.
 * Handles keyboard shortcuts, OS-specific behaviors, and accessibility features.
 */
export interface PlatformInfo {
    /** Whether the current platform is macOS/iOS */
    isMac: boolean;
    /** Whether the current platform is Windows */
    isWindows: boolean;
    /** Whether the current platform is Linux */
    isLinux: boolean;
    /** Whether the current platform is mobile */
    isMobile: boolean;
    /** The appropriate modifier key name for shortcuts */
    modifierKey: 'Cmd' | 'Ctrl';
    /** The appropriate modifier key symbol for UI display */
    modifierSymbol: '⌘' | 'Ctrl';
}
/**
 * Detect current platform and return platform information
 */
export declare function detectPlatform(): PlatformInfo;
/**
 * Check if a keyboard event has the platform-appropriate modifier key pressed
 */
export declare function hasModifierKey(event: KeyboardEvent | MouseEvent): boolean;
/**
 * Get platform-appropriate modifier key text for tooltips and help text
 */
export declare function getModifierKeyText(): string;
/**
 * Get platform-appropriate modifier key symbol for compact UI display
 */
export declare function getModifierKeySymbol(): string;
/**
 * Generate platform-aware keyboard shortcut text
 */
export declare function formatShortcut(key: string, withModifier?: boolean): string;
/**
 * Generate platform-aware keyboard shortcut text with symbols
 */
export declare function formatShortcutSymbol(key: string, withModifier?: boolean): string;
