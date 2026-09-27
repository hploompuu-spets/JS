const andmeteUrl = "https://metshein.com/kordamine/json/broneeringud.json";
const tabel = document.querySelector("#broneeringud");
const tabeliKeha = tabel.querySelector("tbody");
const teenuseKlassid = {
	Juuksur: "juuksur",
	"Massaaž": "massaaz",
	Spa: "spa",
	Kosmeetika: "kosmeetika"
};

async function laadiBroneeringud() {
	try {
		const vastus = await fetch(andmeteUrl);
		if (!vastus.ok) {
			throw new Error(`Andmete laadimine ebaõnnestus: ${vastus.status}`);
		}

		const andmed = await vastus.json();
		console.log(andmed);

		const read = andmed.broneeringud.map((broneering) => {
			const rida = document.createElement("tr");
			rida.classList.add(teenuseKlassid[broneering.teenus] ?? "muu-teenus");

			[broneering.klient, broneering.teenus, broneering.kuupäev, broneering.aeg]
				.forEach((vaartus) => {
					const lahter = document.createElement("td");
					lahter.textContent = vaartus;
					rida.append(lahter);
				});

			return rida;
		});

		tabeliKeha.replaceChildren(...read);
	} catch (viga) {
		console.error("Broneeringute laadimine ebaõnnestus:", viga);
	}
}

laadiBroneeringud();
