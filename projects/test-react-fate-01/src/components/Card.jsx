/* eslint-disable react/prop-types */
// import { SERVANTS } from "../constants"


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

export function Card({ servant, index, checkIsPeer, isSelect, isComplete }) {
    const classname = isComplete ? 'square is-peers' : isSelect ? 'square is-selected' : 'square'
    const handleClick = () => {
        // setIsSelected(true)
        checkIsPeer(index, false)
    }

    return (
        <div className={classname} onClick={handleClick}>{index}</div>
    )
}