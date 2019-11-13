EDAV4 Notes
================

### Update, Enter, and Exit Selections
 
[UpdateEnterExit.pdf](UpdateEnterExit.pdf)


### More DOM elements than data values (Removing elements)

Open `SixBlueCircles.html` in Chrome.

Let's bind four data values to the six circles:

``` js
var svg = d3.select("svg");

svg.selectAll("circle")
    .data([123, 52, 232, 90]);
```

Click the black triangle to view the `_enter`, `_exit`, and `_groups` fields. 


We can store the selection in a variable:

``` js
var circ = svg.selectAll("circle")
    .data([123, 52, 232, 90]);
```

Let's look at the exit selection:

``` js
circ.exit();
```

Try this:
``` js
circ.attr("fill", "red");
```

What happened and why?

Now try this:
``` js
circ.exit().attr("fill", "purple");
```

What happened and why?

What do you think this will do? Try it.

``` js
circ.exit().transition().duration(2000).remove();
```

Create a new variable `circ2` and compare it to `circ`:
``` js
var circ2 = d3.selectAll("circle");

circ.data();

circ2.data();

circ.exit();

circ2.exit();
```

What's going on?


### More data values than DOM Elements (Adding elements)

Let's bind new data to the circles:

``` js
var circ = svg.selectAll("circle")
      .data([123, 52, 232, 90, 34, 12, 189, 110]);
```

And look at the enter selection:

``` js
circ.enter();
```

How many placeholders are in the enter selection?

Let's add circles for each of these placeholders:

``` js
circ.enter()
    .append("circle")
      .attr("cx", "100")
      .attr("cy", (d, i) => i * 50 + 25)
      .attr("r", "20")
      .attr("fill", "blue");
```

Try this:
``` js
circ.transition()
  .duration(3000)
  .attr("cx", "400");
```

What do you need to do to act on *all* of the circles?

```
svg.selectAll("circle")
  .transition()
  .duration(2000)
  .attr("cy", (d, i) => (i * 50) + 25)
  .attr("cx", "200");
```

### Combining update and enter selections with `.merge()`

Refresh the screen to get a clean version of  [SixBlueCircles.html](https://raw.githubusercontent.com/jtr13/D3/master/SixBlueCircles.html), or use this [online version](https://jtr13.github.io/D3/SixBlueCircles.html). (Right click to open in a new tab.)

``` js
var svg = d3.select("svg");
var circ = svg.selectAll("circle");
var allcirc = circ.data([123, 52, 232, 90, 34, 12, 189, 110])
      .enter()  // 2 placeholders
        .append("circle")  // placeholders -> circles
          .attr("cx", "100")  // acts on enter selection only
          .attr("cy", (d, i) => (i - 5) * 50)
          .attr("r", "20")
          .attr("fill", "red")
	.merge(circ)  // combines enter and update selections
	
allcirc.transition() // acts on all 8 circles
        .duration(3000)
        .attr("cx", "400")
        .attr("fill", "purple");

allcirc.transition() // acts on all 8 circles
      .duration(3000)
      .attr("cx", "50");
```

### Adding elements with data / enter / append sequence

Refresh the screen to get a clean version of  [SixBlueCircles.html](https://raw.githubusercontent.com/jtr13/D3/master/SixBlueCircles.html), or use this [online version](https://jtr13.github.io/D3/SixBlueCircles.html). (Right click to open in a new tab.)

``` js
var svg = d3.select("svg");

var specialdata = [100, 250, 300];

var bars = svg.selectAll("rect")
      .data(specialdata)
      .enter()
      .append("rect")
        .attr("x", d => d)
        .attr("y", d => d)
        .attr("width", "50")
        .attr("height", "30")
        .attr("fill", "red");
```

What's going on?

Refresh the page, and try the following instead:


``` js
var svg = d3.select("svg");

var specialdata = [100, 250, 300];

var bars = svg.append("g")
      .attr("id", "rects")
      .selectAll("rect")
      .data(specialdata)
      .enter()
      .append("rect")
        .attr("x", d => d)
        .attr("y", d => d)
        .attr("width", "50")
        .attr("height", "30")
        .attr("fill", "red");
```

Compare:

``` js
d3.select("svg")
  .select("g#rects")
  .selectAll("rect")
  .attr("fill", "purple");
```

and

``` js
d3.select("svg")
  .selectAll("rect")
  .attr("fill", "purple");
```

### Practice 1: Horizontal Bar Chart

1. Create a new html file (try to recreate the template without looking... or use [this one](https://raw.githubusercontent.com/jtr13/D3/master/D3template.html)). Add a script that adds an svg element and horizontal bars of the lengths (in pixels) specified in `bardata`. Create the bars with the data / enter / append sequence.

    `var bardata = [300, 100, 150, 225, 75, 275];`


### Practice 2: Merge

Start with the bar chart you created in Practice 1.
    
*Note: it's best to work in the Console for the following so you don't have to sequence the changes.*

1. Change the data to any six other values and update the lengths of the bars.

1. Bind a new dataset, `newbardata` to the bars, update the bar lengths, and remove any extra bars.

    `newbardata = [250, 125, 80, 100];`

1. Bind a new dataset, `reallynewbardata`, to the bars, then add additional bars so each data value has a bar. Make the outline (stroke) of the new bars a different color.

    `reallynewbardata = [300, 100, 250, 50, 200, 150, 325, 275];`

1. Use `.merge()` to combine the update and enter selections into one selection and then transition the height of all of the bars to half their current height.

1. Add text labels inside the bars at the right end with the length of the bar in pixels.</p></li>

Submit / view solutions here: [ExerciseSolutions.md](ExerciseSolutions.md)
