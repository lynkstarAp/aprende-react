/* eslint-disable react/prop-types */
// import { SERVANTS } from "../constants"

import { useState } from "react"


/*
const JsonRender = ({ jsonData }) => {
	{
		let isValidJson = false;
		try {
			isValidJson = typeof jsonData === 'object' && jsonData !== null;
		} catch (error) {
			console.error('Error al validar JSON:', error.message);
		}
		if (isValidJson) {
			// return <div>
			//     {
			//         Object.keys(jsonData).map((key, index) => (
			//             <li key={index}>
			//                 <strong>{key}:</strong> {jsonData[key]}
			//             </li>
			//         ))
			//     }
			// </div>
			return <div>
				<strong>3:</strong> {jsonData[3]}
			</div>
		}
	}
}
*/

export function Card({ servant, index, peers, checkIsPeer, isSelect, isComplete }) {
	const [tester, setTester] = useState(null);
	const classname = isComplete ? 'square is-peers' : isSelect ? 'square is-selected' : 'square'
	const handleClick = () => {
		// setIsSelected(true)
		checkIsPeer(index, false)
	}

	const Test = ({ index }) => {
		// if (tester == null) return;
		peers.map((key) => {
			console.log(key, index);
			const [a, b, sa, sb, st] = key
			if (a == index) {
				setTester([a, sa, st])
			}
		})
		return (
			<div>{index}</div>
			// <div key={tester[0]} st={tester[1]} st={tester[2]}>{key[1]}</div>
		)
		// peers.map((key) => {
		// 	const [a, b, sa, sb, st] = key
		// 	if (a == index) {
		// 		setTester([a, sa, st])
		// 	}
		// 	if (b == index) {
		// 		setTester([b, sb, st])
		// 	}
		// 	/*console.log('Ok: ', index, key[0], key[1]);
		// 	if (key[0] == index) {
		// 		console.log('Ok: ', index);
		// 		return (
		// 			<div key={key[0]}>key[0]</div>
		// 		)
		// 	}
		// 	if (key[1] == index) {
		// 		console.log('Ok: ', index);
		// 		return (
		// 			<div key={key[1]}>key[1]</div>
		// 		)
		// 	}
		// 	*/
		// })

		// if(tester==null) return;
		// return (
		// 	<div>{tester[1]}: {index}</div>
		// 	// <div key={tester[0]} st={tester[1]} st={tester[2]}>{key[1]}</div>
		// )
	}

	return (
		// <div></div>
		// <div className={classname} onClick={handleClick}>{index}</div>
		// <Test className={classname} index={index}>{index}</Test>
	)
}