import { GridAPI } from '../../types';
import { GridPlugin } from '../types';
import { ScopedLogger } from '../../utils/logger';
/**
 * Abstract base class for plugins to extend.
 * Provides common functionality like API access and logging.
 */
export declare abstract class BasePlugin implements GridPlugin {
    abstract name: string;
    protected api: GridAPI;
    protected logger: ScopedLogger;
    constructor();
    /**
     * Called when the plugin is installed with the grid.
     * @param api The GridAPI instance.
     */
    install(api: GridAPI): void;
    /**
     * Called when the plugin is cleaned up from the grid.
     */
    cleanup?(): void;
}
