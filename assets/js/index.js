let page = 1;

document.addEventListener("DOMContentLoaded", () => {
    App();
});

const App = () => {
    showServices();

    showSection();

    changeSection();

    prePage();

    nextPage();

    validPage();
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
    const preSection = document.querySelector(".show");
    if (preSection) {
        preSection.classList.remove("show");
    }

    const actualSection = document.querySelector(`#step${page}`);
    actualSection.classList.add("show");

    const preTab = document.querySelector(".tabs .actual");
    if (preTab) {
        preTab.classList.remove("actual");
    }

    const tab = document.querySelector(`[data-step="${page}"]`);
    tab.classList.add("actual");
};

const changeSection = () => {
    const links = document.querySelectorAll(".tabs button");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            page = parseInt(e.target.dataset.step);

            showSection();
            validPage();
        });
    });
};
const nextPage = () => {
    const btnNext = document.getElementById("next");

    btnNext.addEventListener("click", () => {
        page++;
        validPage();
    });
};

const prePage = () => {
    const btnPre = document.getElementById("previous");
    btnPre.addEventListener("click", () => {
        page--;
        validPage();
    });
};

const validPage = () => {
    const btnNext = document.getElementById("next");
    const btnPre = document.getElementById("previous");

    if (page === 1) {
        btnNext.classList.remove("d-none");
        btnPre.classList.add("d-none");
    } else if (page === 3) {
        btnNext.classList.add("d-none");
        btnPre.classList.remove("d-none");
    } else {
        btnNext.classList.remove("d-none");
        btnPre.classList.remove("d-none");
    }

    showSection();
};
