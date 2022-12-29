// create 16x16 grid of square div's

const container = document.getElementById("container");

for (let i = 0; i < 256; i++) {

    const node = document.createElement('div');
    node.classList.add('square');

    container.appendChild(node);
}

