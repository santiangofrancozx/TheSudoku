class Cola {
    constructor() {
      this.items = [];
    }
  
    // Método para agregar un elemento al final de la cola
    enqueue(elemento) {
      this.items.push(elemento);
    }
  
    // Método para quitar el elemento al frente de la cola
    dequeue() {
      if (this.isEmpty()) {
        return "La cola está vacía";
      }
      return this.items.shift();
    }
  
    // Método para obtener el elemento al frente de la cola sin quitarlo
    front() {
      if (this.isEmpty()) {
        return "La cola está vacía";
      }
      return this.items[0];
    }
  
    // Método para verificar si la cola está vacía
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Método para obtener el tamaño de la cola
    size() {
      return this.items.length;
    }
  
    // Método para imprimir la cola
    display() {
      console.log(this.items);
    }
  }
  
//   // Ejemplo de uso:
//   const miCola = new Cola();
  
//   miCola.enqueue(1);
//   miCola.enqueue(2);
//   miCola.enqueue(3);
  
//   console.log("Cola actual:");
//   miCola.imprimir(); // Salida: [1, 2, 3]
  
//   console.log("Elemento al frente de la cola:", miCola.front()); // Salida: 1
  
//   console.log("Quitando elemento al frente:", miCola.dequeue()); // Salida: 1
//   console.log("Cola después de dequeue:");
//   miCola.imprimir(); // Salida: [2, 3]
  