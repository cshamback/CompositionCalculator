console.log("Script started.");

let currentGrid = [];
let allGrids = [[]];

const res = 3; // using only squares for now, so l = w = res

// goal: populate grid with every combination of 3 values.
// you MUST use all 3 at least once, but they can be in any order

// do not add the same grid twice

// 0 = Light, 1 = Med, 2 = Dark, -1 = not filled yet 

allGrids = [[-1, -1, -1, -1, -1, -1, -1, -1, -1]] // start with a single empty grid 

// html template for grid 
const gridTemplate = document.createElement("template");
gridTemplate.innerHTML = `
    <div class=parent>
            <div class=child>1</div>
            <div class=child>2</div>
            <div class=child>3</div>
            <div class=child>4</div>
            <div class=child>5</div>
            <div class=child>6</div>
            <div class=child>7</div>
            <div class=child>8</div>
            <div class=child>9</div>
        </div>
`;

// COMPUTE ALL POSSIBLE GRIDS --------------------------------------------------------------

// iterate through all squares in a single grid: 
// first fill all the 0th squares, then all the 1st squares, then all the 2nd squares, etc. 
let prevLength = 1; // store number of grids currently existing
for (let i = 0; i < res ** 2; i++) {

    // look at the ith squares in allGrids
    for (let k = 0; k < prevLength; k++) {
        allGrids[k][i] = 0; // set the kth square in the ith grid to 0
        //printGrid(allGrids[k]);

        addSquare(i, 1, allGrids[k]);
        addSquare(i, 2, allGrids[k]);
    }

    prevLength = allGrids.length;
}

console.log("Finished generating grids.");

// REMOVE INVALID GRIDS -------------------------------------------------------------------

// remove ones that don't contain a 0, a 1, and a 2
for (let i = 0; i < allGrids.length; i++) {
    if ((allGrids[i].includes(0) && allGrids[i].includes(1) && allGrids[i].includes(2)) == false) {
        //console.log("Must remove grid: ", allGrids[i]);
        allGrids.splice(i, 1); // 2nd parameter means remove one item only
        i--;
    }
}

console.log("Finished removing invalid grids.");

/* //For debugging: print all grids 
for(let i = 0; i < allGrids.length; i++) {
    printGrid(allGrids[i]);
}*/

// POPULATE HTML AND SET COLORS ------------------------------------------------------------

for (let i = 0; i < allGrids.length; i++) {
    // get div to append to 
    const parent = document.getElementById("grids");

    // create a clone of the template
    const clone = gridTemplate.content.cloneNode(true);

    // set colors of content
    let children = clone.querySelectorAll('.child');
    for (let k = 0; k < children.length; k++) {
        if (allGrids[i][k] == 0) {
            children[k].style.backgroundColor = "#e0e0e0";
        } else if (allGrids[i][k] == 1) {
            children[k].style.backgroundColor = "#6e6e6e";
        } else if (allGrids[i][k] == 2) {
            children[k].style.backgroundColor = "#1f1f1f";
        } else {
            children[k].style.backgroundColor = "#cf0000";
        }
    }

    // append newly created clone to the bottom
    parent.appendChild(clone);
}

// HELPER FUNCTIONS ------------------------------------------------------------------------

// copy a grid and add a square to the given index 
function addSquare(index, val, grid) {

    let newGrid = grid.slice(); // make a copy of the kth grid 
    newGrid[index] = val; // set the ith value in the new grid 

    allGrids.push(newGrid); // add to allGrids

    //printGrid(newGrid);
}

// print a 2d array 
function printGrid(grid) {
    for (let i = 0; i < (refs ** 2); i += refs) {
        console.log(grid[i], grid[i + 1], grid[i + 2]);
    }
    console.log("----------------------");
}