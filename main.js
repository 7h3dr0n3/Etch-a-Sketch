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

//add button at top of page

const button = document.createElement('button');
button.innerText = "Set new Square/side";
document.body.insertBefore(button, container);
