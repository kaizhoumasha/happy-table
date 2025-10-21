/**
 * Demo Data Generators for Large Column Scenarios
 *
 * Provides realistic test data for validating horizontal virtualization
 * performance with various data types and sizes.
 */

import type { ColumnDef, RowData, CellValue, DragResult } from '../lib/types'

// ===================================================================
// COLUMN DATA GENERATORS
// ===================================================================

export type ColumnType = 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'datetime' | 'time' | 'interval' | 'boolean' | 'select' | 'enum' | 'multiline' | 'json' | 'custom'

export interface ColumnGeneratorConfig {
  type: ColumnType
  width?: number
  minWidth?: number
  maxWidth?: number
  nullable?: boolean
  sortable?: boolean
  filterable?: boolean
  resizable?: boolean
}

/**
 * Generate realistic column definitions for various business scenarios
 */
export class ColumnGenerator {
  private static businessTerms = [
    'Revenue', 'Profit', 'Sales', 'Orders', 'Customers', 'Products', 'Inventory',
    'Marketing', 'Campaign', 'Conversion', 'Retention', 'Acquisition', 'Engagement',
    'Performance', 'Quality', 'Efficiency', 'Productivity', 'Cost', 'Budget',
    'Forecast', 'Target', 'Actual', 'Variance', 'Growth', 'Trend', 'Analysis'
  ]

  private static departments = [
    'Sales', 'Marketing', 'Finance', 'Operations', 'HR', 'IT', 'Engineering',
    'Product', 'Customer Success', 'Legal', 'Procurement', 'Logistics'
  ]

  private static metrics = [
    'Rate', 'Count', 'Total', 'Average', 'Median', 'Maximum', 'Minimum',
    'Percentage', 'Ratio', 'Index', 'Score', 'Ranking', 'Volume', 'Value'
  ]

  static generateBusinessColumns(count: number, options?: { leftPinned?: number; rightPinned?: number }): ColumnDef[] {
    const columns: ColumnDef[] = [
      {
        id: 'id',
        field: 'id',
        title: 'ID',
        width: 100,
        sortable: { naturalSort: true }, // Use built-in natural sort (supports Intl.Collator with numeric: true)
        visible: true
      }
    ]
    const leftPinned = options?.leftPinned || 0
    const rightPinned = options?.rightPinned || 0

    for (let i = 0; i < count; i++) {
      const term = this.businessTerms[i % this.businessTerms.length]
      const department = this.departments[Math.floor(i / this.businessTerms.length) % this.departments.length]
      const metric = this.metrics[i % this.metrics.length]

      const columnType = this.getColumnTypeForIndex(i)
      const config = this.getColumnConfig(columnType, i)

      // Determine pinned status
      let pinned: 'left' | 'right' | undefined
      if (i < leftPinned) {
        pinned = 'left'
      } else if (i >= count - rightPinned) {
        pinned = 'right'
      }

      columns.push({
        id: `col_${i}`,
        field: `field_${i}`,
        title: `${department} ${term} ${metric} [${this.formatDataType(columnType)}]`,
        dataType: columnType,
        width: config.width,
        sortable: { naturalSort: true },
        filterable: config.filterable,
        resizable: config.resizable,
        pinned,
      })
    }

    return columns
  }

  static generateFinancialColumns(quarters: number = 8, metrics: number = 20): ColumnDef[] {
    const columns: ColumnDef[] = []
    // let colIndex = 0

    const financialMetrics = [
      'Revenue', 'Cost of Goods Sold', 'Gross Profit', 'Operating Expenses',
      'EBITDA', 'Net Income', 'Cash Flow', 'Accounts Receivable',
      'Accounts Payable', 'Inventory', 'Working Capital', 'ROI',
      'ROE', 'Current Ratio', 'Debt-to-Equity', 'Asset Turnover',
      'Profit Margin', 'Operating Margin', 'Quick Ratio', 'Book Value'
    ]

    for (let q = 0; q < quarters; q++) {
      const year = 2020 + Math.floor(q / 4)
      const quarter = (q % 4) + 1

      for (let m = 0; m < Math.min(metrics, financialMetrics.length); m++) {
        const metric = financialMetrics[m]
        if (!metric) continue

        columns.push({
          id: `q${year}q${quarter}_${metric.toLowerCase().replace(/\s+/g, '_')}`,
          field: `q${year}q${quarter}_${metric.toLowerCase().replace(/\s+/g, '_')}`,
          title: `${metric} (${year} Q${quarter})`,
          dataType: metric.includes('Ratio') || metric.includes('Margin') ? 'percentage' : 'currency',
          width: 150,
          sortable: true,
          filterable: true,
          resizable: true,
        })

        // colIndex++
      }
    }

    return columns
  }

