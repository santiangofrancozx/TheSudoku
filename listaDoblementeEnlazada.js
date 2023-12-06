class Nodo {
    constructor(dato) {
      this.dato = dato;
      this.anterior = null;
      this.siguiente = null;
    }
  }
  
  class ListaDoblementeEnlazada {
    constructor() {
      this.inicio = null;
      this.fin = null;
    }
  
    addFirst(dato) {
      const nuevoNodo = new Nodo(dato);
  
      if (!this.inicio) {
        this.inicio = nuevoNodo;
        this.fin = nuevoNodo;
      } else {
        nuevoNodo.siguiente = this.inicio;
        this.inicio.anterior = nuevoNodo;
        this.inicio = nuevoNodo;
      }
    }
  
    addLast(dato) {
      const nuevoNodo = new Nodo(dato);
  
      if (!this.inicio) {
        this.inicio = nuevoNodo;
        this.fin = nuevoNodo;
      } else {
        nuevoNodo.anterior = this.fin;
        this.fin.siguiente = nuevoNodo;
        this.fin = nuevoNodo;
      }
    }
  
    displayFirstToEnd() {
      let actual = this.inicio;
      while (actual) {
        console.log(actual.dato);
        actual = actual.siguiente;
      }
    }
    returnFirstToEnd() {
      let actual = this.inicio;
      let datos = [];
      while (actual) {
        datos.push(actual.dato);
        actual = actual.siguiente;
      }
      return datos;
    }
  
    displayEndToFirst() {
      let actual = this.fin;
      while (actual) {
        console.log(actual.dato);
        actual = actual.anterior;
      }
    }
    returnEndToFirst() {
      let actual = this.fin;
      let datos = [];
      while (actual) {
        datos.push(actual.dato)
        actual = actual.anterior;
      }
      return datos;
    }
    getLast() {
      if (this.fin) {
        return this.fin.dato;
      } else {
        return null; // La lista está vacía
      }
    }
  }
  
  
//   // Ejemplo de uso:
//   const listaDoble = new ListaDoblementeEnlazada();
  
//   listaDoble.agregarAlInicio(3);
//   listaDoble.agregarAlInicio(2);
//   listaDoble.agregarAlInicio(1);
  
//   listaDoble.agregarAlFinal(4);
//   listaDoble.agregarAlFinal(5);
  
//   console.log("Recorrido desde el inicio:");
//   listaDoble.imprimirDesdeInicio();
  
//   console.log("\nRecorrido desde el final:");
//   listaDoble.imprimirDesdeFinal();
  