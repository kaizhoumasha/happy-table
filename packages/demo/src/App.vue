<script setup lang="ts">
import { computed, ref, watch, shallowRef, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import PrimitivesDemo from './demo/PrimitivesDemo.vue'
import {
  HtButton,
  HtSelect,
  HtSelectTrigger,
  HtSelectValue,
  HtSelectContent,
  HtSelectItem,
  HtSelectGroup,
  HtSelectLabel,
  HtSelectSeparator,
  DataGrid,
  pluginPresets,
  formatShortcut,
  useHappyTable,
  type GridEvents,
  GRID_EVENT_NAMES,
  type BorderMode,
  type RowData,
  dragDropPlugin,
} from '@happy-table/core'
import {
  createSelectionPlaygroundBaseColumns,
  createSelectionPlaygroundRows,
  buildSelectionPlaygroundColumns,
  createProjectShowcaseRows,
  createProjectShowcaseColumns,
  type FunctionalColumnMode,
} from './demo/demo-date-gen'
import '@happy-table/core/auto.css'

const functionalMode = ref<FunctionalColumnMode>('checkbox')
const enableSelectionDragDrop = ref(false)

const selectionBaseColumns = createSelectionPlaygroundBaseColumns()
const selectionRows = ref(createSelectionPlaygroundRows(1300, selectionBaseColumns))
const selectionRowCount = computed(() => selectionRows.value.length)

const selectionLogger = shallowRef<ReturnType<typeof useHappyTable>['logger'] | null>(null)

const selectionActionHandlers = computed(() => ({
  onEdit: (row: RowData) => selectionLogger.value?.info('Edit clicked', { row }),
  onDelete: (row: RowData) => selectionLogger.value?.info('Delete clicked', { row }),
}))

const selectionColumns = computed(() =>
  buildSelectionPlaygroundColumns(functionalMode.value, selectionBaseColumns, selectionActionHandlers.value)
)

const selectionPlugins = computed(() =>
  enableSelectionDragDrop.value ? [...pluginPresets.enhanced, dragDropPlugin] : pluginPresets.basic
)

const selectionColumnsWithDrag = computed(() => {
  if (!enableSelectionDragDrop.value) return selectionColumns.value
  const dragCol = {
    type: 'drag',
    id: 'row_drag',
    field: '__functional_drag',
    title: '',
    pinned: 'left' as const,
    functionalOptions: {
      // example guard: could disable based on row
      isRowDraggable: () => true,
    },
  } as const
  // Prepend; internal sort will place it according to defaults
  return [dragCol as any, ...selectionColumns.value]
})

const {
  gridProps: selectionGridProps,
  updateGridProps: updateSelectionGridProps,
  logger: selectionGridLogger,
} = useHappyTable({
  props: {
    config: {
      // sortOptions removed - using column-level configuration instead
    },
  },
  columns: selectionColumnsWithDrag.value,
  data: selectionRows.value,
  plugins: selectionPlugins.value,
  height: 500,
  loggerModule: 'App.Selection',
  keyboardHelpHint: false,
})

selectionLogger.value = selectionGridLogger

watch(selectionColumnsWithDrag, columns => {
  updateSelectionGridProps({ columns })
})

watch(
  selectionRows,
  rows => {
    updateSelectionGridProps({ data: rows })
  },
  { immediate: true }
)

watch(selectionPlugins, plugins => {
  updateSelectionGridProps({ plugins })
})

const selectedRows = ref<(string | number)[]>([])

watch(functionalMode, () => {
  selectedRows.value = []
})

const availableEvents = computed(() => GRID_EVENT_NAMES)

const isCustomRowLoggerActive = ref(false)

const rowLoggerButtonLabel = computed(() =>
  isCustomRowLoggerActive.value ? '恢复默认行点击日志' : '启用自定义行点击日志'
)

const toggleRowLogger = () => {
  isCustomRowLoggerActive.value = !isCustomRowLoggerActive.value
}

const borderMode = computed<BorderMode>({
  get: () => selectionGridProps.config?.border ?? 'default',
  set: mode => {
    const nextConfig = {
      ...(selectionGridProps.config ?? {}),
      border: mode,
    }
    updateSelectionGridProps({ config: nextConfig })
  },
})

const setBorderMode = (mode: BorderMode) => {
  borderMode.value = mode
}

const stripeMode = computed<boolean>({
  get: () => selectionGridProps.config?.stripe ?? false,
  set: enabled => {
    const nextConfig = {
      ...(selectionGridProps.config ?? {}),
      stripe: enabled,
    }
    updateSelectionGridProps({ config: nextConfig })
  },
})

const setCompactHeight = () => updateSelectionGridProps({ height: 360 })
const setTallHeight = () => updateSelectionGridProps({ height: 640 })

const currentHeightLabel = computed(() => {
  const height = selectionGridProps.height
  return typeof height === 'number' ? `${height}px` : height ?? 'auto'
})

const handleSelectionCellClick = (payload: GridEvents['cell-click']) => {
  selectionLogger.value?.info('Cell click', { id: payload.row.id, value: payload.value })
}

const handleSelectionRowClick = (payload: GridEvents['row-click']) => {
  if (isCustomRowLoggerActive.value) {
    selectionLogger.value?.info('Custom handler: 行点击事件', {
      rowId: payload.row.id,
      index: payload.index,
    })
  } else {
    selectionLogger.value?.info('Row clicked', { id: payload.row.id, index: payload.index })
  }
}

const handleSelectionRowSelect = (payload: GridEvents['row-select']) => {
  if (payload.selectedRows) {
    selectedRows.value = [...payload.selectedRows]
    selectionLogger.value?.info('Selection updated', {
      selected: payload.selected,
      totalSelected: selectedRows.value.length,
    })
  }
}

const handleSelectionToggleSelection = (payload: GridEvents['toggle-selection']) => {
  selectionLogger.value?.debug('Toggle selection event received', {
    rowId: payload.rowId,
    selectionType: payload.selectionType,
    index: payload.rowIndex,
  })
}

const handleSelectionSelectAll = (payload: GridEvents['select-all']) => {
  selectionLogger.value?.debug('Select all event received', { count: payload.count })
}

const handleSelectionClearSelection = (payload: GridEvents['clear-selection']) => {
  selectionLogger.value?.debug('Clear selection event received', { reason: payload.reason })
}

const projectRows = ref(createProjectShowcaseRows())
const projectRowCount = computed(() => projectRows.value.length)
const projectSelectedRows = ref<(string | number)[]>([])

const projectLogger = shallowRef<ReturnType<typeof useHappyTable>['logger'] | null>(null)

const projectColumns = computed(() =>
  createProjectShowcaseColumns({
    onArchive: (row: RowData) =>
      projectLogger.value?.info('Archive requested', { id: row.id, project: (row as any).project }),
    onShare: (row: RowData) =>
      projectLogger.value?.info('Share link generated', { id: row.id, owner: (row as any).owner }),
    onDragEnd: (result: any) => projectLogger.value?.info('Drag completed', { result }),
  })
)

const {
  gridProps: projectGridProps,
  updateGridProps: updateProjectGridProps,
  logger: projectGridLogger,
} = useHappyTable({
  columns: projectColumns.value,
  data: projectRows.value,
  plugins: [...pluginPresets.basic, dragDropPlugin],
  height: 420,
  loggerModule: 'App.FunctionalShowcase',
})

projectLogger.value = projectGridLogger

watch(projectColumns, columns => {
  updateProjectGridProps({ columns })
})

watch(
  projectRows,
  rows => {
    updateProjectGridProps({ data: rows })
  },
  { immediate: true }
)

const handleProjectCellClick = (payload: GridEvents['cell-click']) => {
  projectLogger.value?.info('Cell click', { id: payload.row.id, value: payload.value })
}

const handleProjectRowClick = (payload: GridEvents['row-click']) => {
  projectLogger.value?.info('Row clicked', { id: payload.row.id, index: payload.index })
}

const handleProjectRowSelect = (payload: GridEvents['row-select']) => {
  if (payload.selectedRows) {
    projectSelectedRows.value = [...payload.selectedRows]
    projectLogger.value?.info('Showcase selection updated', {
      totalSelected: payload.selectedRows.length,
    })
  }
}

const handleProjectToggleSelection = (payload: GridEvents['toggle-selection']) => {
  projectLogger.value?.debug('Toggle selection event received', {
    rowId: payload.rowId,
    selectionType: payload.selectionType,
    index: payload.rowIndex,
  })
}

const handleProjectSelectAll = (payload: GridEvents['select-all']) => {
  projectLogger.value?.debug('Select all event received', { count: payload.count })
}

const handleProjectClearSelection = (payload: GridEvents['clear-selection']) => {
  projectLogger.value?.debug('Clear selection event received', { reason: payload.reason })
}

const selectionModeOptions: { label: string; value: FunctionalColumnMode }[] = [
  { label: '多选列 (Checkbox)', value: 'checkbox' },
  { label: '单选列 (Radio)', value: 'radio' },
]

const heightPresetOptions = [
  { label: '高度 360px', value: 360, action: setCompactHeight },
  { label: '高度 640px', value: 640, action: setTallHeight },
]

const borderModeOptions: { label: string; value: BorderMode }[] = [
  { label: '默认边框', value: 'default' },
  { label: '无边框', value: 'none' },
  { label: '外边框', value: 'outer' },
  { label: '全边框', value: 'full' },
]

const stripeModeOptions = [
  { label: '启用斑马纹', value: true },
  { label: '禁用斑马纹', value: false },
]

const selectionControlGroups = computed(() => [
  {
    id: 'selection-mode',
    title: '功能列模式',
    options: selectionModeOptions.map(option => ({
      label: option.label,
      active: functionalMode.value === option.value,
      onClick: () => {
        functionalMode.value = option.value
      },
    })),
  },
  {
    id: 'grid-height',
    title: '网格高度',
    options: heightPresetOptions.map(option => ({
      label: option.label,
      active: typeof selectionGridProps.height === 'number' && selectionGridProps.height === option.value,
      onClick: option.action,
    })),
  },
  {
    id: 'border-mode',
    title: '边框样式',
    options: borderModeOptions.map(option => ({
      label: option.label,
      active: borderMode.value === option.value,
      onClick: () => setBorderMode(option.value),
    })),
  },
  {
    id: 'stripe-mode',
    title: '斑马纹',
    options: stripeModeOptions.map(option => ({
      label: option.label,
      active: stripeMode.value === option.value,
      onClick: () => {
        stripeMode.value = option.value
      },
    })),
  },
])

const selectionToggles = computed(() => [
  {
    label: enableSelectionDragDrop.value ? '禁用拖拽（Selection）' : '启用拖拽（Selection）',
    active: enableSelectionDragDrop.value,
    onClick: () => {
      enableSelectionDragDrop.value = !enableSelectionDragDrop.value
    },
  },
  {
    label: rowLoggerButtonLabel.value,
    active: isCustomRowLoggerActive.value,
    onClick: toggleRowLogger,
  },
])

const selectionNotes = computed(() => {
  const notes = [
    {
      id: 'height',
      text: `当前高度：${currentHeightLabel.value}`,
    },
  ]

  if (isCustomRowLoggerActive.value) {
    notes.push({
      id: 'logger',
      text: '自定义行点击日志已启用（请在控制台查看 logger 输出）。',
    })
  }

  return notes
})

const showcaseFeatureList = [
  {
    token: 'checkbox',
    description: '过滤 Blocked 行并展示半选状态（工具栏按钮仍可触发全选 / 清空）。',
  },
  {
    token: 'seq',
    description: '依据可见顺序渲染稳定序号。',
  },
  {
    token: 'drag',
    description: '自定义拖拽预览并阻止拖动 Blocked 行。',
  },
  {
    token: 'actions',
    description: '预设 “Archive / Share” 按钮并输出操作日志。',
  },
  {
    token: 'radio',
    description: '在 Selection Playground 中演示单选模式。',
  },
]

const selectionHighlight = `Try: Toggle the selection mode, click checkboxes or radios, and sort any column (${formatShortcut('Click')} to add secondary sorts).`

const gridSections = computed(() => [
  {
    id: 'selection-playground',
    title: 'Selection Playground',
    description:
      'Explore multi-select (checkbox) and single-select (radio) functional columns on a 300-row dataset with virtual scrolling. Use the controls below to swap the selection column type while sequence numbering and action buttons remain available in every mode.',
    highlight: selectionHighlight,
    gridProps: selectionGridProps,
    handlers: {
      cellClick: handleSelectionCellClick,
      cellRightClick: handleSelectionCellClick,
      rowClick: handleSelectionRowClick,
      rowSelect: handleSelectionRowSelect,
      toggleSelection: handleSelectionToggleSelection,
      selectAll: handleSelectionSelectAll,
      clearSelection: handleSelectionClearSelection,
    },
    chips: {
      values: selectedRows.value,
      total: selectionRowCount.value,
      max: 10,
      chipClass:
        'inline-flex items-center gap-1 rounded bg-[var(--ht-primary-subtle)] px-2 py-0.5 text-xs text-[var(--ht-text)]',
      overflowClass:
        'inline-flex items-center gap-1 rounded bg-[var(--ht-bg-subtle)] px-2 py-0.5 text-xs text-[var(--ht-text-muted)]',
    },
    events: availableEvents.value,
    controls: selectionControlGroups.value,
    toggles: selectionToggles.value,
    notes: selectionNotes.value,
  },
  {
    id: 'functional-showcase',
    title: 'Functional Column Showcase',
    description:
      'A curated project dataset demonstrating functional columns: multi-select with disabled rows, sequence numbering, draggable handles with custom previews, and contextual action buttons.',
    highlight: null,
    gridProps: projectGridProps,
    handlers: {
      cellClick: handleProjectCellClick,
      cellRightClick: handleProjectCellClick,
      rowClick: handleProjectRowClick,
      rowSelect: handleProjectRowSelect,
      toggleSelection: handleProjectToggleSelection,
      selectAll: handleProjectSelectAll,
      clearSelection: handleProjectClearSelection,
    },
    chips: {
      values: projectSelectedRows.value,
      total: projectRowCount.value,
      max: 8,
      chipClass:
        'inline-flex items-center gap-1 rounded bg-[var(--ht-success-bg)] px-2 py-0.5 text-xs text-[var(--ht-text)]',
      overflowClass:
        'inline-flex items-center gap-1 rounded bg-[var(--ht-bg-subtle)] px-2 py-0.5 text-xs text-[var(--ht-text-muted)]',
    },
    features: showcaseFeatureList,
    controls: [] as Array<{
      id: string
      title: string
      options: Array<{ label: string; active: boolean; onClick: () => void }>
    }>,
    toggles: [] as Array<{ label: string; active: boolean; onClick: () => void }>,
    notes: [] as Array<{ id: string; text: string }>,
  },
])

// Theme toggle: dark/light
const isDark = ref(false)
const applyTheme = (dark: boolean) => {
  document.documentElement.classList.toggle('dark', dark)
  isDark.value = dark
  try {
    localStorage.setItem('ht-theme', dark ? 'dark' : 'light')
  } catch {}
}
const toggleTheme = () => applyTheme(!isDark.value)

onMounted(() => {
  try {
    const saved = localStorage.getItem('ht-theme')
    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved === 'dark')
      return
    }
  } catch {}
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
  applyTheme(prefersDark)
})

