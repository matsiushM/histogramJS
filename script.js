const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const sortButton = document.getElementById('sortButton');

    let animationInterval = null;
    const sortNumsBubble = () => {
        clearInterval(animationInterval);
        const nodeArray = Array.from(histogramArea.children);

        let i = 0;
        let j = 0;
        const timeInterval = 1000;

        animationInterval = setInterval(() => {
            if (i < nodeArray.length) {
                if (j < nodeArray.length - 1 - i) {

                    if (Number(nodeArray[j].textContent) > Number(nodeArray[j + 1].textContent)) {
                        const tempLeft = nodeArray[j].style.left;
                        nodeArray[j].style.left = nodeArray[j + 1].style.left;
                        nodeArray[j + 1].style.left = tempLeft;

                        const tempNode = nodeArray[j];
                        nodeArray[j] = nodeArray[j + 1];
                        nodeArray[j + 1] = tempNode;
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
        histogramArea.append(element);
    })
}

const showHistogram = () => {
    const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
    clearInterval(animationInterval);

    if (numArray.length === 0) {
        histogramArea.innerHTML = "";
        sortButton.classList.add('hide')
        alert("Не заданно значения!!!");
        return;
    }
    sortButton.classList.remove('hide');

    drawHistogram(numArray);
}

enterButton.addEventListener("click", showHistogram);
sortButton.addEventListener("click", sortNumsBubble);
}

histogram();


