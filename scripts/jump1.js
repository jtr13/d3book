let dataset = [100, 150, 200, 250, 300, 350];

let svg = d3.select("#jump1");

// background color for svg

svg.append("rect").attr("x", "0").attr("y", "0")
	.attr("width", "500").attr("height", "400")
    .attr("fill", "aliceblue");

// add text

svg.append("text").attr("id", "step")
	.attr("x", "250").attr("y", "50")
	.style("text-anchor", "middle").style("font-size", "36");

// add circles

svg.selectAll("circle").data(dataset).enter()
	.append("circle").attr("cx", "50").attr("cy", d => d).attr("r", "20")
	.attr("fill", "blue").classed("ex1", true);

svg.on("click", function() {clearInterval(mytimer)});

function dosteps () {
let label = d3.select("#step").text("Step 1");

let circ = d3.selectAll("circle.ex1")

circ.transition().duration(5000).attr("cx", "450")
	.on("end", function () {

	label.text("Step 2");
	circ.transition().duration(5000)
		.attr("cx", "50").attr("fill", "red")
		.on("end", function () {

			label.text("Step 3");
			circ.transition().duration(5000)
				.attr("cx", function(d, i) {return i == 2 ? "450" : "50"})
				.on("end", function () {

					label.text("Step 4");
					circ.transition().duration(5000)
						.attr("cx", "250")
						.transition().duration(5000)
						.attr("cy", "200")
						.on("end", function() {

							label.text("Back to start.");
							circ.transition().duration(5000)
								.attr("cx", "50").attr("cy", d => d)
								.attr("fill", "blue");

						}); // end refresh

				});  // end Step 4

		  }); // end Step 3

	}); // end Step 2

}; // end Step 1

dosteps();

let mytimer = setInterval(dosteps, 30000);
