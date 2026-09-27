const andmeteUrl = "https://metshein.com/kordamine/json/broneeringud.json";
const tabel = document.querySelector("#broneeringud");
const tabeliKeha = tabel.querySelector("tbody");
const teenuseFilter = document.querySelector("#teenuse-filter");
const kuupaevaFilter = document.querySelector("#kuupaeva-filter");
const kliendiFilter = document.querySelector("#kliendi-filter");
const tulemusteArv = document.querySelector("#tulemuste-arv");
const teenuseKlassid = {
	Juuksur: "juuksur",
	"Massaaž": "massaaz",
	Spa: "spa",
	Kosmeetika: "kosmeetika"
};
let broneeringuRead = [];

function kuvaFiltreeritudBroneeringud() {
	const valitudTeenus = teenuseFilter.value;
	const valitudKuupaev = kuupaevaFilter.value;
	const kliendiOtsing = kliendiFilter.value.trim().toLocaleLowerCase("et");
	const filtreeritudRead = broneeringuRead.filter((rida) =>
		(valitudTeenus === "" || rida.dataset.teenus === valitudTeenus) &&
		(valitudKuupaev === "" || rida.dataset.kuupaev === valitudKuupaev) &&
		(kliendiOtsing === "" || rida.dataset.klient.includes(kliendiOtsing))
	);

	tabeliKeha.replaceChildren(...filtreeritudRead);
	tulemusteArv.textContent = `${filtreeritudRead.length} broneeringut`;
}

[teenuseFilter, kuupaevaFilter].forEach((filter) => {
	filter.addEventListener("change", kuvaFiltreeritudBroneeringud);
});
kliendiFilter.addEventListener("input", kuvaFiltreeritudBroneeringud);

async function laadiBroneeringud() {
	try {
		const vastus = await fetch(andmeteUrl);
		if (!vastus.ok) {
			throw new Error(`Andmete laadimine ebaõnnestus: ${vastus.status}`);
		}

		const andmed = await vastus.json();
		console.log(andmed);

		broneeringuRead = andmed.broneeringud.map((broneering) => {
			const rida = document.createElement("tr");
			rida.classList.add(teenuseKlassid[broneering.teenus] ?? "muu-teenus");
			rida.dataset.teenus = broneering.teenus;
			rida.dataset.kuupaev = broneering.kuupäev;
			rida.dataset.klient = broneering.klient.toLocaleLowerCase("et");

			[broneering.klient, broneering.teenus, broneering.kuupäev, broneering.aeg]
				.forEach((vaartus) => {
					const lahter = document.createElement("td");
					lahter.textContent = vaartus;
					rida.append(lahter);
				});

			return rida;
		});

		kuvaFiltreeritudBroneeringud();
	} catch (viga) {
		console.error("Broneeringute laadimine ebaõnnestus:", viga);
	}
}

laadiBroneeringud();
