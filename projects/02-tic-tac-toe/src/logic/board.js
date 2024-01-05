import { WINNER_COMBOS } from "../constants"

export const ceckWinner = (boardToCheack) => {
    // revisamos toas las conbonaciones ganadoras
    // para si el X o O gano
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (boardToCheack[a] &&
            boardToCheack[a] === boardToCheack[b] &&
            boardToCheack[a] === boardToCheack[c]) {
            return boardToCheack[a]
        }
    }
    // Si no hay ganador
    return null
}

export const chaeckEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
}