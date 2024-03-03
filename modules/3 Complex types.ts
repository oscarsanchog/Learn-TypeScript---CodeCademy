//! Tipos complejos

//* Emuns:
// Se pueden definir un set de posibles valores limitados para una variable 
enum MaritalStatus {
  Single,
  Married,
  Separated,
  Divorced
}

let employee: [string, MaritalStatus, number] = [
  'Bob',
  MaritalStatus.Married,
  39
]

console.log(employee); // ['Bob', 1, 39] Sale 1 porque el valor Married está ubicado en el índice 1. Por defecto los 
//enums tienen un valor numérico. También puede ser de string si así lo explicito.

//* Para que no me salga 1, sino que 'Married' puedo tipar los enums como un number o como un string
// number:
enum ClassGrade {
  Junior = 9,
  Senior // Este segundo valor tendrá el valor de 10
}

// string:
enum ClassName {
  Junior = 'junior',
  Senior = 'senior'
}

const studentClass: ClassName = ClassName.Junior
const studentGrade: ClassGrade = ClassGrade.Junior

console.log(`I am a ${studentClass} in ${studentGrade}th grade`); // I am a junior in 9th grade

//* Enumeración de los enums
// Puedo cambiar la enumeración de los enums, para que en vez de comenzar con 0, comiencen con x
enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday
} 

// También puedo asignarles valores específicos explícitamente
enum Grades {
  A = 90,
  B = 80,
  C = 70,
  D = 60
}

// Mezcla de valores explícitos e implícitos
enum Prizes {
  Pencil = 5,
  Ruler,     // value is 6
  Eraser = 10,
  Pen        // value is 11
};

const day: Weekdays = Weekdays.Wednesday
const grade: Grades = Grades.B
const prize: Prizes = Prizes.Pen
console.log(`On day ${day} of the week, I got ${grade} on my test! I won a prize with ${prize} points!`);

//* Caso: Se le puede asignar un valor numérico válido a una variable que tiene un tipo enum numérico:
enum Weekend {
  Friday = 5,
  Saturday,
  Sunday
};

// Assign a valid value of Weekend
const today: Weekend = 7;       // No da error porque el 7 está dentro de enum (se refiere a Sunday)
console.log(`Today is the ${today}th day of the week!`);
// Prints "Today is the 7th day of the week!"
/* Aunque en esencia Weekend es una enumeración que asigna valores numéricos consecutivos a sus miembros, al utilizarla como tipo para la variable today, estás indicando explícitamente que today debe ser un valor de la enumeración Weekend y no simplemente un número arbitrario.

Esta práctica puede hacer que el código sea más legible y mantenible, ya que facilita la comprensión del propósito de 
la variable today y ayuda a prevenir errores al limitar el conjunto de valores válidos que puede tomar. Además, al 
utilizar un tipo enumerado, se obtiene un mayor nivel de documentación intrínseca en el código, ya que los nombres de 
los miembros de la enumeración (Friday, Saturday, Sunday) proporcionan contexto sobre el significado de los valores. */

//* Case: A diferencia de los enums numéricos, los enums de strings no permiten ser asignados a algunos de sus miembros 
//* por su significado
enum MaritalStatus2 {
  Single = 'SINGLE',
  Married = 'MARRIED',
  Separated = 'SEPARATED',
  Divorced = 'DIVORCED',
  Widowed = 'WIDOWED'
};

// Assign a string to a string enum type
let eligibility: MaritalStatus2;
// eligibility = 'SEPARATED' // Error: Type '"SEPARATED"' is not assignable to type 'MaritalStatus'.

eligibility = MaritalStatus2.Separated;  // No error


//* Object types
// Se puede definir los tipos de las propiedades en un objeto así:
let car: {make: string, model: string, year: number}

car = {make: 'Toyota', model: 'Camry', year: 2020}
// car = {make: 'Toyota', mode: 'Camry', year: 2020} // error porque la palabra es model, no mode.

//* Type Alias
/* En lugar de volver a declarar el mismo tipo de objeto complejo en todos los lugares donde se utiliza, TypeScript 
proporciona una forma sencilla de reutilizar este tipo de objeto con la palabra type. */
type Student = {
  name: string
  age: number
  courses: string[]
}

const boris: Student = {name: 'Boris', age: 27, courses: ['JavaScript', 'TypeScript']}

