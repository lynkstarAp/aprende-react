/* eslint-disable react/prop-types */
export function WinnerModal({ winner, resetGame }) {
    if (winner === false) return
    return (
        <section className='winner'>
            <div className="text">
                <h2>Ganaste</h2>
                <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
        </section>
    )
}