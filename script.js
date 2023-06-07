const histogram = () => {
    const histogramArea = document.getElementById('histogramArea');
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const sortButton = document.getElementById('sortButton');

    let animationInterval = null;
    const sortNumsBubble = () => {
        clearInterval(animationInterval);

        const TIME_INTERVAL = 1000;
        const nodeArray = Array.from(histogramArea.children);

        let i = 0;
        let j = 0;

        animationInterval = setInterval(() => {
            if (i < nodeArray.length) {
                let node = nodeArray[j];
                if (j < nodeArray.length - 1 - i) {
                    const nextNode = nodeArray[j+1];

                    node.style.background = "red";
                    nextNode.style.background = "green";

                    if (Number(node.textContent) > Number(nextNode.textContent)) {
                        [node.style.left, nextNode.style.left] = [nextNode.style.left, node.style.left];
                        [nodeArray[j], nodeArray[j + 1]] = [nodeArray[j + 1], nodeArray[j]]
                    }
                    node = nodeArray[j];
                    node.style.background = "";
                    j++;
                } else {
                    node.style.background = "";
                    i++;
                    j = 0;
                }
            } else {
                i++;
                clearInterval(animationInterval);
            }
        }, TIME_INTERVAL);
    }


    const drawHistogram = (numArray) => {
        histogramArea.innerHTML = "";
        const maxNum = Math.max(...numArray);

        const histogramWidth = histogramArea.offsetWidth;

        const indent = 5;
        const elementWidth = (histogramWidth / numArray.length) - indent;
        let elementPosition = 0;

        numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);
            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            element.style.width = elementWidth + "px";
            element.style.left = elementPosition + "px";
            elementPosition += elementWidth + indent;
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


