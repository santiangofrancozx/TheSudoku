//import HashTable from './tablaHash.js';
let sudokuMatrix = new Array(9);
for (let i = 0; i < 9; i++) {
    sudokuMatrix[i] = new Array(9);
}
let initialMatrixTemporary;

let sugerys = new HashTable();
let history = new ListaDoblementeEnlazada();
let deshacer = new Pila();
const datosTabla = [
      {
        'type': 'input-delete',
        'valid': true,
        'num': 5,
        'row': 1,
        'col': 2
      },
      {
        'type': 'input-delete',
        'valid': false,
        'num': 7,
        'row': 3,
        'col': 4
      },
      // Agrega más entradas según sea necesario
    ];

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
    updateSugerys();
    
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
                input.style.backgroundColor = "#CDC9C8";
                celdasIniciales.push({ fila: i, columna: j });
                initialMatrixTemporary = initialMatrix;
                
            }
            

            input.addEventListener('input', function (e) {
                // Aplicar las restricciones necesarias aquí del sudoku board
                const inputType = e.inputType;
                if (!/^[1-9]?$/.test(this.value)) {
                    this.value = '';
                }
                
            
                console.log("fila: " + i + "\n" + "Columna: " + j)
                console.log(this.value)
                console.log(this.Array)
                
                pintarCeldaRojo(i, j, alertBadInput(seeBoard(), i, j, this.value))
                if(verifieSudoku(sudokuMatrix)){
                    alert('terminaste canson')
                }
                const valorAntes = this.value;
                if (inputType === 'insertText' && this.value !== '') {
                    addHistory({
                        'type': 'input-new',
                        'valid': alertBadInput(seeBoard(), i, j, this.value),
                        'num': this.value,
                        'row': i,
                        'col': j
                    })
                }
                if(alertBadInput(seeBoard(),i,j,this.value)){
                    deshacer.push({
                        'type': 'input-new',
                        'valid': alertBadInput(seeBoard(), i, j, this.value),
                        'num': this.value,
                        'row': i,
                        'col': j
                    })
                }

                seeBoard();
                if (this.value === '') {
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }
                

            });
            input.addEventListener('beforeinput', function (e) {
                // Capturar el valor antes de la acción de entrada
                const inputType = e.inputType;
                const valorAntes = this.value;
                const id = input.id;
                sugerys.deleteValue(id,Number(valorAntes));                
                console.log("Valor antes de la entrada: " + valorAntes);
                console.log("Sugerys updated: "+sugerys.get(id))
                const sugerenciasContainer = document.getElementById('sugerencias-container');
                sugerenciasContainer.innerHTML = '';

                // Sugerencia única
                const sugerencia = sugerys.get(input.id);

                // Mostrar sugerencia en el contenedor
                const sugerenciaElement = document.createElement('div');
                sugerenciaElement.textContent = sugerencia;
                sugerenciaElement.className = 'sugerencia-item';
                sugerenciasContainer.appendChild(sugerenciaElement);
                if (inputType === 'deleteContentBackward' && valorAntes !== '') {
                    addHistory({
                        'type': 'input-delete',
                        'valid': alertBadInput(seeBoard(), i, j, this.value),
                        'num': valorAntes,
                        'row': i,
                        'col': j
                    })
                  }

            });
            //event kistener para el foco del input selecciona filas y columnas pinta del color enviado, ''
            input.addEventListener('focus', function() {
                pintarCeldaFilaColumna(i,j, '#ECD007',this.value);
                console.log(sugerencias(seeBoard(),i,j));
                if(verifieSudoku(initialMatrix)){
                    alert('terminaste canson')
                }
                // sugerys.set(input.id, sugerencias(seeBoard(), i,j));
                // console.log("hash: "+sugerys.get(input.id));
                const sugerenciasContainer = document.getElementById('sugerencias-container');
                sugerenciasContainer.innerHTML = '';

                // Sugerencia única
                const sugerencia = sugerys.get(input.id);

                // Mostrar sugerencia en el contenedor
                const sugerenciaElement = document.createElement('div');
                sugerenciaElement.textContent = sugerencia;
                sugerenciaElement.className = 'sugerencia-item';
                sugerenciasContainer.appendChild(sugerenciaElement);

            });
            
            // Event listener para cuando el input pierde el foco
            input.addEventListener('blur', function() {
                pintarCeldaFilaColumna(i,j, 'white',this.value);
                pintarInitialsCells(initialMatrix);
                
                //this.style.color = '';
                if(verifieSudoku(initialMatrix)){
                    alert('terminaste canson')
                }
                //pintarInitialsCells(initialMatrix);
                const sugerenciasContainer = document.getElementById('sugerencias-container');
                sugerenciasContainer.innerHTML = '';

                // Sugerencia única
                const sugerencia = "No hay sugerencias";

                // Mostrar sugerencia en el contenedor
                const sugerenciaElement = document.createElement('div');
                sugerenciaElement.textContent = sugerencia;
                sugerenciaElement.className = 'sugerencia-item';
                sugerenciasContainer.appendChild(sugerenciaElement);

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
                updateSugerys();
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
    if(Number(num) == 0 || num == NaN || num == ''){
        return true;
    }
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
function pintarInitialsCells(initialMatrix){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.querySelector(`#sudoku-board > div:nth-child(${i * 9 + j + 1}) > input`);
            //const input = document.getElementById(`cell-${i}-${j}`);
            if (initialMatrix[i][j] !== 0) {
                input.style.backgroundColor = '#CDC9C8';
            }
        }
    }
}

