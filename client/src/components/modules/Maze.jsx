import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
// import { drawCanvas } from "../../canvasManager";
// import { handleInput } from "../../input";

import "../../utilities.css";

// const width = null;
// const height = null;

// Process updates from maze-logic in Maze.jsx
const Maze = (props) => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    const [winnerModal, setWinnerModal] = useState(null);

    useEffect(() => {
        // add event listener on mount
        window.addEventListener("keydown", handleInput);
        // remove event listener on unmount
        return () => {
            window.removeEventListener("keydown", handleInput);
            post("/api/despawn", { userid: userId});
        };
    }, []);

    // update game periodically
    useEffect(() => {
        socket.on("update", (update) => {
            processUpdate(update);
        })
    })

    const processUpdate = (update) => {
        // set winnerModal if update has defined winner
        if (update.winner) {
            setWinnerModal(
                <div className="Game-winner">The winner is {update.winner}!</div>
            );
        } else {
            setWinnerModal(null);
        }
        // drawCanvas(update);


    }

    createGrid = () => {
        const grid = [];

    }

}
export default Maze;