// HtSelect Demo State
const selectedFruit = ref<string>()
const selectedSize = ref<string>('md')
const selectedCountry = ref<string>()

const fruits = [
  { value: 'apple', label: 'Apple 🍎' },
  { value: 'banana', label: 'Banana 🍌' },
  { value: 'orange', label: 'Orange 🍊' },
  { value: 'grape', label: 'Grape 🍇' },
  { value: 'watermelon', label: 'Watermelon 🍉' },
]

const sizes = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const countries = [
  { group: 'Asia', options: [
    { value: 'cn', label: 'China 🇨🇳' },
    { value: 'jp', label: 'Japan 🇯🇵' },
    { value: 'kr', label: 'South Korea 🇰🇷' },
  ]},
  { group: 'Europe', options: [
    { value: 'uk', label: 'United Kingdom 🇬🇧' },
    { value: 'fr', label: 'France 🇫🇷' },
    { value: 'de', label: 'Germany 🇩🇪' },
  ]},
  { group: 'Americas', options: [
    { value: 'us', label: 'United States 🇺🇸' },
    { value: 'ca', label: 'Canada 🇨🇦' },
    { value: 'mx', label: 'Mexico 🇲🇽' },
  ]},
]

const countriesList = [
  { value: 'cn', label: 'China 🇨🇳', group: 'Asia' },
  { value: 'jp', label: 'Japan 🇯🇵', group: 'Asia' },
  { value: 'kr', label: 'South Korea 🇰🇷', group: 'Asia' },
  { value: 'uk', label: 'United Kingdom 🇬🇧', group: 'Europe' },
  { value: 'fr', label: 'France 🇫🇷', group: 'Europe' },
  { value: 'de', label: 'Germany 🇩🇪', group: 'Europe' },
  { value: 'us', label: 'United States 🇺🇸', group: 'Americas' },
  { value: 'ca', label: 'Canada 🇨🇦', group: 'Americas' },
  { value: 'mx', label: 'Mexico 🇲🇽', group: 'Americas' },
]

