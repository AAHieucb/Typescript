declare const API_URL: string;

// Hàm toàn cục
declare function logMessage(message: string): void;

// Interface toàn cục
interface User {
  id: number;
  email?: string;
}

// Khi có sẵn thư viện bên ngoài nhưng muốn custom thêm type
declare module "some-library" {
  export function doSomething(): void;
  export const libraryName: string;
  interface Session {
    user: {
      address: string
    } & User; // & là extend type cho user
  }
}

// Namespace (Đóng gói các khai báo liên quan vào một khối)s
declare namespace MyNamespace {
  interface Config {
    apiKey: string;
    timeout: number;
  }
  function initialize(config: Config): void;
}

// Class toàn cục
declare class Person {
  constructor(name: string, age: number);
  greet(): string;
}

// Mở rộng interface có sẵn VD Window là type có sẵn, thì chỉ cần mở rộng như này
interface Window {
  myCustomProperty: string;
}

// Export trực tiếp từ file .d.ts
export function helperFunction(value: string): number;
export const MAX_LIMIT: number;
export default class DefaultClass {
  constructor(value: string);
  getValue(): string;
}