import './App.css'
import { useEffect, useState } from 'react'

function FollowMouse() {
	const [enable, setEnable] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 })

	// pinter move
	useEffect(() => {
		console.log({ enable });
		const handleMove = (event) => {
			const { clientX, clientY } = event
			console.log({ clientX, clientY });
			setPosition({ x: clientX, y: clientY })
		}
		if (enable) {
			window.addEventListener('pointermove', handleMove)
		}

		// cleanup:
		// → cuando el componente se desmonta
		// → cuando cambian las dependencias, antes de ejecutar
		//		el efecto de nuevo
		return () => {
			setPosition({ x: 0, y: 0 })
			window.removeEventListener('pointermove', handleMove)
		}
	}, [enable])

	// change body className
	useEffect(() => {
		document.body.classList.toggle('no-cursor', enable)
		return () => {
			document.body.classList.remove('no-cursor')
		}
	});

	return (
		<main>
			<div style={{
				position: 'absolute',
				backgroundColor: '#09f',
				borderRadius: '50%',
				opacity: 0.8,
				pointerEvents: 'none',
				left: -20,
				top: -20,
				width: 40,
				height: 40,
				transform: `translate(${position.x}px, ${position.y}px)`
			}} />
			<button onClick={() => { setEnable(!enable) }}>{enable ? "Desactivar" : "Activar"} seguir puntero</button>
		</main>
	);
}

function App() {

	return (
		<FollowMouse />
	)
}

export default App
