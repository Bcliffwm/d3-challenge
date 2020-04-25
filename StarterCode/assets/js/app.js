// @TODO: YOUR CODE HERE!
var line = null;
function makeResponsive() {
  // if the SVG area isn't empty when the browser loads, remove it
  // and replace it with a resized version of the chart
  // Put chart here:
  d3.csv("/assets/data/data.csv", function (error, data) {
    // Changing everything to numbers
    data.forEach(function (d) {
      d.age = +d.age;
      d.smokes = +d.smokes;
    });
    // scales
    var xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.age)])
      .range([0, width]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.smokes)])
      .range([height, 0]);

    // line generator
    // var line = d3
    //   .line()
    //   .x((d, i) => xScale(i))
    //   .y((d) => yScale(d));
    line = d3.line
  });
  var svgArea = d3.select("body").select("svg");
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  // Demographics: Age vs. Smoking
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

  var chartGroup = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create path
  chartGroup
    .append("path")
    .attr("d", line())
    .attr("fill", "none")
    .attr("stroke", "blue");

  // append circles to data points
  var circlesGroup = chartGroup
    .selectAll("circle")
    .data(age)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d))
    .attr("r", "5")
    .attr("fill", "red");

  //Read the data

  // Step 1: Append a div to the body to create tooltips, assign it a class
  // =======================================================
  var toolTip = d3.select("body").append("div").attr("class", "tooltip");

  // Step 2: Add an onmouseover event to display a tooltip
  // ========================================================
  circlesGroup
    .on("mouseover", function (d, i) {
      toolTip.style("display", "block");
      toolTip
        .html(`Pizzas eaten: <strong>${pizzasEatenByMonth[i]}</strong>`)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY + "px");
    })
    // Step 3: Add an onmouseout event to make the tooltip invisible
    .on("mouseout", function () {
      toolTip.style("display", "none");
    });
}

makeResponsive();
d3.select(window).on("resize", makeResponsive);
