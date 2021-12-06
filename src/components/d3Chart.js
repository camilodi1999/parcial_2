import React, { useEffect } from "react";
import * as d3 from "d3";

function D3Chart(prop) {
  const data = prop.rooms;
  console.log(data);
  const outerRadius = 100;
  const innerRadius = 0;
  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };
  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([0, data.length]);

  useEffect(() => {
    drawChart();
  });

  function drawChart() {
    // Remove the old svg
    d3.select("#pie-container").select("svg").remove();

    // Create new svg
    const svg = d3
      .select("#pie-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.powerUsage.value);

    let div = d3.select("#pie-container").append("div").style("opacity", 0);

    const arc = svg.selectAll().data(pieGenerator(data)).enter();

    // Append arcs
    arc
      .append("path")
      .attr("d", arcGenerator)
      .style("fill", (_, i) => colorScale(i))
      .style("stroke", "#ffffff")
      .style("stroke-width", 0)
      .on("mouseover", function (d) {
        console.log(d);
        let selected = d.srcElement.__data__.data;
        console.log(selected);
        div.transition().duration(50).style("opacity", "1");
        div
          .html(
            selected.name +
              ": " +
              selected.powerUsage.value +
              " " +
              selected.powerUsage.unit
          )
          .style("position", "fixed")
          .style("left", d.clientX + 10 + "px")
          .style("top", d.clientY + "px");
      });

    // Append text labels
    arc
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      //   .text((d) => {
      //     console.log(d.data);
      //     return (
      //       d.data.name +
      //       ": " +
      //       d.data.powerUsage.value +
      //       " " +
      //       d.data.powerUsage.unit
      //     );
      //   })
      .style("fill", (_, i) => colorScale(data.length - i))
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }

  return <div id="pie-container" />;
}

export default D3Chart;
