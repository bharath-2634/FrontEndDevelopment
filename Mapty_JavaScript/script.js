'use strict';


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


// Geolocation API
// console.log(name); defer example
class WorkOuts {

    date = new Date();
    id = (date.now() +'').slice(-10);

    constructor(coords,distance,duration) {
        this.Coords = coords;
        this.Distance = distance;
        this.Duration = duration;
    }

};

class Running extends WorkOuts{

    constructor(coords,distance,duration,cadence) {
        super(coords,distance,duration);
        this.cadence = cadence;
        this.calPace();

    }

    calPace() {
        this.Pace = this.Duration/this.Distance;
        return this.Pace;
    }
}

class Cycling extends WorkOuts{

    constructor(coords,distance,duration,elevationGain) {
        super(coords,distance,duration);
        this.elevationGain = elevationGain;
        this.calSpeed();

    }

    calSpeed() {
        this.speed = this.Distance/this.Duration;
        return this.speed;
    }
}

class App {
// Private instance Properties
    #map;
    #mapE;    
    #workOuts = [];

    constructor() {
        this.__getPosition();

        form.addEventListener('submit',this.__getWorkOut.bind(this));
        inputType.addEventListener('change',this.__getToggleElevationField );

    
    }

    __getPosition() {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.__getLoadMap.bind(this),function() {
                console.log("Sorry");
            });    
        
                
        };
    }

    __getLoadMap(position) {
        
            const {latitude} = position.coords;
            const {longitude} = position.coords;
    
            // console.log(`Latitude : ${latitude} \n Longitude : ${longitude}`);
            const coord = [latitude,longitude];
            this.#map = L.map('map').setView(coord, 13);
    
            L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.#map);
    
            this.#map.on('click',this.__getShowForm.bind(this));
    
    }

    __getShowForm(mapEvent) {
        this.#mapE = mapEvent; 
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    __getToggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        
    }

    __getWorkOut(e) {

        e.preventDefault();

        const validatInputs = (...inputs) => inputs.every((inp) => Number.isFinite(inp)); 
        
        const positiveInputs = (...inputs) => inputs.every((inp) => inp>0); 
        
        // Get Input Data From form
        const {lat,lng} = this.#mapE.latlng;
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;

        // Check Data is valid or not
        
        // If activity running create running Object
        if(type==='running') {
            const cadence = +inputCadence.value;
            if(!validatInputs(distance,duration,cadence) || !positiveInputs(distance,duration,cadence)) {
                return alert("Enter Valid Details");
            }
            workout = new Running([lat,lng],distance,duration,cadence);
            this.#workOuts.push(running);
        }
        // If activity cycling create cycling Object
        if(type === 'cycling') {
            const elevation = +inputElevation.value
            if(!validatInputs(distance,duration,elevation) || !positiveInputs(distance,duration)) {
                return alert("Enter Valid Details");
            }
        }
        // Add New Work out for array
        // render workouts on map
        // render workouts on list
        // Hide and clear the inputs


        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =" ";
    
        
        L.marker([lat,lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth : 250,
                minWidth : 100,
                autoClose : false,
                closeOnClick : false,
                className : 'running-popup'
            }))
            .setPopupContent('Work Outs Tony')
            .openPopup();
    }
};

const app  = new App();
// app.__getPosition();








