const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const buttonPanel = document.getElementById('buttonPanel');
    const nextButton = document.getElementById('nextButton');
    const backButton = document.getElementById('backButton');

    let i = 0;  // internal iterations of sorting
    let j = 0;  // external iterations of sorting
    let nodeArray = [];
    let nodeArrayHistory = [];

    const swapElement = (currentNode, nextNode) =>{
        [currentNode.style.left, nextNode.style.left] = [nextNode.style.left, currentNode.style.left];
        [nodeArray[i], nodeArray[i + 1]] = [nodeArray[i + 1], nodeArray[i]];
    }

    const backItr = () => {
        const lengthHistory = nodeArrayHistory.length - 1;
        i--;

        if (i < 0 && j === 0) {
            backButton.classList.add('hide');
            i = 0;
            return;
        }

        if (i < 0) {
            i = nodeArray.length - 1 - j;
            j--;
        }

        const currentNode = nodeArray[i];
        const nextNode = nodeArray[i + 1];

        currentNode.classList.add('redBacklight');
        nextNode.classList.add('greenBacklight');

        if (nodeArrayHistory[lengthHistory]) {
            swapElement(currentNode,nextNode);
        }

        nodeArrayHistory.splice(lengthHistory,1);

        setTimeout(()=>{
            currentNode.classList.remove('redBacklight');
            nextNode.classList.remove('greenBacklight');
        },1000);
    }

    const nextItr = () => {
        const currentNode = nodeArray[i];
        const nextNode = nodeArray[i + 1];

        if (i === nodeArray.length - 1 - j) {
            j++;
            i = 0;
        }

        if (j < 1) backButton.classList.remove('hide');

        if(nodeArray.length - 1 - j === 0) return;

        currentNode.classList.add('greenBacklight');
        nextNode.classList.add('redBacklight');

        if (Number(currentNode.textContent) > Number(nextNode.textContent)) {
            swapElement(currentNode,nextNode);
            nodeArrayHistory.push(true);
        } else {
            nodeArrayHistory.push(false);
        }

        setTimeout(()=>{
            currentNode.classList.remove('greenBacklight');
            nextNode.classList.remove('redBacklight');
        },1000);

        i++;
    }

    const drawHistogram = (numArray) => {
        const INDENT = 5;

        histogramArea.innerHTML = "";
        nodeArrayHistory = [];
        backButton.classList.add('hide');

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