  static generateTimeSeriesColumns(
    startDate: Date,
    endDate: Date,
    interval: 'daily' | 'weekly' | 'monthly' = 'daily',
    metrics: string[] = ['Value', 'Volume', 'High', 'Low', 'Open', 'Close']
  ): ColumnDef[] {
    const columns: ColumnDef[] = []
    const current = new Date(startDate)

    while (current <= endDate) {
      const dateStr = current.toISOString().split('T')[0]

      metrics.forEach((metric, index) => {
        columns.push({
          id: `${dateStr}_${metric.toLowerCase()}`,
          field: `${dateStr}_${metric.toLowerCase()}`,
          title: `${metric} (${dateStr})`,
          dataType: index === 1 ? 'number' : 'currency', // Volume is number, others are currency
          width: 120,
          sortable: true,
          filterable: true,
          resizable: true,
        })
      })

      // Increment date based on interval
      switch (interval) {
        case 'daily':
          current.setDate(current.getDate() + 1)
          break
        case 'weekly':
          current.setDate(current.getDate() + 7)
          break
        case 'monthly':
          current.setMonth(current.getMonth() + 1)
          break
      }
    }

    return columns
  }

  static generateProductCatalogColumns(): ColumnDef[] {
    return [
      { id: 'sku', field: 'sku', title: 'SKU', dataType: 'text', width: 120, sortable: true, filterable: true, pinned: 'left' },
      { id: 'name', field: 'name', title: 'Product Name', dataType: 'text', width: 250, sortable: true, filterable: true, pinned: 'left' },
      { id: 'category', field: 'category', title: 'Category', dataType: 'enum', width: 150, sortable: true, filterable: true },
      { id: 'brand', field: 'brand', title: 'Brand', dataType: 'text', width: 120, sortable: true, filterable: true },
      { id: 'cost', field: 'cost', title: 'Cost', dataType: 'currency', width: 100, sortable: true, filterable: true },
      { id: 'price', field: 'price', title: 'Price', dataType: 'currency', width: 100, sortable: true, filterable: true },
      { id: 'margin', field: 'margin', title: 'Margin %', dataType: 'percentage', width: 100, sortable: true, filterable: true },
      { id: 'stock', field: 'stock', title: 'Stock', dataType: 'number', width: 80, sortable: true, filterable: true },
      { id: 'reserved', field: 'reserved', title: 'Reserved', dataType: 'number', width: 80, sortable: true, filterable: true },
      { id: 'available', field: 'available', title: 'Available', dataType: 'number', width: 80, sortable: true, filterable: true },
      { id: 'reorder_level', field: 'reorder_level', title: 'Reorder Level', dataType: 'number', width: 120, sortable: true, filterable: true },
      { id: 'supplier', field: 'supplier', title: 'Supplier', dataType: 'text', width: 150, sortable: true, filterable: true },
      { id: 'last_ordered', field: 'last_ordered', title: 'Last Ordered', dataType: 'date', width: 120, sortable: true, filterable: true },
      { id: 'next_delivery', field: 'next_delivery', title: 'Next Delivery', dataType: 'date', width: 120, sortable: true, filterable: true },
      { id: 'active', field: 'active', title: 'Active', dataType: 'boolean', width: 80, sortable: true, filterable: true },
      { id: 'weight', field: 'weight', title: 'Weight (kg)', dataType: 'number', width: 100, sortable: true, filterable: true },
      { id: 'dimensions', field: 'dimensions', title: 'Dimensions', dataType: 'text', width: 120, sortable: true, filterable: true },
      { id: 'description', field: 'description', title: 'Description', dataType: 'multiline', width: 300, sortable: false, filterable: true },
      { id: 'tags', field: 'tags', title: 'Tags', dataType: 'text', width: 200, sortable: false, filterable: true },
      { id: 'rating', field: 'rating', title: 'Rating', dataType: 'number', width: 80, sortable: true, filterable: true },
      { id: 'reviews', field: 'reviews', title: 'Reviews', dataType: 'number', width: 80, sortable: true, filterable: true },
      { id: 'created_at', field: 'created_at', title: 'Created', dataType: 'datetime', width: 150, sortable: true, filterable: true },
      { id: 'updated_at', field: 'updated_at', title: 'Updated', dataType: 'datetime', width: 150, sortable: true, filterable: true },
    ]
  }

