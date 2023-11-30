let sudokuMatrix = new Array(9);
for (let i = 0; i < 9; i++) {
    sudokuMatrix[i] = new Array(9);
}
const sudokuMatrixTest = [
    [9, 6, 0, 0, 7, 4, 0, 0, 8],
    [1, 0, 8, 0, 2, 0, 6, 4, 9],
    [0, 5, 4, 0, 0, 0, 0, 0, 0],
    [8, 2, 1, 0, 3, 7, 0, 9, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [7, 0, 5, 0, 6, 1, 0, 2, 4],
    [0, 0, 0, 0, 0, 3, 0, 6, 0],
    [0, 0, 7, 0, 4, 0, 0, 0, 0],
    [6, 0, 2, 0, 9, 0, 1, 7, 3]
];

document.addEventListener('DOMContentLoaded', function () {
    renderSudokuBoardFile(sudokuMatrixTest);
});


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
            input.id = `cell-${i}-${j}`;
            input.className = "cell";
            

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
                pintarCeldaRojo(i, j, alertBadInput(seeBoard(), i, j, this.value))
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
//this is for upload files valid

function checkRowForDuplicates(matrix, row) {
    let testArray = [];
    for(let i =0; i < 10; i++){
        testArray.push(matrix[row][i]);
    }
    return testArray;
}

function checkColumnForDuplicates(matrix, column) {
    const columnArray = matrix.map(row => row[column]);
    const numbersInColumn = columnArray.filter(num => num !== 0);
    const uniqueNumbers = new Set(numbersInColumn);
    return numbersInColumn.length !== uniqueNumbers.size;
}

function checkSubgridForDuplicates(matrix, startRow, startCol) {
    const subgrid = [];
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            subgrid.push(matrix[i][j]);
        }
    }
    const numbersInSubgrid = subgrid.filter(num => num !== 0);
    const uniqueNumbers = new Set(numbersInSubgrid);
    return numbersInSubgrid.length !== uniqueNumbers.size;
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

    // Validar y convertir cada línea en un array de números
    const arrayOfArrays = contents.split('\n').map(line =>
        line.trim().split('').map(char => (char === '-' ? 0 : Number(char)))
    );

    // //verificar que sea un sudoku valido
      
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
                console.log(arrayOfArrays)
                console.log(typeof (arrayOfArrays))
                renderSudokuBoardFile(arrayOfArrays);
                
            } catch (error) {
                console.error('Error al procesar el archivo:', error.message);
            }
        };

        reader.readAsText(file);
    }
}
//for debbugin see board in console
function seeBoard() {
    const sudokuBoard = document.getElementById('sudoku-board');
    const inputs = sudokuBoard.querySelectorAll('input');
    let index = 0;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = parseInt(inputs[index].value);
            sudokuMatrix[i][j] = isNaN(value) ? 0 : value;
            index++;
        }
    }
    console.log(sudokuMatrix)
    return sudokuMatrix
}
//alerta bad inputs return false, all good return true
function alertBadInput(board, row, col, num) {
    const gridSize = 9;

    // Check row and column for conflicts
    for (let i = 0; i < 9; i++) {
        if (Number(board[row][i]) === Number(num) && i !== Number(col)) {
            console.log("Se encontró el número repetido en la misma fila en: " + row + ":" + col);
            //pintarCeldaRojo(row, col);
            return false;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (Number(board[i][col]) === Number(num) && i !== Number(row)) {
            console.log("Se encontró el número repetido en la misma columna en: " + row + ":" + col);
            //pintarCeldaRojo(row, col);
            return false;
        }
    }

    // Check the 3*3 subgrid for conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    console.log("start row: " + startRow);
    console.log("start Col: " + startCol);

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (Number(board[i][j]) === Number(num) && (i !== Number(row) || j !== Number(col))) {
                console.log("Numero repetido en sector");
                //pintarCeldaRojo(row, col);
                return false; // Conflict found
            }
        }
    }
    return true;
}
//identifie bad inputs and paint it red
function pintarCeldaRojo(fila, columna, booleanValue) {
    // Obtener la celda correspondiente y aplicar el estilo
    if (!booleanValue) {
        const celda = document.querySelector(`#sudoku-board > div:nth-child(${fila * 9 + columna + 1}) > input`);
        celda.style.backgroundColor = 'red';
        celda.style.color = 'white';
    }
}

//solve sudoku resursively algorithm
async function solveSudoku() {
    const gridSize = 9;
    const sudokuArray = [];

    // Fill the sudokuArray with input values from the grid
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    // Identify user-input cells and mark them
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }

    // Solve the sudoku and display the solution
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                // Fill in solved values and apply animation
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    //           await sleep(20); // Add a delay for visualization
                }
            }
        }
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
    }
}

function solveSudokuHelper(board) {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (alertBadInput(board, row, col, num)) {
                        board[row][col] = num;

                        // Recursively attempt to solve the Sudoku
                        if (solveSudokuHelper(board)) {
                            return true; // Puzzle solved
                        }

                        board[row][col] = 0; // Backtrack
                    }
                }
                return false; // No valid number found
            }
        }
    }

    return true; // All cells filled
}