// Props 模式测试
const selectedCountryProps = ref<string>()

// 自定义字段映射测试
const selectedCountryCustom = ref<number>()
const countriesCustomFields = [
  { id: 1, country: 'China 🇨🇳', continent: 'Asia' },
  { id: 2, country: 'Japan 🇯🇵', continent: 'Asia', valid: false },
  { id: 3, country: 'South Korea 🇰🇷', continent: 'Asia' },
  { id: 4, country: 'United Kingdom 🇬🇧', continent: 'Europe' },
  { id: 5, country: 'France 🇫🇷', continent: 'Europe' },
  { id: 6, country: 'Germany 🇩🇪', continent: 'Europe' },
  { id: 7, country: 'United States 🇺🇸', continent: 'Americas' },
  { id: 8, country: 'Canada 🇨🇦', continent: 'Americas', valid: false },
  { id: 9, country: 'Mexico 🇲🇽', continent: 'Americas' },
]

// 搜索功能测试 (Phase 2.2)
const selectedCountrySearchable = ref<string>()
const countriesSearchable = [
  { value: 'cn', label: 'China 🇨🇳', group: 'Asia' },
  { value: 'jp', label: 'Japan 🇯🇵', group: 'Asia' },
  { value: 'kr', label: 'South Korea 🇰🇷', group: 'Asia' },
  { value: 'in', label: 'India 🇮🇳', group: 'Asia' },
  { value: 'th', label: 'Thailand 🇹🇭', group: 'Asia' },
  { value: 'uk', label: 'United Kingdom 🇬🇧', group: 'Europe' },
  { value: 'fr', label: 'France 🇫🇷', group: 'Europe' },
  { value: 'de', label: 'Germany 🇩🇪', group: 'Europe' },
  { value: 'it', label: 'Italy 🇮🇹', group: 'Europe' },
  { value: 'es', label: 'Spain 🇪🇸', group: 'Europe' },
  { value: 'us', label: 'United States 🇺🇸', group: 'Americas' },
  { value: 'ca', label: 'Canada 🇨🇦', group: 'Americas' },
  { value: 'mx', label: 'Mexico 🇲🇽', group: 'Americas' },
  { value: 'br', label: 'Brazil 🇧🇷', group: 'Americas' },
  { value: 'ar', label: 'Argentina 🇦🇷', group: 'Americas' },
]

// Combobox 模式测试 (Phase 2.2b - 仿 Ant Design)
const selectedCountryCombobox = ref<string>()

// 超长内容测试
const selectedLongContent = ref<string>()
const longContentOptions = [
  { value: '1', label: 'Short option' },
  { value: '2', label: 'This is a very long option that might cause layout issues if not handled properly' },
  { value: '3', label: 'Medium length option text here' },
  { value: '4', label: 'Another extremely long option with lots of text that should demonstrate the maxWidth behavior' },
  { value: '5', label: 'Normal' },
  { value: '6', label: 'This is a very long option that might cause layout issues if not handled properly' },
  { value: '7', label: 'Medium length option text here' },
  { value: '8', label: 'Another extremely long option with lots of text that should demonstrate the maxWidth behavior' },
  { value: '9', label: 'This is a very long option that might cause layout issues if not handled properly' },
  { value: '10', label: 'Medium length option text here' },
  { value: '11', label: 'Another extremely long option with lots of text that should demonstrate the maxWidth behavior' },
]

// 材料选择演示 (Phase 2.2.21 - optionRender)
interface MaterialSpec {
  label: string
  value: string | number | boolean
}

interface Material {
  id: number
  title: string
  code: string
  specs: MaterialSpec[]
  compatible?: string
  badgeType?: 'info' | 'warning' | 'danger' | 'primary' | 'success'
}

const selectedMaterial = ref<number>()
const materials: Material[] = [
  {
    id: 1,
    title: '南玻双银Low-E中空玻璃 27A',
    code: 'CSG-LOWE-D-27A',
    specs: [
      { label: '中空腔体', value: '27A' },
      { label: '玻璃组合', value: '6mm Low-E + 27A + 6mm白玻' },
      { label: 'Low-E位置', value: '#2 (外片内侧)' }
    ],
    compatible: "完全兼容",
    badgeType: 'primary'
  },
  {
    id: 2,
    title: '坚朗内开内倒窗执手 KLG-H36',
    code: 'Another extremely long option with lots of text that should demonstrate the maxWidth behavior',
    specs: [
      { label: '品牌', value: '坚朗' },
      { label: '材质', value: '锌合金' },
      { label: '适配系列', value: '欧标C槽' },
      { label: '库存数量', value: 1250 },
      { label: '现货', value: true }
    ],
    compatible: "兼容",
    badgeType: 'success'
  },
  {
    id: 3,
    title: '道康宁995结构密封胶',
    code: 'DOW-SEAL-995',
    specs: [
      { label: '品牌', value: '道康宁' },
      { label: '固化类型', value: '中性' },
      { label: '颜色', value: '黑色' }
    ],
    compatible: "不兼容",
    badgeType: 'warning'
  }
]

// 产品选择演示 - 自定义字段映射 (Phase 2.2.21+)
interface ProductAttribute {
  name: string  // 使用 'name' 而不是 'label'
  text: string | number | boolean  // 使用 'text' 而不是 'value'
}

interface Product {
  id: number
  title: string
  sku: string
  attributes: ProductAttribute[]
  stock: string
}

