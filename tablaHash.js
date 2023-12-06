class HashTable {
    constructor(size = 100) {
      this.size = size;
      this.table = new Array(size);
    }
  
    // Función de hash simple para convertir una clave en un índice
    hash(key) {
      let hashValue = 0;
      for (let i = 0; i < key.length; i++) {
        hashValue += key.charCodeAt(i);
      }
      return hashValue % this.size;
    }
  
    // Método para agregar un valor a la tabla hash
    set(key, value) {
      const index = this.hash(key);
  
      if (!this.table[index]) {
        this.table[index] = [];
      }
  
      // Verificar si la clave ya existe en el array asociado al índice
      const existingIndex = this.table[index].findIndex((entry) => entry[0] === key);
  
      if (existingIndex !== -1) {
        // Si la clave ya existe, actualizar el valor
        this.table[index][existingIndex][1] = value;
      } else {
        // Si la clave no existe, agregar una nueva entrada al array
        this.table[index].push([key, value]);
      }
    }
  
    // Método para obtener un valor dado una clave
    get(key) {
      const index = this.hash(key);
  
      if (this.table[index]) {
        const entry = this.table[index].find((entry) => entry[0] === key);
  
        if (entry) {
          return entry[1]; // Devolver el valor asociado a la clave
        }
      }
  
      return undefined; // Si la clave no se encuentra, devolver undefined
    }
    delete(key) {
        const index = this.hash(key);
    
        if (this.table[index]) {
          const entryIndex = this.table[index].findIndex((entry) => entry[0] === key);
    
          if (entryIndex !== -1) {
            // Eliminar la entrada del array asociado al índice
            this.table[index].splice(entryIndex, 1);
          }
        }
      }

    deleteValue(key, valueToDelete) {
        const index = this.hash(key);
    
        if (this.table[index]) {
          const entryIndex = this.table[index].findIndex((entry) => entry[0] === key);
    
          if (entryIndex !== -1) {
            // Encontrar el índice del valor dentro del array asociado a la clave
            const valueIndex = this.table[index][entryIndex][1].indexOf(valueToDelete);
    
            if (valueIndex !== -1) {
              // Eliminar el valor del array asociado a la clave
              this.table[index][entryIndex][1].splice(valueIndex, 1);
            }
          }
        }
    }
}
  