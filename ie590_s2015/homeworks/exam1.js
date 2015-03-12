var margin = {top: 30, right: 70, bottom: 100, left: 100};
var width = 700 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

// Scale
var x = d3.scale.ordinal()
				.rangeRoundBands([0, width], 0.2);

var x2 = d3.scale.ordinal()
				.rangeRoundBands([0, width], 0.2);

var y = d3.scale.linear()
				.rangeRound([height, margin.top]);

// Axis
var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");

var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left");

// SVG
var svg = d3.select(".container").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.append("g")
					;

d3.json("https://hivelab.org/static/exam1.json", function (data){
	// console.log(data);

	var data = data.filter(function (d) { return (d["Year"] === "Senior") });
	// console.log(data);
	// console.log(data[0]);
	// console.log(data[0]["Year"]);

	var xData = d3.keys(data[0]).filter(function (d) {return (d !== "Year") });
	var yData = d3.values(data[0]).filter(function (d) {return (d !== "Senior") });
	console.log(xData);
	console.log(yData);

	
	x.domain(xData);
	x2.domain(yData);
	y.domain([0, d3.max(yData)])

	svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate("+margin.left+","+ height+")")        
    .call(xAxis)
    .append("text")
    .attr("x", width + 70)
    .attr("dy", 7)
    .style("text-anchor", "end")
    .text("University");

  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+margin.left+",0)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", - 40)
    .style("text-anchor", "end")
    .text("Number of Students");

  svg.selectAll("rect")
  	.data(yData)
  	.enter().append("rect")
  	.attr("x", function (d) { return x2(d); })
  	.attr("y", function (d) { return y(d); })
  	.attr("width", x.rangeBand())
  	.attr("height", function (d) { return (height - y(d)); })
  	.attr("transform", "translate("+margin.left+",0)")
  	.style("fill", "#ff7f0e")
  	;

});