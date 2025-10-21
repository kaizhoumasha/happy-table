import { GridAPI } from '../types';
import { GridCapabilities } from './capabilities';
export type CapabilityGetter = <T extends keyof GridCapabilities>(name: T) => GridCapabilities[T] | undefined;
export interface GridPlugin {
    name: string;
    version?: string;
    dependencies?: (keyof GridCapabilities)[];
    install: (api: GridAPI, get: CapabilityGetter) => void;
    cleanup?: () => void;
}
export interface PluginRegistryState {
    plugins: Map<string, PluginEntry>;
    capabilities: Partial<GridCapabilities>;
    loadOrder: string[];
    errors: Map<string, PluginError>;
}
export interface PluginEntry {
    plugin: GridPlugin;
    installed: boolean;
    error?: PluginError;
    dependencies: string[];
}
export interface PluginError {
    type: 'dependency' | 'installation' | 'runtime';
    message: string;
    name: string;
    timestamp: number;
    stack?: string;
}
