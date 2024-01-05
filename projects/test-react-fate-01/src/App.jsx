import { useEffect, useState } from "react";
import { SERVANTS1 } from "./constants";
import { Board } from "./components/Board";
import { WinnerModal } from "./components/WinnerModal";

// const STATUS = {
// 	"a": "face",
// 	"b": "cross",
// 	"c": "resolved"
// }
// const tst = [
// 	{ index: "", name: "", img: "", peers: "" }
// ]

export default function App() {
	const [numberCard, setNumberCard] = useState(4);
	const [cards, setCards] = useState(Array(numberCard * 2).fill(null))
	const [servant, setServant] = useState(null)
	const [peers, setPeers] = useState(null);
	const [winner, setWinner] = useState(false);


	useEffect(() => {
		setNumberCard(4)
		setServant(getServantsRandom(SERVANTS1, numberCard))
		setPeers(getArrRandom(numberCard))

	}, [cards, numberCard])

	const resetGame = () => {
		setWinner(false)
		setCards(Array(numberCard * 2).fill(null))
		setPeers(getArrRandom(numberCard))
		getServantsRandom(SERVANTS1, numberCard)
	}

	// const getRandomNumber = () => {
	// 	return Math.floor(Math.random() * numberCard);
	// }

	const getServantsRandom = (json, cantidad) => {
		// Obtener las claves del JSON
		const keys = Object.keys(json);
		// Mezclar las claves
		const mexKeys = keys.sort(() => Math.random() - 0.5);
		// Tomar las primeras 'cantidad' claves del JSON mezclado
		const randomKeys = mexKeys.slice(0, cantidad);
		// Construir un nuevo objeto con los elementos seleccionados
		const randomServant = {};
		randomKeys.forEach((key) => {
			randomServant[key] = json[key];
		});
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

	// const toggleState = (id) => {
	// 	setComponentStates((prevStates) => {
	// 		return {
	// 			...prevStates,
	// 			[id]: !prevStates[id],
	// 		};
	// 	});
	// };

	// console.log(getServantsRandom(SERVANTS1, 5));

	return (<>
		<main className="board">
			<h2>Test</h2>
			<Board cards={cards} servant={servant} peers={peers} setPeers={setPeers} winner={winner} setWinner={setWinner} />
		</main>
		<WinnerModal winner={winner} resetGame={resetGame} />
	</>
	);
}
