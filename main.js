const container = document.getElementById("container");
let rows = 16, cols = 16;

//callbacks with default
newGrid(rows, cols);
changeColor();

//insert button at top and event listener
const button = document.createElement('button');
button.innerText = "Set new Square/side";
document.body.insertBefore(button, container);


// create 16x16 grid of square div's
function createSquare(rows, cols) {

    for (let i = 0; i < rows * cols; i++) {
        const node = document.createElement('div');
        node.classList.add('square');
        node.innerText = `${i + 1}`;
        container.appendChild(node);
    }

};


//create new grid
function newGrid(rows, cols) {
    let auto = "";
    for (let i = 0; i < rows; i++) {
        let prop = "auto "
        auto += prop;
    }
    // console.log(auto);
    container.style.gridTemplateColumns = auto;
    container.style.gridTemplateRows = auto;
    createSquare(rows, cols);
};


// change div's color when your mouse passes over them
function changeColor() {
    const square = document.querySelectorAll('.square');
    square.forEach(element => {
        element.addEventListener("mouseover", (event) => {
            const toRedSquare = event.target;
            toRedSquare.classList.add('colored');

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