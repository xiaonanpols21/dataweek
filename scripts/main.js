import '../styles/style.css'
import * as d3 from 'd3';

const urls = ["./data/overview-bts.json", "./data/overview-hs.json"];

Promise.all(urls.map(u => fetch(u)))
  .then(responses => Promise.all(responses.map((res) => res.json())))
  .then(data => {
    console.log(data);

    /* 
    ********** 0 = BTS, 1 = Harry Styles ***********
    */

    // Intro
    const intro = []
    data.forEach(item => {
        intro.push(item.data.artist.profile.biography.text);
    });
    console.log(intro)

    // Top tracks
    const tracks = []
    data.forEach(item => {
        tracks.push(item.data.artist.discography.topTracks.items);
    });
    console.log(tracks)

    // Monthly listeners
    const listeners = []
    data.forEach(item => {
        listeners.push(item.data.artist.stats.monthlyListeners);
    });
    console.log(listeners);

    // Top 5 cities
    const city = []
    data.forEach(item => {
        city.push(item.data.artist.stats.topCities.items);
    });
    console.log(city);
  });