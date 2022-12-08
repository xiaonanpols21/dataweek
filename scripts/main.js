import '../styles/style.css'
import * as f from "./functions-data.js";
import * as m from "./map.js";
import * as c from "../public/data/city.js";

// Fetch data
// Bron: https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
const urls = ["./data/overview-bts.json", "./data/overview-hs.json"];
Promise.all(urls.map(u => fetch(u)))
  .then(responses => Promise.all(responses.map((res) => res.json())))
  .then(data => {

    // Names
    const names = [];
    data.forEach(item => {
        names.push(item.data.artist.profile.name);
    });

    // Top tracks
    // BTS
    const tracksBts = [];
    data[0].data.artist.discography.topTracks.items.forEach(item => {
        tracksBts.push(item);
    });

    // Get only the first 4 tracks
    // Bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
    const sliceTrackBts = tracksBts.slice(0, 4);

    // Harry Styles
    const tracksHs = [];
    data[1].data.artist.discography.topTracks.items.forEach(item => {
        tracksHs.push(item);
    });

    // Get only the first 4 tracks
    const sliceTrackHs = tracksHs.slice(0, 4);

    // Monthly listeners
    const listeners = [];
    data.forEach(item => {
        listeners.push(item.data.artist.stats.monthlyListeners);
    });

    // How many icons do I need?
    const lBts = listeners[0];
    const lHs = listeners[1];

    const divide = 200000;

    // Bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
    // Bron: https://linuxhint.com/divide-two-numbers-in-javascript/#:~:text=For%20the%20division%20of%20two,using%20the%20division%20(%2F)%20operator.
    const amountBts = Math.round(parseInt(lBts)/parseInt(divide));
    const amountHs = Math.round(parseInt(lHs)/parseInt(divide));

    // Numbers in object
    // Bron: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
    const iconsAmountBts = Array.from({length: amountBts}, (_, i) => i + 1);
    const iconsAmountHs = Array.from({length: amountHs}, (_, i) => i + 1);

    // Top 5 cities
    // BTS
    const cityBts = [];
    data[0].data.artist.stats.topCities.items.forEach(item => {
        cityBts.push(item);
    });

    const newCityBts = cityBts.slice(1, 5);

    // Add city.js to data
    newCityBts.map(e => {
        // console.log(e.city);
        const cityLocation = c.btsCityData.filter(d => d.city === e.city);
    
        e.id = cityLocation[0].id;
        e.x = cityLocation[0].x;
        e.y = cityLocation[0].y;
        return e;
    });

    // Harry Styles
    const cityHs = [];
    data[1].data.artist.stats.topCities.items.forEach(item => {
        cityHs.push(item);
    });

    const newCityHs = cityHs.slice(1, 5);

    // Add city.js to data
    newCityHs.map(e => {
        // console.log(e.city);
        const cityLocation = c.hsCityData.filter(d => d.city === e.city);
    
        e.id = cityLocation[0].id;
        e.x = cityLocation[0].x;
        e.y = cityLocation[0].y;
        return e;
    });

    // Visuals
    // BTS
    const visualsBts = [];
    data[0].data.artist.visuals.gallery.items.forEach(item => {
        visualsBts.push(item.sources[0]);
    });

    // Harry Styles
    const visualsHs = [];
    data[1].data.artist.visuals.avatarImage.sources.forEach(item => {
      visualsHs.push(item);
    });

    // Use data in another function
    f.dVisuals(visualsBts, visualsHs);
    f.dTracks(sliceTrackBts, sliceTrackHs);
    f.dListeners(iconsAmountBts, iconsAmountHs);
    f.dListTooltip(names, listeners);
    m.dCity(newCityBts, newCityHs);
  });

// Play btn
// Bron: https://stackoverflow.com/questions/27368778/how-to-toggle-audio-play-pause-with-one-button-or-link

const audioBts = document.querySelector("#audio-bts");
const audioBtnBts = document.querySelector("#galBts button");
let isPlaying = false;
function playBts() {
    isPlaying ? audioBts.pause() : audioBts.play();
}
audioBts.onplaying = function() {
    isPlaying = true;
};
audioBts.onpause = function() {
    isPlaying = false;
};
audioBtnBts.addEventListener("click", playBts);

const audioHs = document.querySelector("#audio-hs");
const audioBtnHs = document.querySelector("#galHs button");

let isPlaying2 = false;
function playHs() {
    isPlaying2 ? audioHs.pause() : audioHs.play();
}
audioHs.onplaying = function() {
    isPlaying2 = true;
};
audioHs.onpause = function() {
    isPlaying2 = false;
};
audioBtnHs.addEventListener("click", playHs);

//*********************** */
/*
const playButtns = document.querySelectorAll(".play-btn")
const audio = document.querySelectorAll(".audio");
const song = document.querySelectorAll(".song");

let isMusicOn = false;

audio.onplaying = function() {
    isMusicOn = true;
};
audio.onpause = function() {
    isMusicOn = false;
};

function switchMusic(event, whichBtn) {
    audio.forEach(item => {
        isMusicOn ? audio.pause() : audio.play();
        if (whichBtn == 1) {
            song.src = "/audio/dreamers.mp3";
        } else {
            song.src = "/audio/as-it-was.mp3";
        };
    });
};

playButtns.forEach(button => {
    button.addEventListener("click", switchMusic);
});
*/