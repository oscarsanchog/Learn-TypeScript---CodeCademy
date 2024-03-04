//! Type Narrowing

//* Union types narrowing
/* Dado que una variable de un tipo de unión puede asumir uno de varios tipos diferentes, puede ayudar a TypeScript a 
inferir el tipo de variable correcto mediante la reducción de tipos. Para limitar una variable a un tipo específico, 
implemente una protección de tipo. Utilice el operador typeof con el nombre de la variable y compárelo con el tipo que 
espera para la variable.*/

const choices: [string, string] = ['NO', 'YES'];

const processAnswer = (answer: number | boolean) => {
  typeof answer === 'number' && console.log(choices[answer]);
  typeof answer === 'boolean' && (answer ? console.log(choices[1]) : console.log(choices[0]))
} // con el typeof verifica si el parametro es número o buleano 

processAnswer(true);   // Prints "YES"
processAnswer(0);      // Prints "NO"


//* Type Guard
/* Una protección de tipo TypeScript es una declaración condicional que evalúa el tipo de una variable. Se puede 
implementar con el operador typeof seguido del nombre de la variable y compararlo con el tipo esperado para la variable. */
// A type guard implemented with the typeof operator
let age = 10.5678;

if (typeof age === 'number') {
  age.toFixed();
}

console.log(age);

/* El operador typeof se puede utilizar para implementar una protección de tipo TypeScript para evaluar el tipo de una
variable que incluye NÚMERO, CADENA O BOOLEANO */


//* Type guard con operador in
/* Si una variable es de tipo unión, TypeScript ofrece otra forma de protección de tipos utilizando el operador in 
para comprobar si la variable tiene una propiedad particular. */

/*
In this example, 'swim' in pet uses the 'in' operator to check if the property .swim is present on pet. 
TypeScript recognizes this as a type guard and can successfully type narrow this function parameter.
*/
type Fish = {
  swim: () => void;
}

type Bird = {
  fly: () => void;
}

function move(pet: Fish | Bird) {
  if ('swim' in pet) {
    return pet.swim();
  }
  return pet.fly();
}


//* Type Guard if-else Statement
/* Si una variable es de tipo unión, se puede implementar una protección de tipos como una expresión condicional en 
una declaración if. Si una declaración else acompaña a la declaración if, TypeScript inferirá que el bloque else 
sirve como protección de tipos para los tipos de miembros restantes de la unión. */

function roughAge(age: number | string) {
  if (typeof age === 'number') { // In this block, age is known to be a number
    console.log(Math.round(age));
  } else { // el tipado del parámmetro será string
    console.log(age.split(".")[0]);
  }
}
roughAge('3.5');  // Prints "3"
roughAge(3.5);    // Prints 4


//* Type Guard con if statement en un retorno de función
/* Se puede implementar una protección de tipos como una expresión condicional en una declaración if. Si el bloque if 
 contiene una declaración de retorno y no va seguido de un bloque else, TypeScript inferirá el resto del bloque de 
 código fuera del bloque de declaración if como protección de tipo para los tipos de miembros restantes de la unión. */

 function formatAge(age: number | string) {
  if (typeof age === 'number') {
    return Number(age.toFixed()); // age must be a number
  }
  return age; // age must not be a number (a string)
}
console.log(formatAge(3.5));    // Prints "4"
console.log(formatAge('3.5')); // Prints "3.5"

