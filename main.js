// create 16x16 grid of square div's

const container = document.getElementById("container");

for (let i = 0; i < 256; i++) {
    const node = document.createElement('div');
    node.classList.add('square');
    container.appendChild(node);
}

// change div's color when your mouse passes over them
const square = document.querySelectorAll('.square');

square.forEach(element => {
    element.addEventListener("mouseover", (event) => {
        const toRedSquare = event.target;
        toRedSquare.classList.add('red');

    });
});

// ask no of square (max=100)per side for the new grid,
// existing grid should be removed and a new grid should be generated 

const button = document.createElement('button');
button.innerText = "Set new Square/side";
document.body.insertBefore(button, container);

button.addEventListener('click', (event) => {
    const gridSquares = prompt("Enter No of Squares per Side?", 16);
    if (gridSquares > 100) {
        gridSquares = prompt("Enter value should be less than 100? ", 16);
    }
});







