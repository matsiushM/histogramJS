const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const buttonPanel = document.getElementById('buttonPanel');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    let i = 0;  // flag for internal iterations of sorting
    let j = 0;  // flag for external iterations of sorting
    let k = 0;  // flag for all iteration
    let nodeArray = [];
    let nodeArrayHistory = [];

    const nextItr = () => {
        if (i > 0) {
            nodeArray[i].style.background = "";
            nodeArray[i - 1].style.background = ""
        }
        nextStep();
        i++;
    }
    const backItr = () => {
        if (i < nodeArray.length - 1 - j) {
            nodeArray[i].style.background = "";
            nodeArray[i + 1].style.background = ""
        }
        i--;
        backStep();
    }

    const backStep = () => {
        if (i < 0 && j === 0) {
            backButton.classList.add('hide');
            i = 0;
            return;
        }

        if (i < 0) {
            i = nodeArray.length - 1 - j;
            j--;
            nodeArray[0].style.background = "";
            nodeArray[1].style.background = "";
        }

        const node = nodeArray[i];
        const nextNode = nodeArray[i + 1];

        if (nodeArrayHistory[k - 1]) {
            nextNode.style.background = "green";
            node.style.background = "red";
            [node.style.left, nextNode.style.left] = [nextNode.style.left, node.style.left];
            [nodeArray[i], nodeArray[i + 1]] = [nodeArray[i + 1], nodeArray[i]];
        }
        k--;
    }

    const nextStep = () => {
        if (i === nodeArray.length - 1 - j) {
            j++
            i = 0;
        }

        const node = nodeArray[i];
        const nextNode = nodeArray[i + 1];
        if (i > 0) backButton.classList.remove('hide');


        node.style.background = "green";
        nextNode.style.background = "red";

        if (Number(node.textContent) > Number(nextNode.textContent)) {
            [node.style.left, nextNode.style.left] = [nextNode.style.left, node.style.left];
            [nodeArray[i], nodeArray[i + 1]] = [nodeArray[i + 1], nodeArray[i]];
            nodeArrayHistory.push(true);
        } else {
            nodeArrayHistory.push(false);
        }
        k++;
    }

    const drawHistogram = (numArray) => {
        const INDENT = 5;

        histogramArea.innerHTML = "";
        nodeArrayHistory = [];
        backButton.classList.add('hide');
        k = 0;

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


