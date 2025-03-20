// Biến toàn cục thì k cần export mà dùng được luôn
declare const API_URL: string;

// Hàm toàn cục
declare function logMessage(message: string): void;

// Interface toàn cục
interface User {
  id: number;
  name: string;
  email?: string; // Thuộc tính có thể có hoặc không
}

// Module tùy chỉnh (Khai báo cho thư viện bên ngoài không có định nghĩa .d.ts)
declare module "some-library" {
  export function doSomething(): void;
  export const libraryName: string;
  interface Session {
    user: {
      address: string
    } & User; // extend default type
  }
}

// Namespace (Đóng gói các khai báo liên quan vào một khối)
declare namespace MyNamespace {
  interface Config {
    apiKey: string;
    timeout: number;
  }
  function initialize(config: Config): void;
}

// Class (Định nghĩa một lớp trong file .d.ts)
declare class Person {
  constructor(name: string, age: number);
  greet(): string;
}

// Mở rộng interface có sẵn (ví dụ: Window)
interface Window {
  myCustomProperty: string;
}

// Export trực tiếp từ file .d.ts
export function helperFunction(value: string): number;
export const MAX_LIMIT: number;

// Export default
export default class DefaultClass {
  constructor(value: string);
  getValue(): string;
}