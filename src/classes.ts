// Classes start with uppercase
// these arnt key value pairs, they are fields for what will eventually be added
// abstract is used only if you have abstract methods within, they can no longer be instantiated themselves
abstract class Department {
  // MODIFIERS (TS Only):
  // private sets a method or variable only accessible from inside the class 
  // default is public
  // readonly following means its initialized once and cant be changed after\
  // protected allows it to be used in inherited classes (still inaccessible outside)

  static fiscalYear = 2022 // since its static it cant be accessed within the class without the class name first (Department.fiscalYear)
  protected employees: string[] = []
  // commented out because its now defined in constructor.
  // private name: string;
  // private id: string;

  // constructor is a function tied to the class (and any objects created from the class)
  // utility used for creating new Object
  // parmeters can be passed here instead of double initializing.
  constructor(protected readonly id: string, public name: string) {
    // this.name = n
    // this.id = id
  }

  // can pass this as a parameter in typescript in case a reference is trying to access the class
  // smart to add this so TS will show error if trying to access on a copy of the class object

  // abstract makes it so all inheriting classes need to add this method
  abstract describe(this: Department): void;

  // static can be referenced without instantiating the class
  static createEmployee(name: string) {
    return { name: name }
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

// Inheritance, can only inherit from 1 class, used to add more specific info to a class
// Will automatically get everything from the inherited class - overridden with constructor
class ITDepartment extends Department {
  admins: string[]
  constructor(id: string, admins: string[]) {
    // whenever you add a constructor in an inheriting class you need to call super() first
    // this initialises the base classes constructor
    super(id, 'IT')
    this.admins = admins
  }

  describe() {
    console.log('IT Department - ID: ' + this.id)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string
  private static instance: AccountingDepartment

  // getter is a property to execute method when retrieveing a value
  // must return something
  get mostRecentReport() {
    if (this.lastReport){
      return this.lastReport
    }
    throw new Error('No report found.')
  }

  // named the same as the get but it needs a parmeter to change
  set mostRecentReport(value: string) {
    if(!value){
      throw new Error('Please pass in valid value!')
    }
    this.addReport(value)
  }

  // company will only have 1 Accounting department, set to Singleton by adding private to constructor
  private constructor(id: string, private reports: string[]) {
    // whenever you add a constructor in an inheriting class you need to call super() first
    // this initialises the base classes constructor
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  static getInstance() {
    if(AccountingDepartment.instance) {
      return this.instance
    }
    this.instance = new AccountingDepartment('id1', [])
    return this.instance
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id)
  }

  // overriding base class
  addEmployee(name: string) {
    if (name === 'Drew') {
      return
    }
    // wouldnt have direct access if it was private
    this.employees.push(name)
  }

  addReport(text: string) {
    this.reports.push(text)
    this.lastReport = text
  }

  printReports() {
    console.log(this.reports)
  }
}

// static methods can be called directly on the class without the need for the new keyword
// can access static variables as well.
const employee1 = Department.createEmployee('Static')
console.log(employee1, Department.fiscalYear)

// create new JS object based on class
const it = new ITDepartment('id2', ['Drew']);
it.addEmployee('Drew')
it.addEmployee('John')
it.describe()
it.printEmployeeInformation()

// const accounting = new AccountingDepartment('id1', []);
const accounting = AccountingDepartment.getInstance() // can only get one instance, since you cant get an instance when one has already been instantiated

// will add another employee without using the addEmployee method.
// thats why you set it as private above
// accounting.employees[2] = 'Jane'
accounting.addEmployee('John')
// overridden in inherited class, should not add Drew
accounting.addEmployee('Drew')
// console.log(accounting.mostRecentReport) // Error thrown since there is none
accounting.addReport('Report 1')
// getters and setters are treated as properties, not methods
accounting.mostRecentReport = 'Report 2'
console.log(accounting.mostRecentReport)
// accounting.printReports()
// accounting.printEmployeeInformation()
accounting.describe()
