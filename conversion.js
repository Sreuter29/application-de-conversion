const selectBox = document.querySelector('select');
const valDepart = document.querySelector('#valeur-depart');
const tauxComparaison = document.querySelector('.taux-de-comparaison');
const resultatsAffichage = document.querySelector('.resultats');

let options = [];
let valeurSelect;
let tauxEnCours;
valDepart.value = 1;

fetch("https://api.exchangeratesapi.io/latest")
    .then(reponse => reponse.json())
    .then(data => {

        for(const property in data.rates){
            options.push(`<option>${property}</option>`)
        }
        selectBox.innerHTML = options.join('');
        valeurSelect = selectBox.value;
        APICall(valeurSelect);
    })

async function APICall(val){
    const resultatsAPI = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${val}`);
    const resultats = await resultatsAPI.json();

    valeurSelect = val;
    tauxEnCours = resultats.rates[valeurSelect];
    resultatsAffichage.innerText = `1 Euro = ${resultats.rates[valeurSelect]} ${valeurSelect}`;
    tauxComparaison.innerText = `Taux en cours : ${tauxEnCours}`;
}

valDepart.addEventListener('input', (e) => {
    if(e.target.value.length === 0){
        resultatsAffichage.innerText = `0 Euro = 0 ${valeurSelect}`;
    } else {
        let conversionFinale = e.target.value * tauxEnCours;
        resultatsAffichage.innerText = `${e.target.value} Euro = ${conversionFinale} ${valeurSelect}`;
    }

})

selectBox.addEventListener('input', (e) => {
    APICall(e.target.value)
})

//CONVERSION JOURS
const hoursPerDay = 24;
const minutesPerHour = 60;
const secondsPerMinute = 60;

const dayInput = document.querySelector('#day-input');
const calculateButton = document.querySelector('#calculate-button');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

calculateButton.addEventListener('click', () => {
  let days = dayInput.value;
  let calcHours = days * hoursPerDay;
  let calcMinutes = calcHours * minutesPerHour;
  let calcSeconds = calcMinutes * secondsPerMinute;

  hours.innerText = `${calcHours} hours`;
  minutes.innerText = `${calcMinutes} minutes`;
  seconds.innerText = `${calcSeconds} seconds`;
});