  static formatDataType(type: ColumnType): string {
    const typeLabels: Record<ColumnType, string> = {
      text: 'Text',
      number: 'Number',
      currency: 'Currency',
      percentage: 'Percentage',
      date: 'Date',
      datetime: 'DateTime',
      time: 'Time',
      interval: 'Interval',
      boolean: 'Boolean',
      select: 'Select',
      enum: 'Enum',
      multiline: 'MultiLine',
      json: 'JSON',
      custom: 'Custom',
    }
    return typeLabels[type] || type
  }

  private static getColumnTypeForIndex(index: number): ColumnType {
    const types: ColumnType[] = ['text', 'number', 'currency', 'percentage', 'date', 'datetime', 'time', 'interval', 'boolean', 'select', 'enum', 'multiline', 'json', 'custom']
    return types[index % types.length] || 'text' // Fallback to text
  }

  private static getColumnConfig(type: ColumnType, _index: number): ColumnGeneratorConfig {
    const configs: Record<ColumnType, ColumnGeneratorConfig> = {
      text: { type, width: 150, sortable: true, filterable: true, resizable: true },
      number: { type, width: 100, sortable: true, filterable: true, resizable: true },
      currency: { type, width: 120, sortable: true, filterable: true, resizable: true },
      percentage: { type, width: 100, sortable: true, filterable: true, resizable: true },
      date: { type, width: 120, sortable: true, filterable: true, resizable: true },
      datetime: { type, width: 150, sortable: true, filterable: true, resizable: true },
      time: { type, width: 100, sortable: true, filterable: true, resizable: true },
      interval: { type, width: 120, sortable: true, filterable: true, resizable: true },
      boolean: { type, width: 80, sortable: true, filterable: true, resizable: true },
      select: { type, width: 130, sortable: true, filterable: true, resizable: true },
      enum: { type, width: 130, sortable: true, filterable: true, resizable: true },
      multiline: { type, width: 250, sortable: false, filterable: true, resizable: true },
      json: { type, width: 200, sortable: false, filterable: false, resizable: true },
      custom: { type, width: 150, sortable: false, filterable: false, resizable: true },
    }

    return configs[type] || configs.text
  }
}

// ===================================================================
// ROW DATA GENERATORS
// ===================================================================

export class RowDataGenerator {
  private static companyNames = [
    'Acme Corp', 'Global Industries', 'Tech Solutions', 'Innovation Labs',
    'Smart Systems', 'Digital Dynamics', 'Future Enterprises', 'Alpha Beta',
    'Omega Solutions', 'Prime Technologies', 'Elite Services', 'Supreme Corp'
  ]

  private static categories = [
    'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books',
    'Automotive', 'Health', 'Beauty', 'Food', 'Toys', 'Music', 'Movies'
  ]

  private static status = ['Active', 'Inactive', 'Pending', 'Archived', 'Draft']

  static generateBusinessData(rowCount: number, columns: ColumnDef[]): RowData[] {
    const data: RowData[] = []

    for (let i = 0; i < rowCount; i++) {
      const row: RowData = { id: `row_${i}` }

      columns.forEach((col, colIndex) => {
        row[col.field] = this.generateValueForColumn(col, i, colIndex)
      })

      data.push(row)
    }

    return data
  }

  static generateFinancialData(rowCount: number, columns: ColumnDef[]): RowData[] {
    const data: RowData[] = []

    for (let i = 0; i < rowCount; i++) {
      const row: RowData = {
        id: `company_${i}`,
        company_name: `${this.companyNames[i % this.companyNames.length]  } ${Math.floor(i / this.companyNames.length) + 1}`
      }

      columns.forEach((col) => {
        if (col.dataType === 'currency') {
          row[col.field] = this.generateCurrencyValue(1000, 1000000, i)
        } else if (col.dataType === 'percentage') {
          row[col.field] = this.generatePercentageValue(-50, 200, i)
        } else {
          row[col.field] = this.generateValueForColumn(col, i, 0)
        }
      })

      data.push(row)
    }

    return data
  }

