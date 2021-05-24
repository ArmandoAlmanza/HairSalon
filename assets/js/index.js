let page = 1;

document.addEventListener("DOMContentLoaded", () => {
    App();
});

const App = () => {
    showServices();

    showSection();

    changeSection();
};

async function showServices() {
    try {
        const result = await fetch("./servicios.json");
        const db = await result.json();
        const { servicios } = db;

        servicios.forEach((service) => {
            const { id, name, price } = service;

            const servceName = document.createElement("p");
            servceName.textContent = name;
            servceName.classList.add("service-name");

            const servicePrice = document.createElement("p");
            servicePrice.textContent = `$ ${price}`;
            servicePrice.classList.add("service-price");

            const serviceDiv = document.createElement("div");
            serviceDiv.classList.add("service");
            serviceDiv.dataset.serviceID = id;

            serviceDiv.onclick = selectService;

            serviceDiv.appendChild(servceName);
            serviceDiv.appendChild(servicePrice);

            document.querySelector("#servicio").appendChild(serviceDiv);
        });
    } catch (error) {
        console.log(error);
    }
}

function selectService(e) {
    let element;
    if (e.target.tagName === "P") {
        element = e.target.parentElement;
    } else {
        element = e.target;
    }

    if (element.classList.contains("select")) {
        element.classList.remove("select");
    } else {
        element.classList.add("select");
    }
}

const showSection = () => {
    const actualSection = document.querySelector(`#step${page}`);
    actualSection.classList.add("show");

    const tab = document.querySelector(`[data-step="${page}"]`);
    tab.classList.add("actual");
};

const changeSection = () => {
    const links = document.querySelectorAll(".tabs button");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            page = parseInt(e.target.dataset.step);

            document.querySelector(".show").classList.remove("show");

            const section = document.querySelector(`#step${page}`);
            section.classList.add("show");

            document.querySelector(".tabs .actual").classList.remove("actual");
            const tab = document.querySelector(`[data-step="${page}"]`);
            tab.classList.add("actual");
        });
    });
};
