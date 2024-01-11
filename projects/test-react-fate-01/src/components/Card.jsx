/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

export function Card({ index, peers, checkIsPeer, img, checkCurrentCard }) {
	const [currentCard, setCurrentCard] = useState(0);

	useEffect(() => {
		setCurrentCard(checkCurrentCard(index))
	}, [peers])

	if (img == null || !img[index] ) return

	const url = currentCard == 0 ? `../card.jpeg` : `../fate go/${img[index][0]}/${img[index][1]}`
	const classname = currentCard == 2 ? 'square is-peers' : currentCard == 1 ? 'square is-selected' : 'square'
	const handleClick = () => {
		checkIsPeer(index, false)
		setCurrentCard(checkCurrentCard(index))
	}

	return (
		<img className={classname} onClick={handleClick}
			alt={`El index de la carta es: ${img[index][0]}`}
			src={url}
		/>
	)
}