  static generateTimeSeriesData(rowCount: number, columns: ColumnDef[]): RowData[] {
    const data: RowData[] = []

    for (let i = 0; i < rowCount; i++) {
      const row: RowData = {
        id: `asset_${i}`,
        symbol: `SYM${String(i).padStart(3, '0')}`,
        name: `Asset ${i + 1}`
      }

      // Generate correlated time series data
      let baseValue = 100 + Math.random() * 900 // $100-$1000

      columns.forEach((col) => {
        if (col.field.includes('_value') || col.field.includes('_close')) {
          baseValue += (Math.random() - 0.5) * 10 // Random walk
          row[col.field] = Math.max(1, baseValue)
        } else if (col.field.includes('_volume')) {
          row[col.field] = Math.floor(1000 + Math.random() * 50000)
        } else if (col.field.includes('_high')) {
          row[col.field] = (row[col.field.replace('_high', '_close')] as number || baseValue) * (1 + Math.random() * 0.1)
        } else if (col.field.includes('_low')) {
          row[col.field] = (row[col.field.replace('_low', '_close')] as number || baseValue) * (1 - Math.random() * 0.1)
        } else if (col.field.includes('_open')) {
          row[col.field] = baseValue + (Math.random() - 0.5) * 5
        } else {
          row[col.field] = this.generateValueForColumn(col, i, 0)
        }
      })

      data.push(row)
    }

    return data
  }

  static generateProductData(rowCount: number): RowData[] {
    const data: RowData[] = []

    for (let i = 0; i < rowCount; i++) {
      const cost = 10 + Math.random() * 490 // $10-$500
      const price = cost * (1.2 + Math.random() * 1.8) // 20%-200% markup
      const margin = ((price - cost) / price) * 100

      data.push({
        id: `product_${i}`,
        sku: `SKU${String(i).padStart(6, '0')}`,
        name: `Product ${i + 1}`,
        category: this.categories[i % this.categories.length],
        brand: this.companyNames[i % this.companyNames.length],
        cost,
        price,
        margin,
        stock: Math.floor(Math.random() * 1000),
        reserved: Math.floor(Math.random() * 50),
        available: Math.max(0, Math.floor(Math.random() * 950)),
        reorder_level: 10 + Math.floor(Math.random() * 40),
        supplier: `Supplier ${(i % 20) + 1}`,
        last_ordered: this.generateRandomDate(new Date('2023-01-01'), new Date()),
        next_delivery: this.generateRandomDate(new Date(), new Date('2024-12-31')),
        active: Math.random() > 0.1, // 90% active
        weight: 0.1 + Math.random() * 49.9, // 0.1-50kg
        dimensions: `${Math.floor(10 + Math.random() * 90)}×${Math.floor(10 + Math.random() * 90)}×${Math.floor(5 + Math.random() * 45)}cm`,
        description: `This is a detailed product description for Product ${i + 1}. It includes features, benefits, and specifications that would typically span multiple lines.`,
        tags: ['featured', 'bestseller', 'new', 'sale', 'premium'].filter(() => Math.random() > 0.7).join(', '),
        rating: 1 + Math.random() * 4, // 1-5 stars
        reviews: Math.floor(Math.random() * 1000),
        created_at: this.generateRandomDate(new Date('2020-01-01'), new Date('2023-01-01')),
        updated_at: this.generateRandomDate(new Date('2023-01-01'), new Date()),
      })
    }

    return data
  }

