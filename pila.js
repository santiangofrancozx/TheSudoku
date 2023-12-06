class Pila {
    constructor() {
      this.items = [];
    }
  
    // Método para agregar un elemento a la pila
    push(elemento) {
      this.items.push(elemento);
    }
  
    // Método para quitar el elemento superior de la pila
    pop() {
      if (this.isEmpty()) {
        return "La pila está vacía";
      }
      return this.items.pop();
    }
  
    // Método para obtener el elemento superior de la pila sin quitarlo
    peek() {
      if (this.isEmpty()) {
        return "La pila está vacía";
      }
      return this.items[this.items.length - 1];
    }
  
    // Método para verificar si la pila está vacía
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Método para obtener el tamaño de la pila
    size() {
      return this.items.length;
    }
  
    // Método para imprimir la pila
    display() {
      console.log(this.items);
    }
  }