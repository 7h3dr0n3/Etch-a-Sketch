// create 16x16 grid of square div's

const container = document.getElementById("container");

for (let i = 0; i < 256; i++) {

    const node = document.createElement('div');
    node.classList.add('square');

    container.appendChild(node);
}


const square = document.querySelectorAll('.square');

console.log(square);
square.forEach(element => {
    element.addEventListener("mouseover", (event) => {
        const toRedSquare = event.target;
        toRedSquare.classList.add('red');
        // console.log(toRedSquare);
    });
});
