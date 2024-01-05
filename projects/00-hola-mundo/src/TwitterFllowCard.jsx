/* eslint-disable react/prop-types */
import { useState } from "react"
export function TwitterFollowCard({ children, formatUserName, username = 'unknow', name, inicialIsFollowing }) {
	const [isFollowing, setIsFollowing] = useState(inicialIsFollowing)

	const text = isFollowing ? 'Siguiendo' : 'Seguir'
	const buttonClassName = isFollowing ? 'tw-followCard-button is-following'
		: 'tw-followCard-button'

	const handleClick = () => {
		setIsFollowing(!isFollowing)
	}
	return (
		<article className="tw-followCard">
			<header className="tw-followCard-header">
				<img className="tw-followCard-avatar"
					alt="El avatar de midudev"
					src={`https://unavatar.io/${username}`} />
				<div className="tw-followCard-info">
					<strong>{children ?? name}</strong>
					<span className='tw-followCard-infoUserName'>{formatUserName(username)}</span>
				</div>
			</header>

			<aside>
				<button className={buttonClassName} onClick={handleClick}>
					{text}
				</button>
			</aside>
		</article>
	)
}