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