function pintarCeldaFilaColumna(fila, columna, color, num) {
  
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

function sugerencias(matriz, row, col){
    let sugery = [];
    
    for(let i = 1; i <= 9; i++){
        if(alertBadInput(matriz,row,col,i)){
            sugery.push(Number(i));
        }
    }
    return sugery;
}
function updateSugerys(){
    const input = document.createElement('input');
    for (let i = 0; i < 9; i++) {
        // Bucle a través de cada columna para generar columnas para el sudoku
        for (let j = 0; j < 9; j++) {
            const inputId = `cell-${i}-${j}`;
            sugerys.set(inputId, sugerencias(seeBoard(), i, j));
            console.log(`Hash para ${inputId}: ${sugerys.get(inputId)}`);
        }
    }
}

function addHistory(entry){
    history.addLast(entry)
    console.log(history.displayEndToFirst())    
}
// Función para renderizar la tabla
function showHistorial() {
    let historialContainer = document.getElementById('historial-container');
    //obtener datos del histroial de lista doblemente enlazada como un array
    let data = history.returnEndToFirst();
    // crear la cabecera de la tabla del hisotrial
    let tableHTML = '<table class="min-w-full divide-y divide-gray-200"><thead><tr class="bg-gray-100"><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">type</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">valid</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">num</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">row</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">col</th></tr></thead><tbody>';

    // Iterar sobre los datos y agregar filas a la tabla
    for (let i = 0; i < data.length; i++) {
        tableHTML += '<tr class="bg-white">';
        tableHTML += '<td class="px-6 py-4 whitespace-nowrap">' + data[i].type + '</td>';
        tableHTML += '<td class="px-6 py-4 whitespace-nowrap">' + data[i].valid + '</td>';
        tableHTML += '<td class="px-6 py-4 whitespace-nowrap">' + data[i].num + '</td>';
        tableHTML += '<td class="px-6 py-4 whitespace-nowrap">' + data[i].row + '</td>';
        tableHTML += '<td class="px-6 py-4 whitespace-nowrap">' + data[i].col + '</td>';
        tableHTML += '</tr>';
    }

    // Cerrar la etiqueta tbody y table para el renderizado
    tableHTML += '</tbody></table>';

    // Asignar el HTML generado al contenedor
    historialContainer.innerHTML = tableHTML;
}

function deshacer3(){
    let deshacerTemporary = deshacer.pop();
    
    if(deshacerTemporary.type === "input-new"){
        let sudokuMatrixTemporary = sudokuMatrix;
        sudokuMatrixTemporary[Number(deshacerTemporary.row)][Number(deshacerTemporary.col)] = 0;
        console.log(sudokuMatrixTemporary);
            //sudokuMatrix = sudokuMatrixTemporary;
            const cellIds = [];
            for (let i = 0; i < initialMatrixTemporary.length; i++) {
                for (let j = 0; j < initialMatrixTemporary[i].length; j++) {
                    if(Number(initialMatrixTemporary[i][j]) !== 0){
                        const cellId = `cell-${i}-${j}`;
                        cellIds.push(cellId);
                    }
                }
            }
            console.log(cellIds);
            updateSudokuBoard(sudokuMatrixTemporary, cellIds);
            //add to history
            addHistory({
                'type': 'input-undo',
                'valid': true,
                'num': deshacerTemporary.num,
                'row': deshacerTemporary.row,
                'col': deshacerTemporary.col
            })
        } else if(deshacerTemporary.type === "input-delete"){
            let sudokuMatrixTemporary = sudokuMatrix;
            sudokuMatrixTemporary[Number(deshacerTemporary.row)][Number(deshacerTemporary.col)] = Number(deshacerTemporary.num);
            console.log(sudokuMatrixTemporary);
            //sudokuMatrix = sudokuMatrixTemporary;
            const cellIds = [];
            for (let i = 0; i < initialMatrixTemporary.length; i++) {
                for (let j = 0; j < initialMatrixTemporary[i].length; j++) {
                    if(Number(initialMatrixTemporary[i][j]) !== 0){
                        const cellId = `cell-${i}-${j}`;
                        cellIds.push(cellId);
                    }
                }
            }
            console.log(cellIds);
            updateSudokuBoard(sudokuMatrixTemporary, cellIds);
            //add to history
            addHistory({
                'type': 'input-undo',
                'valid': true,
                'num': deshacerTemporary.num,
                'row': deshacerTemporary.row,
                'col': deshacerTemporary.col
            })
        }
    
}

function updateSudokuBoard(newMatrix, celdasIniciales) {
    const sudokuBoard = document.getElementById('sudoku-board');
    const inputs = sudokuBoard.querySelectorAll('input');

    let index = 0;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = newMatrix[i][j];
            const input = inputs[index];
            const cellId = `cell-${i}-${j}`;

            if (celdasIniciales.includes(cellId)) {
                input.disabled = true; // Mantener inhabilitadas las celdas iniciales
                input.style.backgroundColor = "#CDC9C8";
            } else {
                input.disabled = false; // Habilitar las celdas no iniciales
                input.style.backgroundColor = 'white';
            }

            input.value = value !== 0 ? value.toString() : '';
            index++;
        }
    }
}








