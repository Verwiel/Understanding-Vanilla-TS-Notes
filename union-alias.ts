// Type alias
// union
type Combineable = number | string
// literal
type ConversionDescriptor = 'as-number' | 'as-text'


function combine(
  // as union
  input1: number | string, 
  // as alian
  input2: Combineable, 
  resultConversion: 'as-number' | 'as-text'
  // or resultConversion: ConversionDescriptor
){
  let result;
  // union
  if(typeof input1 === 'number' && typeof input2 === 'number'){
    result = input1 + input2
  } else {
    result = input1.toString() + input2.toString()
  }

  // literal
  if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number'){
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString()
  }

  return result

  // literal (converting result)
  // if(resultConversion === 'as-number'){
  //   return +result
  // } else {
  //   return result.toString()
  // }
}

// params 1 & 2 union, 3 is literal
const combinedAges = combine(30, 26, 'as-number')
console.log(combinedAges)

const combinedStringAges = combine('30', '26', 'as-number')
console.log(combinedStringAges)

const combinedNames = combine('Drew ', 'Audrey', 'as-text')
console.log(combinedNames)
