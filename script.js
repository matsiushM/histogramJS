const table = document.getElementById('container');
const inputElement = document.getElementById("input");
const ButtonEnter = document.getElementById('button-item');
const ButtonSort = document.getElementById("button-sort");
const ButtonSortBubble = document.getElementById('button-sort_bubble');

let numArray = [];

const updateNumArray = () => {
    numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
    console.log(numArray)
}

const drawHistogram = () => {
    table.innerHTML = "";

    const maxNum = Math.max(...numArray);

    numArray.forEach((num) => {

        const element = document.createElement("div");
        const barHeight = ((num / maxNum) * 100);

        element.innerText = num;
        element.classList.add('barElement');
        element.style.height = barHeight + "%";
        table.append(element)
    })

}

const sortNums = () => {
    numArray.sort((a, b) => a - b);
    drawHistogram();
}

const sortNumsBubble = () => {
    for (let i = 0; i < numArray.length; i++) {
        for (let j = 0; j < numArray.length - 1; j++) {
            if (numArray[j] < numArray[j + 1]) {
                const num = numArray[j];
                numArray[j] = numArray[j + 1]
                numArray[j + 1] = num;
            }
        }
    }

    drawHistogram()
}
inputElement.addEventListener('input', updateNumArray);
ButtonSortBubble.addEventListener("click", sortNumsBubble)
ButtonSort.addEventListener("click", sortNums);
ButtonEnter.addEventListener("click", drawHistogram);


