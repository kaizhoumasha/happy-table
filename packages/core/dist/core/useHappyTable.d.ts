import { createLogger } from '../utils/logger';
import { DataGridProps, GridPlugin } from '../types';
export interface UseHappyTableOptions {
    /** Base props applied to the DataGrid component */
    props?: Partial<DataGridProps>;
    /** Optional override for grid data */
    data?: DataGridProps['data'];
    /** Optional override for grid columns */
    columns?: DataGridProps['columns'];
    /** Optional override for grid plugins */
    plugins?: GridPlugin[];
    /** Convenience shortcut to set grid height */
    height?: DataGridProps['height'];
    /** Toggle the inline keyboard shortcut hint */
    keyboardHelpHint?: DataGridProps['keyboardHelpHint'];
    /** Logger name */
    loggerModule?: string;
}
export interface UseHappyTableResult {
    gridProps: DataGridProps;
    updateGridProps: (props: Partial<DataGridProps>) => void;
    logger: ReturnType<typeof createLogger>;
}
export declare function useHappyTable(options?: UseHappyTableOptions): UseHappyTableResult;