  private static generateValueForColumn(col: ColumnDef, rowIndex: number, colIndex: number): CellValue {
    const seed = rowIndex * 1000 + colIndex

    // Preserve ID column semantics for better natural sorting demo
    if (col.field === 'id') {
      return `row_${rowIndex}`
    }

    // Generate test data for natural sort testing
    if (col.field === 'test_sort') {
      // Generate values like: item1, item2, ..., item9, item10, item11, ..., item99, item100
      // Mixed with some uppercase: Item1, ITEM2, item3, etc.
      const baseValue = `item${rowIndex}`
      // Add some case variations for case-sensitivity testing
      if (rowIndex % 5 === 0) return baseValue.toUpperCase()
      if (rowIndex % 3 === 0) return baseValue.charAt(0).toUpperCase() + baseValue.slice(1)
      return baseValue
    }

    switch (col.dataType) {
      case 'text':
        return `${col.title?.split(' ')[0] || 'Value'} ${rowIndex + 1}`

      case 'number':
        return Math.floor((seed % 10000) + Math.random() * 1000)

      case 'currency':
        return this.generateCurrencyValue(1, 100000, seed)

      case 'percentage':
        return this.generatePercentageValue(-100, 500, seed)

      case 'date':
        return this.generateRandomDate(new Date('2020-01-01'), new Date()).toISOString().split('T')[0]

      case 'datetime':
        return this.generateRandomDate(new Date('2020-01-01'), new Date()).toISOString()

      case 'time':
        return this.generateTimeValue(seed)

      case 'interval':
        return this.generateIntervalValue(seed)

      case 'boolean':
        return (seed % 3) !== 0 // ~67% true

      case 'select':
        // Use a better hash function for more randomness
        return this.status[this.hashValue(rowIndex, colIndex) % this.status.length]

      case 'enum':
        // Use a better hash function for more randomness
        return this.status[this.hashValue(rowIndex, colIndex) % this.status.length]

      case 'multiline':
        return `This is a multi-line text field for row ${rowIndex + 1}.\nIt contains multiple lines of content\nto test text wrapping and cell height.`

      case 'json':
        return JSON.stringify({
          id: rowIndex,
          value: seed % 1000,
          active: seed % 2 === 0,
          meta: { created: new Date().toISOString() }
        })

      case 'custom':
        return `Custom_${rowIndex + 1}`

      default:
        return `Value ${rowIndex + 1}-${colIndex + 1}`
    }
  }

  private static generateCurrencyValue(min: number, max: number, seed: number): number {
    const random = (seed % 10000) / 10000
    return min + (random * (max - min))
  }

  private static generatePercentageValue(min: number, max: number, seed: number): number {
    const random = (seed % 10000) / 10000
    return min + (random * (max - min))
  }

