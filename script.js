
const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const buttonPanel = document.getElementById('buttonPanel');
    const sortButton = document.getElementById('sortButton');
    const sortButtonOrder = document.getElementById('sortButtonOrder');
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const sortNumsBubble = async () => {
        const nodeArray = histogramArea.childNodes;
            for (let i = 0; i < nodeArray.length; i++) {
                for (let j = 0; j < nodeArray.length-1-i; j++) {
                    if (Number(nodeArray[j].textContent) > Number(nodeArray[j + 1].textContent)) {
                        nodeArray[j + 1].after(nodeArray[j]);
                    }
                   await delay(200);
                }
            }
    }

    const sortNums= () => {
        const nodeArray = histogramArea.childNodes;
        for (let i = 0; i < nodeArray.length; i++) {
            nodeArray[i].style.order = Number(nodeArray[i].textContent);
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

    const showHistogram = () => {
        const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
        if (numArray.length === 0) {
            histogramArea.innerHTML = "";
            buttonPanel.classList.add('hide')
            alert("Не заданно значения!!!");
            return;
        }
        buttonPanel.classList.remove('hide');

        drawHistogram(numArray);
    }

    enterButton.addEventListener("click", showHistogram);
    sortButton.addEventListener("click",sortNumsBubble)
    sortButtonOrder.addEventListener("click", sortNums)
}

histogram();


