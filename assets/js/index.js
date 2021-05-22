document.addEventListener("DOMContentLoaded", () => {
    App();
});

const App = () => {
    showServices();
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
