let sudokuMatrix = new Array(9);
for (let i = 0; i < 9; i++) {
    sudokuMatrix[i] = new Array(9);
}
document.addEventListener('DOMContentLoaded', function renderSudokuBoard() {
    const sudokuBoard = document.getElementById('sudoku-board');

    // Loop through each row generate row for the sudoku
    for (let i = 0; i < 9; i++) {
        // Loop through each column generate columns for the sudoku
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'bg-gray-300 flex items-center justify-center h-12 w-12';

            if (j % 3 === 2) cell.classList.add('border-r-2', 'border-black');
            if (i % 3 === 2) cell.classList.add('border-b-2', 'border-black');
            if (i % 3 === 0) cell.classList.add('border-t-2', 'border-black');
            if (j % 3 === 0) cell.classList.add('border-l-2', 'border-black');


            // Create an input field for sudoku board entries
            const input = document.createElement('input');
            input.type = 'char';
            input.style.width = '50%';
            input.style.height = '50%';
            input.style.textAlign = 'center';

            input.addEventListener('input', function (e) {
                // Aplica las restricciones necesarias aquí del sudoku board
                if (!/^[1-9]?$/.test(this.value)) {
                    this.value = '';
                }
                console.log("fila: " + i + "\n" + "Columna: " + j)
                console.log(this.value)
                console.log(this.Array)
                alertBadInput(seeBoard(), i, j, this.value)
                seeBoard();
                if (this.value === '') {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }
            });

            cell.appendChild(input);
            sudokuBoard.appendChild(cell);
        }
    }
})

function renderSudokuBoardFile(initialMatrix) {
    const sudokuBoard = document.getElementById('sudoku-board');

    // Limpiar el contenido actual del tablero 0 - rederecia de Nan
    sudokuBoard.innerHTML = '';

    // Loop through each row generate row for the sudoku
    for (let i = 0; i < 9; i++) {
        // Loop through each column generate columns for the sudoku
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'bg-gray-300 flex items-center justify-center h-12 w-12';

            if (j % 3 === 2) cell.classList.add('border-r-2', 'border-black');
            if (i % 3 === 2) cell.classList.add('border-b-2', 'border-black');
            if (i % 3 === 0) cell.classList.add('border-t-2', 'border-black');
            if (j % 3 === 0) cell.classList.add('border-l-2', 'border-black');

            // Crear un campo de entrada para las entradas del tablero de Sudoku
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = '1';
            input.style.width = '50%';
            input.style.height = '50%';
            input.style.textAlign = 'center';

            // Establecer el valor inicial desde la matriz proporcionada
            if (initialMatrix[i][j] !== 0) {
                input.value = initialMatrix[i][j].toString();
                input.disabled = true; // Deshabilitar la edición de celdas iniciales
            }

            input.addEventListener('input', function (e) {
                // Aplicar las restricciones necesarias aquí del sudoku board
                if (!/^[1-9]?$/.test(this.value)) {
                    this.value = '';
                }
                console.log("fila: " + i + "\n" + "Columna: " + j)
                console.log(this.value)
                console.log(this.Array)
                alertBadInput(seeBoard(), i, j, this.value)
                seeBoard();
                if (this.value === '') {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }

            });

            cell.appendChild(input);
            sudokuBoard.appendChild(cell);
        }
    }
}

function isValidSudokuDocument(contents) {
    const lines = contents.split('\n');

    // Verificar que haya exactamente 9 líneas
    if (lines.length !== 9) {
        return false;
    }

    // Verificar que cada línea tenga exactamente 9 caracteres
    const validCharacters = /^[-1-9]$/;
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.length !== 9 || !trimmedLine.split('').every(char => validCharacters.test(char))) {
            return false;
        }
    }

    return true;
}

function loadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        alert("Archivo cargado exitosamente");
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const contents = e.target.result;

                if (!isValidSudokuDocument(contents)) {
                    console.error('El documento no cumple con los requisitos para procesarse.');
                    return;
                }

                // Validar y convertir cada línea en un array de números
                const arrayOfArrays = contents.split('\n').map(line =>
                    line.trim().split('').map(char => (char === '-' ? 0 : Number(char)))
                );
                sudokuMatrix = arrayOfArrays

                console.log("Contenido del archivo:", contents); // Registrar el contenido del archivo
                console.log("Líneas procesadas:", arrayOfArrays); // Registrar las líneas procesadas

                // Llamar a la función con la matriz procesada
                renderSudokuBoardFile(arrayOfArrays);
            } catch (error) {
                console.error('Error al procesar el archivo:', error.message);
            }
        };

        reader.readAsText(file);
    }
}

function seeBoard() {
    const sudokuBoard = document.getElementById('sudoku-board');
    const inputs = sudokuBoard.querySelectorAll('input');
    let index = 0;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = parseInt(inputs[index].value);
            sudokuMatrix[i][j] = value;
            index++;
        }
    }
    console.log(sudokuMatrix)
    return sudokuMatrix
}


function alertBadInput(tablero, fila, columna, numero) {
    let numeroRepetidoEnFila = false;
    let numeroRepetidoEnColumna = false;
    let numeroRepetidoEnSector = false;

    // Verificar repetición en la fila
    for (let i = 0; i < 9; i++) {
        if (Number(tablero[fila][i]) === Number(numero) && i !== columna) {
            console.log("Se encontró el número repetido en la misma fila en: " + fila + ":" + columna);
            numeroRepetidoEnFila = true;
            break;
        }
    }

    // Verificar repetición en la columna
    for (let i = 0; i < 9; i++) {
        if (Number(tablero[i][columna]) === Number(numero) && i !== fila) {
            console.log("Se encontró el número repetido en la misma columna en: " + fila + ":" + columna);
            numeroRepetidoEnColumna = true;
            break;
        }
    }

    // Verificar repetición en el sector primera fila
    if (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    if (fila >= 0 && fila <= 2 && columna >= 3 && columna <= 5) {
        for (let i = 0; i < 3; i++) {
            for (let j = 3; j < 5; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    if (fila >= 0 && fila <= 2 && columna >= 4 && columna <= 8) {
        for (let i = 0; i < 3; i++) {
            for (let j = 4; j < 8; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }

    //Segunda fila de sectores
    if (fila >= 3 && fila <= 5 && columna >= 0 && columna <= 2) {
        for (let i = 3; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    if (fila >= 3 && fila <= 5 && columna >= 3 && columna <= 5) {
        for (let i = 3; i < 5; i++) {
            for (let j = 3; j < 6; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    if (fila >= 3 && fila <= 5 && columna >= 4 && columna <= 8) {
        for (let i = 3; i < 5; i++) {
            for (let j = 6; j < 9; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    //Verificacion de sector tercera fila
    if (fila >= 4 && fila <= 8 && columna >= 0 && columna <= 2) {
        for (let i = 4; i < 8; i++) {
            for (let j = 0; j < 3; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    if (fila >= 4 && fila <= 8 && columna >= 3 && columna <= 5) {
        for (let i = 4; i < 8; i++) {
            for (let j = 3; j < 6; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    if (fila >= 4 && fila <= 8 && columna >= 4 && columna <= 8) {
        for (let i = 4; i < 8; i++) {
            for (let j = 6; j < 9; j++) {
                if (Number(numero) === Number(tablero[i][j]) && (i !== fila || j !== columna)) {
                    console.log("El número se repite en el mismo sector en: " + fila + ":" + columna);
                    numeroRepetidoEnSector = true;
                    break;
                }
            }
        }
    }
    

    // Pintar la celda de rojo si hay una repetición
    if (numeroRepetidoEnFila || numeroRepetidoEnColumna || numeroRepetidoEnSector) {
        pintarCeldaRojo(fila, columna);
    }
}

function pintarCeldaRojo(fila, columna) {
    // Obtener la celda correspondiente y aplicar el estilo
    const celda = document.querySelector(`#sudoku-board > div:nth-child(${fila * 9 + columna + 1}) > input`);
    celda.style.backgroundColor = 'red';
    celda.style.color = 'white';
}


