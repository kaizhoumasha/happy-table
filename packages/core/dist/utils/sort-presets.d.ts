import { SortOptions } from '../types';
/**
 * Common sort configuration presets
 */
export declare const SORT_PRESETS: {
    /**
     * Default sorting - respects case and accents
     * Use for: General text sorting
     */
    readonly default: SortOptions;
    /**
     * Case-insensitive sorting - ignores case and accents
     * Use for: User-friendly text sorting, search results
     */
    readonly caseInsensitive: SortOptions;
    /**
     * Natural sorting - smart number handling, case-insensitive
     * Use for: File names, IDs, version numbers (e.g., v1, v2, v10)
     */
    readonly natural: SortOptions;
    /**
     * Natural sorting (case-sensitive) - smart numbers with case distinction
     * Use for: File systems that distinguish case
     */
    readonly naturalCaseSensitive: SortOptions;
    /**
     * Chinese pinyin sorting - case-insensitive
     * Use for: Chinese text, names
     */
    readonly chinese: SortOptions;
    /**
     * Strict sorting - distinguishes all differences
     * Use for: Code, technical data, strict ordering requirements
     */
    readonly strict: SortOptions;
    /**
     * Numeric priority - numbers before text
     * Use for: Mixed alphanumeric data
     */
    readonly numericFirst: SortOptions;
};
/**
 * Locale-specific presets
 */
export declare const LOCALE_PRESETS: {
    readonly 'en-US': SortOptions;
    readonly 'zh-CN': SortOptions;
    readonly 'ja-JP': SortOptions;
    readonly 'ko-KR': SortOptions;
    readonly 'de-DE': SortOptions;
    readonly 'fr-FR': SortOptions;
    readonly 'es-ES': SortOptions;
};
/**
 * Create custom sort options with preset as base
 */
export declare function createSortOptions(preset: keyof typeof SORT_PRESETS, overrides?: Partial<SortOptions>): SortOptions;
