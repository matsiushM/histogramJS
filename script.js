const histogram = () => {
    const table = document.getElementById('container');
    const containerButtonSorts = document.getElementById('container-button_sorts')
    const inputElement = document.getElementById('input');
    const buttonInput = document.getElementById('button-input');

    let numArray = [];

    const creatButtonSort = (elementName) => {
        const button = document.createElement("button");
        button.textContent = elementName.replace(/[_-]/, " ");
        button.id = `button-${elementName}`;
        return button;
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
        drawHistogram();
    }

    const drawHistogram = () => {
        table.innerHTML = "";
        containerButtonSorts.innerHTML = ""
        const buttonSort = creatButtonSort("sort");
        const buttonSortBubble = creatButtonSort("sort_bubble");

        containerButtonSorts.append(buttonSort, buttonSortBubble);


        buttonSortBubble.addEventListener("click", sortNumsBubble)
        buttonSort.addEventListener("click", sortNums);

        const maxNum = Math.max(...numArray);

        numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);

            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            table.append(element);
        })
    }

    const drawDefault = () => {
        numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);

        console.log(numArray);

        if (numArray.length === 0) {
            table.innerHTML = "";
            containerButtonSorts.innerHTML = "";
            alert("Не заданно значения!!!");
            return;
        }

        drawHistogram();
    }

    buttonInput.addEventListener("click", drawDefault);
}

histogram();


