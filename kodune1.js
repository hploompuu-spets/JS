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
let sortimiseSeis = { veerg: null, kasvav: true };

function vormindaKuupaev(kuupaev) {
	const [aasta, kuu, paev] = kuupaev.split("-");
	return `${paev}/${kuu}/${aasta}`;
}

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

function sorteeriBroneeringud(veerg) {
	if (sortimiseSeis.veerg === veerg) {
		sortimiseSeis.kasvav = !sortimiseSeis.kasvav;
	} else {
		sortimiseSeis = { veerg, kasvav: true };
	}

	broneeringuRead.sort((esimene, teine) => {
		let tulemus;
		if (veerg === "aeg") {
			const esimeseAeg = esimene.dataset.aeg.split(":").map(Number);
			const teiseAeg = teine.dataset.aeg.split(":").map(Number);
			tulemus = (esimeseAeg[0] * 60 + esimeseAeg[1]) - (teiseAeg[0] * 60 + teiseAeg[1]);
		} else {
			tulemus = esimene.dataset[veerg].localeCompare(teine.dataset[veerg], "et", {
				numeric: true,
				sensitivity: "base"
			});
		}

		return sortimiseSeis.kasvav ? tulemus : -tulemus;
	});

	tabel.querySelectorAll(".sort-button").forEach((nupp) => {
		const onValitud = nupp.dataset.sort === veerg;
		nupp.closest("th").setAttribute(
			"aria-sort",
			onValitud ? (sortimiseSeis.kasvav ? "ascending" : "descending") : "none"
		);
		nupp.querySelector(".sort-indicator").textContent = onValitud
			? (sortimiseSeis.kasvav ? "↑" : "↓")
			: "↕";
	});

	kuvaFiltreeritudBroneeringud();
}

tabel.querySelector("thead").addEventListener("click", (sundmus) => {
	const nupp = sundmus.target.closest(".sort-button");
	if (nupp) {
		sorteeriBroneeringud(nupp.dataset.sort);
	}
});

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
			rida.dataset.aeg = broneering.aeg;

			[broneering.klient, broneering.teenus, vormindaKuupaev(broneering.kuupäev), broneering.aeg]
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
