/**
 * Happy Table Renderer System
 *
 * Dual rendering architecture supporting:
 * 1. TableRenderer (default) - Modern web-style table
 * 2. ExcelRenderer (plugin) - Excel-like grid with cell-based interactions
 *
 * Architecture: GridInteractionContract ensures complete decoupling
 * between core logic and rendering implementations.
 */
export type { GridRenderer, GridInteractionContract, InteractionEvent, } from './base/renderer-interface';
export { InteractionContractImpl as InteractionContract } from './base/interaction-contract';
export { createTableRenderer } from './table/TableRenderer';
export { RendererRegistry, createRendererRegistry } from './base/renderer-registry';
export type { RendererFactory, RendererInstance, RendererOptions, VirtualRow, } from './base/renderer-interface';
export type { InteractionPayload, CoreLogicCallbacks, InteractionContractImpl, } from './base/interaction-contract';
export { switchRenderer, getCurrentRenderer, getAvailableRenderers } from './base/renderer-registry';
export { createRendererRegistry as createRegistry } from './base/renderer-registry';