  private static generateTimeValue(seed: number): string {
    const hours = seed % 24
    const minutes = (seed * 7) % 60
    const seconds = (seed * 13) % 60
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  private static generateIntervalValue(seed: number): string {
    const intervals = [
      '00:15:00', '00:30:00', '01:00:00', '01:30:00', '02:00:00',
      '03:00:00', '04:00:00', '06:00:00', '08:00:00', '12:00:00',
      '1 day', '2 days', '1 week', '2 weeks', '1 month'
    ]
    return intervals[seed % intervals.length] || '01:00:00'
  }

  private static generateRandomDate(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  /**
   * Simple hash function for better randomization
   * Uses a combination of prime numbers to create pseudo-random distribution
   */
  private static hashValue(row: number, col: number): number {
    // Use prime numbers for better distribution
    let hash = row * 2654435761 + col * 2246822519
    // Additional mixing to improve randomness
    hash = ((hash ^ (hash >>> 16)) * 0x85ebca6b) >>> 0
    hash = ((hash ^ (hash >>> 13)) * 0xc2b2ae35) >>> 0
    hash = (hash ^ (hash >>> 16)) >>> 0
    return Math.abs(hash)
  }
}

// ===================================================================
// PRESET SCENARIOS
// ===================================================================

export interface TestScenario {
  name: string
  description: string
  columns: ColumnDef[]
  generateData: (rowCount: number) => RowData[]
  recommendedRowCount: number
  performanceExpectation: {
    setupTime: number // milliseconds
    renderTime: number
    scrollTime: number
    memoryEfficiency: number // percentage
  }
}

export const TEST_SCENARIOS: TestScenario[] = [
  {
    name: 'Financial Dashboard',
    description: 'Quarterly financial metrics for multiple companies across 8 quarters',
    columns: ColumnGenerator.generateFinancialColumns(8, 20),
    generateData: (rowCount: number) => {
      const columns = ColumnGenerator.generateFinancialColumns(8, 20)
      return RowDataGenerator.generateFinancialData(rowCount, columns)
    },
    recommendedRowCount: 1000,
    performanceExpectation: {
      setupTime: 50,
      renderTime: 10,
      scrollTime: 5,
      memoryEfficiency: 85,
    },
  },

  {
    name: 'Trading Dashboard',
    description: 'Daily trading data with OHLCV metrics over 2 years',
    columns: ColumnGenerator.generateTimeSeriesColumns(
      new Date('2022-01-01'),
      new Date('2023-12-31'),
      'daily',
      ['Open', 'High', 'Low', 'Close', 'Volume']
    ),
    generateData: (rowCount: number) => {
      const columns = ColumnGenerator.generateTimeSeriesColumns(
        new Date('2022-01-01'),
        new Date('2023-12-31'),
        'daily'
      )
      return RowDataGenerator.generateTimeSeriesData(rowCount, columns)
    },
    recommendedRowCount: 500,
    performanceExpectation: {
      setupTime: 100,
      renderTime: 15,
      scrollTime: 8,
      memoryEfficiency: 90,
    },
  },

  {
    name: 'Business Analytics',
    description: 'Wide business dataset with 500+ varied metrics',
    columns: ColumnGenerator.generateBusinessColumns(500, { leftPinned: 2, rightPinned: 1 }),
    generateData: (rowCount: number) => {
      const columns = ColumnGenerator.generateBusinessColumns(500, { leftPinned: 2, rightPinned: 1 })
      return RowDataGenerator.generateBusinessData(rowCount, columns)
    },
    recommendedRowCount: 5000,
    performanceExpectation: {
      setupTime: 30,
      renderTime: 8,
      scrollTime: 5,
      memoryEfficiency: 80,
    },
  },

  {
    name: 'Product Catalog',
    description: 'Comprehensive product catalog with detailed attributes',
    columns: ColumnGenerator.generateProductCatalogColumns(),
    generateData: (rowCount: number) => RowDataGenerator.generateProductData(rowCount),
    recommendedRowCount: 10000,
    performanceExpectation: {
      setupTime: 20,
      renderTime: 5,
      scrollTime: 3,
      memoryEfficiency: 75,
    },
  },

  {
    name: 'Extreme Scale Test',
    description: 'Stress test with 1000+ columns and large dataset',
    columns: ColumnGenerator.generateBusinessColumns(1000, { leftPinned: 3, rightPinned: 2 }),
    generateData: (rowCount: number) => {
      const columns = ColumnGenerator.generateBusinessColumns(1000, { leftPinned: 3, rightPinned: 2 })
      return RowDataGenerator.generateBusinessData(rowCount, columns)
    },
    recommendedRowCount: 50000,
    performanceExpectation: {
      setupTime: 200,
      renderTime: 50,
      scrollTime: 20,
      memoryEfficiency: 95,
    },
  },
]

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================

export function getScenario(name: string): TestScenario | undefined {
  return TEST_SCENARIOS.find(scenario => scenario.name === name)
}

export function listScenarios(): { name: string; description: string; columns: number }[] {
  return TEST_SCENARIOS.map(scenario => ({
    name: scenario.name,
    description: scenario.description,
    columns: scenario.columns.length,
  }))
}

export function generateCustomScenario(
  columnTypes: ColumnType[],
  rowCount: number,
  columnPrefix = 'Custom'
): { columns: ColumnDef[]; data: RowData[] } {
  const columns: ColumnDef[] = columnTypes.map((type, index) => ({
    id: `${columnPrefix.toLowerCase()}_${index}`,
    field: `${columnPrefix.toLowerCase()}_${index}`,
    title: `${columnPrefix} ${index + 1} [${ColumnGenerator.formatDataType(type)}]`,
    dataType: type,
    width: type === 'multiline' ? 250 : type === 'boolean' ? 80 : 120,
    sortable: type !== 'multiline',
    filterable: true,
    resizable: true,
  }))

  const data = RowDataGenerator.generateBusinessData(rowCount, columns)

  return { columns, data }
}

// Convenience functions for compatibility
export const generateTestColumns = (
  count: number = 20,
  options?: { leftPinned?: number; rightPinned?: number }
): ColumnDef[] => {
  return ColumnGenerator.generateBusinessColumns(count, options)
}

export const generateTestRows = (rowCount: number, columns?: ColumnDef[]): RowData[] => {
  const cols = columns || generateTestColumns()
  return RowDataGenerator.generateBusinessData(rowCount, cols)
}

/**
 * Apply pinned configuration to existing columns
 * @param columns - Columns to modify
 * @param options - Pinning configuration
 * @returns Modified columns with pinned settings
 *
 * @example
 * const columns = generateTestColumns(20)
 * const pinnedColumns = applyPinnedColumns(columns, { leftPinned: 2, rightPinned: 1 })
 */
export const applyPinnedColumns = (
  columns: ColumnDef[],
  options: { leftPinned?: number; rightPinned?: number }
): ColumnDef[] => {
  const { leftPinned = 0, rightPinned = 0 } = options
  const total = columns.length

  return columns.map((col, index) => {
    let pinned: 'left' | 'right' | undefined

    if (index < leftPinned) {
      pinned = 'left'
    } else if (index >= total - rightPinned) {
      pinned = 'right'
    }

    return { ...col, pinned }
  })
}

/**
 * Generate employee-like columns with ID and Name pinned to left
 * @param totalColumns - Total number of columns to generate
 * @returns Column definitions with first 2 columns pinned left
 */
export const generateEmployeeColumns = (totalColumns: number = 20): ColumnDef[] => {
  return generateTestColumns(totalColumns, { leftPinned: 2 })
}

/**
 * Generate employee data
 * @param rowCount - Number of rows to generate
 * @returns Row data array
 */
export const generateEmployeeData = (rowCount: number): RowData[] => {
  const columns = generateEmployeeColumns()
  return generateTestRows(rowCount, columns)
}

// ===================================================================
// HAPPY TABLE DEMO HELPERS
// ===================================================================

export type FunctionalColumnMode = 'checkbox' | 'radio'

export interface SelectionActionHandlers {
  onEdit?: (row: RowData) => void
  onDelete?: (row: RowData) => void
}

export const createSelectionPlaygroundBaseColumns = (
  columnCount: number = 14,
  pinned: { leftPinned?: number; rightPinned?: number } = { leftPinned: 1, rightPinned: 1 }
): ColumnDef[] => {
  const baseColumns = generateTestColumns(columnCount, pinned)

  // Insert test sorting column after ID column (index 0)
  // This column demonstrates different sortOptions configurations
  const testSortColumn: ColumnDef = {
    id: 'test_sort',
    field: 'test_sort',
    title: 'Test Sort (Natural)',
    width: 180,
    sortable: {
      naturalSort: true,
      sensitivity: 'base', // Simplified: replaces caseSensitive and handles case/accent
    },
    visible: true,
    resizable: true,
    filterable: false,
  }

  // Insert after ID column
  baseColumns.splice(1, 0, testSortColumn)

  return baseColumns
}

export const createSelectionPlaygroundRows = (
  rowCount: number,
  baseColumns: ColumnDef[]
): RowData[] => {
  return generateTestRows(rowCount, baseColumns)
}

export const buildSelectionPlaygroundColumns = (
  mode: FunctionalColumnMode,
  baseColumns: ColumnDef[],
  handlers: SelectionActionHandlers = {}
): ColumnDef[] => {
  const normalizedBase = baseColumns.map(column => ({ ...column }))

  const leftFunctional: ColumnDef[] = []

  if (mode === 'checkbox') {
    leftFunctional.push({
      type: 'checkbox',
      id: 'selection',
      field: '__functional_checkbox',
      title: '',
      pinned: 'left',
    })
  }

  if (mode === 'radio') {
    leftFunctional.push({
      type: 'radio',
      id: 'radio_selection',
      field: '__functional_radio',
      title: '',
      pinned: 'left',
    })
  }

  leftFunctional.push({
    type: 'seq',
    id: 'sequence',
    field: '__functional_seq',
    title: '#',
    pinned: 'left',
  })

  const onEdit = handlers.onEdit ?? (() => undefined)
  const onDelete = handlers.onDelete ?? (() => undefined)

  const rightFunctional: ColumnDef[] = [
    {
      type: 'actions',
      id: 'actions',
      field: '__functional_actions',
      title: 'Actions',
      pinned: 'right',
      functionalOptions: {
        buttons: [
          {
            label: 'Edit',
            onClick: onEdit,
          },
          {
            label: 'Delete',
            onClick: onDelete,
          },
        ],
      },
    },
  ]

  return [...leftFunctional, ...normalizedBase, ...rightFunctional]
}

export interface ProjectShowcaseHandlers {
  onArchive?: (row: RowData) => void
  onShare?: (row: RowData) => void
  onDragEnd?: (result: DragResult) => void
}

interface ProjectShowcaseRow extends RowData {
  id: string
  project: string
  owner: string
  team: string
  status: 'Planned' | 'In Progress' | 'Blocked' | 'Complete'
  priority: 'High' | 'Medium' | 'Low'
  progress: number
  description?: string
  startDate?: string
  budget?: string
  tags?: string
}

const PROJECT_SHOWCASE_DATA: ProjectShowcaseRow[] = [
  {
    id: 'alpha',
    project: 'Alpha Launch',
    owner: 'Alice',
    team: 'Product',
    status: 'In Progress',
    priority: 'High',
    progress: 72,
    description: 'Complete redesign of the alpha product with new features and improved UX.',
    startDate: '2025-01-15',
    budget: '$250,000',
    tags: 'redesign, UX, high-priority',
  },
  {
    id: 'beta',
    project: 'Beta Pilot',
    owner: 'Brenda',
    team: 'Success',
    status: 'Planned',
    priority: 'Medium',
    progress: 18,
    description: 'Pilot program for beta testing with selected customers.',
    startDate: '2025-02-01',
    budget: '$120,000',
    tags: 'pilot, customer-feedback',
  },
  {
    id: 'gamma',
    project: 'Gamma Stabilization',
    owner: 'Chen',
    team: 'Engineering',
    status: 'Blocked',
    priority: 'High',
    progress: 33,
    description: 'Critical stabilization work for gamma release including API improvements.',
    startDate: '2025-01-20',
    budget: '$180,000',
    tags: 'stability, API, critical',
  },
  {
    id: 'delta',
    project: 'Delta Migration',
    owner: 'Diego',
    team: 'Platform',
    status: 'Complete',
    priority: 'Low',
    progress: 100,
    description: 'Migration of legacy delta systems to new infrastructure.',
    startDate: '2024-12-01',
    budget: '$90,000',
    tags: 'migration, infrastructure',
  },
]

export const createProjectShowcaseRows = (): RowData[] => {
  return PROJECT_SHOWCASE_DATA.map(row => ({ ...row }))
}

export const createProjectShowcaseColumns = (
  handlers: ProjectShowcaseHandlers = {}
): ColumnDef[] => {
  const onArchive = handlers.onArchive ?? (() => undefined)
  const onShare = handlers.onShare ?? (() => undefined)
  const onDragEnd = handlers.onDragEnd ?? (() => undefined)

  return [
    {
      type: 'checkbox',
      id: 'demo-checkbox',
      field: '__functional_checkbox_demo',
      title: '',
      pinned: 'left',
      condition: (row: RowData) => row.status !== 'Blocked',
      functionalOptions: {
        showIndeterminate: true,
      },
    },
    {
      type: 'seq',
      id: 'demo-seq',
      field: '__functional_seq_demo',
      title: '#',
      pinned: 'left',
      functionalOptions: {
        baseNumber: 1,
      },
    },
    {
      type: 'drag',
      id: 'demo-drag',
      field: '__functional_drag',
      title: '',
      pinned: 'left',
      functionalOptions: {
        isRowDraggable: (row: RowData) => row.status !== 'Blocked',
        onDragEnd,
        dragPreviewContent: (row: RowData) => `📋 ${row.project ?? 'Row'}`,
      },
    },
    {
      id: 'project',
      field: 'project',
      title: 'Project',
      width: 200,
      pinned: 'left',
    },
    {
      id: 'owner',
      field: 'owner',
      title: 'Owner',
      width: 140,
    },
    {
      id: 'team',
      field: 'team',
      title: 'Team',
      width: 140,
    },
    {
      id: 'status',
      field: 'status',
      title: 'Status',
      width: 140,
    },
    {
      id: 'priority',
      field: 'priority',
      title: 'Priority',
      width: 120,
    },
    {
      id: 'progress',
      field: 'progress',
      title: 'Progress',
      width: 140,
      formatter: (value: CellValue) => `${value ?? 0}%`,
    },
    {
      type: 'actions',
      id: 'showcase-actions',
      field: '__functional_actions_showcase',
      title: 'Actions',
      pinned: 'right',
      width: 140,
      functionalOptions: {
        buttons: [
          {
            label: 'Archive',
            onClick: onArchive,
          },
          {
            label: 'Share',
            onClick: onShare,
          },
        ],
      },
    },
  ]
}
