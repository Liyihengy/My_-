// globals.d.ts 或其他 .d.ts 文件
declare global {
  interface HTMLElement {
    _handleMouseMove?: (this: HTMLElement, ev: MouseEvent) => any
  }
}

// 如果您的文件是模块（包含顶级 import 或 export），添加 export {}
export {}
