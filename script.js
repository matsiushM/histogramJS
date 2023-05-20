const table = document.getElementById('container');
const inputElement = document.getElementById("input-id");
const inputElementEnter = document.getElementById('input-button')


const drawHistogram = () => {
    const numArray = inputElement.value.trim().split(" ");

    const item = Array.from({length: numArray.length}, (_, index) => ({
            id: index,
            element: document.createElement('div')
    }));

    item.forEach((e) => {
        table.insertAdjacentElement('beforeend', e.element)

        const barHeight = (10 * numArray[e.id]);

        e.element.innerHTML = numArray[e.id];
        e.element.classList.add('barElement');
        e.element.style.height = barHeight + "px";
    })
};

inputElementEnter.addEventListener("click", drawHistogram);


