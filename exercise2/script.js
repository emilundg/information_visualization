// Global variables
// These are used for D3 graphs axises
loadedData = false;
domainX = [50, 85];
domainY = [0, 5];

var d3Update = false;

function drawD3Plot() {
    var width = 600;
    var height = 300;
    var xoffs = 40;
    var yoffs = 40;

    var svg = d3.select("#d3Container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


        // NAME THE DIFFERENT AXISES
      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height - 10)
        .text("Temperature");

        // y-axis name
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 1)
            .attr("x", -height/3)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Erosio Incidents");


    // Get actual width
    width = svg.node().getBoundingClientRect().width;

    var x = d3.scaleLinear().domain(domainX).range([xoffs, width - 20]);
    var y = d3.scaleLinear().domain(domainY).range([height - yoffs, 20]);

    var linedata = d3.line()
        .x(function (d) { return x(d["Temperature F"]) })
        .y(function (d) { return y(d["Erosion incidents"]) });

    // Add axes first to show plots on top
    var x_axis = svg.append("g")
        .classed("x axis", true)
        .attr("transform", function () { return "translate(0," + y.range()[0] + ")" });

    var y_axis = svg.append("g")
        .classed("y axis", true)
        .attr("transform", function () { return "translate(" + x.range()[0] + ",0)" });

    // Add line first to show markers on top
    var line_path = svg.append("path")
        .data([loadedData])
        .classed("line", true)
        .attr("fill", "none")
        .style("opacity", .8)
        .attr("stroke", "rgb(7, 36, 18)")
        .attr("stroke-width", "1px");

    // Initial setup done - actual binding to data is done in update()!

    function update() {

        // Sort the data to make the line work right
        loadedData.sort(function (x1, x2) {
            return d3.ascending(x1["Temperature F"], x2["Temperature F"]);
        })

        line_path.data([loadedData]);

        x.domain(domainX);
        y.domain(domainY);
        x_axis.transition().call(d3.axisBottom(x));
        y_axis.transition().call(d3.axisLeft(y));
        line_path.transition().attr("d", linedata);

        var markers = svg.selectAll(".marker")
            .data(loadedData);

        markers.exit().remove();

        var new_markers = markers.enter()
            .append("g")
            .classed("marker", true);


        // CHANGE THESE TO CHANGE DATA IN PLOT
        function marker_translation(d) {
            return "translate(" + x(d["Temperature F"]) + ", " + y(d["Erosion incidents"]) + ")";
        }

        new_markers.attr("transform", marker_translation);
        // Set translation without transition on enter, with transition on update
        markers.transition().attr("transform", marker_translation);

        new_markers.append("circle")
            .attr("r", 10)
            .style("opacity", .9)
            .attr("fill", "MediumSeaGreen")
            .attr("stroke", "rgb(7, 36, 18)");
    }

    // Call update to make inital data binding
    update();

    // Return update function to make it available for other
    // functions to call when appropriate
    return update;
}

function d3RandomZoom() {
    if (d3Update) {
        domainX = [Math.random() * 70, 85];
        domainY = [0, 5 + Math.random() * 10];
        d3Update();
    }
}

function d3ResetZoom() {
    if (d3Update) {
        domainX = [50, 85];
        domainY = [0, 5];
        d3Update();
    }
}

var dimpleChart = false;
var dimpleChartz;

function drawDimplePlot(data) {
  var svg = dimple.newSvg("#dimpleContainer", 590, 400);
  dimpleChartz = new dimple.chart(svg, data);
  dimpleChartz.setBounds(20, 20, 300, 360)
  dimpleChartz.addMeasureAxis("p", "Damage index");
  var innerRing = dimpleChartz.addSeries("Flight", dimple.plot.pie);
  // Negatives are calculated from outside edge, positives from center
  innerRing.outerRadius = "0px";
  innerRing.innerRadius = "-50px";
  dimpleChartz.addLegend(300, 20, 90, 300, "right");
  dimpleChartz.draw();
}

function filterDamage() {
    dimpleChartz.data = dimple.filterData(loadedData,"Damage index",["2", "4", "11"]);
    dimpleChartz.draw();
}


function resetFilter(){
   dimpleChartz.data = dimple.filterData(loadedData,"Damage index", null);
   dimpleChartz.draw();
}

var damaged_csv = "https://dl.dropbox.com/s/r7efnr66iwvfqlu/olympicsshiet1.csv?dl=0";

d3.csv(damaged_csv, function (data) {
    data.forEach(function (d) {
        d["Erosion Incidents"] = +d["Erosion Incidents"];
        d["Temperature"] = +d["Temperature"];
        d["Shuttle"] = "Challenger";
    });
    loadedData = data;

    d3Update = drawD3Plot(data);

    drawDimplePlot(data);
});

function dimpleZoomReset() {
    dimpleChart.axes[0].overrideMin = 52;
    dimpleChart.axes[0].overrideMax = 75;
    dimpleChart.axes[1].overrideMin = 0;
    dimpleChart.axes[1].overrideMax = 8;
    dimpleChart.draw(1000);
}

function dimpleZoomLeft() {
    dimpleChart.axes[0].overrideMax -= 4;
    dimpleChart.axes[1].overrideMax -= 1;
    dimpleChart.draw(750);
}


function dimpleZoomRight() {
    dimpleChart.axes[0].overrideMin += 4;
    dimpleChart.axes[1].overrideMax -= 1;
    dimpleChart.draw(750);
}
