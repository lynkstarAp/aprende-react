/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Card } from "./Card"

import { orderImage } from "../logic/board"


export function Board({ arrServants, cards, servants, peers, setPeers, winner, setWinner }) {
	const [isClickAvailable, setIsClickAvailable] = useState(false)
	const [turn, setTurn] = useState(0)
	const [borderColor, setBorderColor] = useState(0) // 0 → reset 1 → azul 2 → verde
	const [imagesCard2, setImagesCard2] = useState()

	useEffect(() => {
		setImagesCard2(orderImage(arrServants, peers))
	}, [servants])

	if (peers == null) return null

	const chekcTurn = () => {
		if (turn == 0) {
			setTurn(1)
		} else {
			setTurn(0)
			setIsClickAvailable(true)
			setTimeout(() => {
				checkIsPeer(null, true)
			}, 500);
		}
	}

	const checkIsPeer = (index, isNewTurn) => {
		if (isClickAvailable) return
		const newPeers = [...peers]
		setTurn(0)

		let isRepete = false;
		setWinner(true)

		newPeers.map((cardSelected, indx) => {
			const [a, b, isCheckA, isCheckB, isComplete] = cardSelected;
			if (!isComplete) setWinner(false)
			if (isNewTurn) {
				setIsClickAvailable(!isNewTurn)
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
		if (!isNewTurn) return borderColor
	}

	const checkCurrentCard = (index) => {
		let tmpVal = 0
		peers.forEach((key) => {
			const [a, b, aa, bb, t] = key
			if (a == index) {
				tmpVal = t ? 2 : aa && 1
			}
			if (b == index) {
				tmpVal = t ? 2 : bb && 1
			}
		});
		return tmpVal
	}

	return (
		<section className="game">
			{
				cards.map((key, index) => {
					return (
						<Card
							key={index}
							index={index}
							peers={peers}
							checkIsPeer={checkIsPeer}
							img={imagesCard2}
							checkCurrentCard={checkCurrentCard}
						/>
					)
				})
			}
		</section>
	)
}