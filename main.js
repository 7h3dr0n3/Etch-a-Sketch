
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

const randomColorBtn = document.createElement('button');
randomColorBtn.innerText = "Random Color";
settings.appendChild(randomColorBtn);

//clear
clear.addEventListener('click', (e) => {
    const allPrevSquares = document.querySelectorAll('.square');
    allPrevSquares.forEach(element => {
        element.style.backgroundColor = "#FFFFFF";
        element.removeAttribute('lighten');
        element.removeAttribute('data-color');
    });
    eraser.classList.remove("active");
    lightening.classList.remove("active");

});

//eraser
eraser.addEventListener('click', (event) => {
    event.target.classList.toggle("active");
    lightening.classList.remove("active");
    randomColorBtn.classList.remove('active');
});

//lightening
lightening.addEventListener('click', (event) => {
    event.target.classList.toggle("active");
    eraser.classList.remove("active");
    randomColorBtn.classList.remove('active');
});

//random Color
randomColorBtn.addEventListener('click', (event) => {
    event.target.classList.toggle('active');
    lightening.classList.remove("active");
    eraser.classList.remove("active");
})

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
    const allPrevSquares = document.querySelectorAll('.square');
    allPrevSquares.forEach(element => {
        element.style.backgroundColor = "#FFFFFF";
    });
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
                element.removeAttribute('data-color');
            } else if (lightening.classList.contains('active')) {
                const val = element.getAttribute('lighten'),
                    col = element.getAttribute('data-color');
                // console.log(val);
                const light = parseInt(val) + 10;
                if (light <= 100) {
                    element.setAttribute("lighten", `${light}`);
                    const prevColor = rgbToHex(col);
                    console.log("prev color: ", prevColor, light);
                    const newColor = lightenColor(`${prevColor}`, light);
                    console.log("new Color: ", newColor)
                    element.style.backgroundColor = `${newColor}`;
                    if (light == 100) {
                        element.style.backgroundColor = "#FFFFFF";
                        element.removeAttribute('lighten');
                        element.removeAttribute('data-color');
                    }
                }
            } else if (randomColorBtn.classList.contains('active')) {
                element.style.backgroundColor = createRandomColor();
                element.setAttribute("lighten", `0`);
                element.setAttribute("data-color", `${element.style.backgroundColor}`);
            } else {
                element.style.backgroundColor = "#000000";
                element.setAttribute("lighten", `0`);
                element.setAttribute("data-color", `${element.style.backgroundColor}`);
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
    allPrevSquares.forEach(element => element.remove());
    allPrevSquares.forEach(element => element.style.backgroundColor = "#FFFFFF");

    newGrid(rows, cols);
    changeColor();
});


//lighten color 
function lightenColor(colorCode, amount) {
    console.log('infunc', colorCode, amount);
    let usePound = false;
    amount *= 2.5;
    if (colorCode[0] == "#") {
        colorCode = colorCode.slice(1);
        usePound = true;
    }
    const num = parseInt(colorCode, 16);
    let r = (num >> 16) + amount;

    if (r > 255) {
        r = 255;
    } else if (r < 0) {
        r = 0;
    }

    let b = ((num >> 8) & 0x00FF) + amount;

    if (b > 255) {
        b = 255;
    } else if (b < 0) {
        b = 0;
    }

    let g = (num & 0x0000FF) + amount;

    if (g > 255) {
        g = 255;
    } else if (g < 0) {
        g = 0;
    }
    let color = (g | (b << 8) | (r << 16)).toString(16);
    while (color.length < 6) {
        color = 0 + color;
    }
    console.log(color);
    return (usePound ? '#' : '') + color;
}


//Random Color
function createRandomColor() {
    const maxColorValue = 0xFFFFFF;
    let randomNum = Math.random() * maxColorValue;
    randomNum = Math.floor(randomNum);
    randomNum = randomNum.toString(16);
    let randCol = randomNum.padStart('6', 0);
    return '#' + randCol;
};

//convert rgb to hex

function valueToHex(val) {
    const hex = val.toString(16);
    return hex;
}

function rgbToHex(col) {
    const str = col.toString();
    const arr = str.substring(str.indexOf('(') + 1, str.indexOf(')')).split(', ');
    // console.log(arr);
    let r = parseInt(arr[0]),
        b = parseInt(arr[1]),
        g = parseInt(arr[2]);
    const hex = '#' + valueToHex(r) + valueToHex(g) + valueToHex(b);
    return hex;
}