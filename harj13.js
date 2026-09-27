const kaardid =document.querySelectorAll(".card")
const pealkiri =document.querySelectorAll("h5");
const kirj =document.querySelectorAll("p");
const loend =document.querySelectorAll("li");

loend.forEach(e => {
    if(e.textContent.includes ("Tehtud")) {
        e.classList.add("list-group-item-warning")
    }
});



let m = 0

kaardid.forEach(kaart =>{
    
    let nimi = (kaart.querySelector("img").getAttribute("data-title"));
    let kirjeldus = (kaart.querySelector("img").getAttribute("data-description"));
    pealkiri[m].innerHTML=nimi
    kirj[m].innerHTML = kirjeldus
    m+=1
    // console.log(nimi)
});


// console.log(kaardid[0])