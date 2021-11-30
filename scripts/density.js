  const w = 350;
  const h = 330;
  const slider_h = 40;
  const margin = {left: 25, top: 5, right: 25, bottom: 25};
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;

  const dataset = [{"Year":1790,"Total":162},{"Year":1800,"Total":262},{"Year":1810,"Total":397},{"Year":1820,"Total":503},{"Year":1830,"Total":801},{"Year":1840,"Total":1295},{"Year":1850,"Total":2305},{"Year":1860,"Total":3891},{"Year":1870,"Total":4894},{"Year":1880,"Total":6331},{"Year":1890,"Total":8301},{"Year":1900,"Total":11381},{"Year":1910,"Total":15785},{"Year":1920,"Total":18613},{"Year":1930,"Total":22947},{"Year":1940,"Total":24685},{"Year":1950,"Total":26132},{"Year":1960,"Total":25768},{"Year":1970,"Total":26146},{"Year":1980,"Total":23417},{"Year":1990,"Total":24248},{"Year":2000,"Total":26517}]

  const firstyear = d3.min(dataset.map(d => +d.Year));

  const lastyear = d3.max(dataset.map(d => +d.Year));

  const svg1 = d3.select("#svg1")
    .attr("width", w)
    .attr("height", h);

  svg1.append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .attr("stroke", "blue")
    .attr("fill", "none");

  svg1.append("text")
    .attr("x", innerWidth + margin.left)
    .attr("y", h + 15 - margin.bottom)
    .attr("text-anchor", "end")
    .text("1 square mile")

  svg1.append("text")
    .attr("id", "density")
    .attr("x", margin.left)
    .attr("y", h + 15 - margin.bottom)
    .attr("text-anchor", "start")
    .text("")

  const svg2 = d3.select("#svg2")
    .attr("width", w)
    .attr("height", slider_h);

  svg2.append("text")
    .attr("x", w/2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .text("year");

  const slider = d3.select("input")
    .attr("min", firstyear)
    .attr("max", lastyear)
    .attr("style", "width: " + (w - 35) + "px;");

  const yearScale = d3.scaleLinear()
    .domain([firstyear, lastyear])
    .range([25, w-25]);

  const yearAxis = d3.axisBottom()
    .scale(yearScale)
    .tickFormat(d3.format("d"));

  d3.select("#svg2")
    .append("g")
    .call(yearAxis);

  d3.select("input")
    .on("change", function () {update(+this.value)});

  update(firstyear);

  function update(year) {
      const data_by_year = dataset
        .filter(d => d.Year == year);
      const density = +data_by_year[0].Total;
      const density_points = d3.range(density)
        .map(d => ({x: Math.random()*innerWidth + margin.left,
        y: Math.random()*innerHeight + margin.top}));

  const circ = svg1
    .selectAll("circle")
    .data(density_points);

    circ.enter()
    .append("circle")
    .attr("r", ".75")
    .attr("fill", "blue")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

    circ.exit()
      .remove();

    svg1.select("#density")
      .text(density + " people")
  }
