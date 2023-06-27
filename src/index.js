
import "./style.css";
import HistogramItem from "./histogram.js";
const histogram = () => {
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const containerElement = document.getElementById('containerElement');

    const showHistogram = () => {
        const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
        const histogramWidth = containerElement.offsetWidth;
        if (numArray.length === 0) {
            alert("Не заданно значения!!!");
            return;
        }

        const histograms = new HistogramItem(numArray, histogramWidth);
        containerElement.append(histograms.drawHistogram())
    }
    enterButton.addEventListener("click", showHistogram);
}
histogram();


