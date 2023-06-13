const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const buttonPanel = document.getElementById('buttonPanel');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    let i = 0;
    let j = 0;
    let currentNode;
    let previousNode;
    let nodeArray = [];

    const nextItr = () => {
        if(i>0) currentNode.style.background = "";
        nextStep();
        i++;
    }
    const backItr = () => {
        i--;
        backStep();
    }

    const backStep = () => {
        backButton.classList.add('hide');
            [currentNode.style.left, previousNode.style.left] = [previousNode.style.left, currentNode.style.left];
            [nodeArray[i], nodeArray[i + 1]] = [nodeArray[i + 1], nodeArray[i]];
    }

    const nextStep = () => {
        if (i === nodeArray.length-1 - j) {
            j++
            i = 0;
        }

        const node = nodeArray[i];
        const nextNode = nodeArray[i + 1];

        node.style.background = "green";

        if (Number(node.textContent) > Number(nextNode.textContent)) {
            [node.style.left, nextNode.style.left] = [nextNode.style.left, node.style.left];
            [nodeArray[i], nodeArray[i + 1]] = [nodeArray[i + 1], nodeArray[i]];
            if (i > 0) {
                backButton.classList.remove('hide');
            }
        }
        else{
            backButton.classList.add('hide');
        }
        currentNode = node;
        previousNode = nextNode;
    }


    const drawHistogram = (numArray) => {
        const INDENT = 5;

        histogramArea.innerHTML = "";

        const maxNum = Math.max(...numArray);

        const histogramWidth = histogramArea.offsetWidth;
        const elementWidth = (histogramWidth / numArray.length) - INDENT;
        let elementPosition = 0;

        numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);
            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            element.style.width = elementWidth + "px";
            element.style.left = elementPosition + "px";
            elementPosition += elementWidth + INDENT;
            histogramArea.append(element);
        })
        nodeArray = Array.from(histogramArea.childNodes);
    }

    const showHistogram = () => {
        const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
        j = 0;
        i = 0;

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
    nextButton.addEventListener("click", nextItr);
    backButton.addEventListener("click", backItr);
}
histogram();


