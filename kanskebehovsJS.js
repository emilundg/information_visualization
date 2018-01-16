// You should understand the basics of what's happening in this first function (The CSS part, not the d3 part)
var count = 0;
function changeColor() {
    if (count % 2 == 0) {
      d3.select(".box").style("background-color", "green");
    }
    else {
      d3.select(".box").style("background-color", "red");
    }
    count++;
}

// The stuff below is **optional** to dig into

var i = 0;
var j = 0;
var b = 0;
function alterExternalSVG() {
  if (i >= 200) {
    window.setInterval(function(){
      /// call your function here
      document.body.style.backgroundColor = 'rgb(' + i + ',' + j + ',' + b + ')';
      i -= 10;
      j -= 10;
      b -= 10;
    }, 50);
  } else {
    window.setInterval(function(){
    /// call your function here
    document.body.style.backgroundColor = 'rgb(' + i + ',' + j + ',' + b + ')';
    i += 10;
    j += 10;
    b += 10;
  }, 50);
  }
}

function loadSVG( url, targetid ) {
   d3.text( url, function (text) {
//     console.log(text); // Uncomment to see loaded SVG in console
     d3.select("#"+targetid).html(text); } );
}

loadSVG( "https://gist.githubusercontent.com/dsjolie/e8721ceabafd19fc6f44072c1d0d19ae/raw/03cf92b1a0f7c3e39a5d99cf75947c9881422bcd/starplot.svg", "external_svg");
