import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

export const useMazeGame = () => {
    const cell_size = 50;
    const [myLevel, setMyLevel] = useState(null);
    const [isQuizActive, setIsQuizActive] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [quizAnswer, setQuizAnswer] = useState("");
    const [revealedCells, setRevealedCells] = useState(new Set());
    const [unlockedSpots, setUnlockedSpots] = useState(new Set());
    const { achievements, setAchievements } = useContext(UserContext);

    // Quiz spots configuration
    const quizSpots = {
        "2-5": {
            question: "How many smoots is the Harvard Bridge?",
            answer: ["364.4", "364", "365", "364 plus or minus an ear", "364 plus minus an ear"]
        },
        "5-6": {
            question: "What is course 12?",
            answer: ["earth, atmospheric, and planetary sciences", "earth atmospheric and planetary sciences", "earth atmospheric planetary sciences"]
        },
        "3-10": {
            question: "In what city is MIT located?",
            answer: ["cambridge", "cambridge, ma", "cambridge, massachusetts"]
        },
        "10-2": {
            question: "What year was MIT founded?",
            answer: ["1861"]
        },
        "10-18": {
            question: "What is one of the activities that must be completed to receive a pirate's license",
            answer: ["pistol", "pistol shooting", "archery", "fencing"]
        },
        "10-2": {
            question: "During which class year do MIT students receive their brass rat ring?",
            answer: ["sophomore year", "2nd year", "sophomore", "2", "2nd yr", "sophomore yr"]
        },
        "2-15": {
            question: "What is course 9?",
            answer: ["brain and cognitive sciences"]
        },
        "7-15": {
            question: "Who is MIT's mascot?",
            answer: ["tim the beaver", "tim"]
        },
        "10-18": {
            question: "Where can you find a pool on MIT's campus?",
            answer: ["the z", "the zesiger center", "zesiger", "the z center", "alumni", "alumni center"]
        },
        "13-19": {
            question: "In what building number can you find MIT's banana lounge?",
            answer: ["26", "twenty six", "twenty-six"]
        }
    };

    // Level definitions
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

    const mitright = mitleft.map(row => [...row].reverse());
    const mitcenter = Array(15).fill(null).map(() => [1,1,1]);

    const levelmit = [];
    for (let i = 0; i < mitleft.length; i++) {
        levelmit.push([]);
        for (let j = 0; j < mitleft[i].length; j++) {
            levelmit[i].push(mitleft[i][j]);
        }
        for (let j = 0; j < mitcenter[i].length; j++) {
            levelmit[i].push(mitcenter[i][j]);
        }
        for (let j = 0; j < mitright[i].length; j++) {
            levelmit[i].push(mitright[i][j]);
        }
    }

    const [maze, setMaze] = useState(level1);
    const [beaverPos, setBeaverPos] = useState({ r: 0, c: 0 });
    const [cogPos, setCogPos] = useState({ r: level1.length - 1, c: level1[0].length - 1 });

    // Reveal cells around a position
    const revealAroundPosition = (r, c) => {
        const newRevealed = new Set(revealedCells);
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const newR = r + dr;
                const newC = c + dc;
                if (maze[newR] && maze[newR][newC] !== undefined) {
                    newRevealed.add(`${newR}-${newC}`);
                }
            }
        }
        setRevealedCells(newRevealed);
    };

    // Reveal starting position on mount and when changing levels
    useEffect(() => {
        revealAroundPosition(beaverPos.r, beaverPos.c);
    }, [maze]);

    // Handle keyboard movement
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isQuizActive) return;

            let { r, c } = beaverPos;
            let newR = r;
            let newC = c;

            if (e.key === "ArrowRight") newC++;
            if (e.key === "ArrowLeft") newC--;
            if (e.key === "ArrowUp") newR--;
            if (e.key === "ArrowDown") newR++;

            if (maze[newR] && maze[newR][newC] === 1) {
                const posKey = `${newR}-${newC}`;

                if (quizSpots[posKey] && !unlockedSpots.has(posKey)) {
                    setCurrentQuiz({ ...quizSpots[posKey], position: posKey });
                    setIsQuizActive(true);
                    return;
                }

                const newMaze = maze.map((row) => [...row]);
                newMaze[r][c] = 1;
                newMaze[newR][newC] = 2;
                setMaze(newMaze);
                setBeaverPos({ r: newR, c: newC });

                revealAroundPosition(newR, newC);

                if (newR === cogPos.r && newC === cogPos.c) {
                    if (myLevel === "mit") {
                        alert("Congratulations! You've made it through MIT's main building!");
                    } else {
                        alert("Congratulations! You've solved the maze!");
                    }
                    setAchievements(a => a + 1);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [beaverPos, maze, cogPos, setAchievements, myLevel, isQuizActive, unlockedSpots, revealedCells]);

    // Handle quiz submission
    const handleQuizSubmit = (e) => {
        e.preventDefault();
        let correct_ans = false;
        if (Array.isArray(currentQuiz.answer)) { // there are multiple possible correct answers in array
            for(let i=0; i<currentQuiz.answer.length; i++){
                if (quizAnswer.toLowerCase().trim() === currentQuiz.answer[i].toLowerCase()) {
                    correct_ans = true;
                    const [newR, newC] = currentQuiz.position.split('-').map(Number);
                    const { r, c } = beaverPos;

                    const newMaze = maze.map((row) => [...row]);
                    newMaze[r][c] = 1;
                    newMaze[newR][newC] = 2;
                    setMaze(newMaze);
                    setBeaverPos({ r: newR, c: newC });

                    revealAroundPosition(newR, newC);

                    setUnlockedSpots(prev => new Set([...prev, currentQuiz.position]));
                    setIsQuizActive(false);
                    setCurrentQuiz(null);
                    setQuizAnswer("");
                    alert("Correct! You may pass.");
                }
            }
        }
        if (correct_ans === false) {
            alert("Incorrect answer. Try again!");
            setQuizAnswer("");
        }
    };

    // Handle level change
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

        setUnlockedSpots(new Set());
        setRevealedCells(new Set());

        if (value === "mit") {
            freshMaze[2][0] = 2;
            setMaze(freshMaze);
            setBeaverPos({ r: 2, c: 0 });
            setCogPos({ r: rows - 2, c: cols - 6 });
        } else {
            freshMaze[0][0] = 2;
            setMaze(freshMaze);
            setBeaverPos({ r: 0, c: 0 });
            setCogPos({ r: rows - 1, c: cols - 1 });
        }
    };

    return {
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
    };
};
