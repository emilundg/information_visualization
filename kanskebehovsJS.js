// You should understand the basics of what's happening in this first function (The CSS part, not the d3 part)
function changeColor() {
  d3.select(".box").style("background-color", "pink");
}

// The stuff below is **optional** to dig into

function alterExternalSVG() {
  d3.selectAll("#external_svg svg .StarMarker path").attr("stroke-width","1");
  d3.select("#external_svg svg text").text("Loaded via javascript/d3");

}

function loadSVG( url, targetid ) {
   d3.text( url, function (text) {
//     console.log(text); // Uncomment to see loaded SVG in console
     d3.select("#"+targetid).html(text); } );
}

loadSVG( "https://gist.githubusercontent.com/dsjolie/e8721ceabafd19fc6f44072c1d0d19ae/raw/03cf92b1a0f7c3e39a5d99cf75947c9881422bcd/starplot.svg", "external_svg");
