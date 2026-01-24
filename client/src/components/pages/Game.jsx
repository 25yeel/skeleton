// hardcoded mazes
        // 0 is wall; 1 is path
        let level1 = [
            [1,0,1,0],
            [1,1,1,1],
            [1,0,1,0],
            [1,0,1,1],
        ];
        let level2 = [
            [1,1,1,0,1,0],
            [1,0,1,1,1,1],
            [0,0,1,0,0,0],
            [1,0,1,1,1,1],
            [1,1,1,0,1,1]
        ];
        let level3 = [
            [1,0,0,1,1,1,0,0,0,0],
            [1,0,0,1,0,1,1,1,1,1],
            [1,1,1,1,0,0,0,0,0,1],
            [1,0,0,0,0,1,1,1,1,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,0],
            [1,1,1,0,1,0,1,1,0,1],
            [1,0,0,0,1,0,0,1,0,1],
            [1,0,1,1,1,0,1,1,1,1],
            [1,1,1,0,0,0,1,0,0,1]
        ]
        let mazearray = level1;
        let Level = document.getElementById("levelselect")
        Level.addEventListener("change", function(){
            let level = Level.value;
            if (level == 1) {mazearray = level1;}
            if (level == 2) {mazearray = level2;}
            if (level == 3) {mazearray = level3;}
            maze.innerHTML = `<img src="beaver.png" id="beaver" width="50px" height="auto" alt="beaver">
            <img src="cog.png" id="cog" width="50px" height="auto" alt="cog">`
            createMaze()
        })


        let maze = document.getElementById("maze-container");
        let beaver = document.getElementById("beaver");
        let cog = document.getElementById("cog");

        function setBeaverPos(x,y) {
            beaver.style.top = x + "px";
            beaver.style.left = y + "px";
        }
        function setCogPos() {
            cog.style.bottom = x + "px";
            cog.style.right = y + "px";
        }
        function createMaze() {
            for(let r=0; r<mazearray.length; r++){
                let row = document.createElement("div");
                row.classList.add("row");

                for(let c=0; c<mazearray[r].length; c++){
                    let cell = document.createElement("div");
                    cell.classList.add("cell");

                    // 0 is wall; 1 is path; 2 is beaver
                    if(mazearray[r][c] == 0){
                        cell.classList.add("wall");
                    }
                    if(r==0 && c==0){
                        mazearray[r][c]=2; // mark the beaver's initial position
                    }
                    row.appendChild(cell); // add cell to row class
                }
                maze.appendChild(row); // add row division to array
            }
            // setBeaverPos(0,0);
            // setCogPos(0,0);
            getBeaverPos();
        }
        function getBeaverPos() {
            // let position = [0,0];
            let position = [];
            for (let r=0; r<mazearray.length; r++) {
                for (let c=0; c<mazearray[r].length; c++) {
                    if (mazearray[r][c] == 2){
                        position[0]=r;
                        position[1]=c;
                    }
                }
            }
            console.log(position);
            return position;
        }

        document.addEventListener("keydown", function (e){
            let beaver = document.getElementById("beaver");
            let cog = document.getElementById("cog");
            let beaverLeft = beaver.offsetLeft;
            let beaverTop = beaver.offsetTop;
            let cogLeft = cog.offsetLeft;
            let cogTop = cog.offsetTop;
            let beaverPos = getBeaverPos();

            // let cell = document.getElementsByClassName("cell")

            if(e.key == "ArrowRight"
                && beaverLeft < (mazearray.length-1)*50
                && mazearray[beaverPos[0]][beaverPos[1]+1] == 1){
                    // beaverLeft += parseInt(cell.style.width); // += cell.style.width
                    beaverLeft += 50;
                    beaver.style.left = beaverLeft + "px";
                    mazearray[beaverPos[0]][beaverPos[1]] = 1;
                    mazearray[beaverPos[0]][beaverPos[1]+1] = 2;
                    console.log(mazearray);

            }
            if(e.key == "ArrowLeft"
                && beaverLeft > 0
                && mazearray[beaverPos[0]][beaverPos[1]-1] == 1){
                    beaverLeft -= 50;
                    beaver.style.left = beaverLeft + "px";
                    mazearray[beaverPos[0]][beaverPos[1]] = 1;
                    mazearray[beaverPos[0]][beaverPos[1]-1] = 2;
                    console.log(mazearray);

            }
            if(e.key == "ArrowUp"
                && beaverTop > 0
                && mazearray[beaverPos[0]-1][beaverPos[1]] == 1){
                    beaverTop -= 50;
                    beaver.style.top = beaverTop + "px";
                    mazearray[beaverPos[0]][beaverPos[1]] = 1;
                    mazearray[beaverPos[0]-1][beaverPos[1]] = 2;
                    console.log(mazearray);
            }
            if(e.key == "ArrowDown"
                && beaverTop < (mazearray.length-1)*50
                && mazearray[beaverPos[0]+1][beaverPos[1]] == 1){
                    beaverTop += 50;
                    beaver.style.top = beaverTop + "px";
                    mazearray[beaverPos[0]][beaverPos[1]] = 1;
                    mazearray[beaverPos[0]+1][beaverPos[1]] = 2;
                    console.log(mazearray);
            }
            if(beaverLeft == cogLeft && beaverTop == cogTop){
                alert("you win!");
            }

        })
