const table = document.getElementById('container');
const inputElement = document.getElementById("input");
const buttonInput = document.getElementById('button-input');
const buttonSort = document.getElementById("button-sort");
const buttonSortBubble = document.getElementById('button-sort_bubble');

const drawHistogram = (numArray) => {
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
const getArray = () => {
    return inputElement.value.trim().split(" ").filter(Number).map(Number);
}

const drawDefault = () => {
    const numArray = getArray();
    drawHistogram(numArray);
}

const sortNums = () => {
    const numArray = getArray();

    numArray.sort((a, b) => a - b);
    drawHistogram(numArray);
}

const sortNumsBubble = () => {
    const numArray = getArray();

    for (let i = 0; i < numArray.length; i++) {

        let check = false;

        for (let j = 0; j < numArray.length - 1; j++) {
            if (numArray[j] < numArray[j + 1]) {
                const num = numArray[j];
                numArray[j] = numArray[j + 1]
                numArray[j + 1] = num;
                check = true;
            }
        }
        if (!check) break;
    }
    drawHistogram(numArray)
}

buttonSortBubble.addEventListener("click", sortNumsBubble)
buttonSort.addEventListener("click", sortNums);
buttonInput.addEventListener("click", drawDefault);


