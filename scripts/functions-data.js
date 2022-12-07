import * as g from "./gsap.js";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
        g.trackAnimate(html);
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
        g.trackAnimate(html);
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
      g.iconAnimate(html);
    });

    // ForEach Listeners BTS
    iconsAmountHs.forEach(item => {
        const html = `<i class="fa-sharp fa-solid fa-person-dress hs-icon"></i>`;
        listenersHs.insertAdjacentHTML("beforeend", html);
        g.iconAnimate(html);
    });
};

// Listeners tooltip
function dListTooltip(names, listeners) {
    const nameBts = document.querySelector("#bts-tooltip h3");
    const nameHs = document.querySelector("#hs-tooltip h3");

    const amountBts = document.querySelector("#bts-tooltip h4");
    const amountHs = document.querySelector("#hs-tooltip h4");

    nameBts.textContent = names[0];
    nameHs.textContent = names[1];

    amountBts.textContent = listeners[0];
    amountHs.textContent = listeners[1];

    // Gsap
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(amountBts, {
        textContent: 0,
        duration: 4,
        ease: "Power1.easeIn",
        snap: { textContent: 1 },
        scrollTrigger: "#bts-tooltip h4"
    });

    gsap.from(amountHs, {
        textContent: 0,
        duration: 6,
        ease: "Power1.easeIn",
        snap: { textContent: 1 },
        scrollTrigger: "#hs-tooltip h4"
    });
};

export {
    dVisuals,
    dTracks,
    dListeners,
    dListTooltip
}