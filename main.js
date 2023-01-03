const cls = ["black", "lighten"];
const sketch = document.getElementById('sketch');
const container = document.getElementById("container");
let rows = 16, cols = 16;

//callbacks with default
newGrid(rows, cols);
changeColor();

//settings
//insert button at top and event listener
const settings = document.querySelector('#settings');
const button = document.createElement('button');
button.innerText = "Set Size";
settings.appendChild(button);

const clear = document.createElement('button');
clear.innerText = "Clear";
settings.appendChild(clear);

const eraser = document.createElement('button');
eraser.innerText = "Eraser";
settings.appendChild(eraser);

const lightening = document.createElement('button');
lightening.innerText = "Lighten";
settings.appendChild(lightening);

//clear
clear.addEventListener('click', (e) => {
    const allPrevSquares = document.querySelectorAll('.square');
    allPrevSquares.forEach(element => element.classList.remove(...cls));
});

//eraser
eraser.addEventListener('click', (event) => {
    event.target.classList.toggle("active");
    lightening.classList.remove("active");

});

//lightening
lightening.addEventListener('click', (event) => {
    event.target.classList.toggle("active");
    eraser.classList.remove("active");
});

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
            if (eraser.classList.contains('active')) {
                lightening.classList.remove("active");
                toColor.classList.remove(...cls);
            } else if (lightening.classList.contains('active') && toColor.style.backgroundColor === "") {
                eraser.classList.remove('active');
                toColor.classList.add('lighten');
            } else {
                toColor.classList.add('black');
            }
        });
    });

};

// eraser to white
function toErase() {
    const square = document.querySelectorAll('.square');
    square.forEach(element => {
        element.addEventListener("mouseover", (event) => {
            const toColor = event.target;
            toColor.classList.remove(...cls);

        });
    });

};

//size change listener with callbacks

button.addEventListener('click', (event) => {

    const gridSquares = prompt("Enter No of Squares per Side?", 16);
    if (gridSquares > 100) {
        gridSquares = prompt("Enter numeric value from 0 to 100? ", 16);
    }
    rows = gridSquares;
    cols = gridSquares;

    const allPrevSquares = document.querySelectorAll('.square');
    allPrevSquares.forEach(element => element.classlist.remove(...cls));

    newGrid(rows, cols);
    changeColor();
});
