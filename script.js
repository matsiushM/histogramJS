const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const buttonPanel = document.getElementById('buttonPanel');
    const sortButton = document.getElementById('sortButton');
    const sortButtonOrder = document.getElementById('sortButtonOrder');

    let animationInterval = null;
    const sortNumsBubble = () => {
        const nodeArray = histogramArea.childNodes;

        let i = 0;
        let j = 0;
        const timeInterval = 500;

        animationInterval = setInterval(() => {
            if (i < nodeArray.length) {
                if (j < nodeArray.length - 1 - i) {
                    const currentNode = Number(nodeArray[j].textContent);
                    const nextNode = Number(nodeArray[j + 1].textContent);

                    if (currentNode > nextNode) {
                        const temp = nodeArray[j].style.left;
                        nodeArray[j].style.left = nodeArray[j + 1].style.left;
                        nodeArray[j + 1].style.left = temp;
                        nodeArray[j + 1].after(nodeArray[j]);
                    }

                    j++;
                } else {
                    i++;
                    j = 0;
                }
            } else {
                clearInterval(animationInterval);
            }
        }, timeInterval);
    }

    const sortNums = () => {
        const nodeArray = histogramArea.childNodes;

        let i = 0;
        let j = 0;
        const timeInterval = 500;

        animationInterval = setInterval(() => {
            if (i < nodeArray.length) {
                if (j < nodeArray.length - 1 - i) {
                    const currentNode = Number(nodeArray[j].style.order);
                    const nextNode = Number(nodeArray[j + 1].style.order);

                    if (currentNode > nextNode) {
                        const temp = nodeArray[j].style.left;
                        nodeArray[j].style.left = nodeArray[j + 1].style.left;
                        nodeArray[j + 1].style.left = temp;
                    }

                    j++;
                } else {
                    i++;
                    j = 0;
                }
            } else {
                clearInterval(animationInterval);
            }
        }, timeInterval);
    }


    const drawHistogram = (numArray) => {
        histogramArea.innerHTML = "";
        const maxNum = Math.max(...numArray);

        const histogramWidth = histogramArea.offsetWidth;

        const elementWidth = (histogramWidth / numArray.length) - 5;

        let elementPosition = 0;

        numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);
            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            element.style.width = elementWidth + "px";
            element.style.left = elementPosition + "px";
            elementPosition += 5 + elementWidth;
            element.style.order = num;
            histogramArea.append(element);
        })
    }

    const showHistogram = () => {
        const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);

        clearInterval(animationInterval);

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
    sortButton.addEventListener("click", sortNumsBubble)
    sortButtonOrder.addEventListener("click", sortNums)
}

histogram();


