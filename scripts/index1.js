// Build Your Own Graph!
//
// source: https://bl.ocks.org/mbostock/929623
// (with minor tweaks)

// viewBox code: https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/

const width = 750;
    height = 150;

const startnodes = [];
for (i = 0; i < 20; i++) {
  startnodes[i] = {};
};

const force = d3.layout.force()
    .size([width, height])
    .nodes(startnodes)
    .linkDistance(30)
    .charge(-60)
    .on("tick", tick);

const svg = d3.select("div#container")
  .append("svg")
  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 750 150")
  .classed("svg-content", true)
  .on("mousemove", mousemove)
  .on("mousedown", mousedown);

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("fill","aliceblue");

let nodes = force.nodes(),
    links = force.links(),
    node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

const cursor = svg.append("circle")
    .attr("r", 15)
    .attr("stroke-width", "2px")
    .attr("transform", "translate(-100,-100)")
    .attr("class", "cursor");

restart();

function mousemove() {
  cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
}

function mousedown() {
  const point = d3.mouse(this),
      node = {x: point[0], y: point[1]},
      n = nodes.push(node);

  // add links to any nearby nodes
  nodes.forEach(function(target) {
    const x = target.x - node.x,
        y = target.y - node.y;
    if (Math.sqrt(x * x + y * y) < 30) {
      links.push({source: node, target: target});
    }
  });

  restart();
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

function restart() {
  link = link.data(links);

  link.enter().insert("line", ".node")
      .attr("class", "link");

  node = node.data(nodes);

  node.enter().insert("circle", ".cursor")
      .attr("class", "node")
      .attr("r", 5)
      .call(force.drag);

  force.start();
}
