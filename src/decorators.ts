// Decorators - need config file set to es6 and experimentalDecorators is enabled
// a decorator is just a function applied to a class, start with uppercase

// function Logger(constructor: Function) { // Basic Decorator
//   console.log('Logging...')
//   console.log(constructor)
// }

// Decorator Factories
function Logger(logString: string) { 
  return function(constructor: Function){
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string){
  console.log('Factories Decorator')
  return function<T extends { new (...args: any[]): {name: string} }>(originalConstructor: T) { 
    // by returning a new class, it will only work when the class is instantiated
    return class extends originalConstructor { // returns class keeping all the originals data
      // to specify you dont care about argument replace with _
      constructor(..._: any[]) {
        super() // required
        const hookEl = document.getElementById(hookId)
        if(hookEl){
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    } 
  }
}

// @Logger // basic use
// when using multiple decorators the bottom one runs first
@Logger('LOGGING - USER') // factories
@WithTemplate('<h1>Decorator</h1>', 'app')
class User {
  name = 'Drew'

  constructor() {
    console.log('Creating person object...')
  }
}

// const user = new User()
// console.log(user)


// Places you can use Decorators
// executes when class is defined
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property Decorator')
  console.log(target, propertyName)
}

function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Accesor Decorator')
  console.log(target, name, descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method Decorator')
  console.log(target, name, descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter Decorator')
  console.log(target, name, position)
}


class Product {
  @Log
  title: string
  private _price: number

  @Log2
  set price(val: number) {
    if(val > 0){
      this._price = val
    } else {
      throw new Error('Invalid price, should be positive')
    }
  }

  constructor(t: string, p: number){
    this.title = t
    this._price = p
  }

  @Log3
  getProduct(@Log4 tax: number){
    return this._price * (1 + tax)
  }
}

const p1 = new Product('Book', 15)
const p2 = new Product('Book 2', 20)

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const ogMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false, // wont show in a for in loop
    get() {
      const boundFn = ogMethod.bind(this)
      return boundFn
    }
  } 
  return adjDescriptor
}

class Printer {
  message = 'This works'

  @AutoBind
  showMessage(){
    console.log(this.message)
  }
}

const pr = new Printer()

const button = document.querySelector('button')!
// button.addEventListener('click', pr.showMessage.bind(pr))
button.addEventListener('click', pr.showMessage) // no need to bind with decorator

// Validation Decorators - avoid needing to run the logic on every course creation
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string] : string[] // Required, Positive, etc
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  };
}

function validate(obj: any) {
  // loop through validators and check
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if(!objValidatorConfig){
    return true
  }
  let isValid = true
  for (const prop in objValidatorConfig){ // For in loop
    for (const validator of objValidatorConfig[prop]) {
      switch(validator){
        case 'positive': 
        isValid = isValid && obj[prop] > 0
          break;
        case 'required':
          isValid = isValid && !!obj[prop]
          break;
      }
    }
  }
  return isValid
}

class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', e => {
  e.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value // + converts it to a number
  const createdCourse = new Course(title, price)
  if(!validate(createdCourse)){
    alert('Invalid input, please try again')
    return
  }
  console.log(createdCourse)
})
