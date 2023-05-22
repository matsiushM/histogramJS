const table = document.getElementById('container');
const inputElement = document.getElementById("input");
const inputElementEnter = document.getElementById('input-button')


const drawHistogram = () => {
    table.innerHTML = "";

    const numArray = inputElement.value.trim().split(" ").filter(Number);
    const maxNum = Math.max(...numArray);

    numArray.forEach((num) => {
        // table.insertAdjacentElement('beforeend', element)

        const element = document.createElement("div");
        const barHeight = ((num/maxNum) * 100);

        element.innerHTML = num;
        element.classList.add('barElement');
        element.style.height = barHeight + "%";
        table.append(element)
    })
    inputElement.value = '';
};

inputElementEnter.addEventListener("click", drawHistogram);


