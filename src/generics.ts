// GENERICS - TS only, types that need additional information
const names1: Array<string> = ['Drew', 'Audrey']
// names1[0].split(' ') // since array is defined as strings only

// const promise: Promise<string> = new Promise((res, rej) => {
//   setTimeout(() => {
//     res('Done')
//   }, 2000)
// })

// promise.then(data => {
//   data.split(' ') // possible only because of typing above
// })

// Creating Generics
// adding T and U infers that it will return an intersection
// using object would be to vague for TS to look for intersection
// set constraints to make sure the func still works, using the extends keyword
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Drew'}, {age: 27})
 // TS knows that the key exists because of T & U above
console.log(mergedObj.name)

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value'
  if(element.length === 1){
    description = `Got 1 element`
  } else if(element.length > 1) {
    description = `Got ${element.length} elements`
  }
  return [element, description]
}

console.log(countAndDescribe('Hello'))
console.log(countAndDescribe([]))
console.log(countAndDescribe(['Hello', 'There']))

// keyof constraint
// first param is any obj, second is any key of first obj
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value ' + obj[key]
}

console.log(extractAndConvert({ name: 'Drew' }, 'name'))

// Generic Classes
// in the below example we dont care about the type of data
// set to accespt everything but objects to avoid bugs with splicing
class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T){
    this.data.push(item)
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Drew')
textStorage.addItem('Audrey')
textStorage.removeItem('Audrey')
console.log(textStorage.getItems())

const numStorage = new DataStorage<number>()

// const objStorage = new DataStorage<object>()
// const audreyObj = {name: 'Audrey'}
// objStorage.addItem({name: 'Drew'})
// objStorage.addItem(audreyObj)
// // ...
// objStorage.removeItem(audreyObj)
// console.log(objStorage.getItems())

// Generic Utility Types (Partial, Readonly)
interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(
  title: string, 
  description: string, 
  date: Date) : CourseGoal {
  // Partial says that it dosent need to be a complete version of the type
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  // return courseGoal // breaks since it is still technically Partial
  return courseGoal as CourseGoal // complete now so reset the type
}

const namesGenerics: Readonly<string[]> = ['Drew', 'Audrey']
// namesGenerics.push('Mac') // set as Readonly so it cant be modified
