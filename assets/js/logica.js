const getData = async () => {
  const res = await fetch("https://digimon-api.vercel.app/api/digimon")
  const data = await res.json()
  usarData(data, "digimon-cards")
}
getData()

function usarData(data, idElemento) {
  var elemento = document.getElementById(idElemento);
  var cardDigimon = "";

  for (var i = 0; i < data.length; i++) {
    const { name, img, level } = data[i];

    cardDigimon += `
    <div class="card col-4" style="width: 18rem;" id="card-${i}" onClick="agrandarCard('card-${i}')" onMouseOut="achicarCard('card-${i}')">
            <img src="${img}" class="card-img-top" alt="dig_img">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Level: ${level}</p>
            </div>
    </div>
    `
    elemento.innerHTML = cardDigimon;
  }
}

function agrandarCard(cardId) {
  var card = document.getElementById(cardId);
  card.style.width = "28rem";
  card.classList.add("card-Effects");
}

function achicarCard(cardId) {
  var card = document.getElementById(cardId);
  card.style.width = "18rem";
  card.classList.remove("card-Effects");
}

const getData2 = async () => {
  try {
    var digimon = document.getElementById("search").value
    const res = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${digimon}`)
    const data = await res.json()
    cardDigimonSearched(data[0], "digimon-cards")
    console.log(data)
  }
  catch (error) {
    error = "No hay digimon"
    alert(error)
  }
}

function cardDigimonSearched(digimon, idElemento) {
  var elemento = document.getElementById(idElemento);
  var card = "";

  var card = `
  <div class="card col-4" style="width: 18rem;"> 
          <img src="${digimon.img}" class="card-img-top" alt="dig_img">
          <div class="card-body">
              <h5 class="card-title">${digimon.name}</h5>
              <p class="card-text">Level: ${digimon.level}</p>
          </div>
  </div>
  `
  elemento.innerHTML = card;
}

document.getElementById("form").addEventListener("submit", function (e) {
  var inputSearch = document.getElementById("search").value
  if (inputSearch == "") {
    e.preventDefault()
    getData()
    console.log("No habia información en la búsqueda")
  }
  else {
    e.preventDefault()
    getData2()
  }
})

document.getElementById("form").addEventListener("reset", function (e) {
  var inputSearch = document.getElementById("search").value
  e.preventDefault()
  inputSearch == ""
  getData()
  console.log("Reset")
})