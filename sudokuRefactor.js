function alertBadInput(board, row, col, num) {
    const gridSize = 9;

    for (let i = 0; i < gridSize; i++) {
        if ((board[row][i] === Number(num) || board[i][col] === Number(num))  && (i !== Number(row) || j !== Number(col))) {
            numeroRepetidoEnFila = true;
            numeroRepetidoEnColumna = true;
            return false; // Conflict found
        }
    }
    

    // Check row and column for conflicts
    for (let i = 0; i < 9; i++) {
        if (Number(board[row][i]) === Number(num) && i !== Number(col)) {
            console.log("Se encontró el número repetido en la misma fila en: " + row + ":" + col);
            pintarCeldaRojo(row, col);
            break;
        }
    }

    // Verificar repetición en la columna
    for (let i = 0; i < 9; i++) {
        if (Number(board[i][col]) === Number(num) && i !== Number(row)) {
            console.log("Se encontró el número repetido en la misma columna en: " + row + ":" + col);
            pintarCeldaRojo(row, col);
            break;
        }
    }

    // Check the 3*3 subgrid for conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    console.log("start row: "+startRow);
    console.log("start Col: "+startCol);

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (Number(board[i][j]) === Number(num) && (i !== Number(row) || j !== Number(col))) {
                console.log("Numero repetido en sector");
                pintarCeldaRojo(row, col);
                //return false; // Conflict found
            }
        }
    }
}