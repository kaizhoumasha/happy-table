/**
 * Global TypeScript declarations for Happy Table library
 */

// Vue module declarations
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

// Vite import.meta environment types
interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
  readonly BASE_URL: string
  readonly SSR: boolean
  // Add more env variables as needed
  readonly [key: string]: any
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  readonly hot?: {
    readonly data: any
    accept(): void
    accept(cb: (mod: any) => void): void
    accept(deps: string[], cb: (mods: any[]) => void): void
    dispose(cb: (data: any) => void): void
    decline(): void
    invalidate(): void
    on<T extends string>(event: T, cb: (data: any) => void): void
  }
  readonly glob: (pattern: string) => Record<string, () => Promise<any>>
  readonly globEager: (pattern: string) => Record<string, any>
  readonly url: string
}

// Node.js environment detection for library builds
declare const process: {
  env: {
    NODE_ENV: string
    [key: string]: string | undefined
  }
}