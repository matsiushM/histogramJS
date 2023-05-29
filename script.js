const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const sortButton = document.getElementById('sortButton');

    const sortNumsBubble = () => {
        const nodeArray = histogramArea.childNodes;
        for (let i = 0; i < nodeArray.length; i++) {
            for (let j = i; j < nodeArray.length - 1; j++) {
                if (Number(nodeArray[j].innerText) > Number(nodeArray[j + 1].innerText)) {
                    nodeArray[j + 1].after(nodeArray[j]);
                }
            }
        }
    }

    const drawHistogram = (numArray) => {
        histogramArea.innerHTML = "";
        const maxNum = Math.max(...numArray);

        numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);

            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            histogramArea.append(element);
        })
    }

    const drawDefault = () => {
        const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);

        if (numArray.length === 0) {
            histogramArea.innerHTML = "";
            sortButton.style.display = 'none';
            alert("Не заданно значения!!!");
            return;
        }

        sortButton.style.display = "block";

        drawHistogram(numArray);
    }

    enterButton.addEventListener("click", drawDefault);
    sortButton.addEventListener("click",sortNumsBubble)
}

histogram();


