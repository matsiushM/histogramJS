export default class HistogramInstance {
    i = 0;
    j = 0;
    nodeArray = [];
    nodeArrayHistory = [];
    nextButton = document.createElement("button");
    backButton = document.createElement("button");

    constructor(numArray, histogramWidth) {
        this.numArray = numArray;
        this.histogramWidth = histogramWidth

        this.nextButton.addEventListener("click", this.nextItr);
        this.backButton.addEventListener("click", this.backItr);

        this.drawHistogram();
    }

    swapElement = (currentNode, nextNode) => {
        [currentNode.style.left, nextNode.style.left] = [nextNode.style.left, currentNode.style.left];
        [this.nodeArray[this.i], this.nodeArray[this.i + 1]] = [this.nodeArray[this.i + 1], this.nodeArray[this.i]];
    }
    backItr = () => {
        const lengthHistory = this.nodeArrayHistory.length - 1;
        this.i--;

        if (this.i < 0 && this.j === 0) {
            this.backButton.classList.add('hide');
            this.i = 0;
            return;
        }

        if (this.i < 0) {
            this.i = this.nodeArray.length - 1 - this.j;
            this.j--;
        }

        const currentNode = this.nodeArray[this.i];
        const nextNode = this.nodeArray[this.i + 1];

        currentNode.classList.add('redBacklight');
        nextNode.classList.add('greenBacklight');

        if (this.nodeArrayHistory[lengthHistory]) {
            this.swapElement(currentNode, nextNode);
        }

        this.nodeArrayHistory.pop();

        setTimeout(() => {
            currentNode.classList.remove('redBacklight');
            nextNode.classList.remove('greenBacklight');
        }, 1000);
    }
    nextItr = () => {
        if (this.nodeArray.length - 1 - this.j === 0) return;

        if (this.i === this.nodeArray.length - 1 - this.j) {
            this.j++;
            this.i = 0;
        }

        if (this.j < 1) this.backButton.classList.remove('hide');

        const currentNode = this.nodeArray[this.i];
        const nextNode = this.nodeArray[this.i + 1];

        currentNode.classList.add('greenBacklight');
        nextNode.classList.add('redBacklight');

        if (Number(currentNode.textContent) > Number(nextNode.textContent)) {
            this.swapElement(currentNode, nextNode);
            this.nodeArrayHistory.push(true);
        } else {
            this.nodeArrayHistory.push(false);
        }

        setTimeout(() => {
            currentNode.classList.remove('greenBacklight');
            nextNode.classList.remove('redBacklight');
        }, 1000);
        this.i++;
    }
    drawHistogram = () => {
        const INDENT = 5;

        const histogram = document.createElement("div");
        const newHistogramItem = document.createElement("div");

        this.nextButton.innerText = "Next step";
        this.backButton.innerText = "Back step";
        this.backButton.classList.add("hide");

        newHistogramItem.append(this.nextButton);
        newHistogramItem.append(this.backButton);

        histogram.classList.add("histogramArea")
        const maxNum = Math.max(...this.numArray);

        const elementWidth = (this.histogramWidth / this.numArray.length) - INDENT;
        let elementPosition = 0;

        this.numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);
            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            element.style.width = elementWidth + "px";
            element.style.left = elementPosition + "px";
            elementPosition += elementWidth + INDENT;
            histogram.append(element);
        })
        newHistogramItem.append(histogram);
        this.nodeArray = Array.from(histogram.childNodes);
        return newHistogramItem;
    }
}