const selectedProduct = ref<number>()
const products: Product[] = [
  {
    id: 1,
    title: 'MacBook Pro 14" M3 Max',
    sku: 'APPLE-MBP14-M3MAX-2024',
    attributes: [
      { name: '芯片', text: 'M3 Max (14核CPU, 30核GPU)' },
      { name: '内存', text: '36GB' },
      { name: '存储', text: '1TB SSD' },
      { name: '价格', text: 22999 },
      { name: '现货', text: true }
    ],
    stock: '有货'
  },
  {
    id: 2,
    title: 'MacBook Air 15" M3',
    sku: 'APPLE-MBA15-M3-2024',
    attributes: [
      { name: '芯片', text: 'M3 (8核CPU, 10核GPU)' },
      { name: '内存', text: '16GB' },
      { name: '存储', text: '512GB SSD' },
      { name: '价格', text: 12999 },
      { name: '现货', text: false }
    ],
    stock: '预订'
  },
  {
    id: 3,
    title: 'iPad Pro 12.9" M2',
    sku: 'APPLE-IPADPRO-M2-129-2024',
    attributes: [
      { name: '芯片', text: 'M2 (8核CPU, 10核GPU)' },
      { name: '内存', text: '8GB' },
      { name: '存储', text: '256GB' },
      { name: '屏幕', text: '12.9英寸 Liquid Retina XDR' },
      { name: '价格', text: 8999 },
      { name: '现货', text: true }
    ],
    stock: '有货'
  },
  {
    id: 4,
    title: 'iPhone 15 Pro Max',
    sku: 'APPLE-IP15PM-256-TITANIUM-2024',
    attributes: [
      { name: '芯片', text: 'A17 Pro' },
      { name: '内存', text: '8GB' },
      { name: '存储', text: '256GB' },
      { name: '颜色', text: '钛金属' },
      { name: '价格', text: 9999 },
      { name: '现货', text: true }
    ],
    stock: '有货'
  },
  {
    id: 5,
    title: 'Mac Studio M2 Ultra',
    sku: 'APPLE-MACSTUDIO-M2ULTRA-2024',
    attributes: [
      { name: '芯片', text: 'M2 Ultra (24核CPU, 76核GPU)' },
      { name: '内存', text: '64GB' },
      { name: '存储', text: '2TB SSD' },
      { name: '价格', text: 39999 },
      { name: '现货', text: false }
    ],
    stock: '预订'
  },
  {
    id: 6,
    title: 'AirPods Pro (第2代)',
    sku: 'APPLE-AIRPODSPRO2-USBC-2024',
    attributes: [
      { name: '芯片', text: 'H2' },
      { name: '主动降噪', text: true },
      { name: '续航', text: '6小时 (单次充电)' },
      { name: '接口', text: 'USB-C' },
      { name: '价格', text: 1899 },
      { name: '现货', text: true }
    ],
    stock: '有货'
  },
  {
    id: 7,
    title: 'Apple Watch Ultra 2',
    sku: 'APPLE-WATCHULTRA2-TITANIUM-2024',
    attributes: [
      { name: '芯片', text: 'S9 SiP' },
      { name: '屏幕', text: '49mm 钛金属表壳' },
      { name: '续航', text: '36小时' },
      { name: '防水', text: '100米' },
      { name: '价格', text: 6499 },
      { name: '现货', text: true }
    ],
    stock: '有货'
  },
  {
    id: 8,
    title: 'Mac Mini M2 Pro',
    sku: 'APPLE-MACMINI-M2PRO-2024',
    attributes: [
      { name: '芯片', text: 'M2 Pro (12核CPU, 19核GPU)' },
      { name: '内存', text: '32GB' },
      { name: '存储', text: '512GB SSD' },
      { name: '价格', text: 10999 },
      { name: '现货', text: false }
    ],
    stock: '预订'
  }
]

// ==========================================
// HtSelect 企业级功能演示 (Enterprise Features)
// ==========================================

// 1. 异步数据加载演示 (Async Data Loading)
const selectedUser = ref<number>()

// MOCK 用户数据库
const mockUserDatabase = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Engineering' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', department: 'Marketing' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', department: 'Marketing' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', department: 'Sales' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Sales' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', department: 'HR' },
  { id: 8, name: 'Henry Wilson', email: 'henry@example.com', department: 'Engineering' },
  { id: 9, name: 'Ivy Chen', email: 'ivy@example.com', department: 'Engineering' },
  { id: 10, name: 'Jack Turner', email: 'jack@example.com', department: 'Marketing' },
]

// MOCK 异步搜索函数 (模拟网络延迟)
const searchUsers = async (query: string, signal: AbortSignal): Promise<any[]> => {
  console.log('🔍 Searching for:', query)

  // 模拟网络延迟 (300-500ms)
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))

  // 检查是否被取消
  if (signal.aborted) {
    throw new Error('AbortError')
  }

  // 过滤用户
  const filtered = mockUserDatabase.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  )

  // 返回标准化的选项格式
  return filtered.map(user => ({
    value: user.id,
    label: `${user.name} (${user.email})`,
    department: user.department,
  }))
}

// 初始用户选项 (最近使用)
const recentUsers = [
  { value: 1, label: 'Alice Johnson (alice@example.com)' },
  { value: 2, label: 'Bob Smith (bob@example.com)' },
]

// 2. Quick Create 演示
const selectedTag = ref<number>()
const mockTagDatabase = ref([
  { id: 1, name: 'Important' },
  { id: 2, name: 'Urgent' },
  { id: 3, name: 'Follow-up' },
])

const tagOptions = computed(() =>
  mockTagDatabase.value.map(tag => ({
    value: tag.id,
    label: tag.name,
  }))
)

// MOCK 快速创建标签函数
const quickCreateTag = async (name: string) => {
  console.log('✨ Creating tag:', name)

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500))

  // 创建新标签
  const newTag = {
    id: mockTagDatabase.value.length + 1,
    name,
  }

  mockTagDatabase.value.push(newTag)

  return {
    value: newTag.id,
    label: newTag.name,
  }
}

// 3. 权限控制演示
const selectedProject = ref<number>()
const currentUserRole = ref<'admin' | 'user'>('user')

const mockProjectDatabase = ref([
  { id: 1, name: 'Website Redesign', owner: 'Alice' },
  { id: 2, name: 'Mobile App', owner: 'Bob' },
  { id: 3, name: 'API Migration', owner: 'Charlie' },
])

const projectOptions = computed(() =>
  mockProjectDatabase.value.map(project => ({
    value: project.id,
    label: `${project.name} (Owner: ${project.owner})`,
  }))
)

// MOCK 创建项目函数
const createProject = async (name: string) => {
  console.log('🚀 Creating project:', name)

  await new Promise(resolve => setTimeout(resolve, 500))

  const newProject = {
    id: mockProjectDatabase.value.length + 1,
    name,
    owner: 'Current User',
  }

  mockProjectDatabase.value.push(newProject)

  return {
    value: newProject.id,
    label: `${newProject.name} (Owner: ${newProject.owner})`,
  }
}

// 动态权限检查
const canCreateProject = computed(() => currentUserRole.value === 'admin')

// 切换用户角色
const toggleUserRole = () => {
  currentUserRole.value = currentUserRole.value === 'admin' ? 'user' : 'admin'
}

</script>

