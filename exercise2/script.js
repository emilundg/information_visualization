// Global variables
// These are used for D3 graphs axises
loadedData = false;
areaChartData = null;

var dimpleChart = false;
var otherDimple, totalAxis;

function drawDimplePlotZWEI(data) {
  var svg = dimple.newSvg("#d3Container", 590, 400);
       data = dimple.filterData(data, "noc", ["USA", "URS", "GER", "GBR", "FRA", "ITA", "SWE", "HUN", "AUS", "GDR"])
       otherDimple = new dimple.chart(svg, data);
       otherDimple.setBounds(60, 30, 505, 305);
       var yearAxis = otherDimple.addCategoryAxis("x", "edition");
       yearAxis.addOrderRule("Date");
       yearAxis.title = "Year";
       totalAxis = otherDimple.addMeasureAxis("y", "total");
       totalAxis.tickFormat = "";
       totalAxis.title = "Total";
       var lol = otherDimple.addSeries("noc", dimple.plot.area);
       var legend = otherDimple.addLegend(60, 10, 500, 20, "right");
       lol.lineWeight = 0;
       otherDimple.assignColor("USA", "#a6cee3");
       otherDimple.assignColor("URS", "#1f78b4");
       otherDimple.assignColor("GER",  "#b2df8a");
       otherDimple.assignColor("GBR", "#33a02c");
       otherDimple.assignColor("FRA", "#fb9a99");
       otherDimple.assignColor("ITA", "#e31a1c");
       otherDimple.assignColor("SWE", "#fdbf6f");
       otherDimple.assignColor("HUN", "#ff7f00");
       otherDimple.assignColor("AUS", "#cab2d6");
       otherDimple.assignColor("GDR", "#6a3d9a");

       otherDimple.draw();
}

var dimpleChart = false;
var dimpleChartz, medalsAxis;

function drawDimplePlot(data) {
  var svg = dimple.newSvg("#dimpleContainer", 590, 400);
  dimpleChartz = new dimple.chart(svg, data);
  dimpleChartz.setBounds(20, 20, 300, 360)
  medalsAxis = dimpleChartz.addMeasureAxis("p", "Total");
  var innerRing = dimpleChartz.addSeries(["Golds", "Silvers", "Bronzes", "Country"], dimple.plot.pie);

  dimpleChartz.assignColor("USA", "#a6cee3");
  dimpleChartz.assignColor("SovietUnion", "#1f78b4");
  dimpleChartz.assignColor("Germany",  "#b2df8a");
  dimpleChartz.assignColor("GreatBritain", "#33a02c");
  dimpleChartz.assignColor("France", "#fb9a99");
  dimpleChartz.assignColor("Italy", "#e31a1c");
  dimpleChartz.assignColor("Sweden", "#fdbf6f");
  dimpleChartz.assignColor("Hungary", "#ff7f00");
  dimpleChartz.assignColor("Australia", "#cab2d6");
  dimpleChartz.assignColor("EastGermany", "#6a3d9a");
  // Negatives are calculated from outside edge, positives from center
  innerRing.outerRadius = "0px";
  innerRing.innerRadius = "-50px";
  dimpleChartz.addLegend(300, 20, 90, 300, "right");
  dimpleChartz.draw();
}

function filterMedals(event) {
    medalsAxis.measure = event.target.value;
    dimpleChartz.draw(750);
}


var damaged_csv = "https://dl.dropbox.com/s/8xcfjb8m2dvtnpn/olympicstats%20-%20Blad1%20%281%29.csv?dl=0";
var data2_csv = "https://dl.dropbox.com/s/e0rxtxdsa2nhfui/medals.csv?dl=0";

d3.csv(damaged_csv, function (data) {
    loadedData = data;
    drawDimplePlot(data);
});

d3.csv(data2_csv, function (data) {
    areaChartData = data;
    drawDimplePlotZWEI(areaChartData);

});

function zoom() {
    totalAxis.overrideMin = 400;
    totalAxis.overrideMax = 900;
    otherDimple.draw(1000);
}

function resetZoom() {
    totalAxis.overrideMin = null;
    totalAxis.overrideMax = null;
    otherDimple.draw(1000);
}

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

document.querySelector("#medals-filter").addEventListener('change', filterMedals);
