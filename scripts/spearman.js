// Data

 var groupnames = ["A", "B"];
 var numpositions = 7;
 var groups = [];
 for (var i = 0; i < groupnames.length; i++) {
   groups[i] = d3.range(numpositions)
     .map(d =>({group: groupnames[i], key: d + 1, rank: d + 1}));
 };

 // Colors

var colors = d3.scaleSequential(d3.interpolateViridis)
  .domain([0, numpositions]);



//Width and height of svg
  var w = 400;
  var h = 500;
  var margin = {top: 40, left: 30, bottom: 20, right: 30};

// Scale functions

var xScale = d3.scaleBand()
  .domain(groupnames)
  .range([margin.left, w - margin.right]);

var xpos = function(x) {
  return xScale(x) + xScale.bandwidth()/2;
}

var yScale = d3.scaleLinear()
  .domain([.5, numpositions + .5])
  .range([margin.top, h - margin.bottom]);


//Create SVG element
  var svg = d3.select("div#spearman")
    .append("svg")
      .attr("width", w)
      .attr("height", h);

  svg.append("rect")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "#F5F5F5");


// Initial positions

  var ladders = svg.selectAll("g")
    .data(groupnames)
    .enter()
    .append("g")
    .attr("id", d => d);

  ladders.append("line")
    .attr("x1", d => xpos(d))
    .attr("y1", yScale(.5))
    .attr("x2", d => xpos(d))
    .attr("y2", yScale(numpositions + .5))
    .attr("stroke", "black");

  ladders.append("text")
    .attr("x", d => xpos(d))
    .attr("y", yScale(.25))
    .text(d =>`Group: ${d}`);

// http://bl.ocks.org/ironfrown/5dc9cbeeba8bd8783120ee8af744c11c#file-how-to-drag-and-rotate-labels-in-d3-md

  for (var i = 0; i < groupnames.length; i++) {
   var holders = d3.select(`g#${groupnames[i]}`)
    .selectAll("g")
    .data(groups[i], d => d.key)
		.enter()
		.append("g")
		.attr("gy", d => yScale(d.rank))
		.attr("transform", d => `translate(${xpos(d.group)},
		    ${yScale(d.rank)})`);

  holders.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", "12")
    .attr("fill", d => colors(d.key));

  holders.append("text")
    .classed("rank", true)
    .attr("x", 0)
    .attr("y", 0)
    .text(d => d.key);


  holders.call(d3.drag()
      .on("drag", dragged)
      .on("end", ended));
}


 // d3.select("h3").text(data1);

// drag behavior
  function dragged(event, d) {
    var whichladder = d3.select(this).data()[0].group;
    if (event.y >= yScale.range()[0] & event.y <= yScale.range()[1]) {

      d3.select(this).attr("transform",
         d => `translate(${xpos(whichladder)}, ${event.y})`);
      d3.select(this).attr("gy", event.y)
    };
  };

  function ended(event, d) {
    var whichladder = d3.select(this).data()[0].group;
    var newrank = getrank(whichladder);
    var newdata = d3.range(numpositions).map(d => ( {group: whichladder, key: newrank[d], rank: d + 1 } ) );
    d3.select(`g#${whichladder}`)
      .selectAll("g")
      .data(newdata, d => d.key)
      .attr("gy", d => yScale(d.rank))
      .transition()
      .duration(250)
      .ease(d3.easeExpIn)
		  .attr("transform", d => `translate(${xpos(d.group)},
		    ${yScale(d.rank)})`);
		calculate()
    };



  function getrank(group) {
    var ycoords = [];
    d3.selectAll(`g#${group}`)
    .selectAll("g").each(function () {
      // https://stackoverflow.com/questions/57272211/how-to-get-coordinatescx-cy-of-circles-after-d3-force-collision
      const thisD3 = d3.select(this);
      ycoords.push(thisD3.attr("gy"));
    });
    var addrank = ycoords.map((d, i) => [+d, i+1]);
    var newrank = d3.sort(addrank, d => d[0]).map(d => d[1]);
    return(newrank);
  }



// Calculate rho

var calculate = function() {
    var rank1 = getrank("A");
    var rank2 = getrank("B");
    var d = [];
    for (var i = 0; i < rank1.length; i++) {
      d.push(rank1[i] - rank2[i]);
    };
    var d2 = d.map(d => Math.pow(d, 2));
    var f = d3.format(".2f")
    var rho = f(1 - (6*d3.sum(d2)/(Math.pow(rank1.length, 3) - rank1.length)));
    d3.select("h4").text(rho);
}

  calculate()
