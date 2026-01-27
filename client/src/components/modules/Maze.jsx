import { useEffect, useState } from "react";
import "./Maze.css";
import beaverImg from "../assets/beaver.png"
import cogImg from "../assets/cog.png";

const Maze = () => {
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
        [0,1,0,1,0,1,0,1,1],
        [0,1,0,0,0,1,0,1,1],
        [0,1,1,1,1,1,0,1,1],
        [0,1,0,0,0,0,0,1,1],
        [0,1,0,1,1,1,1,1,1],
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
        [0,0,0],
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

    for (let i=0; i<mitleft.length; i++){
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
      }
    };

    if (beaverPos.r === cogPos.r && beaverPos.c === cogPos.c) {
        alert("You win!");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [beaverPos, maze, cogPos]);


  const changeLevel = (e) => {
    const value = e.target.value;
    let selected;

    if (value === "1") selected = level1;
    if (value === "2") selected = level2;
    if (value === "3") selected = level3;
    if (value === "mit") selected = levelmit;

    const freshMaze = selected.map((row) => [...row]);
    const rows = selected.length;
    const cols = selected[0].length;

    if (value === "mit") { // change the initial pos of the beaver if in mit maze
        freshMaze[2][0] = 2;
        setMaze(freshMaze);
        setBeaverPos({r:2, c:0});
        setCogPos({r:rows-2, c:cols-2});
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
        <option value="mit">Level MIT</option>
      </select>

      <div id="maze-container">
        <img
          src={beaverImg}
          id="beaver"
          alt="beaver"
          style={{
            width: "50px",
            height: "auto",
            top: beaverPos.r * 50,
            left: beaverPos.c * 50,
          }}
        />

        <img src={cogImg} id="cog" alt="cog"
        style={{
            width: "50px",
            height: "auto",
            top: cogPos.r * 50,
            left: cogPos.c * 50,
        }}
        />

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
