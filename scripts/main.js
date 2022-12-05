import '../styles/style.css'
import * as d3 from 'd3';

const urls = ["./data/overview-bts.json", "./data/overview-hs.json"];

Promise.all(urls.map(u => fetch(u)))
  .then(responses => Promise.all(responses.map((res) => res.json())))
  .then(data => {
    console.log(data);
  });