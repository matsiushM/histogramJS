import "./style.css";
import HistogramInstance from "./histogram";

const histogram = () => {
    const inputElement = document.getElementById('input');
    const enterButton = document.getElementById('enterButton');
    const containerElement = document.getElementById('histogramArea');

    const showHistogram = () => {
        const numArray = inputElement.value.trim().split(" ").filter(Number).map(Number);
        const histogramWidth = containerElement.offsetWidth;
        if (numArray.length === 0) {
            alert("Не заданно значения!!!");
            return;
        }

        const histograms = new HistogramInstance(numArray, histogramWidth);
        containerElement.append(histograms.drawHistogram())
    }
    enterButton.addEventListener("click", showHistogram);
}
histogram();


