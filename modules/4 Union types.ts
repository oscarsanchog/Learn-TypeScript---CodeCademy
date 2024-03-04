//! Union Type
/* TypeScript le permite combinar tipos específicos como un tipo de unión. */
let hello: any // Cualquier tipado. Tratar de evitar
let typeHello: string | number // este es union type. Puede ser string o numero

typeHello = 'Hello'
typeHello = 2 // no hay error


//* Union Type en retorno de función
/* TypeScript infiere el tipo de retorno de una función, por lo tanto, si una función devuelve más de un tipo de datos,
 TypeScript inferirá que el tipo de retorno es una unión de todos los tipos de retorno posibles. Si desea asignar el 
 valor de retorno de la función a una variable, escriba la variable como una unión de tipos de retorno esperados. */

 const popStack = (stack: string[]) => { // infiere que el retorno será string o null
  if (stack.length) {
    return stack[stack.length-1]; // return type is string
  } else {
    return null;      // return type is null
  }
};

let toys: string[] = ['Doll', 'Ball', 'Marbles'];
let emptyBin: string[] = [];

let item: string | null = popStack(toys); // item has union type
console.log(item);  // Prints "Marbles"

item = popStack(emptyBin);
console.log(item);  // Prints null


//* Union types de array
/* TypeScript le permite declarar una unión de un array de diferentes tipos. Recuerde encerrar la unión entre 
paréntesis, (...) y agregar corchetes, [] después del paréntesis de cierre. */

const removeDashes = (id: string | number) => {
  if (typeof id === 'string') {
    id = id.split('-').join('');
    return parseInt(id);
  } else {
    return id;
  }
} 
// This is a union of array types
let ids: (number | string)[] = ['93-235-66', '89-528-92'];
let newIds: (number | string)[] = [];

for (let i = 0; i < ids.length; i++) {
  newIds[i] = removeDashes(ids[i]); // Convert string id to number id
}
console.log(newIds);  // Prints [9323566, 8952892]


//* Union Type Common Property Access
/* Como resultado de admitir una unión de múltiples tipos, TypeScript le permite acceder a propiedades o métodos 
que son comunes entre los tipos de miembros sin ningún error. */

let element: string | number[] = 'Codecademy';

// The .length property is common for string and array
console.log(element.length);      // Prints 10

// The .match method only works for a string type
console.log(element.match('my')); // Prints ["my"]

element = [3, 5, 1];
// The length property is common for string and array
console.log(element.length);      // Prints 3
// The .match method will not work for an array type
// console.log(element.match(5));  // Error: Property 'match' does not exist on type 'number[]'


//* Union of Literal Types
/* Puede declarar un tipo de unión que consta de tipos literales, como literales de cadena, literales numéricos o 
literales booleanos. Esto creará union types que serán más específicos y tendrán estados distintos. */
// This is a union of string literal types

type RPS = 'rock' | 'paper' | 'scissors' // Union de tipos literales

const play = (choice: RPS): void => {
  console.log('You: ', choice);

  let result: string = '';

  switch (choice) {
    case 'rock':
      result = 'paper';
      break;
    case 'paper':
      result = 'scissors';
      break;
    case 'scissors':
      result = 'rock';
      break;
  }
  console.log('Me: ', result);
}

const number = Math.floor(Math.random() * 3)

let choices2: [RPS, RPS, RPS] = ['rock', 'paper', 'scissors']; // El tipado quiere decir que es un array con rock, paper o scissors
play(choices2[number]); 

