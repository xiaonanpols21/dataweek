import '../styles/style.css'
import * as d3 from 'd3';

// Fetch data
const urls = ["./data/overview-bts.json", "./data/overview-hs.json"];
Promise.all(urls.map(u => fetch(u)))
  .then(responses => Promise.all(responses.map((res) => res.json())))
  .then(data => {

    // Top tracks
    // BTS
    const tracksBts = [];
    data[0].data.artist.discography.topTracks.items.forEach(item => {
        tracksBts.push(item);
    });
    console.log(tracksBts)

    // Get only the first 4 tracks
    const sliceTrackBts = tracksBts.slice(0, 4);
    console.log(sliceTrackBts)

    // Harry Styles
    const tracksHs = [];
    data[1].data.artist.discography.topTracks.items.forEach(item => {
        tracksHs.push(item);
    });
    console.log(tracksHs)

    // Get only the first 4 tracks
    const sliceTrackHs = tracksHs.slice(0, 4);
    console.log(sliceTrackHs)

    // Monthly listeners
    const listeners = [];
    data.forEach(item => {
        listeners.push(item.data.artist.stats.monthlyListeners);
    });
    console.log(listeners);

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
  });

function dVisuals(visualsBts, visualsHs) {
    const imgBts = document.querySelector("#h-img-bts");
    const imgHs = document.querySelector("#h-img-hs");

    imgBts.src = visualsBts[1].url;
    imgHs.src = visualsHs[0].url;
};

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