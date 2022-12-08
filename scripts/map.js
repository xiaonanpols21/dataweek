import * as d3 from 'd3';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

function dCity(newCityBts, newCityHs) {
    const xScale = d3.scaleBand().rangeRound([[0, 1200]]).padding(0.1); // 1200 omdat width in sass 1200 is
    const yScale = d3.scaleLinear().domain([0, 940000]).range(544.51, 0); // 940000 omdat dat hoogste value is van de cities. 544,51 omdat dat height is in sass

    // BTS
    // Circles
    d3.select(".map-bts")
        .selectAll("circle")
        .data(newCityBts)
        .join("circle")
        .attr("cx", d => d.x )
        .attr("cy", d => d.y )
        // Bron: https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js
        .attr("r", 13)
        .style('fill', '#BDBBDD')

        .on("mouseover", (e, d) => {
            const prettyNumber = d3.format(",")(d.numberOfListeners).replace(",", ".");

            d3
            .select(".tooltip-bts")
            .html(`<strong>${d.id}. ${d.city}:</strong> ${prettyNumber}`)
            .transition()
            .duration(175)
            .style("opacity", 1)
        }
        )
        .on("mousemove", e =>
            d3
            .select(".tooltip-bts")
            .style("left", `${e.pageX + 15}px`)
            .style("top", `${e.pageY + 15}px`)
        )
        .on("mouseout", e => d3.select(".tooltip-bts").style("opacity", 0)
        );
    ;

    // Harry Styles
    // Circles
    d3.select(".map-hs")
        .selectAll("circle")
        .data(newCityHs)
        .join("circle")
        .attr("cx", d => d.x )
        .attr("cy", d => d.y )
        .attr("r", 13)
        .style('fill', '#B2A383')

        .on("mouseover", (e, d) => {
            const prettyNumber = d3.format(",")(d.numberOfListeners).replace(",", ".");

            d3
            .select(".tooltip-hs")
            .html(`<strong>${d.id}. ${d.city}:</strong> ${prettyNumber}`)
            .transition()
            .duration(175)
            .style("opacity", 1)
        }  
        )
        .on("mousemove",e =>
            d3
            .select(".tooltip-hs")
            .style("left", `${e.pageX + 15}px`)
            .style("top", `${e.pageY + 15}px`)
        )
        .on("mouseout", e => d3.select(".tooltip-hs").style("opacity", 0)
        );
    ;
};

const heart = [
    {
        "id": 1,
		"city": "Jakarta", 
		"numberOfListeners": 1074452,
		"x": 893,
		"y": 345,

	},
    {
        "id": 1,
		"city": "London", 
		"numberOfListeners": 1416895,
		"x": 500,
		"y": 100,

	},
];

// Heart
// Bron: http://using-d3js.com/05_10_symbols.html
const symbolGenerator = d3.symbol()
	.type(d3.symbolStar)
	.size(1000);

const pathData = symbolGenerator();

d3.select('.map-heart')
	.selectAll('path')
	.data(heart)
	.join('path')
	.attr('transform', d => `translate(${d.x} ${d.y})`)
	.attr('d', pathData)

    .on("mouseover", (e, d) => {
        const prettyNumber = d3.format(",")(d.numberOfListeners).replace(",", ".");

        d3
        .select(".tooltip-star")
        .html(`<strong>${d.id}. ${d.city}:</strong> ${prettyNumber}`)
        .transition()
        .duration(175)
        .style("opacity", 1)
    } 
    )
    .on("mousemove", e =>
        d3
        .select(".tooltip-star")
        .style("left", `${e.pageX + 15}px`)
        .style("top", `${e.pageY + 15}px`)
    )
    .on("mouseout", e => d3.select(".tooltip-star").style("opacity", 0)
    );
;

// Lagenda
d3.select(".legenda-1")
    .append("circle")
    .attr("cx", "38%")
    .attr("cy", 520)
    .attr("r", 10)
    .style("fill", "#BDBBDD")
;

d3.select(".legenda-1")
    .append("text")
    .attr("x", "40%")
    .attr("y", 520)
    .text("BTS streams")
    .style("font-size", "17px")
    .attr("alignment-baseline","middle")
;

d3.select(".legenda-2")
    .append("circle")
    .attr("cx", "52%")
    .attr("cy", 520) 
    .attr("r", 10)
    .style("fill", "#B2A383")
;

d3.select(".legenda-2")
    .append("text")
    .attr("x", "54%")
    .attr("y", 520)
    .text("Harry Styles streams")
    .style("font-size", "17px")
    .attr("alignment-baseline","middle")
;
// Bron: https://d3-graph-gallery.com/graph/custom_legend.html

export {
    dCity
}