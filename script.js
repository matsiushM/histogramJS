const histogram = () => {
    const table = document.getElementById('container');
    const inputElement = document.getElementById("input");
    const buttonInput = document.getElementById('button-input');
    const buttonSort = document.getElementById("button-sort");
    const buttonSortBubble = document.getElementById('button-sort_bubble');

    let numArray = [];
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

    const drawDefault = () => {
        numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
        drawHistogram();
    }

    const sortNums = () => {
        numArray.sort((a, b) => a - b);
        drawHistogram();
    }

    const sortNumsBubble = () => {
        for (let i = 0; i < numArray.length; i++) {
            for (let j = numArray.length - 1; j > i; j--) {
                if (numArray[j] > numArray[j - 1]) {
                    const num = numArray[j];
                    numArray[j] = numArray[j - 1];
                    numArray[j - 1] = num;
                }
            }
        }
        drawHistogram()
    }

    buttonSortBubble.addEventListener("click", sortNumsBubble)
    buttonSort.addEventListener("click", sortNums);
    buttonInput.addEventListener("click", drawDefault);
}

histogram();


