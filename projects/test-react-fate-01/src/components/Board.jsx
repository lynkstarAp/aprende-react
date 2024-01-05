/* eslint-disable react/prop-types */
import { useState } from "react"
import { Card } from "./Card"

export function Board({ cards, servant, peers, setPeers, winner, setWinner }) {
	const [turn, setTurn] = useState(0)
	const [borderColor, setBorderColor] = useState(0) // 0 → reset 1 → azul 2 → verde
	if (peers == null) return null
	// console.log({ peers });

	const chekcTurn = () => {
		if (turn == 0) {
			setTurn(1)
		} else {
			setTurn(0)
			setTimeout(() => {
				checkIsPeer(null, true)
			}, 500);
		}
	}

	const checkIsPeer = (index, isNewTurn) => {
		const newPeers = [...peers]
		setTurn(0)

		let isRepete = false;
		setWinner(true)

		newPeers.map((cardSelected, indx) => {
			const [a, b, isCheckA, isCheckB, isComplete] = cardSelected;
			if (!isComplete) setWinner(false)
			if (isNewTurn) {
				// console.log('limpiando turno');
				if (!isComplete) {
					newPeers[indx][2] = false
					newPeers[indx][3] = false
				}
				return
			}
			if (!isComplete) {
				if (a == index) {
					if (isCheckA) {
						isRepete = true
						return
					}
					newPeers[indx][2] = true
					setBorderColor(1)
				}
				if (b == index) {
					if (isCheckB) {
						isRepete = true
						return
					}
					newPeers[indx][3] = true
					setBorderColor(1)
				}
				if (newPeers[indx][2] && newPeers[indx][3]) {
					newPeers[indx][4] = true
					setBorderColor(2)
				}
			} else {
				if ((a == index || b == index) && isCheckA && isCheckB) isRepete = true;
			}
		})
		if (!isNewTurn && !isRepete) {
			console.log(newPeers)
			chekcTurn();
		}
		if (winner) {
			console.log('aqui cuando se gana el game');
		}
		setPeers(newPeers)
		// console.log(borderColor);
		if (!isNewTurn) return borderColor
	}

	return (
		<section className="game">
			{
				cards.map((key, index) => {
					return (
						<Card
							key={index}
							index={index}
							servant={servant}
							peers={peers}
							setPeers={setPeers}

							isSelect={false}
							isComplete={false}

							chekcTurn={chekcTurn}
							checkIsPeer={checkIsPeer}
						/>
					)
				})
			}
		</section>
	)
}

/*

peers.map((key) => {
					return (
						<>
							<Card
								key={key[0]}
								index={key[0]}
								servant={servant}
								peers={peers}
								setPeers={setPeers}

								isSelect={key[2]}
								isComplete={key[4]}

								chekcTurn={chekcTurn}
								checkIsPeer={checkIsPeer}
							/>
							<Card
								key={key[1]}
								index={key[1]}
								servant={servant}
								peers={peers}
								setPeers={setPeers}

								isSelect={key[3]}
								isComplete={key[4]}

								chekcTurn={chekcTurn}
								checkIsPeer={checkIsPeer}
							/>

						</>
					)
				})

				*/