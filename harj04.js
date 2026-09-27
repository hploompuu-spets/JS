const products = ["Õunad", "Piim", "Leib", "Juust", "Tomatid", "Kanafilee", "Muna", "Sibul", "Apelsinid", "Riis", "Jogurt", "Kartul", "Kalafilee", "Pasta", "Jogurtijook", "Porgandid", "Virsikud", "Pähklid", "Rosinad", "Kapsas", "Kreeka jogurt", "Veiseliha", "Banaanid", "Oliivid", "Mandlid", "Magus kartul", "Greibid"];


//console.log(products[0]);

//for
//for (let i = 0; i < products.length; i++) {
//    const prod = products[i];
//    console.log (prod)
//}
//while
//let j = 0

//while (j < products.length) {
//    console.log(products[j]);
//    j++
//}



//foreach
//products.forEach(prod => {
//    console.log (prod)    
    
//});

// Erinevad funktsioonid
// Koosta kaks funktsiooni, mis väljastavad sinu nime (ilma ühegi argumendita). Kasuta klassikaslist ja noolefunktsioone.
// function nimi() {
//     console.log("Anna musu")
    
// }
//  let nimi2 = () => {
//     console.log("Karin Egreid")
//  }
 

// nimi()
// nimi2()


// Argumendiga funktsioon
// Kirjuta funktsioon nimega `kuupaevEesti`, mis kuvab konsoolile praeguse kuupäeva ja kuu eesti keeles. Argumendiks kuupäev kujul 19.07.23

const   kuupaevEesti = () => {
    const options= {
        year:"numeric",
        month: "long",
        day: "numeric",
    };

    today = new Date;
    console.log(today.toLocaleDateString("et-EE", options))

}

kuupaevEesti()
// Teadmata hulk
// Kirjuta funktsioon, mis võtab siseniks kasutajalt teadmata hulga täisarve ning tagastab nende koguarvu ning keskmise.

const kokku =(...nr) => {
    summa = 0
    
    nr.forEach(e => {
        summa+=e
    });
    keskmine = summa/nr.length
    console.log(summa, keskmine)

}

kokku(50,20,303,55)

// Ostukorv
// Tekita uus objekt ‘ostukorv‘ ja lisa omadus ‘tooted‘ ja lisa massiivina väärtused nimi, hind ja kogus

const ostukorv = {
tooted: [
    { nimi:'Piim', hind:3.60, kogus:2 },
    { nimi:'Leib', hind:2.00, kogus:1 },
    { nimi:'Munad', hind:1.50, kogus:6 },
    { nimi:'Juust', hind:4.20, kogus:1 },
    { nimi:'Tomatid', hind:2.30, kogus:3 },


],

ostukorvisisu() {
    this.tooted.forEach(toode => {
       console.log(`${toode.nimi} - ${toode.hind} EUR - Kogus: ${toode.kogus}`); 
    });
},
 
ostukorvisumma() {
    summa= 0
    this.tooted.forEach (toode => {
        summa += (toode.hind*toode.kogus)
        
        
    });
    console.log('Ostukorvi kogu summa:', summa);
},

};

ostukorv.ostukorvisisu()
ostukorv.ostukorvisumma()

// Ülessanne 11

//     // Nimed
//         Kasuta nimede massiivi ja tee nimed korda, et kõik hakkaks suure algustähega
// Kasuta perenimesid (väiketähed), et luua neile email kujul perenimi@metshein.com
// Loo funktsioon, mis otsib kas massiivis on nimi või mitte. Kui on, siis kuvab täisnimed.

const nimed = ["mari maasikas", "jaan jõesaar", "kristiina kukk", "margus mustikas", "jaak järve", "kadi kask", "Toomas Tamm", "Kadi Meri", "Leena Laas", "Madis Mets", "Hannes Hõbe", "Anu Allikas", "Kristjan Käär", "Eva Esimene", "Jüri Jõgi", "Liis Lepik", "Kalle Kask", "Tiina Teder", "Kaidi Koppel", "tiina Toom"];

const puhastanimed = (nimed) => {
        nimed.forEach(nimi => {
        let enimi = nimi.split(" ")[0]
        let pnimi = nimi.split(" ")[1]
    console.log(enimi.charAt(0).toUpperCase()+enimi.slice(1)+" "+pnimi.charAt(0).toUpperCase()+pnimi.slice(1))
    
});
}

puhastanimed(nimed)

// Sünniaeg ja vanus
// Kasuta objektide massiivi ja lisa meetod, mis leiab inimeste sünniaja ja vanuse

const inimesteAndmed = [
    { nimi: "Mari Maasikas", isikukood: "38705123568" },
    { nimi: "Jaan Jõesaar", isikukood: "49811234567" },
    { nimi: "Kristiina Kukk", isikukood: "39203029876" },
    { nimi: "Margus Mustikas", isikukood: "49807010346" },
    { nimi: "Jaak Järve", isikukood: "39504234985" },
    { nimi: "Kadi Kask", isikukood: "39811136789" },
];


inimesteAndmed.forEach(inimene => {
    console.log(inimene.isikukood[5]+inimene.isikukood[6]+"."+inimene.isikukood[3]+inimene.isikukood[4]+"."+inimene.isikukood[1]+inimene.isikukood[2])
    
});
