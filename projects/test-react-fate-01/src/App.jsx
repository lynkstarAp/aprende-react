import { useEffect, useState } from "react";
import { SERVANTS1 } from "./constants";
import { Board } from "./components/Board";
import { WinnerModal } from "./components/WinnerModal";
import confetti from "canvas-confetti";

export default function App() {
	const [numberCard, setNumberCard] = useState(4);
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
		setNumberCard(4)
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

	// let kjson = 0
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

	const getArrRandom = (lngNumber) => {
		const arryPeers = [];
		const numAvailable = Array.from({ length: lngNumber * 2 }, (_, index) => index);
		while (numAvailable.length > 0) {
			const index1 = Math.floor(Math.random() * numAvailable.length);
			const num1 = numAvailable.splice(index1, 1)[0];
			const index2 = Math.floor(Math.random() * numAvailable.length);
			const num2 = numAvailable.splice(index2, 1)[0];
			arryPeers.push([num1, num2, false, false, false]);
		}
		return arryPeers;
	}

	const orderImage = (arrTst, peers) => {
		let x = 0
		let arr = []
		if (peers == null) return
		peers.map(arrp => {
			const [a, b] = arrp
			arr[a] = arrTst[x]
			arr[b] = arrTst[x + 1]
			x = x + 2
		})
		return arr
	}

	return (
		<>
			<main className="board">
				<h2>Memorama</h2>
				<Board
					arrServants={arrServants}
					orderImage={orderImage}
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
