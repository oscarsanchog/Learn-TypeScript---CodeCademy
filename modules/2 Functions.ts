//! FUNCIONES

//* Declarar tipos de los parámetros de las funciones:
function greet(noun: string) {
  console.log(`Hello ${noun}!`);
}
greet('World') // Hello World
//greet(2010) // error

//* Parámetro opcional
function greet2(name?: string) {
  console.log(`Hello ${name || 'stranger'}!`);
}
greet2() // Hello stranger!

//* Inferencia de los parámmetros por defecto
function suma(number = 1) {
  console.log(4 + number);
}
suma() // 5
suma(4) // 8
// suma('5') // Error porque TS infiere que el parámetro es de tipo number, puesto que fue el valor por defecto.

//* Inferencia de las funciones por su return
const factOrFiction = () => Math.random() >= .5 ? true : false

const answer = factOrFiction() // Se infiere que answer es de tipo boolean porque lo que retorna factOrFiction() es un boolean
// const answer2: string = factOrFiction() // type error. No puede ser string

//* Si no retorna nada, infiere que es void
function sayHi() {
  console.log('Hi!');
}

//* Puedo forzar el tipo de dato que me devuelve una fn para que funcione como corresponda:
function trueOrFalse(value: boolean): boolean {
  if (value) return true
  //return 'false'// error porque quiero que sí o sí sea un buleano, no un string
  return false
}


//* Alias de tipo de función de TypeScript
/* En JavaScript, se puede asignar una función a una variable, y en TypeScript, se puede utilizar un alias de tipo de 
función para anotar una variable */

// Esto es un tipado alias de función:
type NumberArrayToNumber2 = (numberArray: number[]) => number

// Esta Función usa un tipado alias de función:
let sumAll2: NumberArrayToNumber2 = function(numbers: number[]) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

// Esta fn también usa el mismo tipado alias de función
let computeAverage2: NumberArrayToNumber2 = function(numbers /* Se infiere el tipado del parametro */) {
  return sumAll(numbers) / numbers.length;
};

console.log(computeAverage([5, 10, 15]));   // Prints 10


//* Alias de tipo de función genérica
/* Una función puede tomar parámetros de tipos genéricos y devolver un tipo genérico. Para convertir una función en un
alias de tipo de función genérico, agregue corchetes angulares, <...> que contengan un símbolo de tipo genérico después
del nombre de la función y use el símbolo para anotar el tipo de parámetro y el tipo de retorno cuando corresponda. */

// Esto es un tipo de función genérica:
function findMiddleMember2<M>(members: M[]): M {
  return members[Math.floor(members.length / 2)];
}

/* function findMiddleMember<M> tipado del parámetro (members: M[] un array del tipado que declaré): M retornará el mismo tipado {
  return members[Math.floor(members.length / 2)];
} */

// Función de llamada para una matriz de cadenas.
console.log(findMiddleMember2<string>(['I', 'am', 'very', 'happy'])); // Prints "very". M toma el tipado de string

// Call function for an array of numbers
console.log(findMiddleMember2<number>([210, 369, 102]));     // Prints 369. M toma el tipado de string