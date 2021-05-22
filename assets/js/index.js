document.addEventListener("DOMContentLoaded", () => {
	App();
});

const App = () => {
	showServices();
};

async function showServices(){
	try {
		const result = await fetch('./servicios.json');
		const db = await result.json();
		const { servicios } = db;
	
		servicios.forEach( service => {
			const { id, name, price } = service;

			const servceName;
		});

	} catch (error) {
		console.log(error);
	}
}