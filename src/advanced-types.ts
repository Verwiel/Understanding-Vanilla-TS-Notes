type Admin = {
  name: string
  privileges: string[]
}

type Employee = {
  name: string
  startDate: Date
}

// INTERSECTION TYPES
type ElevatedEmployee = Admin & Employee
const e1: ElevatedEmployee = {
  name: 'Drew',
  privileges: ['create-server'],
  startDate: new Date()
}

// Intersection can be used without objects
type Combinable = string | number
type Numeric = number | boolean
// Universal will only be number since it exists in both
type Universal = Combinable & Numeric

// TYPE GUARDS
function addGuard(a: Combinable, b: Combinable) {
  // checks to make sure the correct type is used at run time
  if (typeof a === 'string' || typeof b === 'string'){
    return a.toString() + b.toString()
  }
  return a + b
}

type UnknownEmployee = Employee | Admin

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`)
  // emp.priveledges may or may not exist so we need to type guard it
  // using in keyword, check property you want to check exists in obj
  if('privileges' in emp){
    console.log(`Privileges: ${emp.privileges}`)
  }
}

printEmployeeInfo(e1)

// check instance
class Car {
  drive(){
    console.log('Driving...')
  }
}

class Truck {
  drive(){
    console.log('Driving a truck...')
  }

  loadCargo(amount: number){
    console.log(`Loading cargo... ${amount}`)
  }
}

type Vehicle = Car | Truck
const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  // load cargo will only exist in Truck
  // can use in from above or instance of to be more elegant with classes
  if( vehicle instanceof Truck) {
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1)
useVehicle(v2)

// DISCRIMINATED UNIONS - give every object an extra property you can use in a switch statement
interface Bird {
  // literal type, must hold bird as a string
  type: 'bird'
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  // could type guard check, but if the list of animals grow its more bug prone
  // couldnt instance of check since this is an interface, not a class
  let speed;
  // switch is safer in TS since it will check to make sure the string is accurate
  switch(animal.type){
    case 'bird':
      speed = animal.flyingSpeed
      break;
    case 'horse':
      speed = animal.runningSpeed
  }
  console.log(`moving at speed: ${speed}`)
}

moveAnimal({type: 'bird', flyingSpeed: 80})

// TYPE CASTING
const paragraph = document.querySelector('p') // knows its a p tag
const paragraphID = document.getElementById('message-output') // knows its a html element
// ! will make it so TS knows it will never return null
// include tag of what element will be: needs dom in compiler
// const userInputTag = <HTMLInputElement>document.getElementById('user-input')!
// OR to avoid clashing with JSX use as
const userInputTag = document.getElementById('user-input')! as HTMLInputElement

userInputTag.value = 'Hi - Type Casting'

// INDEX PROPERTIES
// keep an interface flexible, the object should only hold relevant properties
// you wont know how many properties or the names of them
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character }
  // must have properties that are strings, no names or count are known
  [prop: string]: string
  id: string // can still add other properties, must match the type above though
}

const errorBag: ErrorContainer = {
  id: '1',
  email: 'Not a valid email'
}

// FUNCTION OVERLOADS
// multiple ways of calling a function with different parameters or outputs
// ex: if you add strings Combinable will still not let you add string methods on the result
// set type above function with the same name
function addOverload(a: number, b: number): number
function addOverload(a: string, b: string): string
function addOverload(a: number, b: string): string
function addOverload(a: string, b: number): string
function addOverload(a: Combinable, b: Combinable) {
  // checks to make sure the correct type is used at run time
  if (typeof a === 'string' || typeof b === 'string'){
    return a.toString() + b.toString()
  }
  return a + b
}

const result = addOverload(1, 5)

// OPTIONAL CHAINING
// grabbing data that you dont know with a certainty all the properties
const fetchedUserData = {
  id: '1',
  name: 'Drew',
  job: {title: 'Software Engineer', description: 'Codes and stuff'}
}

// console.log(fetchedUserData.job.title) // might not exist
// console.log(fetchedUserData.job && fetchedUserData.job.title) // JS check option
console.log(fetchedUserData?.job?.title) // add question marks in TS to say it might not exist

// NULLISH COALESCING - unknown what type you will recieve
const usersInput = null
const storedData = usersInput || 'Default' // fallback if its empty
const storedData2 = usersInput ?? 'Default' // if you want it stored differently if null vs empty