<template>
  <div class="min-h-screen bg-[var(--ht-bg)] text-[var(--ht-text)] antialiased">
    <header class="border-b border-[var(--ht-border)]">
      <div class="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/vite.svg" class="h-7 w-7" alt="Vite logo" />
          <img src="./assets/vue.svg" class="h-7 w-7" alt="Vue logo" />
          <span class="font-semibold">Happy Table</span>
        </div>
        <nav class="flex items-center gap-3 text-sm">
          <a
            href="#primitives-demo"
            class="text-[var(--ht-text-muted)] hover:text-[var(--ht-text)]"
          >
            Primitives
          </a>
          <a
            href="https://vite.dev"
            target="_blank"
            class="text-[var(--ht-text-muted)] hover:text-[var(--ht-text)]"
          >
            Vite
          </a>
          <a
            href="https://vuejs.org/"
            target="_blank"
            class="text-[var(--ht-text-muted)] hover:text-[var(--ht-text)]"
          >
            Vue
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            class="text-[var(--ht-text-muted)] hover:text-[var(--ht-text)]"
          >
            Tailwind
          </a>

          <!-- Theme toggle -->
          <button
            type="button"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            class="inline-flex items-center gap-1 rounded border border-[var(--ht-border)] bg-[var(--ht-bg-subtle)] px-2 py-1 text-xs text-[var(--ht-text)] hover:bg-[var(--ht-cell-hover)]"
            @click="toggleTheme"
          >
            <span class="leading-none">{{ isDark ? '🌙' : '☀️' }}</span>
            <span>{{ isDark ? 'Dark' : 'Light' }}</span>
          </button>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <section class="mb-8">
        <h1 class="text-2xl font-semibold tracking-tight">Vite + Vue + Tailwind v4</h1>
        <p class="mt-2 text-[var(--ht-text-muted)]">组件库演示区（带 HMR）。</p>
      </section>

      <!-- Primitives Demo Section -->
      <section id="primitives-demo" class="mb-8">
        <div class="rounded-lg border border-[var(--ht-border)] p-6">
          <h2 class="mb-4 text-lg font-medium">Primitives Demo (原子控件演示)</h2>
          <p class="mb-6 text-sm text-[var(--ht-text-muted)]">
            Atomic design system primitives: HtButton, HtInput, HtCheckbox components with full variant/size/state systems.
          </p>
          <PrimitivesDemo />
        </div>
      </section>

      <!-- HtSelect Demo Section -->
      <section id="select-demo" class="mb-8">
        <div class="rounded-lg border border-[var(--ht-border)] p-6">
          <h2 class="mb-4 text-lg font-medium">HtSelect Component Demo</h2>
          <p class="mb-6 text-sm text-[var(--ht-text-muted)]">
            Compound component architecture with keyboard navigation (14 keys), ARIA attributes, and BasePopover positioning.
          </p>

          <div class="grid gap-6 md:grid-cols-2">
            <!-- Basic Select -->
            <div>
              <label class="block text-sm font-medium mb-2">Basic Select</label>
              <HtSelect v-model="selectedFruit" size="md" width="280px">
                <HtSelectTrigger>
                  <HtSelectValue placeholder="Select a fruit..." />
                </HtSelectTrigger>
                <HtSelectContent>
                  <HtSelectItem v-for="fruit in fruits" :key="fruit.value" :value="fruit.value">
                    {{ fruit.label }}
                  </HtSelectItem>
                </HtSelectContent>
              </HtSelect>
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected: <strong>{{ selectedFruit || 'None' }}</strong>
              </p>
            </div>

            <!-- Size Variants -->
            <div>
              <label class="block text-sm font-medium mb-2">Size Variants</label>
              <HtSelect v-model="selectedSize" size="md">
                <HtSelectTrigger>
                  <HtSelectValue placeholder="Select size..." />
                </HtSelectTrigger>
                <HtSelectContent>
                  <HtSelectItem v-for="size in sizes" :key="size.value" :value="size.value">
                    {{ size.label }}
                  </HtSelectItem>
                </HtSelectContent>
              </HtSelect>
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Current size: <strong>{{ selectedSize }}</strong>
              </p>
            </div>

            <!-- Grouped Select -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-2">Grouped Select with Separators</label>
              <HtSelect v-model="selectedCountry" size="md" width="100%">
                <HtSelectTrigger>
                  <HtSelectValue placeholder="Select a country..." />
                </HtSelectTrigger>
                <HtSelectContent>
                  <template v-for="(group, index) in countries" :key="group.group">
                    <HtSelectGroup>
                      <HtSelectLabel>{{ group.group }}</HtSelectLabel>
                      <HtSelectItem v-for="country in group.options" :key="country.value" :value="country.value">
                        {{ country.label }}
                      </HtSelectItem>
                    </HtSelectGroup>
                    <HtSelectSeparator v-if="index < countries.length - 1" />
                  </template>
                </HtSelectContent>
              </HtSelect>
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected country: <strong>{{ selectedCountry || 'None' }}</strong>
              </p>
            </div>
          </div>

          <!-- Props Mode Auto-Grouping Demo -->
          <div class="mt-6 p-4 bg-[var(--ht-primary-subtle)] rounded border border-[var(--ht-primary)]">
            <h3 class="text-sm font-medium mb-3 text-[var(--ht-primary)]">✨ Props Mode: Auto-Grouping</h3>
            <p class="text-xs text-[var(--ht-text-muted)] mb-4">
              Zero configuration grouping! Just provide <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">options</code> with a <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">group</code> field.
            </p>

            <div class="max-w-xs">
              <label class="block text-sm font-medium mb-2">Props Mode (Auto-Grouped)</label>
              <HtSelect
                v-model="selectedCountryProps"
                :options="countriesList"
                placeholder="Select a country..."
                size="md"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected: <strong>{{ selectedCountryProps || 'None' }}</strong>
              </p>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
              <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
              <pre class="text-[10px] leading-relaxed"><code>// Data with 'group' field
const countries = [
  { value: 'cn', label: 'China 🇨🇳', group: 'Asia' },
  { value: 'jp', label: 'Japan 🇯🇵', group: 'Asia' },
  // ...
]

// Zero config - auto-grouping!
&lt;HtSelect v-model="selected" :options="countries" /&gt;</code></pre>
            </div>
          </div>

          <!-- Search Demo (Phase 2.2) -->
          <div class="mt-6 p-4 bg-[var(--ht-warning-bg)] rounded border border-[var(--ht-warning-border)]">
            <h3 class="text-sm font-medium mb-3 text-[var(--ht-warning)]">🔍 Searchable Select (Phase 2.2 - Dropdown Search)</h3>
            <p class="text-xs text-[var(--ht-text-muted)] mb-4">
              Enable dropdown search with <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">searchable={true}</code>.
              Search box appears inside dropdown content.
            </p>

            <div class="max-w-xs">
              <label class="block text-sm font-medium mb-2">Dropdown Search (15 options)</label>
              <HtSelect
                v-model="selectedCountrySearchable"
                :options="countriesSearchable"
                searchable
                search-placeholder="Type to filter..."
                placeholder="Select a country..."
                size="md"
                width="280px"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected: <strong>{{ selectedCountrySearchable || 'None' }}</strong>
              </p>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
              <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
              <pre class="text-[10px] leading-relaxed"><code>// Dropdown search mode
&lt;HtSelect
  v-model="selected"
  :options="countries"
  searchable
  search-placeholder="Type to filter..."
/&gt;</code></pre>
            </div>
          </div>

          <!-- Combobox Demo (Phase 2.2b) -->
          <div class="mt-6 p-4 bg-[var(--ht-info-bg)] rounded border border-[var(--ht-info-border)]">
            <h3 class="text-sm font-medium mb-3 text-[var(--ht-info)]">⌨️ Combobox Mode (Phase 2.2 - 仿 Ant Design)</h3>
            <p class="text-xs text-[var(--ht-text-muted)] mb-4">
              Enable input trigger with <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">:searchable="true"</code>.
              Trigger becomes an input box - type directly to filter options (like Ant Design Select).
            </p>

            <div class="max-w-xs">
              <label class="block text-sm font-medium mb-2">Combobox (Input Trigger, 15 options)</label>
              <HtSelect
                v-model="selectedCountryCombobox"
                :options="countriesSearchable"
                :searchable="true"
                placeholder="Type to search..."
                size="md"
                width="350px"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected: <strong>{{ selectedCountryCombobox || 'None' }}</strong>
              </p>
            </div>

            <div class="mt-6 max-w-xs">
              <label class="block text-sm font-medium mb-2">Long Content (Dropdown matches width)</label>
              <HtSelect
                v-model="selectedLongContent"
                :options="longContentOptions"
                :searchable="true"
                placeholder="Select..."
                size="md"
                width='280px'
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected: <strong>{{ selectedLongContent || 'None' }}</strong>
              </p>
              <p class="mt-1 text-[10px] text-[var(--ht-warning)]">
                💡 Dropdown width always matches HtSelect width (280px). Long text will truncate with ellipsis.
              </p>
            </div>

            <div class="mt-6 max-w-xs">
              <label class="block text-sm font-medium mb-2">Multi-line Display (showMultiLines)</label>
              <HtSelect
                v-model="selectedLongContent"
                :options="longContentOptions"
                :searchable="true"
                placeholder="Select..."
                size="md"
                width='280px'
                :show-multi-lines="2"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected: <strong>{{ selectedLongContent || 'None' }}</strong>
              </p>
              <p class="mt-1 text-[10px] text-[var(--ht-success)]">
                💡 showMultiLines="3" allows up to 3 lines of text with automatic wrapping. Overflow text shows ellipsis.
              </p>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
              <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
              <pre class="text-[10px] leading-relaxed"><code>// Combobox mode (input trigger)
