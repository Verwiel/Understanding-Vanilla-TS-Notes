let userInput: unknown
let userName: string

userInput = 5
userInput = 'Test'
// run time check before assigning variable
if(typeof userInput === 'string') {
  userName = userInput
}

// it will always throw an error, never produce a return value
function generateError(message: string, code: number): never {
  throw {message: message, errorCode: code}
}

generateError('An error occured', 404)
