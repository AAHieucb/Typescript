import DefaultTest from "./declaration";

type Point = { x: number; y: number };
type ID = string | number; 
type Callback = (value: number) => void;

interface IPoint {
  x: number;
}
interface Movable extends IPoint {
  move(): void; // Trong interface luôn là public
}

class Player implements Movable {
  x = 0; // K định nghĩa visibility thì default là public
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
const role = "admin" satisfies Role; // satisfies là check 1 object thoả mãn 1 type nào 

function f1(): { a: number; b: string } {
  return { a: 1, b: "hello" };
}
type T4 = ReturnType<typeof f1>; // ReturnType phải truyền generic vào là 1 type, kp 1 object
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
let error: FormField["error"] = undefined; // Lấy 1 phần của type khác, k cần dùng keyword Pick
type UserPreview = Pick<FormField, "error" | "a">; 
type UserPreview2 = Omit<FormField, "error">;

// Pick chỉ lấy được thuộc tính lv1, DeepPick cân mọi level
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

type RemoveString<T> = {
  [K in keyof T]: T[K] extends string ? never : T[K];
}; // { name: never; age: number; }

const userX: Readonly<{id: number, name: string}> = {
  id: 1,
  name: "An",
};
// userX.name = "Bình"; // Cannot assign to 'name'
type UserDTO = Readonly<Pick<User, "id">> & Pick<User, "profile">; // Chỉ readonly 1 field

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

export const oAuthProviders = ["discord", "github"] as const; // tương đương Readonly<["discord", "github"]>, nếu k có as const sẽ tự suy string[]
export type OAuthProvider = (typeof oAuthProviders)[number]; // "discord" | "github"

class Car {
  static table = "cars";
  brand: string = "Toyota";
}
type TCar = InstanceType<typeof Car>; // TCar và Car là 2 type y hệt nhau, tương đương = typeof Car;

function createInstance<
  C extends new (...args: any[]) => any // 1 hàm constructor bất kỳ
>(ctor: C): InstanceType<C> {
  return new ctor();
}

type Constructor = new () => any; // Keyword new tức là hàm constructor
class A {}
class B {}
let kl: Constructor;
kl = A;
kl = B; // OK vì A và B đều là hàm constructor new được

const x: number[] = [1, 2];
const y: string[] = ["", "a"];
const z: (number | string)[] = [...x,...y];

type RealObjectType = Record<string, unknown>; 
type RealObjectType2 = {
  [key: string]: unknown; // Tương tự cách chuẩn định nghĩa 1 kiểu object
}

function X<const T extends { [K in keyof typeof Car]?: boolean }>(column: T) {} // có typeof thì chỉ lấy Type của constructor truyền key là "table" ok
function X2<const T extends { [K in keyof Car]?: boolean }>(column: T) {} // truyền key là "brand" vì k có typeof sẽ lấy key của Type Car bth