&lt;HtSelect
  v-model="selected"
  :options="countries"
  :searchable="true"
  placeholder="Type to search..."
/&gt;

// Single-line truncate (default)
&lt;HtSelect
  :options="longOptions"
  width="280px"
  :show-multi-lines="1"
/&gt;

// Multi-line display (up to 3 lines)
&lt;HtSelect
  :options="longOptions"
  width="280px"
  :show-multi-lines="3"
/&gt;</code></pre>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-warning-bg)] rounded border border-[var(--ht-warning-border)]">
              <p class="text-xs font-medium mb-1">🎯 Key Behavior:</p>
              <ul class="text-[10px] space-y-1 text-[var(--ht-text-muted)]">
                <li>• <strong>searchable={false}</strong> (default): Trigger is button, standard Select</li>
                <li>• <strong>searchable={true}</strong>: Trigger is input, type directly to search (Combobox mode)</li>
                <li>• <strong>Dropdown width</strong>: Always matches HtSelect width for visual consistency</li>
                <li>• <strong>showMultiLines=1</strong> (default): Single-line with ellipsis truncation</li>
                <li>• <strong>showMultiLines>1</strong>: Multi-line wrapping with max lines limit</li>
              </ul>
            </div>
          </div>

          <!-- Field Mapping Demo -->
          <div class="mt-6 p-4 bg-[var(--ht-success-bg)] rounded border border-[var(--ht-success-border)]">
            <h3 class="text-sm font-medium mb-3 text-[var(--ht-success)]">🎯 Custom Field Mapping + Disabled Logic</h3>
            <p class="text-xs text-[var(--ht-text-muted)] mb-4">
              Map any data structure with <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">valueField</code>,
              <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">labelField</code>, and
              <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">groupBy</code> props.
              Use <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">optionDisabled</code> function for flexible disable logic.
            </p>

            <div class="max-w-xs">
              <label class="block text-sm font-medium mb-2">Custom Fields + Logic Inversion (valid: false)</label>
              <HtSelect
                v-model="selectedCountryCustom"
                value-field="id"
                label-field="country"
                group-by="continent"
                placeholder="Select a country..."
                size="md"
                :options="countriesCustomFields"
                :option-disabled="(opt) => (opt.valid === false)"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected ID: <strong>{{ selectedCountryCustom || 'None' }}</strong>
              </p>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
              <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
              <pre class="text-[10px] leading-relaxed"><code>// Custom data structure with logic inversion
const countries = [
  { id: 1, country: 'China 🇨🇳', continent: 'Asia' },
  { id: 2, country: 'Japan 🇯🇵', continent: 'Asia', valid: false },  // ← Invalid
  // ...
]

// Field mapping + disable logic
&lt;HtSelect
  v-model="selected"
  :options="countries"
  value-field="id"
  label-field="country"
  group-by="continent"
  :option-disabled="(opt) => opt.valid === false"
/&gt;</code></pre>
            </div>
          </div>

          <!-- Material Selector Demo (Phase 2.2.21 - optionRender) -->
          <div class="mt-6 p-4 bg-[var(--ht-primary-subtle)] rounded border border-[var(--ht-primary)]">
            <h3 class="text-sm font-medium mb-3 text-[var(--ht-primary)]">🏗️ Complex Option Rendering (Phase 2.2.21)</h3>
            <p class="text-xs text-[var(--ht-text-muted)] mb-4">
              Use <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">optionRender</code> prop to create rich, structured option layouts.
              Perfect for material/product selectors with specs, badges, and multi-line content.
            </p>

            <div class="max-w-2xl">
              <label class="block text-sm font-medium mb-2">Material Selector (optionRender)</label>
              <HtSelect
                v-model="selectedMaterial"
                :options="materials"
                value-field="id"
                label-field="title"
                placeholder="Select a material..."
                size="md"
                width="360px"
                :option-render="(option) => ({
                  title: option.title,
                  description: option.code,
                  meta: option.specs,
                  badge: option.compatible,
                  badgeType: option.badgeType
                })"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected Material ID: <strong>{{ selectedMaterial || 'None' }}</strong>
              </p>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
              <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
              <pre class="text-[10px] leading-relaxed"><code>// Material data with structured meta (supports string, number, boolean)
const materials: Material[] = [{
  id: 1,
  title: '南玻双银Low-E中空玻璃 27A',
  code: 'CSG-LOWE-D-27A',
  specs: [
    { label: '中空腔体', value: '27A' },
    { label: '玻璃组合', value: '6mm Low-E + 27A + 6mm白玻' },
    { label: '库存数量', value: 1250 },      // number
    { label: '现货', value: true }           // boolean
  ],
  compatible: true
}]

// Custom rendering with optionRender
&lt;HtSelect
  v-model="selected"
  :options="materials"
  value-field="id"
  label-field="title"
  :option-render="(option) => ({
    title: option.title,           // Main title
    description: option.code,      // Description/subtitle
    meta: option.specs,            // Metadata (supports string/number/boolean)
    badge: option.compatible ? '完全兼容' : null,
    badgeType: 'primary'
  })"
/></code></pre>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-warning-bg)] rounded border border-[var(--ht-warning-border)]">
              <p class="text-xs font-medium mb-1">💡 Key Features:</p>
              <ul class="text-[10px] space-y-1 text-[var(--ht-text-muted)]">
                <li>• <strong>Structured Data</strong>: specs as JSON array, not concatenated strings</li>
                <li>• <strong>Rich Layout</strong>: Title, subtitle, specs grid, and badge in single option</li>
                <li>• <strong>Badge Types</strong>: primary, success, warning, info, default</li>
                <li>• <strong>Auto Styling</strong>: Built-in hover/selected states, responsive layout</li>
                <li>• <strong>Flexible</strong>: Any combination of title/subtitle/specs/badge</li>
              </ul>
            </div>
          </div>

          <!-- optionRender with Custom Field Mapping -->
          <div class="mt-8">
            <h3 class="text-base font-medium mb-3">Phase 2.2.21+ - Custom Field Mapping in optionRender</h3>
            <p class="text-sm text-[var(--ht-text-muted)] mb-4">
              Handle field mapping directly in <code class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">optionRender</code> function.
              This gives you full control over data transformation without global configuration.
            </p>

            <div class="max-w-2xl">
              <label class="block text-sm font-medium mb-2">Product Selector (Custom Fields: name/text)</label>
              <HtSelect
                v-model="selectedProduct"
                searchable
                :options="products"
                value-field="id"
                label-field="title"
                placeholder="Select a product..."
                size="md"
                width="360px"
                :option-render="(option) => ({
                  title: option.title,
                  description: option.sku,
                  // Map name/text to label/value in optionRender
                  meta: option.attributes.map((attr: ProductAttribute) => ({
                    label: attr.name,
                    value: typeof(attr.text) === 'number' ? attr.text.toFixed(2) : attr.text.toString(),
                  })),
                  badge: option.stock,
                  badgeType: option.stock === '有货' ? 'success' : 'warning'
                })"
              />
              <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                Selected Product ID: <strong>{{ selectedProduct || 'None' }}</strong>
              </p>
            </div>

            <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
              <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
              <pre class="text-[10px] leading-relaxed"><code>// Product data with custom field names (name/text instead of label/value)
