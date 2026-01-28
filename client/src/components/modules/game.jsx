import { useMazeGame } from "./game-logic";
import "./Maze.css";

import beaverImg from "../assets/beaver.png";
import diplomaImg from "../assets/diploma.png";
import cogImg from "../assets/cog.png";
import doorImg from "../assets/door.jpg";
import killiandoorImg from "../assets/killiandoors.jpg";

const Maze = () => {
    const {
        cell_size,
        myLevel,
        maze,
        beaverPos,
        cogPos,
        revealedCells,
        isQuizActive,
        currentQuiz,
        quizAnswer,
        setQuizAnswer,
        changeLevel,
        handleQuizSubmit,
        levelmit,
    } = useMazeGame();

    return (
        <div>
            <select onChange={changeLevel}>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="mit">Main campus</option>
            </select>

            {/* Quiz Modal */}
            {isQuizActive && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    border: '3px solid black',
                    borderRadius: '10px',
                    zIndex: 1000,
                    minWidth: '300px'
                }}>
                    <h3>Answer to Continue!</h3>
                    <p>{currentQuiz?.question}</p>
                    <form onSubmit={handleQuizSubmit}>
                        <input
                            type="text"
                            value={quizAnswer}
                            onChange={(e) => setQuizAnswer(e.target.value)}
                            placeholder="Your answer"
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                fontSize: '16px'
                            }}
                        />
                        <button type="submit" style={{
                            padding: '8px 16px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}>
                            Submit
                        </button>
                    </form>
                </div>
            )}

            <h2>Solve the maze to receive your diploma!</h2>

            <div id="maze-container">
                <div id="maze-accessories">
                    <img src={beaverImg} id="beaver" alt="beaver"
                        style={{
                            width: cell_size + "px",
                            height: "auto",
                            top: beaverPos.r * cell_size,
                            left: beaverPos.c * cell_size,
                        }}
                    />

                    <img src={diplomaImg} id="cog" alt="cog"
                        style={{
                            width: cell_size + "px",
                            height: "auto",
                            top: cogPos.r * cell_size,
                            left: cogPos.c * cell_size,
                            // opacity: revealedCells.has(`${cogPos.r}-${cogPos.c}`) ? 1 : 0
                        }}
                    />

                    {/* MIT level doors and labels */}
                    {myLevel === "mit" && <>
                        <img src={doorImg} id="door1" alt="door"
                            style={{
                                width: cell_size + "px",
                                height: cell_size + "px",
                                top: 10 * cell_size,
                                left: 2 * cell_size,
                            }}
                        />
                        <img src={doorImg} id="door2" alt="door"
                            style={{
                                width: cell_size + "px",
                                height: cell_size + "px",
                                top: 10 * cell_size,
                                left: (levelmit[10].length - 3) * cell_size,
                            }}
                        />
                        <img src={doorImg} id="door3" alt="door"
                            style={{
                                width: cell_size + "px",
                                height: cell_size + "px",
                                top: 5 * cell_size,
                                left: 6 * cell_size,
                            }}
                        />
                        <img src={doorImg} id="door4" alt="door"
                            style={{
                                width: cell_size + "px",
                                height: cell_size + "px",
                                top: 5 * cell_size,
                                left: (levelmit[5].length - 7) * cell_size,
                            }}
                        />
                        <img src={killiandoorImg} id="door10" alt="door"
                            style={{
                                width: 3 * cell_size + "px",
                                height: cell_size + "px",
                                top: 3 * cell_size,
                                left: 9 * cell_size,
                            }}
                        />
                        {/* building labels */}
                        <p id="lobby7" style={{ top: cell_size * 2 + "px", left: cell_size + "px" }}>Lobby 7</p>
                        <p id="lobby10" style={{ top: cell_size + "px", left: cell_size * 10 + "px" }}>Lobby 10 </p>
                        <p id="killian" style={{ top: cell_size * 6.5 + "px", left: cell_size * 10 + "px" }}>Killian Ct</p>
                        <p id="duPont" style={{ top: cell_size * 10 + "px", left: cell_size * 4.5 + "px" }}>duPont Ct</p>
                        <p id="lowell" style={{ top: cell_size * 10 + "px", left: cell_size * 15 + "px" }}>Lowell Ct</p>
                        <p id="bldg5" style={{ top: cell_size * 5 + "px", left: cell_size * 1.5 + "px" }}>5</p>
                        <p id="bldg3" style={{ top: cell_size * 5 + "px", left: cell_size * 5.5 + "px" }}>3</p>
                        <p id="bldg1" style={{ top: cell_size * 10 + "px", left: cell_size * 1.5 + "px" }}>1</p>
                        <p id="bldg6" style={{ top: cell_size * 5 + "px", left: cell_size * 19.5 + "px" }}>6</p>
                        <p id="bldg4" style={{ top: cell_size * 5 + "px", left: cell_size * 15.5 + "px" }}>4</p>
                        <p id="bldg2" style={{ top: cell_size * 10 + "px", left: cell_size * 19.5 + "px" }}>2</p>
                        <p id="uac" style={{top: cell_size+"px", left: cell_size*3+"px"}}>UAC</p>
                        <p id="dmse" style={{top: cell_size+"px", left: cell_size*16.1+"px"}}>DMSE breakerspace</p>
                        <p id="barker" style={{top: "0px", left: cell_size*9.5+"px"}}>Barker Library</p>
                    </>}
                </div>

                {maze.map((row, r) => (
                    <div className="row" key={r}>
                        {row.map((cell, c) => {
                            const isRevealed = revealedCells.has(`${r}-${c}`);
                            return (
                                <div
                                    key={c}
                                    className={`cell ${cell === 0 ? "wall" : ""}`}
                                    style={{
                                        backgroundColor: cell === 0
                                            ? 'black'
                                            : isRevealed
                                                ? 'white'
                                                : '#888'
                                    }}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Maze;