//* Case: Alias con referencia múltiple
/* Se puede crear varios alias de tipos que definan el mismo tipo de datos y utilizar los alias como asignaciones a 
variables. */
// Esto también es un tipo alias con el mismo tipado de Student
type Employee = {
  name: string,
  age: number,
  courses: string[]  
}

let studentBoris: Student = {name: 'Boris', age: 35, courses: ['JavaScript', 'TypeScript']};
let employeeBoris: Employee = studentBoris;     // No error
console.log(studentBoris === employeeBoris);    // Prints true


//* Alias de tipo de función de TypeScript
/* En JavaScript, se puede asignar una función a una variable, y en TypeScript, se puede utilizar un alias de tipo de 
función para anotar una variable */

// Esto es un tipado alias de función:
type NumberArrayToNumber = (numberArray: number[]) => number

// Esta Función usa un tipado alias de función:
let sumAll: NumberArrayToNumber = function(numbers: number[]) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// Esta fn también usa el mismo tipado alias de función
let computeAverage: NumberArrayToNumber = function(numbers /* Se infiere el tipado del parametro */) {
  return sumAll(numbers) / numbers.length;
};

console.log(computeAverage([5, 10, 15]));   // Prints 10


//* Alias de tipo de función genérica
/* Una función puede tomar parámetros de tipos genéricos y devolver un tipo genérico. Para convertir una función en un
alias de tipo de función genérico, agregue corchetes angulares, <...> que contengan un símbolo de tipo genérico después
del nombre de la función y use el símbolo para anotar el tipo de parámetro y el tipo de retorno cuando corresponda. */

// Esto es un tipo de función genérica:
function findMiddleMember<M>(members: M[]): M {
  return members[Math.floor(members.length / 2)];
}

/* function findMiddleMember<M> tipado del parámetro (members: M[] un array del tipado que declaré): M retornará el mismo tipado {
  return members[Math.floor(members.length / 2)];
} */

// Función de llamada para una matriz de cadenas.
console.log(findMiddleMember<string>(['I', 'am', 'very', 'happy'])); // Prints "very". M toma el tipado de string

// Call function for an array of numbers
console.log(findMiddleMember<number>([210, 369, 102]));     // Prints 369. M toma el tipado de string


//* Tipado para un array unidimensional
// Es parecido a un tipo primitivo, solo que agregamos [] al final del tipo:
// zipcodes es un array de strings
let zipcodes: string[] = ['03255', '02134', '08002', '03063'];

// zipcodes.push(90210);
// Pushing a number to zipcodes will generate an error
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.

//* Tipado genérico para matriz unidimensional 
//El tipo de una matriz unidimensional en TypeScript se puede anotar con Array<X>
// Definición de un tipo genérico para un array unidimensional
type ArrayUnidimensional<T> = Array<T>;

// Uso del tipo genérico para un array de números
let numeros: ArrayUnidimensional<number> = [1, 2, 3, 4, 5]; // T toma el valor de números

// Uso del tipo genérico para un array de cadenas
let palabras: ArrayUnidimensional<string> = ["Hola", "Mundo"]; // ahora de strings


//* Tipado para matriz multidimensional
/* El tipo de una matriz multidimensional se puede anotar agregando un [] adicional para cada dimensión adicional de 
la matriz. */
// one-dimensional arrays
let zipcodesNH: string[] = ['03255', '03050', '03087', '03063'];
let zipcodesMA: string[] = ['02334', '01801'];

// two-dimensional array
let zipcodes2: string[][] = [zipcodesNH]; // Es un array con un array de strings

// Pushing a one-dimensional array to a two-dimensional array
zipcodes2.push(zipcodesMA);
console.log(zipcodes); // prints [["03255", "03050", "03087", "03063"], ["02334", "01801"]]

//* Inicialización de un array vacío
// Una matriz de cualquier dimensión se puede inicializar como una matriz vacía sin generar ningún error.
// one-dimensional empty array
let axis: string[] = [];

// two-dimensional empty array
let coordinates: number[][] = [];

axis.push('x');
console.log(axis);        // prints ["x"]

coordinates.push([3, 5]);
coordinates.push([7]);
console.log(coordinates); // prints [[3, 5], [7]]


