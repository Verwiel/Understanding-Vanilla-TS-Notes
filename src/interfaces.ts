// Interfaces - Describe structure of an object (TS only)
// dosent store any values, just structure
interface Named {
  // interfaces can have readonly modifiers only. No public or private 
  readonly name?: string
  // optional properties have ? - can be used with methods as well
  outputName?: string
}

// Interfaces can use inheritance
interface Greetable extends Named {
  greet(phrase: string): void
}

// you can implement a interface in a class, forcing it to have certain attributes
class Person implements Greetable {
  name?: string
  age = 27;

  constructor (n?: string){
    if(n){
      this.name = n
    }
  }

  greet(phrase: string){
    if(this.name){
      console.log(`${phrase} ${this.name}`)
    } else {
      console.log('Hi')
    }
  }
}

let user1: Greetable
user1 = new Person('Drew')
user1.greet('Hi there, I am')

// Interfaces for functions
// type AddFn = (a: number, b: number) => number; // can be written as below
interface AddFn {
  (a: number, b: number): number
}

let addNumbers: AddFn;
addNumbers = (n1: number, n2: number) => {
  return n1 + n2
}
