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
    const celdasIniciales = [];

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
            input.style.backgroundColor = 'white';
            

            // Establecer el valor inicial desde la matriz proporcionada
            if (initialMatrix[i][j] !== 0) {
                input.value = initialMatrix[i][j].toString();
                input.disabled = true; // Deshabilitar la edición de celdas iniciales
                input.style.backgroundColor = "grey";
                celdasIniciales.push({ fila: i, columna: j });
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
                if(verifieSudoku(sudokuMatrix)){
                    alert('terminaste canson')
                }
                
                
                seeBoard();
                if (this.value === '') {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }

            });
            //event kistener para el foco del input selecciona filas y columnas pinta del color enviado, ''
            input.addEventListener('focus', function() {
                pintarCeldaRojo(i, j, alertBadInput(seeBoard(), i, j, this.value));
                pintarCeldaFilaColumna(i,j, '#ECD007',this.value);
                if(verifieSudoku(initialMatrix)){
                    alert('terminaste canson')
                }
                
                

            });
            
            // Event listener para cuando el input pierde el foco
            input.addEventListener('blur', function() {
                //pintarCeldaFilaColumna(i,j, 'white',this.value);
                //this.style.color = '';
                if(verifieSudoku(initialMatrix)){
                    alert('terminaste canson')
                }
                const esCeldaInicial = celdasIniciales.some(celda => celda.fila === i && celda.columna === j);
                if (!esCeldaInicial) {
                    console.log('celda:'+i+':'+j);
                }
            });

            

            cell.appendChild(input);
            sudokuBoard.appendChild(cell);
        }
    }
}
//this is for upload files valid sudoku boards

function checkRowForDuplicates(matrix, row) {
    let testArray = [];
    for (let i = 0; i < 9; i++) {
        testArray.push(matrix[row][i]);
    }
    testArray = testArray.filter(num => num !== 0);
    return new Set(testArray).size != testArray.length;
}

function checkColumnForDuplicates(matrix, column) {
    let testArray = [];
    for (let i = 0; i < 9; i++) {
        testArray.push(matrix[i][column]);
    }
    testArray = testArray.filter(num => num !== 0);
    return new Set(testArray).size != testArray.length;
}

function checkSubgridForDuplicates(board, row, col) {
    let testBoard = [];

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            testBoard.push(board[i][j]);
        }
    }
    testBoard = testBoard.filter(num => num !== 0);
    return new Set(testBoard).size != testBoard.length;
}

function isValidSudokuDocument(contents) {
    const lines = contents.split('\n');

    // Validar y convertir cada línea en un array de números
    const arrayOfArrays = contents.split('\n').map(line =>
        line.trim().split('').map(char => (char === '-' ? 0 : Number(char)))
    );

    // //verificar que sea un sudoku valido
    for(let i =0; i<9; i++){
        if(checkRowForDuplicates(arrayOfArrays, i)){
            alert("No tamos melos en las filas brodel");
            return false;
        }
        if(checkColumnForDuplicates(arrayOfArrays, i)){
            alert("No tamos melos en las comunas brodel");
            return false;
        }
    }
    // for(let i = 0; i<9; i+3){
    //     for(let j = 0; j<9; j+3){
    //         if(checkSubgridForDuplicates(arrayOfArrays, i, j)){
    //             alert("No tamos melos en los sectores brodel");
    //             return false;
    //         }
    //     }
    // }

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
                    alert('El documento no cumple con los requisitos para procesarse.');
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

function pintarCeldaFilaColumna(fila, columna, color, num) {
    // No pintar la celda específica
    // const cell = document.getElementById(`cell-${fila}-${columna}`);
    // cell.style.backgroundColor = color;

    // // Pintar la celda de gris
    // const cell = document.getElementById(`cell-${fila}-${columna}`);
    // cell.style.backgroundColor = color;

    // Pintar la fila del color recibido
    for (let j = 0; j < 9; j++) {
        const rowCell = document.getElementById(`cell-${fila}-${j}`);
        rowCell.style.backgroundColor = color;
    }

    // Pintar la columna del color recibido
    for (let i = 0; i < 9; i++) {
        const colCell = document.getElementById(`cell-${i}-${columna}`);
        colCell.style.backgroundColor = color;
    }
    //pintar el sector del color recibido
    const sectorStartRow = Math.floor(fila / 3) * 3;
    const sectorStartCol = Math.floor(columna / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const sectorCell = document.getElementById(`cell-${sectorStartRow + i}-${sectorStartCol + j}`);
            sectorCell.style.backgroundColor = color;
        }
    }
    if(alertBadInput(sudokuMatrix,fila,columna,num)){
        const cell = document.getElementById(`cell-${fila}-${columna}`);
        cell.style.backgroundColor = 'white';
    } else{
        const cell = document.getElementById(`cell-${fila}-${columna}`);
        cell.style.backgroundColor = 'red';
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

//lo heavy
function verifieSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (Number(board[row][col]) === 0) {
                // Si alguna celda contiene 0, el Sudoku no está completo
                return false;
            }
        }
    }
    // Si no se encontró ninguna celda con 0, el Sudoku está completo
    return true;
}