//* Tipado de tupla
/* Un array que tiene un tamaño fijo de tipos de elementos similares o diferentes dispuestos en una secuencia 
particular se define como una tupla en TypeScript. */
let header: string[] = ['Name', 'Age', 'Smoking', 'Salary'];
// This is a tuple
let profile: [string, number, boolean, number] = ['Kobe', 39, true, 150000];

// profile[2] = 'false';   // Error: Type 'string' is not assignable to type 'boolean'.
// profile[3] = null;      // Error: Type 'null' is not assignable to type 'number'.

/* Una tupla en Typecript se declara con un número fijo de elementos y, por lo tanto, no se puede asignar a una tupla 
con un número diferente de elementos. De manera similar, una tupla mantiene un orden estricto de sus elementos y, por 
lo tanto, se aplica el tipo de cada elemento. Se generará un error de transcompilador si se viola alguna de estas 
condiciones. */
//let employee2: [string, number] = ['Manager', null];
// Error: Type 'null' is not assignable to type 'number'.

//let grade2: [string, number, boolean] = [ 'TypeScript', 85, true, 'beginner'];
/*
Error: Type '[string, number, true, string]'
is not assignable to type '[string, number, boolean]'.
Source has 4 element(s) but target allows only 3.
*/

//* Asignación de arrays de tuplas 
/* Aunque una tupla puede tener todos los elementos del mismo tipo y parece una matriz, una tupla sigue siendo de su 
propio tipo. Una tupla no puede expandirse, mientras que una matriz sí. Por lo tanto, asignar una matriz a una tupla 
que coincida con el mismo tipo y longitud generará un error. */

// This is a tuple
let eventDate: [string, string] = ['January', '2'];

// This is an array
let newDate: string[] = ['January', '12'];

//eventDate = newDate;
/*
Error: Type 'string[]' is not assignable to type '[string, string]'.
Target requires 2 element(s) but source may have fewer.
*/

//* Inferencia de tipo de un array
/* Cuando se declara una variable de matriz sin una anotación de tipo explícita, TypeScript infiere automáticamente 
que dicha instancia de variable es una matriz en lugar de una tupla. */
let mixed = ['one', 2, 3, 'four'];     
mixed[4] = 5;                 // no error because an array is expandable
console.log(mixed);           // prints ["one", 2, 3, "four", 5]


//* Inferencia de tipo de un array en tupla .concat()
/* El método JavaScript, .concat() se puede invocar en una tupla de TypeScript y esto produce un nuevo tipo de 
matriz en lugar de una tupla. */

// This is a tuple
const threeWords: [string, number, string] = ['Won', 5, 'games'];

// Calling .concat() on a tuple returns an array
let moreWords = threeWords.concat(['last', 'night']);

// An array is expandable
moreWords[5] = ('!');

console.log(moreWords);// ["Won", 5, "games", "last", "night", "!"]

//* Explicitar el tipado de un rest parameter
/* TypeScript asigna implícitamente a un parámetro de descanso dentro de una función un tipo de matriz de any[]. */
/* const sumAllNumbers = (...numberList): number => { // Error: Rest parameter 'numberList' implicitly has an 'any[]' type.
  let sum = 0;
  for (let i=0; i < numberList.length; i++) {
    sum += numberList[i];
  }
  return sum;
}

Notice third argument is a string
console.log(sumAllNumbers(100, 70, '30'));
 Prints a string "17030" instead of a number 200 */

/* La anotación explícita de un rest parameter de una función alertará a TypeScript para que verifique la 
inconsistencia de tipos entre el parámetro de descanso y los argumentos de llamada de función. */
const sumAllNumbers = (...numberList: number[]): number => {
  let sum = 0;
  for (let i=0; i < numberList.length; i++) {
    sum += numberList[i];
  }
  return sum;
}

//console.log(sumAllNumbers(100, 70, '30')); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

//* Sintaxis de spread del tipo de tupla 
/* La sintaxis spread se puede usar con una tupla como argumento para una llamada de función cuyos tipos de 
parámetros coincidan con los de los elementos de la tupla. */

function modulo(dividend: number, divisor: number): number {
  return dividend % divisor;
}

const numbers: [number, number] = [6, 4];

// Call modulo() with a tuple
//console.log(modulo(numbers));
// Error: Expected 2 arguments, but got 1. Recibe el array, no los elementos Dentro del array
// Prints NaN

// Call modulo() with spread syntax
console.log(modulo(...numbers));
// No error, prints 2 Recibe los elementos dentro del array, que sí son numeros.
