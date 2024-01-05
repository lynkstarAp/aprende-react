/* eslint-disable react/prop-types */

import { useState } from 'react';
import comfetti from 'canvas-confetti'

import { Square } from './components/Squere';
import { WinnerModal } from './components/WinnerModal';
import { Board } from './components/Board';
import { ceckWinner, chaeckEndGame } from './logic/board';
import { TURNS } from './constants'

import './App.css';

export default function App() {
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem('board')
		return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
	})
	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem('turn')
		return turnFromStorage ?? TURNS.X
	})
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)
		window.localStorage.removeItem('board')
		window.localStorage.removeItem('turn')
	}

	const updateBoard = (index) => {
		// no actualiza esta posicion
		// si ya tiene algo
		if (board[index] || winner) return;
		// actualiza el tablero
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)

		// cambia turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)

		// guardar aqui la partida
		window.localStorage.setItem('board', JSON.stringify(newBoard))
		window.localStorage.setItem('turn', newTurn)

		// revisar si hay ganador
		const newWinner = ceckWinner(newBoard)
		if (newWinner) {
			comfetti()
			setWinner(newWinner)
		} else if (chaeckEndGame(newBoard)) {
			setWinner(false) // Empate
		}
	}

	return (
		<main className="board">
			<h1>Gato</h1>
			<button onClick={resetGame}>Reiniciar juego</button>
			<Board board={board} updateBoard={updateBoard} />

			<section className='turn' >
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>

			<WinnerModal winner={winner} resetGame={resetGame} />
		</main>
	)
}
