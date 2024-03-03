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

//* Puedo forzar el tipo de dato que me devuelve una Fn para que funcione como corresponda:
function trueOrFalse(value: boolean): boolean {
  if (value) return true
  //return 'false'// error porque quiero que sí o sí sea un buleano, no un string
  return false
}