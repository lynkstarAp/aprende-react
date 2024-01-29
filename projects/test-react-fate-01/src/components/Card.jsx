/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import './cardImage.css'

export function Card({ index, peers, checkIsPeer, img, checkCurrentCard }) {
	const [currentCard, setCurrentCard] = useState(0);

	useEffect(() => {
		setCurrentCard(checkCurrentCard(index))
	}, [peers])

	if (img == null || !img[index]) return

	const url = currentCard == 0 ? `../card.jpeg` : `../fate go/${img[index][0]}/${img[index][1]}`
	const url2 = currentCard == 0 ? `../card.jpeg` : `../fate go/${img[index][0]}/${img[index][0]} 0.png`
	const classname = currentCard == 2 ? 'square is-peers view-img' : currentCard == 1 ? 'square is-selected' : 'square'
	const handleClick = () => {
		checkIsPeer(index, false)
		setCurrentCard(checkCurrentCard(index))
	}

	return (
		<>
			<article>
				<img className={classname} onClick={handleClick}
					alt={`El index de la carta es: ${img[index][0]}`}
					src={url}
				/>
			<img className={classname} onClick={handleClick}
					alt={`El index de la carta es: ${img[index][0]}`}
					src={url2}
				/>
			</article>
		</>
	)
}
