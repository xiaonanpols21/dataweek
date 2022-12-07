import '../styles/style.css'
import * as d3 from 'd3';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Fetch data
// Bron: https://stackoverflow.com/questions/31710768/how-can-i-fetch-an-array-of-urls-with-promise-all
const urls = ["./data/overview-bts.json", "./data/overview-hs.json"];
Promise.all(urls.map(u => fetch(u)))
  .then(responses => Promise.all(responses.map((res) => res.json())))
  .then(data => {
    console.log(data);

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
    console.log(listeners);

    // Listeners format .
    // Bron: https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
    const amountListeners = [];
    listeners.forEach(item => {
        amountListeners.push(item.toLocaleString());
    });
    console.log(amountListeners);

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
    console.log(iconsAmountBts);

    const iconsAmountHs = Array.from({length: amountHs}, (_, i) => i + 1);
    console.log(iconsAmountHs);

    // Top 5 cities
    const city = [];
    data.forEach(item => {
        city.push(item.data.artist.stats.topCities.items);
    });
    console.log(city);

    // Visuals
    // BTS
    const visualsBts = [];
    data[0].data.artist.visuals.gallery.items.forEach(item => {
        visualsBts.push(item.sources[0]);
    });
    console.log(visualsBts);

    // Harry Styles
    const visualsHs = [];
    data[1].data.artist.visuals.avatarImage.sources.forEach(item => {
      visualsHs.push(item);
    });
    console.log(visualsHs);

    // Use data in another function
    dVisuals(visualsBts, visualsHs);
    dTracks(sliceTrackBts, sliceTrackHs);
    dListeners(iconsAmountBts, iconsAmountHs);
    dListTooltip(names, amountListeners);
  });

// Get header images
function dVisuals(visualsBts, visualsHs) {
    const imgBts = document.querySelector("#h-img-bts");
    const imgHs = document.querySelector("#h-img-hs");

    imgBts.src = visualsBts[1].url;
    imgHs.src = visualsHs[0].url;
};

// Tracks
function dTracks(sliceTrackBts, sliceTrackHs) {
    const galBts = document.querySelector("#galBts");
    const galHs = document.querySelector("#galHs");

    // ForEach tracks BTS
    sliceTrackBts.forEach(item => {
        const img = item.track.album.coverArt.sources[0].url;
        const name = item.track.name;
        const artist = item.track.artists.items[0].profile.name;

        const html = 
        `<article>
            <img src="${img}" alt="Fallback">
            <h4>${name}</h4>
            <p>${artist}</p>
        </article>`;
        galBts.insertAdjacentHTML("beforeend", html);
    });

    // ForEach tracks Harry Styles
    sliceTrackHs.forEach(item => {
        const img = item.track.album.coverArt.sources[0].url;
        const name = item.track.name;
        const artist = item.track.artists.items[0].profile.name;

        const html = 
        `<article>
            <img src="${img}" alt="Fallback">
            <h4>${name}</h4>
            <p>${artist}</p>
        </article>`;
        galHs.insertAdjacentHTML("beforeend", html);
    });
};

// Listeners show icons
function dListeners(iconsAmountBts, iconsAmountHs) {
    const listenersBts = document.querySelector(".icon article:first-of-type");
    const listenersHs = document.querySelector(".icon article:last-of-type");

    // ForEach Listeners BTS
    iconsAmountBts.forEach(item => {
      const html = `<i class="fa-sharp fa-solid fa-person-dress bts-icon"></i>`;
      listenersBts.insertAdjacentHTML("beforeend", html);
      addEvents(html);
    });

    // ForEach Listeners BTS
    iconsAmountHs.forEach(item => {
        const html = `<i class="fa-sharp fa-solid fa-person-dress hs-icon"></i>`;
        listenersHs.insertAdjacentHTML("beforeend", html);
        addEvents(html);
    });
};

// Listeners tooltip
function dListTooltip(names, amountListeners) {
    const nameBts = document.querySelector("#bts-tooltip h3");
    const nameHs = document.querySelector("#hs-tooltip h3");

    const amountBts = document.querySelector("#bts-tooltip h4");
    const amountHs = document.querySelector("#hs-tooltip h4");

    nameBts.textContent = names[0];
    nameHs.textContent = names[1];

    amountBts.textContent = amountListeners[0];
    amountHs.textContent = amountListeners[1];
};

// Icon amination
// Bron: https://www.youtube.com/watch?v=WEky7V490Rs&list=PLMPgoZdlPumexxtvuPUB3TY7LExI1N_Xp&ab_channel=TheCodeCreative
function addEvents(element) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".bts-icon", 
        {
            opacity: 0,
        },
        {
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: ".bts-icon"
        }
    );

    gsap.fromTo(".hs-icon", 
    {
        opacity: 0,
    },
    {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: ".hs-icon"
    }
);
};

