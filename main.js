
const sketch = document.getElementById('sketch');
const container = document.getElementById("container");
let rows = 16, cols = 16;

//callbacks with default
newGrid(rows, cols);
changeColor();

//insert button at top and event listener
const settings = document.querySelector('#settings');
const button = document.createElement('button');
button.innerText = "Set new Square/side";
settings.appendChild(button);


// create 16x16 grid of square div's
function createSquare(rows, cols) {

    for (let i = 0; i < rows * cols; i++) {
        const node = document.createElement('div');
        node.classList.add('square');
        // node.innerText = `${i + 1}`;
        container.appendChild(node);
    }

};


//create new grid
function newGrid(rows, cols) {
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    createSquare(rows, cols);
};


// change div's color when your mouse passes over them
function changeColor() {
    const square = document.querySelectorAll('.square');
    square.forEach(element => {
        element.addEventListener("mouseover", (event) => {
            const toColor = event.target;
            toColor.classList.add('colored');

        });
    });

};

//hover listener with callbacks

button.addEventListener('click', (event) => {

    const gridSquares = prompt("Enter No of Squares per Side?", 16);
    if (gridSquares > 100) {
        gridSquares = prompt("Enter numeric value from 0 to 100? ", 16);
    }
    rows = gridSquares;
    cols = gridSquares;

    const allPrevSquares = document.querySelectorAll('.square');
    allPrevSquares.forEach(element => element.remove());

    newGrid(rows, cols);
    changeColor()
});