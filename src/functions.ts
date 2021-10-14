function add(n1: number, n2: number){
  return n1 + n2
}

// you dont need to add void, just used to show that its not returning anything
function printResult(num: number): void {
  console.log('Result: ' + num)
}

function addAndHandle(n1: number, n2: number, cb: (n1: number) => void){
  const result = n1 + n2
  // adding void above means we dont care about any return value
  cb(result)
}

printResult(add(5, 12))


// storing function in variable, using any type
// let combineValues
// combineValues = add
// console.log(combineValues(8, 8))


// storing function as type
let combineValues: (a: number, b: number) => number;
combineValues = add
console.log(combineValues(8, 8))

// anonymous function just to have the callback param
addAndHandle(10, 20, () => {})
