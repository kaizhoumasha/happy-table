# Happy Table 排序配置完整指南

## 目录

- [概述](#概述)
- [快速开始](#快速开始)
- [排序配置层级](#排序配置层级)
- [ColumnDef.sortable 配置](#columndef-sortable-配置)
- [全局排序选项](#全局排序选项)
- [SortOptions 配置详解](#sortoptions-配置详解)
- [单字段排序](#单字段排序)
- [多字段排序](#多字段排序)
- [自然排序算法](#自然排序算法)
- [自定义比较器](#自定义比较器)
- [排序状态管理](#排序状态管理)
- [事件监听](#事件监听)
- [最佳实践](#最佳实践)
- [常见问题](#常见问题)
- [API 参考](#api-参考)

---

## 概述

Happy Table 提供了强大而灵活的排序功能，支持：

- ✅ **单字段排序**：点击列头进行升序/降序/清除排序的三态切换
- ✅ **多字段排序**：Ctrl/Cmd + 点击添加次级排序字段
- ✅ **自然排序**：智能处理嵌入数字的字符串（如 `v1, v2, v10` 而不是 `v1, v10, v2`）
- ✅ **三层配置体系**：字段级、列级、全局级排序选项，灵活优先级控制
- ✅ **字段级定制**：v2.1+ 每个排序字段可独立配置比较选项
- ✅ **自定义比较器**：完全自定义排序逻辑，支持全局/列级/字段级
- ✅ **Locale 支持**：本地化字符串比较
- ✅ **性能优化**：内置缓存机制，支持大数据集高效排序

---

## 快速开始

### 基础排序启用

```typescript
import { DataGrid } from 'happy-table'

// 启用列排序
const columns: ColumnDef[] = [
  { id: 'name', field: 'name', title: '姓名', sortable: true },
  { id: 'age', field: 'age', title: '年龄', sortable: true },
  { id: 'email', field: 'email', title: '邮箱', sortable: false } // 禁用排序
]

// 创建表格
const gridAPI = useGridState({}, [sortingPlugin])
gridAPI.setColumns(columns)
gridAPI.setData(data)
```

### 用户交互

- **点击排序图标**：在 升序 → 降序 → 清除 之间循环（三态切换）
- **Ctrl/Cmd + 点击排序图标**：添加为次级排序字段
- **拖拽优先级图标**：调整多字段排序优先级（如果启用）

> **注意**：为了防止误触，只有点击排序图标才会触发排序，点击列头其他区域不会触发排序。

---

## 排序配置层级

Happy Table 的排序配置遵循以下优先级：

```
字段级 SortOptions > 列级 SortOptions > 全局 SortOptions > 插件默认值
```

### 配置层级示例

```typescript
// 1. 全局配置（最低优先级）
gridAPI.setSortOptions({
  naturalSort: false,
  locale: 'zh-CN'
})

// 2. 列级配置（中等优先级）
const columns: ColumnDef[] = [
  {
    id: 'version',
    field: 'version',
    title: '版本',
    sortable: {
      naturalSort: true, // 覆盖全局配置
      caseSensitive: false
    }
  }
]

// 3. 字段级配置（最高优先级）
gridAPI.setSortConfig({
  fields: [
    {
      field: 'version',
      direction: 'asc',
      priority: 0,
      naturalSort: true,    // 覆盖列级和全局配置
      caseSensitive: true   // 字段级特殊配置
    }
  ]
})
```

---

## ColumnDef.sortable 配置

`sortable` 属性控制列的排序行为，支持三种配置方式：

### 类型定义

```typescript
interface ColumnDef {
  sortable?: boolean | SortOptions
  // false | undefined = 禁用排序
  // true = 启用默认排序
  // SortOptions = 启用自定义排序
}
```

### 配置方式 1：禁用排序

```typescript
const columns: ColumnDef[] = [
  {
    id: 'id',
    field: 'id',
    title: 'ID',
    sortable: false // 或省略此属性
  }
]
```

### 配置方式 2：启用默认排序

```typescript
const columns: ColumnDef[] = [
  {
    id: 'name',
    field: 'name',
    title: '姓名',
    sortable: true // 使用全局配置或默认排序
  }
]
```

### 配置方式 3：自定义排序选项

```typescript
const columns: ColumnDef[] = [
  {
    id: 'version',
    field: 'version',
    title: '版本号',
    sortable: {
      naturalSort: true,      // 启用自然排序
      caseSensitive: false    // 不区分大小写
    }
  },
  {
    id: 'price',
    field: 'price',
    title: '价格',
    sortable: {
      naturalSort: true       // 智能数值排序
    }
  }
]
```

---

## 全局排序选项

全局排序选项应用于所有未指定列级选项的列。

### 设置全局选项

```typescript
// 方式 1: 通过 API 设置
gridAPI.setSortOptions({
  naturalSort: true,
  caseSensitive: false,
  locale: 'zh-CN'
})

// 方式 2: 在插件创建时设置
const sortingPlugin = createSortingPlugin({
  enableMultiSort: true,
  maxSortFields: 5
})
```

### 获取当前全局选项

```typescript
const currentOptions = gridAPI.getSortOptions()
console.log(currentOptions)
// { naturalSort: true, caseSensitive: false, locale: 'zh-CN' }
```

---

## SortOptions 配置详解

`SortOptions` 接口提供了细粒度的排序控制。

### 完整接口定义

```typescript
interface SortOptions {
  // 自然排序（推荐）
  naturalSort?: boolean
  caseSensitive?: boolean

  // Locale 排序
  locale?: string
  sensitivity?: 'accent' | 'base' | 'case' | 'variant'
  caseFirst?: 'upper' | 'lower' | 'false'

  // 高级选项
  nullsFirst?: boolean
  customComparator?: (a: CellValue, b: CellValue) => number
}
```

### 配置项详解

#### 1. `naturalSort` - 自然排序

智能处理嵌入数字的字符串排序。

```typescript
// 启用自然排序
const column: ColumnDef = {
  id: 'filename',
  field: 'filename',
  title: '文件名',
  sortable: {
    naturalSort: true
  }
}

// 数据示例
const data = [
  { filename: 'file1.txt' },
  { filename: 'file10.txt' },
  { filename: 'file2.txt' },
  { filename: 'file20.txt' }
]

// 排序结果（naturalSort: true）
// file1.txt, file2.txt, file10.txt, file20.txt

// 排序结果（naturalSort: false 或未设置）
// file1.txt, file10.txt, file2.txt, file20.txt
```

**适用场景：**
- 版本号：`v1.0.0`, `v1.2.0`, `v1.10.0`
- 文件名：`report1.pdf`, `report2.pdf`, `report10.pdf`
- 编号：`项目1`, `项目2`, `项目10`
- 混合格式：`2024-01-file1`, `2024-01-file10`

#### 2. `caseSensitive` - 大小写敏感

控制字符串比较是否区分大小写（配合 `naturalSort` 使用）。

```typescript
const column: ColumnDef = {
  id: 'code',
  field: 'code',
  title: '代码',
  sortable: {
    naturalSort: true,
    caseSensitive: true // 区分大小写
  }
}

// 数据示例
const data = [
  { code: 'ABC' },
  { code: 'abc' },
  { code: 'Abc' }
]

// caseSensitive: true
// ABC, Abc, abc

// caseSensitive: false（默认）
// abc, Abc, ABC 或 ABC, Abc, abc（取决于实现）
```

#### 3. `locale` - 本地化排序

指定排序所使用的语言和地区规则。

```typescript
const column: ColumnDef = {
  id: 'name',
  field: 'name',
  title: '姓名',
  sortable: {
    locale: 'zh-CN' // 中文排序规则
  }
}

// 常用 locale 值
// 'zh-CN' - 简体中文
// 'zh-TW' - 繁体中文
// 'en-US' - 美国英语
// 'ja-JP' - 日语
// 'ko-KR' - 韩语
// 'de-DE' - 德语
// 'fr-FR' - 法语
```

**中文排序示例：**

```typescript
const data = [
  { name: '张三' },
  { name: '李四' },
  { name: '王五' },
  { name: '阿明' }
]

// locale: 'zh-CN' (拼音排序)
// 阿明, 李四, 王五, 张三
```

#### 4. `sensitivity` - 比较敏感度

控制字符串比较时的敏感程度。

```typescript
const column: ColumnDef = {
  id: 'word',
  field: 'word',
  title: '单词',
  sortable: {
    locale: 'en-US',
    sensitivity: 'base' // 忽略大小写和重音
  }
}

// sensitivity 选项说明：
// 'base' - 仅比较基本字符（忽略大小写和重音）
//   'a' === 'A' === 'á' === 'Á'
// 'accent' - 区分重音，忽略大小写
//   'a' === 'A', 'a' !== 'á'
// 'case' - 区分大小写，忽略重音
//   'a' !== 'A', 'a' === 'á'
// 'variant' - 区分所有（大小写 + 重音）
//   'a' !== 'A' !== 'á' !== 'Á'
```

#### 5. `caseFirst` - 大小写优先级

控制大写字母或小写字母在排序中的优先级。

```typescript
const column: ColumnDef = {
  id: 'name',
  field: 'name',
  title: '名称',
  sortable: {
    locale: 'en-US',
    caseFirst: 'upper' // 大写字母优先
  }
}

// caseFirst 选项：
// 'upper' - 大写字母排在前面：A, B, a, b
// 'lower' - 小写字母排在前面：a, b, A, B
// 'false' - 使用 locale 默认规则
```

---

## 单字段排序

### 基本用法

```typescript
// 通过 API 设置排序
gridAPI.sortByColumn('name', 'asc') // 升序
gridAPI.sortByColumn('name', 'desc') // 降序

// 三态循环（无 → 升序 → 降序 → 无）
gridAPI.sortByColumn('name') // 首次点击：升序
gridAPI.sortByColumn('name') // 再次点击：降序
gridAPI.sortByColumn('name') // 第三次点击：清除排序
```

### 获取当前排序

```typescript
const sortConfig = gridAPI.getSortConfig()
console.log(sortConfig)
// 单字段格式：{ field: 'name', direction: 'asc' }
// 多字段格式：{ fields: [{ field: 'name', direction: 'asc', priority: 0 }] }
```

### 清除排序

```typescript
gridAPI.clearSort()
```

---

## 多字段排序

多字段排序允许用户按多个列依次排序，类似 Excel 的排序功能。

### 启用多字段排序

```typescript
// 创建插件时启用（默认已启用）
const sortingPlugin = createSortingPlugin({
  enableMultiSort: true,
  maxSortFields: 5 // 最多 5 个排序字段
})
```

### 用户交互

1. **点击排序图标**：设置为主排序字段（清除其他字段）
2. **Ctrl/Cmd + 点击排序图标**：添加为次级排序字段
3. **再次点击**：切换该字段的排序方向
4. **第三次点击**：移除该排序字段

### 通过 API 管理

```typescript
// 添加排序字段
gridAPI.addSortField('name', 'asc')
gridAPI.addSortField('age', 'desc')
gridAPI.addSortField('city', 'asc')

// 移除排序字段
gridAPI.removeSortField('age')

// 更改字段优先级（0 = 最高优先级）
gridAPI.changeSortPriority('city', 0) // city 成为主排序字段

// 获取多字段排序配置
const multiSortConfig = gridAPI.getMultiSortConfig()
console.log(multiSortConfig)
// {
//   fields: [
//     { field: 'city', direction: 'asc', priority: 0 },
//     { field: 'name', direction: 'asc', priority: 1 }
//   ]
// }
```

### 多字段排序示例

```typescript
// 数据
const employees = [
  { department: 'Sales', name: 'Alice', salary: 50000 },
  { department: 'Sales', name: 'Bob', salary: 60000 },
  { department: 'IT', name: 'Charlie', salary: 70000 },
  { department: 'IT', name: 'David', salary: 70000 }
]

// 排序配置：先按部门升序，再按薪资降序，最后按姓名升序
gridAPI.setSortConfig({
  fields: [
    { field: 'department', direction: 'asc', priority: 0 },
    { field: 'salary', direction: 'desc', priority: 1 },
    { field: 'name', direction: 'asc', priority: 2 }
  ]
})

// 排序结果：
// 1. IT, David, 70000
// 2. IT, Charlie, 70000
// 3. Sales, Bob, 60000
// 4. Sales, Alice, 50000
```

### 字段级选项示例（v2.1+）

从 v2.1 开始，每个排序字段都可以指定独立的比较选项：

```typescript
// 电商产品排序：类别(本地化) → 价格(数值) → 名称(自然排序)
gridAPI.setSortConfig({
  fields: [
    {
      field: 'category',
      direction: 'asc',
      priority: 0,
      locale: 'zh-CN',        // 字段级：中文排序
      sensitivity: 'base'
    },
    {
      field: 'price',
      direction: 'desc',
      priority: 1
      // 使用默认数值比较
    },
    {
      field: 'name',
      direction: 'asc',
      priority: 2,
      naturalSort: true,      // 字段级：自然排序
      caseSensitive: false
    }
  ]
})

// 日志文件排序：时间戳 → 级别(自定义) → 消息(自然)
gridAPI.setSortConfig({
  fields: [
    {
      field: 'timestamp',
      direction: 'desc',
      priority: 0
    },
    {
      field: 'level',
      direction: 'asc',
      priority: 1,
      customComparator: (a, b) => {  // 字段级：自定义比较器
        const order = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 }
        return order[a as string] - order[b as string]
      }
    },
    {
      field: 'message',
      direction: 'asc',
      priority: 2,
      naturalSort: true              // 字段级：自然排序
    }
  ]
})
```

---

## 自然排序算法

自然排序是 Happy Table 的核心特性，智能处理包含数字的字符串。

### 算法原理

自然排序算法将字符串分解为文本和数字块，然后分别比较：

```typescript
// 输入：'file10name5'
// 分块结果：['file', 10, 'name', 5]

// 比较逻辑：
// 1. 文本块：按字典序比较
// 2. 数字块：按数值大小比较
// 3. 混合块：数字 < 文本
```

### 支持的格式

#### 1. 版本号

```typescript
const versions = [
  'v1.0.0',
  'v1.2.0',
  'v1.10.0',
  'v1.2.10',
  'v2.0.0'
]

// 自然排序结果：
// v1.0.0, v1.2.0, v1.2.10, v1.10.0, v2.0.0
```

#### 2. 文件名

```typescript
const files = [
  'report1.pdf',
  'report2.pdf',
  'report10.pdf',
  'report20.pdf',
  'report100.pdf'
]

// 自然排序结果：
// report1.pdf, report2.pdf, report10.pdf, report20.pdf, report100.pdf
```

#### 3. 多段数字

```typescript
const codes = [
  'A1B2',
  'A1B10',
  'A2B1',
  'A10B1'
]

// 自然排序结果：
// A1B2, A1B10, A2B1, A10B1
```

#### 4. 混合格式

```typescript
const items = [
  '2024-Q1-Report1',
  '2024-Q1-Report10',
  '2024-Q2-Report1',
  '2023-Q4-Report5'
]

// 自然排序结果：
// 2023-Q4-Report5, 2024-Q1-Report1, 2024-Q1-Report10, 2024-Q2-Report1
```

### 性能特点

- **时间复杂度**: O(n * m * log(n))
  - n = 数据行数
  - m = 平均字符串长度
- **空间复杂度**: O(n * k)
  - k = 平均分块数量
- **优化**: 内置缓存机制，避免重复分块

---

## 自定义比较器

对于复杂的排序需求，可以提供自定义比较器函数。从 v2.1 开始，`customComparator` 作为 `SortOptions` 的一部分，可以在全局、列级和字段级使用。

### 在字段级使用（推荐）

```typescript
gridAPI.setSortConfig({
  fields: [
    {
      field: 'status',
      direction: 'asc',
      priority: 0,
      customComparator: (a, b) => {
        // 自定义状态排序：active > pending > inactive
        const statusOrder = { active: 1, pending: 2, inactive: 3 }
        return statusOrder[a as string] - statusOrder[b as string]
      }
    }
  ]
})
```

### 在列级使用

```typescript
const columns: ColumnDef[] = [
  {
    id: 'priority',
    field: 'priority',
    title: '优先级',
    sortable: {
      customComparator: (a, b) => {
        const order = { urgent: 1, high: 2, medium: 3, low: 4, none: 5 }
        return (order[a as string] || 999) - (order[b as string] || 999)
      }
    }
  }
]
```

### 在全局使用

```typescript
// 全局自定义比较器（通常不推荐，因为不同字段需要不同逻辑）
gridAPI.setSortOptions({
  customComparator: (a, b) => {
    // 全局默认比较逻辑
    return String(a).localeCompare(String(b))
  }
})
```

### 复杂比较器示例

#### 1. 自定义枚举排序

```typescript
const priorityComparator = (a: CellValue, b: CellValue) => {
  const order: Record<string, number> = {
    urgent: 1,
    high: 2,
    medium: 3,
    low: 4,
    none: 5
  }

  const aVal = order[String(a)] || 999
  const bVal = order[String(b)] || 999

  return aVal - bVal
}

// 使用
gridAPI.setSortConfig({
  fields: [{
    field: 'priority',
    direction: 'asc',
    priority: 0,
    customComparator: priorityComparator
  }]
})
```

#### 2. 日期字符串排序

```typescript
const dateComparator = (a: CellValue, b: CellValue) => {
  const dateA = new Date(String(a)).getTime()
  const dateB = new Date(String(b)).getTime()

  if (isNaN(dateA)) return 1  // 无效日期排后面
  if (isNaN(dateB)) return -1

  return dateA - dateB
}
```

#### 3. 中文拼音排序

```typescript
const pinyinComparator = (a: CellValue, b: CellValue) => {
  return String(a).localeCompare(String(b), 'zh-CN', {
    sensitivity: 'base'
  })
}
```

---

## 排序状态管理

### 导出排序状态

```typescript
// 导出当前排序配置
const sortState = gridAPI.exportSortState()
console.log(sortState)
// {
//   sortConfig: { fields: [...] },
//   globalOptions: { naturalSort: true },
//   version: '2.1.0'
// }

// 保存到本地存储
localStorage.setItem('gridSortState', JSON.stringify(sortState))
```

### 导入排序状态

```typescript
// 从本地存储恢复
const savedState = JSON.parse(localStorage.getItem('gridSortState') || '{}')

// 导入排序配置
gridAPI.importSortState(savedState)

// 自动应用排序
```

### 状态持久化完整示例

```typescript
// 组件挂载时恢复状态
onMounted(() => {
  const savedState = localStorage.getItem('myGridSortState')
  if (savedState) {
    try {
      const state = JSON.parse(savedState)
      gridAPI.importSortState(state)
    } catch (error) {
      console.error('Failed to restore sort state:', error)
    }
  }
})

// 监听排序变化并保存
gridAPI.on('multi-sort-change', (config) => {
  const state = gridAPI.exportSortState()
  localStorage.setItem('myGridSortState', JSON.stringify(state))
})

// 组件卸载时清理
onUnmounted(() => {
  // 可选：清除状态
  // localStorage.removeItem('myGridSortState')
})
```

---

## 事件监听

Happy Table 提供了丰富的排序相关事件。

### 核心排序事件

#### 1. `multi-sort-change` - 排序配置变化

```typescript
gridAPI.on('multi-sort-change', (config: MultiSortConfig) => {
  console.log('排序已变化:', config)
  // { field: 'name', direction: 'asc' }
})
```

#### 2. `multi-sort-change` - 多字段排序变化

```typescript
gridAPI.on('multi-sort-change', (config: MultiSortConfig) => {
  console.log('多字段排序已变化:', config)
  // {
  //   fields: [
  //     { field: 'name', direction: 'asc', priority: 0 },
  //     { field: 'age', direction: 'desc', priority: 1 }
  //   ]
  // }
})
```

#### 3. `sort-field-added` - 添加排序字段

```typescript
gridAPI.on('sort-field-added', ({ field, sortConfig }) => {
  console.log('已添加排序字段:', field)
})
```

#### 4. `sort-field-removed` - 移除排序字段

```typescript
gridAPI.on('sort-field-removed', ({ field, sortConfig }) => {
  console.log('已移除排序字段:', field)
})
```

#### 5. `sort-priority-changed` - 优先级变化

```typescript
gridAPI.on('sort-priority-changed', ({ field, oldPriority, newPriority }) => {
  console.log(`字段 ${field} 优先级: ${oldPriority} -> ${newPriority}`)
})
```

### 数据处理事件

```typescript
// 数据刷新请求
gridAPI.on('data-refresh-requested', ({ source }) => {
  console.log('数据刷新请求来源:', source)
})

// 数据管道完成
gridAPI.on('data-pipeline-complete', (processedData) => {
  console.log('数据处理完成，行数:', processedData.length)
})
```

### 事件监听完整示例

```typescript
// 创建综合的排序监控
const setupSortMonitoring = (gridAPI: GridAPI) => {
  // 监听所有排序变化
  gridAPI.on('multi-sort-change', (config) => {
    // 更新 UI 指示器
    updateSortIndicator(config)

    // 记录用户操作
    analytics.track('grid_sort_changed', {
      field: config.field,
      direction: config.direction
    })
  })

  // 监听多字段排序
  gridAPI.on('multi-sort-change', (config) => {
    // 显示当前排序字段数量
    showSortBadge(config.fields.length)
  })

  // 监听数据处理完成
  gridAPI.on('data-pipeline-complete', (data) => {
    // 更新性能指标
    updatePerformanceMetrics({
      rowCount: data.length,
      timestamp: Date.now()
    })
  })
}
```

---

## 最佳实践

### 1. 性能优化

#### 大数据集排序

```typescript
// 对于超大数据集（10万+ 行），考虑：
// 1. 启用虚拟化
const config = {
  virtualizationThreshold: 1000,
  enableVirtualization: true
}

// 2. 使用简单比较器
const columns: ColumnDef[] = [
  {
    id: 'id',
    field: 'id',
    title: 'ID',
    sortable: true // 数值排序，性能最佳
  },
  {
    id: 'name',
    field: 'name',
    title: '姓名',
    sortable: {
      // 避免在大数据集上使用复杂的 locale 比较
      naturalSort: true
    }
  }
]

// 3. 限制多字段排序数量
const sortingPlugin = createSortingPlugin({
  maxSortFields: 3 // 限制为 3 个字段
})
```

#### 防抖排序触发

```typescript
// 如果有外部触发排序的需求，添加防抖
import { debounce } from 'lodash-es'

const debouncedSort = debounce((field: string, direction: 'asc' | 'desc') => {
  gridAPI.sortByColumn(field, direction)
}, 300)
```

### 2. 用户体验

#### 视觉反馈

```typescript
// 监听排序状态，提供视觉反馈
gridAPI.on('multi-sort-change', (config) => {
  // 显示加载指示器（如果数据量大）
  if (gridAPI.getData().length > 10000) {
    showLoadingOverlay('正在排序...')

    // 在下一帧完成后隐藏
    requestAnimationFrame(() => {
      hideLoadingOverlay()
    })
  }
})
```

#### 排序提示

```typescript
// 为用户提供多字段排序提示
const showSortHint = () => {
  toast.info('提示：按住 Ctrl/Cmd 点击列头可添加次级排序')
}

// 首次使用时显示
if (!localStorage.getItem('sortHintShown')) {
  showSortHint()
  localStorage.setItem('sortHintShown', 'true')
}
```

### 3. 数据类型最佳实践

#### 版本号排序

```typescript
const columns: ColumnDef[] = [
  {
    id: 'version',
    field: 'version',
    title: '版本',
    sortable: {
      naturalSort: true, // 完美处理 v1.0.0, v1.10.0
      caseSensitive: false
    }
  }
]
```

#### 货币金额排序

```typescript
// 方式 1: 数值字段（推荐）
const columns: ColumnDef[] = [
  {
    id: 'price',
    field: 'price',
    title: '价格',
    type: 'number',
    sortable: true,
    formatter: (value) => `¥${Number(value).toFixed(2)}`
  }
]

// 方式 2: 字符串字段
const columns: ColumnDef[] = [
  {
    id: 'priceStr',
    field: 'priceStr',
    title: '价格',
    sortable: {
      customComparator: (a, b) => {
        // 从 "¥1,234.56" 提取数值
        const numA = parseFloat(String(a).replace(/[¥,]/g, ''))
        const numB = parseFloat(String(b).replace(/[¥,]/g, ''))
        return numA - numB
      }
    }
  }
]
```

#### 日期排序

```typescript
// 方式 1: Date 对象（推荐）
const columns: ColumnDef[] = [
  {
    id: 'createdAt',
    field: 'createdAt',
    title: '创建时间',
    type: 'date',
    sortable: true
  }
]

// 方式 2: ISO 字符串
const columns: ColumnDef[] = [
  {
    id: 'updatedAt',
    field: 'updatedAt',
    title: '更新时间',
    sortable: true, // 自动字典序排序，ISO 格式天然有序
    formatter: (value) => new Date(value).toLocaleString()
  }
]

// 方式 3: 自定义格式
const columns: ColumnDef[] = [
  {
    id: 'date',
    field: 'date',
    title: '日期',
    sortable: {
      customComparator: (a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      }
    }
  }
]
```

### 4. 错误处理

```typescript
// 处理无效的排序字段
gridAPI.on('multi-sort-change', (config) => {
  const first = config.fields?.[0]
  const column = first ? columns.find(col => col.field === first.field) : undefined

  if (!column) {
    console.warn(`排序字段不存在`)
    gridAPI.clearSort()
    return
  }

  if (!column.sortable) {
    console.warn(`字段不支持排序`)
    gridAPI.clearSort()
    return
  }
})
```

---

## 常见问题

### Q1: 排序后数据没有更新？

**A:** 检查以下几点：

1. 确认排序插件已正确加载
2. 检查 `data-pipeline-complete` 事件是否触发
3. 验证渲染器是否正确更新

```typescript
// 调试代码
gridAPI.on('data-pipeline-complete', (data) => {
  console.log('排序后数据行数:', data.length)
})

gridAPI.on('multi-sort-change', (config) => {
  console.log('排序配置已更新:', config)
})
```

### Q2: 如何禁用某些列的排序？

**A:** 设置 `sortable: false` 或省略该属性：

```typescript
const columns: ColumnDef[] = [
  { id: 'id', field: 'id', title: 'ID', sortable: false },
  { id: 'name', field: 'name', title: '姓名', sortable: true }
]
```

### Q3: 多字段排序不生效？

**A:** 确认插件启用了多字段排序：

```typescript
const sortingPlugin = createSortingPlugin({
  enableMultiSort: true // 确保为 true
})
```

### Q4: 自然排序无法识别数字？

**A:** 确保启用了 `naturalSort` 选项：

```typescript
// 全局启用
gridAPI.setSortOptions({ naturalSort: true })

// 或列级启用
const column: ColumnDef = {
  id: 'version',
  field: 'version',
  title: '版本',
  sortable: { naturalSort: true }
}
```

### Q5: 如何实现默认排序？

**A:** 在数据加载后设置初始排序：

```typescript
// 设置数据
gridAPI.setData(data)

// 设置默认排序
gridAPI.sortByColumn('createdAt', 'desc')
```

### Q6: 排序性能慢怎么办？

**A:** 优化策略：

```typescript
// 1. 使用简单的排序选项
gridAPI.setSortOptions({
  naturalSort: false,
  locale: undefined
})

// 2. 限制多字段数量
const sortingPlugin = createSortingPlugin({
  maxSortFields: 2
})

// 3. 对于超大数据集，考虑服务端排序
```

### Q7: 如何保存用户的排序偏好？

**A:** 使用状态持久化：

```typescript
// 保存
gridAPI.on('multi-sort-change', () => {
  const state = gridAPI.exportSortState()
  localStorage.setItem('sortPreference', JSON.stringify(state))
})

// 恢复
const savedState = localStorage.getItem('sortPreference')
if (savedState) {
  gridAPI.importSortState(JSON.parse(savedState))
}
```

---

## API 参考

### GridAPI 排序方法

#### `sortByColumn(field: string, direction?: 'asc' | 'desc'): void`

设置单字段排序，替换现有排序。

**参数：**
- `field`: 要排序的字段名
- `direction`: 排序方向（可选，省略则三态循环）

**示例：**
```typescript
gridAPI.sortByColumn('name', 'asc')
gridAPI.sortByColumn('name') // 三态循环
```

---

#### `addSortField(field: string, direction?: 'asc' | 'desc'): void`

添加次级排序字段（多字段排序）。

**参数：**
- `field`: 要排序的字段名
- `direction`: 排序方向（默认 'asc'）

**示例：**
```typescript
gridAPI.addSortField('department', 'asc')
gridAPI.addSortField('salary', 'desc')
```

---

#### `removeSortField(field: string): void`

移除指定的排序字段。

**参数：**
- `field`: 要移除的字段名

**示例：**
```typescript
gridAPI.removeSortField('age')
```

---

#### `changeSortPriority(field: string, newPriority: number): void`

更改排序字段的优先级。

**参数：**
- `field`: 字段名
- `newPriority`: 新的优先级（0 = 最高）

**示例：**
```typescript
gridAPI.changeSortPriority('name', 0) // 设为主排序字段
```

---

#### `setSortConfig(config: SortConfig | MultiSortConfig | null): void`

直接设置完整的排序配置。

**参数：**
- `config`: 排序配置对象，`null` 清除排序

**示例：**
```typescript
// 单字段
gridAPI.setSortConfig({
  field: 'name',
  direction: 'asc'
})

// 多字段
gridAPI.setSortConfig({
  fields: [
    { field: 'department', direction: 'asc', priority: 0 },
    { field: 'name', direction: 'asc', priority: 1 }
  ]
})

// 清除
gridAPI.setSortConfig(null)
```

---

#### `getSortConfig(): SortConfig | MultiSortConfig | null`

获取当前排序配置。

**返回：**
- 当前排序配置对象

**示例：**
```typescript
const config = gridAPI.getSortConfig()
```

---

#### `getMultiSortConfig(): MultiSortConfig | null`

获取多字段排序配置（始终返回多字段格式）。

**返回：**
- 多字段排序配置

**示例：**
```typescript
const config = gridAPI.getMultiSortConfig()
if (config) {
  console.log('排序字段数:', config.fields.length)
}
```

---

#### `clearSort(): void`

清除所有排序。

**示例：**
```typescript
gridAPI.clearSort()
```

---

#### `setSortOptions(options: SortOptions): void`

设置全局排序选项。

**参数：**
- `options`: 排序选项对象

**示例：**
```typescript
gridAPI.setSortOptions({
  naturalSort: true,
  caseSensitive: false,
  locale: 'zh-CN'
})
```

---

#### `getSortOptions(): SortOptions`

获取当前全局排序选项。

**返回：**
- 全局排序选项对象

**示例：**
```typescript
const options = gridAPI.getSortOptions()
```

---

#### `exportSortState(): object`

导出完整排序状态（用于持久化）。

**返回：**
```typescript
{
  sortConfig: SortConfig | MultiSortConfig | null
  globalOptions: SortOptions
  version: string
}
```

**示例：**
```typescript
const state = gridAPI.exportSortState()
localStorage.setItem('sortState', JSON.stringify(state))
```

---

#### `importSortState(state: object): void`

导入排序状态（从持久化恢复）。

**参数：**
- `state`: 之前导出的状态对象

**示例：**
```typescript
const state = JSON.parse(localStorage.getItem('sortState'))
gridAPI.importSortState(state)
```

---

### 类型定义

#### `SortOptions`

```typescript
interface SortOptions {
  // 比较算法
  naturalSort?: boolean
  caseSensitive?: boolean
  locale?: string
  sensitivity?: 'accent' | 'base' | 'case' | 'variant'
  caseFirst?: 'upper' | 'lower' | 'false'

  // 比较行为（v2.1+）
  nullsFirst?: boolean
  customComparator?: (a: CellValue, b: CellValue) => number
}
```

#### `SortConfig`

```typescript
interface SortConfig {
  field: string
  direction: 'asc' | 'desc'
}
```

#### `SortField`

```typescript
// v2.1+: SortField 继承 SortOptions，支持字段级比较选项
interface SortField extends SortOptions {
  field: string
  direction: 'asc' | 'desc'
  priority: number
}
```

#### `MultiSortConfig`

```typescript
interface MultiSortConfig {
  fields: SortField[]
  options?: {
    maxSortFields?: number
    allowDuplicateFields?: boolean
  }
}
```

---

## 总结

Happy Table 的排序系统提供了：

- 🎯 **灵活的配置**：从简单的布尔值到细粒度的选项对象
- 🚀 **强大的功能**：单字段、多字段、自然排序、自定义比较器
- 💪 **优秀的性能**：内置缓存、智能优化、支持大数据集
- 🎨 **良好的体验**：直观的交互、完整的事件系统、状态持久化
- 📚 **完整的 API**：覆盖所有使用场景

遵循本手册的指引，您可以轻松实现从简单到复杂的各种排序需求。

---

**版本**: 2.1.0
**更新日期**: 2025-01-10
**文档维护**: Happy Table Team
