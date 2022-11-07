// Create svg and initial bars

  let dur = 0;

  d3.selectAll("input.noc")
    .on("click", function() {
					dur = +d3.select(this).node().value;
			  });

  const w = 400;
  const h = 300;
  const margin = {top: 25, right: 0, bottom: 25, left: 25};
  const innerWidth = w - margin.left - margin.right;
  const innerHeight = h - margin.top - margin.bottom;


  const svg = d3.select("#chart")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h)
      .attr("fill", "lightblue");

  const bardata = [300, 100, 150, 220, 70, 270];

  const xScale = d3.scaleBand()
      .domain(d3.range(bardata.length))
      .range([0, innerWidth])
      .paddingInner(.1);

  const yScale = d3.scaleLinear()
      .domain([0, d3.max(bardata)])
      .range([innerHeight, 0])

  const xAxis = d3.axisBottom()
      .scale(xScale);

  const yAxis = d3.axisLeft()
      .scale(yScale);

  const bars = svg.append("g")
      .attr("id", "plot")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
    .selectAll("rect")
      .data(bardata);

  bars.enter().append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d))
      .attr("fill", "blue");

  svg.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate (${margin.left}, ${h - margin.bottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate (${margin.left}, ${margin.top})`)
      .call(yAxis);

// General Update Pattern

  function update(data) {

    xScale.domain(d3.range(data.length));

    yScale.domain([0, d3.max(data)]);

    const svg = d3.select("#chart").select("svg");

    const bars = svg.select("#plot")
      .selectAll("rect")
        .data(data);
    console.log(bars.data());

    bars.enter().append("rect")
        .attr("x", w)
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d))
        .attr("fill", "blue")
      .merge(bars)
      .transition()
        .duration(dur)
        .ease(d3.easeLinear)
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d))

    bars.exit().remove();

    svg.select(".xAxis")
      .transition()
        .duration(dur)
        .ease(d3.easeLinear)
        .call(xAxis);

    svg.select(".yAxis")
      .transition()
        .duration(dur)
        .ease(d3.easeLinear)
        .call(yAxis);

  }

    d3.selectAll("p.noc")
        .on("click", function () {

      let paraID = d3.select(this).attr("id");
      console.log(paraID);

      if (paraID == "add") {
          const newvalue = Math.floor(Math.random()*400);
          bardata.push(newvalue);
          console.log(bardata);

      } else if (paraID == "remove_left") {
          bardata.shift();
      } else {
          bardata.pop();
      };

      update(bardata);

    });
