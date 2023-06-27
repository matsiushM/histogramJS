export default class HistogramInstance {
    currentIndex = 0;
    subIndex = 0;
    INDENT = 5;
    TIME_ANIMATION = 1000;
    nodeArray = [];
    nodeArrayHistory = [];

    constructor(numArray, histogramWidth) {
        this.numArray = numArray;
        this.histogramWidth = histogramWidth

        this.drawHistogram();
    }

    swapElement = (currentNode, nextNode) => {
        [currentNode.style.left, nextNode.style.left] = [nextNode.style.left, currentNode.style.left];
        [this.nodeArray[this.currentIndex], this.nodeArray[this.currentIndex + 1]] = [this.nodeArray[this.currentIndex + 1], this.nodeArray[this.currentIndex]];
    }

    createButton = () => {
        const nextButton = document.createElement("button");
        const backButton = document.createElement("button");

        nextButton.innerText = "Next step";
        backButton.innerText = "Back step";

        nextButton.addEventListener("click", this.nextItr);
        backButton.addEventListener("click", this.backItr);

        return {nextButton, backButton};
    }

    backItr = () => {
        const lengthHistory = this.nodeArrayHistory.length - 1;
        this.currentIndex--;

        if (this.currentIndex < 0 && this.subIndex === 0) {
            this.currentIndex = 0;
            return;
        }

        if (this.currentIndex < 0) {
            this.currentIndex = this.nodeArray.length - 1 - this.subIndex;
            this.subIndex--;
        }

        const currentNode = this.nodeArray[this.currentIndex];
        const nextNode = this.nodeArray[this.currentIndex + 1];

        currentNode.classList.add('redBacklight');
        nextNode.classList.add('greenBacklight');

        if (this.nodeArrayHistory[lengthHistory]) {
            this.swapElement(currentNode, nextNode);
        }

        this.nodeArrayHistory.pop();

        setTimeout(() => {
            currentNode.classList.remove('redBacklight');
            nextNode.classList.remove('greenBacklight');
        }, this.TIME_ANIMATION);
    }

    nextItr = () => {
        if (this.nodeArray.length - 1 - this.subIndex === 0) return;

        if (this.currentIndex === this.nodeArray.length - 1 - this.subIndex) {
            this.subIndex++;
            this.currentIndex = 0;
        }

        if (this.j < 1) this.backButton.classList.remove('hide');

        const currentNode = this.nodeArray[this.currentIndex];
        const nextNode = this.nodeArray[this.currentIndex + 1];

        currentNode.classList.add('greenBacklight');
        nextNode.classList.add('redBacklight');

        this.nodeArrayHistory.push(Number(currentNode.textContent) > Number(nextNode.textContent));

        if (Number(currentNode.textContent) > Number(nextNode.textContent)) {
            this.swapElement(currentNode, nextNode);
        }

        setTimeout(() => {
            currentNode.classList.remove('greenBacklight');
            nextNode.classList.remove('redBacklight');
        }, this.TIME_ANIMATION);
        this.currentIndex++;
    }

    drawHistogram = () => {

        const histogram = document.createElement("div");
        const newHistogramItem = document.createElement("div");

        const {nextButton, backButton} = this.createButton();

        newHistogramItem.append(nextButton);
        newHistogramItem.append(backButton);

        histogram.classList.add("histogramArea")
        const maxNum = Math.max(...this.numArray);

        const elementWidth = (this.histogramWidth / this.numArray.length) - this.INDENT;
        let elementPosition = 0;

        this.numArray.forEach((num) => {
            const element = document.createElement("div");
            const barHeight = ((num / maxNum) * 100);
            element.innerText = num;
            element.classList.add('barElement');
            element.style.height = barHeight + "%";
            element.style.width = elementWidth + "px";
            element.style.left = elementPosition + "px";
            elementPosition += elementWidth + this.INDENT;
            histogram.append(element);
        })

        newHistogramItem.append(histogram);
        this.nodeArray = Array.from(histogram.childNodes);

        return newHistogramItem;
    }
}