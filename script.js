const makeButton = document.getElementById('makeButton');
let wordsInput = document.getElementById('wordsInput');

function clicked() {
    let words = wordsInput.value.split(",");
}

makeButton.addEventListener('click', clicked);