interface ProductAttribute {
  name: string
  text: string | number | boolean
}

const products = [{
  id: 1,
  title: 'MacBook Pro 14" M3 Max',
  sku: 'APPLE-MBP14-M3MAX-2024',
  attributes: [
    { name: '芯片', text: 'M3 Max' },
    { name: '价格', text: 22999 },
    { name: '现货', text: true }
  ]
}]

// Map custom fields in optionRender function
&lt;HtSelect
  v-model="selected"
  :options="products"
  value-field="id"
  label-field="title"
  :option-render="(option) => ({
    title: option.title,
    description: option.sku,
    // Transform name/text to label/value
    meta: option.attributes.map(attr => ({
      label: attr.name,    // Map name → label
      value: attr.text     // Map text → value
    }))
  })"
/></code></pre>
            </div>
          </div>

          <div class="mt-6 p-4 bg-[var(--ht-bg-subtle)] rounded border border-[var(--ht-border)]">
            <h3 class="text-sm font-medium mb-2">Keyboard Navigation (14 Keys)</h3>
            <div class="grid grid-cols-2 gap-2 text-xs text-[var(--ht-text-muted)]">
              <div><kbd class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">↑/↓</kbd> Navigate items</div>
              <div><kbd class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">Home/End</kbd> First/Last item</div>
              <div><kbd class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">Enter/Space</kbd> Select item</div>
              <div><kbd class="px-1 py-0.5 bg-[var(--ht-bg)] border border-[var(--ht-border)] rounded">Esc</kbd> Close dropdown</div>
            </div>
          </div>

          <div class="mt-4 text-xs text-[var(--ht-text-muted)]">
            <strong>Features:</strong> Context Provider/Inject • BasePopover positioning • WCAG 2.2 AA • Existing CSS tokens • Zero new dependencies
          </div>
        </div>
      </section>

      <!-- HtSelect 企业级功能演示 Section -->
      <section id="select-enterprise-demo" class="mb-8">
        <div class="rounded-lg border border-[var(--ht-border)] p-6">
          <h2 class="mb-4 text-lg font-medium">🚀 HtSelect Enterprise Features (MOCK Demo)</h2>
          <p class="mb-6 text-sm text-[var(--ht-text-muted)]">
            Enterprise-level capabilities: Async Data Loading, Quick Create, and Permission Control with MOCK backend simulation.
          </p>

          <div class="grid gap-6">
            <!-- 1. 异步数据加载 Demo -->
            <div class="p-4 bg-[var(--ht-primary-subtle)] rounded border border-[var(--ht-primary)]">
              <h3 class="text-sm font-medium mb-3 text-[var(--ht-primary)]">
                1️⃣ Async Data Loading (异步数据加载)
              </h3>
              <p class="text-xs text-[var(--ht-text-muted)] mb-4">
                Type to search users with <strong>debounce (300ms)</strong>, <strong>AbortController</strong> for request cancellation, and <strong>memory cache</strong>.
                Network latency simulated: 300-500ms.
              </p>

              <div class="max-w-md">
                <label class="block text-sm font-medium mb-2">Search Users (Async)</label>
                <HtSelect
                  v-model="selectedUser"
                  :source="searchUsers"
                  :initial-options="recentUsers"
                  :debounce="300"
                  :search-threshold="2"
                  searchable
                  placeholder="Type to search users..."
                  size="md"
                  width="100%"
                  @loading-start="(query: string) => console.log('🔄 Loading:', query)"
                  @loading-end="(options: any[], query: string) => console.log('✅ Loaded:', query, options.length, 'results')"
                  @loading-error="(error: Error, query: string) => console.error('❌ Error:', query, error)"
                />
                <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                  Selected User ID: <strong>{{ selectedUser || 'None' }}</strong>
                </p>
                <p class="mt-1 text-[10px] text-[var(--ht-warning)]">
                  💡 Try typing "alice", "bob", or "charlie". Check console for async events.
                </p>
              </div>

              <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
                <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
                <pre class="text-[10px] leading-relaxed"><code>// User provides async function
const searchUsers = async (query: string, signal: AbortSignal) => {
  const res = await fetch(`/api/users?q=${query}`, { signal })
  return res.json().map(u => ({ value: u.id, label: u.name }))
}

// HtSelect handles UI, debounce, cache, cancellation
&lt;HtSelect
  :source="searchUsers"
  :debounce="300"
  :search-threshold="2"
  searchable
/&gt;</code></pre>
              </div>
            </div>

            <!-- 2. Quick Create Demo -->
            <div class="p-4 bg-[var(--ht-success-bg)] rounded border border-[var(--ht-success-border)]">
              <h3 class="text-sm font-medium mb-3 text-[var(--ht-success)]">
                2️⃣ Quick Create (快速创建)
              </h3>
              <p class="text-xs text-[var(--ht-text-muted)] mb-4">
                Type a new tag name that doesn't exist, and "Create: xxx" option will appear.
                Click to create instantly (500ms simulated delay).
              </p>

              <div class="max-w-md">
                <label class="block text-sm font-medium mb-2">Tags (with Quick Create)</label>
                <HtSelect
                  v-model="selectedTag"
                  :options="tagOptions"
                  :quick-create="quickCreateTag"
                  searchable
                  placeholder="Select or create tag..."
                  size="md"
                  width="100%"
                  @create-start="(value: string) => console.log('🔨 Creating:', value)"
                  @create-success="(option: any) => console.log('✅ Created:', option)"
                  @create-error="(error: Error) => console.error('❌ Create failed:', error)"
                />
                <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                  Selected Tag ID: <strong>{{ selectedTag || 'None' }}</strong>
                </p>
                <p class="mt-1 text-[10px] text-[var(--ht-warning)]">
                  💡 Try typing "Feature", "Bug", or "Enhancement". Watch new tags appear!
                </p>
                <p class="mt-2 text-xs">
                  <strong>Created Tags:</strong> {{ mockTagDatabase.map(t => t.name).join(', ') }}
                </p>
              </div>

              <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
                <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
                <pre class="text-[10px] leading-relaxed"><code>// User provides create handler
const quickCreateTag = async (name: string) => {
  const res = await fetch('/api/tags', {
    method: 'POST',
    body: JSON.stringify({ name })
  })
  const tag = await res.json()
  return { value: tag.id, label: tag.name }
}

&lt;HtSelect
  :options="tags"
  :quick-create="quickCreateTag"
  searchable
