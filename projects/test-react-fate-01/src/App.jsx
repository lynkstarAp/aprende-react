import { useEffect, useState } from "react";
import { SERVANTS1 } from "./constants";
import { Board } from "./components/Board";
import { WinnerModal } from "./components/WinnerModal";
import confetti from "canvas-confetti";

import { getArrRandom } from "./logic/board";

export default function App() {
	const [numberCard, setNumberCard] = useState(5);
	const [cards, setCards] = useState(Array(numberCard * 2).fill(null))
	const [servant, setServant] = useState(null)
	const [peers, setPeers] = useState(null);
	const [winner, setWinner] = useState(false);

	const [arrServants, setArrServants] = useState()

	useEffect(() => {
		if (winner) {
			confetti()
			return
		}
		setNumberCard(numberCard)
		setServant(getServantsRandom(SERVANTS1, numberCard))
		setPeers(getArrRandom(numberCard))
		setCards(Array(numberCard * 2).fill(null))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numberCard, winner])

	const resetGame = () => {
		setWinner(false)
		setPeers(getArrRandom(numberCard))
		setServant(getServantsRandom(SERVANTS1, numberCard))
	}

	const getServantsRandom = (json, cantidad, isSubKey = false) => {
		// kjson = ind
		// Obtener las claves del JSON
		const keys = Object.keys(json);
		// Mezclar las claves
		const mexKeys = keys.sort(() => Math.random() - 0.5);
		// Tomar las primeras 'cantidad' claves del JSON mezclado
		const randomKeys = mexKeys.slice(0, cantidad);
		// Construir un nuevo objeto con los elementos seleccionados
		const randomServant = [];
		randomKeys.forEach((key) => {
			randomServant[key] = json[key];
			if (!isSubKey) {
				randomServant[key] = getServantsRandom(json[key], 2, true)
			}
		});
		if (!isSubKey) {
			let x = 0
			let arrTst = []
			randomKeys.map((arr) => {
				randomServant[arr].map(val => {
					arrTst[x] = [arr, val]
					x++
				})
			})
			setArrServants(arrTst)
		}
		return randomServant;
	}





	return (
		<>
			<main className="board">
				<h2>Memorama</h2>
				<Board
					arrServants={arrServants}
					// orderImage={orderImage}
					cards={cards}
					servants={servant}
					peers={peers}
					setPeers={setPeers}
					winner={winner}
					setWinner={setWinner}
				/>
			</main>
			<WinnerModal winner={winner} resetGame={resetGame} />
		</>
	);
}
