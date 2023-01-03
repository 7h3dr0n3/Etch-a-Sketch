
const sketch = document.getElementById('sketch');
const container = document.getElementById("container");
let rows = 16, cols = 16;

//callbacks with default
newGrid(rows, cols);
changeColor();

//settings
//insert button at top and event listener
const settings = document.querySelector('#settings');
const size = document.createElement('button');
size.innerText = "Set Size";
settings.appendChild(size);

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
    allPrevSquares.forEach(element => {
        element.style.backgroundColor = "#FFFFFF";
        element.removeAttribute('lighten');
    });
    eraser.classList.remove("active");
    lightening.classList.remove("active");

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
                element.style.backgroundColor = "#FFFFFF";
                element.removeAttribute('lighten');
            } else if (lightening.classList.contains('active')) {
                const val = element.getAttribute('lighten');
                console.log(val);
                const light = parseInt(val) + 10;
                if (light <= 100) {
                    element.setAttribute("lighten", `${light}`);
                    const backColor = LightenColor(`${element.style.backgroundColor}`, light);
                    element.style.backgroundColor = `${backColor}`;
                    if (light == 100) {
                        element.removeAttribute('lighten');
                    }
                }
            } else {
                element.style.backgroundColor = "#000000";
                element.setAttribute("lighten", `0`);
            }
        });
    });

};

//size change listener with callbacks

size.addEventListener('click', (event) => {

    const gridSquares = prompt("Enter No of Squares per Side?", 16);
    if (gridSquares > 100) {
        gridSquares = prompt("Enter numeric value from 0 to 100? ", 16);
    }
    rows = gridSquares;
    cols = gridSquares;

    const allPrevSquares = document.querySelectorAll('.square');
    allPrevSquares.forEach(element => element.style.backgroundColor = "#FFFFFF");

    newGrid(rows, cols);
    changeColor();
});


//lighten color 
function LightenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
        amt = Math.round(2.55 * parseInt(percent)),
        R = (num >> 16) + amt,
        B = (num >> 8 & 0x00FF) + amt,
        G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};
