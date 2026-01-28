import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import "./Maze.css";

import beaverImg from "../assets/beaver.png";
import cogImg from "../assets/cog.png";
import doorImg from "../assets/door.jpg";
import killiandoorImg from "../assets/killiandoors.jpg";

// Base maze code (no trivia or 'accessories' added)
const Maze = () => {
    const cell_size = 50;
    const [myLevel, setMyLevel] = useState(null);

    const level1 = [
        [1, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 1],
    ];

    const level2 = [
        [1, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 1, 1],
    ];

    const level3 = [
        [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    ];

    const mitleft = [
        [0,1,0,0,0,1,0,0,0],
        [0,1,0,0,0,1,0,0,0],
        [1,1,1,1,1,1,1,1,1],
        [0,1,0,0,0,1,0,0,0],
        [0,1,0,1,0,1,0,1,1],
        [0,1,0,1,0,1,1,1,1],
        [0,1,0,0,0,1,0,1,1],
        [0,1,1,1,1,1,0,1,1],
        [0,1,0,0,0,0,0,1,1],
        [0,1,0,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,1],
        [0,1,0,1,1,1,1,1,1],
        [0,1,0,0,0,0,0,1,1],
        [0,1,1,1,1,1,0,1,1],
        [0,0,0,0,0,0,0,1,1]
    ];
    // mitright is same as mitleft but flipped horizontally
    const mitright = mitleft.map(row => {return [...row].reverse()});
    const mitcenter = [
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ]
    const levelmit = [];
    for (let i=0; i<mitleft.length; i++){ //build mit main campus
        levelmit.push([]);
        for (let j=0; j<mitleft[i].length; j++){
            levelmit[i].push(mitleft[i][j]);
        }
        for (let j=0; j<mitcenter[i].length; j++){
            levelmit[i].push(mitcenter[i][j]);
        }
        for (let j=0; j<mitright[i].length; j++){
            levelmit[i].push(mitright[i][j]);
        }
    }

    const [maze, setMaze] = useState(level1);
    const [beaverPos, setBeaverPos] = useState({ r: 0, c: 0 });
    const [cogPos, setCogPos] = useState({r: maze.length - 1, c: maze.length-1});
    const { achievements, setAchievements } = useContext(UserContext);

    useEffect(() => {
        const handleKeyDown = (e) => {
        let { r, c } = beaverPos;
        let newR = r;
        let newC = c;

        if (e.key === "ArrowRight") newC++;
        if (e.key === "ArrowLeft") newC--;
        if (e.key === "ArrowUp") newR--;
        if (e.key === "ArrowDown") newR++;

        if (
            maze[newR] &&
            maze[newR][newC] === 1
        ) {
            const newMaze = maze.map((row) => [...row]);
            newMaze[r][c] = 1;
            newMaze[newR][newC] = 2;
            setMaze(newMaze);
            setBeaverPos({ r: newR, c: newC });

        // if (beaverPos.r === cogPos.r && beaverPos.c === cogPos.c) {
        if (newR === cogPos.r && newC === cogPos.c) {
        if (myLevel==="mit") {alert("Congratulations! You've made it through MIT's main campus!");}
        else {alert("Congratulations! You've solved the maze!");}
        setAchievements(a => a+1);
        }

        }
    };


    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

    }, [beaverPos, maze, cogPos, myLevel, setAchievements]);

    const changeLevel = (e) => {
        const value = e.target.value;
        let selected;

        if (value === "1") selected = level1;
        if (value === "2") selected = level2;
        if (value === "3") selected = level3;
        if (value === "mit") selected = levelmit;
        setMyLevel(value);

        const freshMaze = selected.map((row) => [...row]);
        const rows = selected.length;
        const cols = selected[0].length;

        if (value === "mit") { // change the initial pos of the beaver if in mit maze
            freshMaze[2][0] = 2;
            setMaze(freshMaze);
            setBeaverPos({r:2, c:0});
            setCogPos({r:rows-2, c:cols-6});
        }
        else {
            freshMaze[0][0] = 2;
            setMaze(freshMaze);
            setBeaverPos({ r: 0, c: 0 });
            setCogPos({r: rows-1, c: cols-1});
        }

    };

    return (
        <div>
            <select onChange={changeLevel}>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="mit">Main campus</option>
            </select>

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

                <img src={cogImg} id="cog" alt="cog"
                    style={{
                        width: cell_size + "px",
                        height: "auto",
                        top: cogPos.r * cell_size,
                        left: cogPos.c * cell_size,
                    }}
                />
                {myLevel==="mit" && <>
                {/* doors */}
                <img src={doorImg} id="door1" alt="door"
                style={{
                    width: cell_size + "px",
                    height: cell_size + "px",
                    top: 10*cell_size,
                    left: 2*cell_size,
                }}
                />
                <img src={doorImg} id="door2" alt="door"
                style={{
                    width: cell_size + "px",
                    height: cell_size + "px",
                    top: 10*cell_size,
                    left: (levelmit[10].length-3)*cell_size,
                }}
                />
                <img src={doorImg} id="door3" alt="door"
                style={{
                    width: cell_size + "px",
                    height: cell_size + "px",
                    top: 5*cell_size,
                    left: 6*cell_size,
                }}
                />
                <img src={doorImg} id="door4" alt="door"
                style={{
                    width: cell_size + "px",
                    height: cell_size + "px",
                    top: 5*cell_size,
                    left: (levelmit[5].length-7)*cell_size,
                }}
                />
                <img src={killiandoorImg} id="door10" alt="door"
                style={{
                    width: 3*cell_size + "px",
                    height: cell_size + "px",
                    top: 3*cell_size,
                    left: 9*cell_size,
                }}
                />
                {/* building labels */}
                <p id="lobby7" style={{top: cell_size*2+"px", left: cell_size+"px"}}>Lobby 7</p>
                <p id="lobby10" style={{top: cell_size+"px", left: cell_size*10+"px"}}>Lobby 10 </p>
                <p id="killian" style={{top: cell_size*6.5+"px", left: cell_size*10+"px"}}>Killian Ct</p>
                <p id="duPont" style={{top: cell_size*10+"px", left: cell_size*4.5+"px"}}>duPont Ct</p>
                <p id="lowell" style={{top: cell_size*10+"px", left: cell_size*15+"px"}}>Lowell Ct</p>
                <p id="bldg5" style={{top: cell_size*5+"px", left: cell_size*1.5+"px"}}>5</p>
                <p id="bldg3" style={{top: cell_size*5+"px", left: cell_size*5.5+"px"}}>3</p>
                <p id="bldg1" style={{top: cell_size*10+"px", left: cell_size*1.5+"px"}}>1</p>
                <p id="bldg6" style={{top: cell_size*5+"px", left: cell_size*19.5+"px"}}>6</p>
                <p id="bldg4" style={{top: cell_size*5+"px", left: cell_size*15.5+"px"}}>4</p>
                <p id="bldg2" style={{top: cell_size*10+"px", left: cell_size*19.5+"px"}}>2</p>
                <p id="uac" style={{top: cell_size+"px", left: cell_size*3+"px"}}>UAC</p>
                <p id="dmse" style={{top: cell_size+"px", left: cell_size*17+"px"}}>DMSE breakerspace</p>
                </>}
                </div>

                {maze.map((row, r) => (
                <div className="row" key={r}>
                    {row.map((cell, c) => (
                    <div
                        key={c}
                        className={`cell ${cell === 0 ? "wall" : ""}`}
                    />
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}
export default Maze;