/&gt;</code></pre>
              </div>
            </div>

            <!-- 3. Permission Control Demo -->
            <div class="p-4 bg-[var(--ht-warning-bg)] rounded border border-[var(--ht-warning-border)]">
              <h3 class="text-sm font-medium mb-3 text-[var(--ht-warning)]">
                3️⃣ Permission Control (权限控制)
              </h3>
              <p class="text-xs text-[var(--ht-text-muted)] mb-4">
                Dynamic permission check: Only <strong>admin</strong> can create new projects.
                Switch role to see the difference.
              </p>

              <div class="max-w-md">
                <div class="mb-3 flex items-center gap-3">
                  <span class="text-sm">Current Role:</span>
                  <HtButton
                    :label="`${currentUserRole.toUpperCase()} (Click to toggle)`"
                    size="sm"
                    :variant="currentUserRole === 'admin' ? 'primary' : 'outline'"
                    @click="toggleUserRole"
                  />
                  <span v-if="canCreateProject" class="text-xs text-[var(--ht-success)]">
                    ✅ Can create projects
                  </span>
                  <span v-else class="text-xs text-[var(--ht-error)]">
                    ❌ Cannot create projects
                  </span>
                </div>

                <label class="block text-sm font-medium mb-2">Projects (with Permission)</label>
                <HtSelect
                  v-model="selectedProject"
                  :options="projectOptions"
                  :quick-create="createProject"
                  :can-create="canCreateProject"
                  searchable
                  placeholder="Select or create project..."
                  size="md"
                  width="100%"
                  @create-success="(option: any) => console.log('✅ Project created:', option)"
                />
                <p class="mt-2 text-xs text-[var(--ht-text-muted)]">
                  Selected Project ID: <strong>{{ selectedProject || 'None' }}</strong>
                </p>
                <p class="mt-1 text-[10px] text-[var(--ht-warning)]">
                  💡 Switch to <strong>ADMIN</strong> role to enable Quick Create. Try typing "New Feature".
                </p>
                <p class="mt-2 text-xs">
                  <strong>All Projects:</strong> {{ mockProjectDatabase.map(p => p.name).join(', ') }}
                </p>
              </div>

              <div class="mt-4 p-3 bg-[var(--ht-bg)] rounded border border-[var(--ht-border)]">
                <p class="text-xs text-[var(--ht-text-muted)] mb-2"><strong>Code Example:</strong></p>
                <pre class="text-[10px] leading-relaxed"><code>// Dynamic permission check
const canCreate = computed(() => user.role === 'admin')

&lt;HtSelect
  :options="projects"
  :quick-create="createProject"
  :can-create="canCreate"
  searchable
/&gt;</code></pre>
              </div>
            </div>

            <!-- Feature Summary -->
            <div class="p-4 bg-[var(--ht-bg-subtle)] rounded border border-[var(--ht-border)]">
              <h3 class="text-sm font-medium mb-2">✨ Enterprise Features Summary</h3>
              <ul class="text-xs space-y-1 text-[var(--ht-text-muted)]">
                <li>• <strong>Async Loading</strong>: Debounce, AbortController, 3 cache strategies (memory, session, custom)</li>
                <li>• <strong>Quick Create</strong>: Inline creation with "Create: xxx" option</li>
                <li>• <strong>Permissions</strong>: Static/dynamic permission control</li>
                <li>• <strong>Events</strong>: loading-start, loading-end, loading-error, create-start, create-success, create-error</li>
                <li>• <strong>Design Principle</strong>: User handles requests, HtSelect handles UI (SOLID compliant)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- DataGrid Demo Section -->
      <section
        v-for="section in gridSections"
        :key="section.id"
        class="mb-8"
      >
        <div class="rounded-lg border border-[var(--ht-border)] p-6">
          <h2 class="mb-4 text-lg font-medium">{{ section.title }}</h2>
          <p class="mb-6 text-sm text-[var(--ht-text-muted)]">
            {{ section.description }}
            <template v-if="section.highlight">
              <br />
              <span class="mt-1 inline-block rounded bg-[var(--ht-primary-subtle)] px-2 py-1 text-xs text-[var(--ht-text)]">
                {{ section.highlight }}
              </span>
            </template>
          </p>

          <DataGrid
            v-bind="section.gridProps"
            @cell-click="section.handlers.cellClick"
            @cell-right-click="section.handlers.cellRightClick"
            @row-click="section.handlers.rowClick"
            @row-select="section.handlers.rowSelect"
            @toggle-selection="section.handlers.toggleSelection"
            @select-all="section.handlers.selectAll"
            @clear-selection="section.handlers.clearSelection"
          />

          <div v-if="section.chips.values.length > 0" class="mt-4">
            <p class="text-sm text-[var(--ht-text-muted)]">
              Selected rows: <strong>{{ section.chips.values.length }}</strong> / {{ section.chips.total }}
            </p>
            <div class="mt-2 flex flex-wrap gap-1">
              <span
                v-for="rowId in section.chips.values.slice(0, section.chips.max)"
                :key="rowId"
                :class="section.chips.chipClass"
              >
                {{ rowId }}
              </span>
              <span
                v-if="section.chips.values.length > section.chips.max"
                :class="section.chips.overflowClass"
              >
                +{{ section.chips.values.length - section.chips.max }} more
              </span>
            </div>
          </div>

          <div v-if="section.events" class="mt-6">
            <h3 class="text-sm font-medium text-[var(--ht-text)]">可用事件</h3>
            <p class="mt-1 text-xs text-[var(--ht-text-subtle)]">来自模板绑定的事件处理器。</p>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-for="eventName in section.events"
                :key="eventName"
                class="inline-flex items-center gap-2 rounded border border-[var(--ht-border)] bg-[var(--ht-bg-subtle)] px-3 py-1 text-xs text-[var(--ht-text)]"
              >
                <code class="text-[11px] font-mono text-[var(--ht-primary)]">{{ eventName }}</code>
                <span class="text-[11px] uppercase tracking-wide text-[var(--ht-text-subtle)]">available</span>
              </span>
            </div>
          </div>

          <div v-for="group in section.controls" :key="group.id" class="mt-6">
            <h3 class="text-sm font-medium text-[var(--ht-text)]">{{ group.title }}</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <HtButton
                v-for="option in group.options"
                :key="option.label"
                :label="option.label"
                size="sm"
                :variant="option.active ? 'primary' : 'outline'"
                @click="option.onClick"
              />
            </div>
          </div>

          <div v-if="section.toggles.length" class="mt-6 flex flex-wrap gap-2">
            <HtButton
              v-for="toggle in section.toggles"
              :key="toggle.label"
              :label="toggle.label"
              size="sm"
              :variant="toggle.active ? 'primary' : 'outline'"
              @click="toggle.onClick"
            />
          </div>

          <div v-if="section.notes.length" class="mt-6 space-y-2">
            <p
              v-for="note in section.notes"
              :key="note.id"
              class="text-xs text-[var(--ht-text-subtle)]"
            >
              {{ note.text }}
            </p>
          </div>

          <div v-if="section.features" class="mt-6 space-y-2">
            <h3 class="text-sm font-medium text-[var(--ht-text)]">Functional columns in this grid</h3>
            <ul class="list-disc list-inside space-y-1 text-xs text-[var(--ht-text-muted)]">
              <li v-for="feature in section.features" :key="feature.token">
                <code class="text-[var(--ht-primary)]">{{ feature.token }}</code>
                {{ feature.description }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="grid gap-6 sm:grid-cols-2">
        <div class="rounded-lg border border-[var(--ht-border)] p-6">
          <h2 class="mb-4 text-lg font-medium">Hello World</h2>
          <HelloWorld msg="Vite + Vue" />
        </div>

        <div class="rounded-lg border border-[var(--ht-border)] p-6">
          <h2 class="mb-4 text-lg font-medium">HtButton Variants</h2>
          <div class="flex flex-wrap items-center gap-3">
            <HtButton label="Primary" />
            <HtButton label="Secondary" variant="secondary" />
            <HtButton label="Outline" variant="outline" />
            <HtButton label="Ghost" variant="ghost" />
            <HtButton label="Danger" variant="destructive" />
          </div>
          <h3 class="mt-6 mb-2 text-sm font-medium text-[var(--ht-text-muted)]">Sizes</h3>
          <div class="flex flex-wrap items-center gap-3">
            <HtButton label="Small" size="sm" />
            <HtButton label="Medium" size="md" />
            <HtButton label="Large" size="lg" />
            <HtButton label="Block" size="lg" block />
          </div>
        </div>
      </section>
    </main>

    <footer class="mx-auto max-w-5xl px-6 py-10 text-sm text-[var(--ht-text-subtle)]">
      <p>© 2025 Happy Table. Built with Vue 3 + Vite + Tailwind v4.</p>
    </footer>
  </div>
</template>

<style scoped>
/* 现有演示已全部使用 utilities，无需 scoped 样式 */
</style>
