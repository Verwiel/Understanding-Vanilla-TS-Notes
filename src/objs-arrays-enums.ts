// Can specify but its best to let TS infer 

// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string]; // as Tuple
// } = {
//   name: 'Drew',
//   age: 27,
//   hobbies: ['Coding', 'Snowboarding'],
//   role: [2, 'author'] // as Tuple
// }

// Enums
// instead of haveing to name out each variable
// const ADMIN = 1, const READ_ONLY = 2, AUTHOR = 3
// enum assigns labels to numbers, can assign starting value or specify each
enum Role { ADMIN = 5, READ_ONLY, AUTHOR };

const person = {
  name: 'Drew',
  age: 27,
  hobbies: ['Coding', 'Snowboarding'],
  role: Role.ADMIN
}

// Will only accept array of strings
let favoriteActivities: string[]
favoriteActivities = ['Snowboarding']

for (const hobby of person.hobbies) {
  // since TS knows hobby is a string we get auto string function suggestions
  // like .toUpperCase()
  console.log(hobby)
  // console.log(hobby.map()) Throws error since its type string not another array
}
