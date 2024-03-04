//! Interface type
/* TypeScript le permite escribir específicamente un objeto usando una interfaz que puede ser reutilizada por múltiples 
objetos. Para crear una interfaz, utilice la palabra clave interface seguida del nombre de la interfaz y el objeto 
escrito. */

interface Publication {
  isbn: string
  author: string
  publisher: string
}

//* Interface solo describe objetos
/* En TypeScript, los alias de tipos pueden definir tipos compuestos como objetos y uniones, así como tipos primitivos 
como números y cadenas; La interfaz, sin embargo, sólo puede definir objetos. La interfaz es útil para escribir objetos
escritos para programas orientados a objetos. */

// Type alias can define a union type
type ISBN = number | string;

// Type alias can define an object type
type PublicationT = {
  isbn: ISBN;
  author: string;
  publisher: string;  
}

// Interface can only define an object type
interface PublicationI {
  isbn: ISBN;
  author: string;
  publisher: string;
}

//* Interfaces para clases
/* Para aplicar una interfaz TypeScript a una clase, agregue la palabra clave implements después del nombre de la 
clase seguida del nombre de la interfaz. TypeScript comprobará y garantizará que el objeto realmente implemente todas 
las propiedades y métodos definidos dentro de la interfaz. */
interface Shape {
  area: number;
  computeArea: () => number;
}

const PI: number = 22 / 7

// La clase Circle implementa la interface Shape
class Circle implements Shape {
  radius: number;
  area: number;

  constructor(radius: number) {
    this.radius = radius;
    this.area = this.computeArea();
  }
  computeArea = (): number => {
    return PI * this.radius * this.radius;
  }
}

let target = new Circle(3);
console.log(target.area.toFixed(2));  // Prints "28.29"


//* Interface anidada
/* TypeScript permite anidar tanto los alias de tipo como la interfaz. Un objeto escrito con una interfaz anidada debe 
tener todas sus propiedades estructuradas de la misma manera que la definición de la interfaz. */

// This is a nested interface
interface Course {
  description: {
    name: string;
    instructor: {
      name: string;
    }
    prerequisites: {
      courses: string[];
    }
  }
}

class myCourse implements Course {
  description = {
    name: 'React.js',
    instructor: {
      name: 'Dai'
    },
    prerequisites: {
      courses: ['JavaScript', 'TypeScript']
    }
  }
}


//* Anidando interfaces dentro de una interface
/* Dado que las interfaces se pueden componer, TypeScript le permite anidar interfaces dentro de una interfaz. */

// Date is composed of primitive types
interface Date { 
  month: number;
  day: number;
  year: number
}

// Passport is composed of primitive types and nested with another interface
interface Passport { 
  id: string;
  name: string;
  citizenship: string;
  expiration: Date; // another interface
}

// Ticket is composed of primitive types and nested with another interface
interface Ticket {
  seat: string;
  expiration: Date;
}

// TravelDocument is nested with two other interfaces
interface TravelDocument {
  passport: Passport;
  ticket: Ticket;
}

//* Herencia de una interface
/* Al igual que las clases de JavaScript, una interfaz puede heredar propiedades y métodos de otra interfaz utilizando 
la palabra clave extends. Se puede acceder a los miembros de la interfaz heredada en la nueva interfaz. */

interface Brand {
  brand: string;
}

// Model inherits property from Brand
interface Model extends Brand {
  model: string;
}

// Car has a Model interface
class Car implements Model {
  brand;
  model;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }
  log() {
    console.log(`Drive a ${this.brand} ${this.model} today!`);
  }
}

const myCar: Car = new Car('Nissan', 'Sentra'); 
myCar.log(); // Prints "Drive a Nissan Sentra today!"


//* Firma del índice de interfaz
/* Se supone que los nombres de propiedades de un objeto son cadenas, pero también pueden ser números. Si no conoce de 
antemano los tipos de estos nombres de propiedad, TypeScript le permite usar una firma de índice para especificar el 
tipo del nombre de propiedad dentro de un objeto. Para especificar una firma de índice, utilice corchetes, [...], para 
rodear la notación de tipo del nombre de la propiedad. */

interface Code {
  [code: number]: string;
}
const codeToStates: Code = {603: 'NH', 617: 'MA'};

interface ReverseCode {
  [code: string]: number;
}
const stateToCodes: ReverseCode = {'NH': 603, 'MA': 617};


//* Propiedades opcionales de las interfaces
/* TypeScript le permite especificar propiedades opcionales dentro de una interfaz. Esto es útil en situaciones donde 
no todas las propiedades de los objetos tienen valores asignados. Para indicar si una propiedad es opcional, agregue 
un símbolo ?  después del nombre de la propiedad antes de los dos puntos. */

interface Profile {
  name: string; 
  age: number;
  hobbies?: string[];
}

// The property, hobbies, is optional, but name and age are required.
const teacher: Profile = {name: 'Tom Sawyer', age: 18}; 