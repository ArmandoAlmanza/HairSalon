let page = 1;

const cita = {
    name: "",
    date: "",
    hour: "",
    services: [],
};

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

    showResume();

    nameDate();

    valitDate();

    dayDate();

    hourDate();
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
        const id = parseInt(element.dataset.serviceID);
        deleteService(id);
    } else {
        element.classList.add("select");

        const objService = {
            id: parseInt(element.dataset.serviceID),
            name: element.firstElementChild.textContent,
            price: element.firstElementChild.nextElementSibling.textContent,
        };
        // console.log(objService);
        addService(objService);
    }
}

const deleteService = (id) => {
    const { services } = cita;
    cita.services = services.filter((service) => service.id !== id);
    // console.log(cita);
};

const addService = (objService) => {
    const { services } = cita;
    cita.services = [...services, objService];
    // console.log(cita);
};

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
        showResume();
    } else {
        btnNext.classList.remove("d-none");
        btnPre.classList.remove("d-none");
    }

    showSection();
};

const showResume = () => {
    const { name, date, hour, services } = cita;

    const divResume = document.querySelector(".resumeContent");

    while (divResume.firstChild) {
        divResume.removeChild(divResume.firstChild);
    }

    if (Object.values(cita).includes("")) {
        const noService = document.createElement("p");
        noService.textContent = "Missing service data, time, date or name";
        noService.classList.add("invalitDate");

        divResume.appendChild(noService);

        return;
    }
    const headingDate = document.createElement('h3');
    headingDate.textContent = "Resume of date";
    // show the resume
    const nameDate = document.createElement("p");
    nameDate.innerHTML = `<span>Name:</span> ${name}`;

    const dayDate = document.createElement("p");
    dayDate.innerHTML = `<span>Day:</span> ${date}`;

    const hourDate = document.createElement("p");
    hourDate.innerHTML = `<span>hour:</span> ${hour}`;

    const serviceDate = document.createElement('div');
    serviceDate.classList.add('service-resume');

    const headingService = document.createElement('h3');
    headingService.textContent = "Resume of your services";
    serviceDate.appendChild(headingService);

    let mount = 0;

    services.forEach((service) => {
        const { name, price } = service;

        const container = document.createElement("div");
        container.classList.add("service-container");

        const serviceText = document.createElement("p");
        serviceText.textContent = name;

        const servicePrice = document.createElement("p");
        servicePrice.textContent = price;
        servicePrice.classList.add('price');
       
        const total = price.split('$');
        mount += parseInt(total[1].trim());

        container.appendChild(serviceText);
        container.appendChild(servicePrice);

        serviceDate.appendChild(container);
    });

    const total = document.createElement('p');
    total.classList.add('total');
    total.innerHTML = `<span>Total mount: </span>$${mount}`;

    divResume.appendChild(headingDate);
    divResume.appendChild(nameDate);
    divResume.appendChild(dayDate);
    divResume.appendChild(hourDate);
    divResume.appendChild(serviceDate);
    divResume.appendChild(total);

};

const nameDate = () => {
    const inputName = document.getElementById("name");
    inputName.addEventListener("input", (e) => {
        const nameTxt = e.target.value.trim();

        if (nameTxt === "" || nameTxt.length < 3) {
            showAlert("eres puto", "error");
        } else {
            const alert = document.querySelector(".alert");
            if (alert) {
                alert.remove();
            }
            cita.name = nameTxt;
            // console.log(cita);
        }
    });
};

const showAlert = (message, type) => {
    const preAlert = document.querySelector(".alert");
    if (preAlert) {
        return;
    }
    // console.log(`Hijole carnal pero el patron dice que ${message}`);

    const alert = document.createElement("div");
    alert.textContent = message;
    alert.classList.add("alert");

    if (type === "error") {
        alert.classList.add("error");
    }
    const formulario = document.querySelector(".formulario");
    formulario.appendChild(alert);
    // console.log(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
};

const dayDate = () => {
    const inputDate = document.getElementById("date");
    inputDate.addEventListener("input", (e) => {
        const day = new Date(e.target.value).getUTCDay();
        if ([0, 6].includes(day)) {
            e.preventDefault();
            inputDate.value = "";
            showAlert("the weekends are not valid dude", "error");
        } else {
            cita.date = inputDate.value;
            // console.log(cita);
        }
        /* const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long'
        };
        console.log(day.toLocaleDateString('es-ES', options)); */
    });
};
const valitDate = () => {
    const inputDate = document.querySelector("#date");
    const today = new Date();
    let fecha = "";
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    if (month < 10 && day < 10) {
        fecha = `${year}-0${month}-0${day}`;
    } else if (day < 10 && month >= 10) {
        fecha = `${year}-${month}-0${day}`;
    } else {
        fecha = `${year}-${month}-${day}`;
    }

    inputDate.min = fecha;
};

const hourDate = () => {
    const inputHour = document.getElementById("hour");
    inputHour.addEventListener("input", (e) => {
        const dateHour = e.target.value;
        const hour = dateHour.split(":");
        if (hour[0] < 10 || hour[0] > 18) {
            showAlert("opening hours from 9hrs to 18hrs", "error");
            setTimeout(() => {
                inputHour.value = "";
            }, 1000);
        } else {
            cita.hour = dateHour;
        }
    });
};
