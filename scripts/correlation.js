var action = "add";

//Width and height of svg
var w = 600;
var h = 400;
var padding = 30;

// axis min / max
var xmin = -50;
var xmax = 50;
var ymin = -30;
var ymax = 30;

//		Scale functions

var xScale = d3.scaleLinear()
	.domain([xmin, xmax])
	.range([padding, w - padding * 2]);

var yScale = d3.scaleLinear()
	.domain([ymin, ymax])
	.range([h - padding, padding]);


//Define X axis
var xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(5);

//Define Y axis
var yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5);

//Create SVG element
var svg = d3.select("div#correlation")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

svg.append("rect")
  .attr("width", w)
  .attr("height", h)
  .attr("fill", "none");

//Create X axis
svg.append("g")
	.attr("transform", `translate(0, ${yScale(0)})`)
	.call(xAxis);

//Create Y axis
svg.append("g")
	.attr("transform", `translate(${xScale(0)}, 0)`)
	.call(yAxis);

//On radio button change, update styling
d3.selectAll("input")
	.on("click", function() {
	  action = d3.select(this).node().value;
  });

// Update stats function

var updatestats = function() {

	var data = d3.selectAll("circle").data();

	if(data.length < 2) {
		d3.select("p#r").text("Two points are needed to calculate r.");
		return;
		}

  x = data.map(d => d[0]);
	y = data.map(d => d[1]);
	Sxx = d3.sum(x.map(d => Math.pow(d-d3.mean(x), 2)));
	Sxy = d3.sum(x.map( (d, i) => (x[i]-d3.mean(x))*(y[i]-d3.mean(y))));
	Syy = d3.sum(y.map(d => Math.pow(d-d3.mean(y), 2)));
  corrcoef = Sxy/(Math.sqrt(Sxx)*Math.sqrt(Syy));
  d3.select("p#r").text(`r = ${corrcoef.toFixed(2)}`);
}

// Click behavior

svg.on("click", function(event) {
  if(action === "add") {
	// add a point
	  var new_x = xScale.invert(d3.pointer(event)[0]);
	  var new_y = yScale.invert(d3.pointer(event)[1]);
	  svg.append("circle")
    .data([[new_x, new_y]])
      .attr("cx", d => xScale(d[0]))
      .attr("cy", d => yScale(d[1]))
      .attr("r", "3")
      .attr("fill", "red")
      .on("mouseover", function () {
        if (action === "remove") {
          d3.select(this).remove();
          updatestats();
        }
      });
    updatestats();
  }
});
