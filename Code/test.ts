import DefaultTest from "./declaration";

type Point = { x: number; y: number };
type ID = string | number; 
type Callback = (value: number) => void;

interface IPoint {
  x: number;
}
interface Movable extends IPoint {
  move(): void; // hàm và biến trong interface luôn là public
}

class Player implements Movable {
  x = 0; // K định nghĩa visibility default là public
  private speed: number;
  constructor(speed: number) {
    this.speed = speed;
  }
  move() {
    console.log("Moving...");
  }
  protected getSpeed(): number {
    return this.speed;
  }
  private _width: number = 0;
  get width(): number { // Assessor property
    return this._width;
  }
  public set width(value: number) {
    if (value > 0) {
      this._width = value;
    }
  }
}

namespace MyNamespace {
  export const greeting = "Hello, World!"; // Có export thì dùng được ở ngoài. K có export chỉ dùng nội bộ trong namespace này
  export function sayHello(name: string): string {
    return `Hello, ${name}!`;
  }
  export class Person {
    constructor(public name: string) {}
    greet() {
      return `Hi, I'm ${this.name}`;
    }
  }
  export namespace HR { // Nested
    export class Employee {
      constructor(public name: string, public role: string) {}
    }
  }
}
console.log(MyNamespace.greeting); // "Hello, World!"
console.log(MyNamespace.sayHello("Alice")); // "Hello, Alice!"
const person = new MyNamespace.Person("Bob");
console.log(person.greet()); // "Hi, I'm Bob"

type Role = "admin" | "user" | "guest";
const role = "admin" satisfies Role; // satisfies là check 1 object thoả mãn 1 type nào mà k ép kiếu sang type đó.


function f1(): { a: number; b: string } {
  return { a: 1, b: "hello" };
}
type T4 = ReturnType<typeof f1>; // ReturnType tạo ra 1 type mới là type trả về của function. Tức type T4 = { a: number; b: string; }
type T1 = ReturnType<(s: string) => void>; // => T1 có type là void.
type T2 = ReturnType<<T>() => T>; // => T2 có type T

const user = { name: "Alice", age: 25 };
type UserType = typeof user; // UserType = { name: string; age: number; }
type UserKeys = keyof UserType; // UserKeys = "name" | "age"

type FormField = {
  formField: { name: string; password: string; email: string };
  error: string | void;
  a: string;
};
let error: FormField["error"] = undefined; // Lấy 1 phần của type khác 
type UserPreview = Pick<FormField, "error" | "a">;

// Lấy thuộc tính của type khác lồng bên trong tự custom hàm
type DeepPick<T, K extends string> = 
  K extends `${infer First}.${infer Rest}`
    ? First extends keyof T
      ? { [P in First]: DeepPick<T[First], Rest> }
      : never
    : K extends keyof T
      ? { [P in K]: T[K] }
      : never;
type User = {
  id: number;
  profile: {
    name: string;
    email: string;
    address: {
      city: string;
      country: string;
    };
  };
};
type UserProfileName = DeepPick<User, "profile.name">;
const userProfileName: UserProfileName = {
  profile: {
    name: "Alice",
  },
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fPromise: () => Promise<{a: number, b: string}> = async () => {
  await sleep(1000);
  return {
    a: 1,
    b: ""
  }
}
type UserX = Exclude<
  Awaited<ReturnType<typeof fPromise>> | undefined,
  undefined | null
>;
// Exclude<U,T> thì sẽ loại bỏ các kiểu T ra khỏi U, chỉ loại bỏ ở ngoài cùng chứ k check nested
// Awaited thì lấy giá trị trả về của Promise nếu là Promise


export const oAuthProviders = ["discord", "github"] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];


class Car {
  brand: string = "Toyota";
}
type TCar = InstanceType<typeof Car>; // TCar và Car là 2 type y hệt nhau
// Case dùng InstanceType có ích, là lấy ra instance type của 1 type
function createInstance<
  C extends new (...args: any[]) => any // C là 1 hàm constructor nhận bất cứ input nào và cho ra bất cứ output nào, tức nó chỉ cần là 1 hàm constructor thôi
>(ctor: C): InstanceType<C> {
  return new ctor();
}