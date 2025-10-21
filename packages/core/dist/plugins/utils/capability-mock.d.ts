import { GridCapabilities, DataPipelineCapability, AsyncTasksCapability, WebSocketCapability, AICapability } from '../index';
/**
 * Create a mock capability for testing
 */
export declare function createCapabilityMock<T extends keyof GridCapabilities>(name: T, customImplementation?: Partial<GridCapabilities[T]>): GridCapabilities[T];
/**
 * Capability Mock Builder for complex test scenarios
 */
export declare class CapabilityMockBuilder {
    private capabilities;
    withDataPipeline(custom?: Partial<DataPipelineCapability>): this;
    withAsyncTasks(custom?: Partial<AsyncTasksCapability>): this;
    withWebSocket(custom?: Partial<WebSocketCapability>): this;
    withAI(custom?: Partial<AICapability>): this;
    build(): Partial<GridCapabilities>;
}
/**
 * Create a complete test environment with all capabilities
 */
export declare function createTestEnvironment(): {
    capabilities: Partial<GridCapabilities>;
    get: <T extends keyof GridCapabilities>(name: T) => GridCapabilities[T] | undefined;
};
