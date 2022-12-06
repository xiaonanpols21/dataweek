import '../styles/style.css'
import * as d3 from 'd3';

// Fetch data
const urls = ["./data/overview-bts.json", "./data/overview-hs.json"];

Promise.all(urls.map(u => fetch(u)))
  .then(responses => Promise.all(responses.map((res) => res.json())))
  .then(data => {
    console.log("Met de dataset, showt hij eerst bts en dan harry styles")
    console.log("Show all data");
    console.log(data);

    /* 
    ********** 0 = BTS, 1 = Harry Styles ***********
    */

    // Top tracks
    const tracks = [];
    data.forEach(item => {
        tracks.push(item.data.artist.discography.topTracks.items);
    });
    console.log("Top tracks")
    console.log(tracks)

    // Monthly listeners
    
    const listeners = [];
    data.forEach(item => {
        listeners.push(item.data.artist.stats.monthlyListeners);
    });
    console.log("Monthly listeners")
    console.log(listeners);

    // Top 5 cities
    const city = [];
    data.forEach(item => {
        city.push(item.data.artist.stats.topCities.items);
    });
    console.log("Top 5 cities")
    console.log(city);

    // Visuals
    // BTS
    const visualsBts = [];
    data[0].data.artist.visuals.gallery.items.forEach(item => {
        visualsBts.push(item.sources[0]);
    });
    console.log("Visuals BTS gallery")
    console.log(visualsBts);

    // Harry Styles
    const visualsHs = [];
    data[1].data.artist.visuals.avatarImage.sources.forEach(item => {
      visualsHs.push(item);
    });
    console.log("Visuals Harry styles avatarImage")
    console.log(visualsHs);

  });