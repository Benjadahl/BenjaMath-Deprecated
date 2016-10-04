CKEDITOR.replace("editor");

CKEDITOR.instances.editor.setData("<h1>Testman</h1>");

var z = new Expression("z");

var eq1 = new Equation(z.multiply(2), z.pow(3));
console.log(eq1.toString());
console.log(eq1.solveFor("z").toString());

function renderPreview(){
  $("#preview").empty();
  var eData = CKEDITOR.instances.editor.getData();
  var readMath = false;
  var math = "";

  for (i=0; i < eData.length; i++){
    //Check if the character should pre recorded as math
    if(readMath){
      math += eData[i];
    }

    //Check if the character is the end of a pre tag
    if(eData[i] === ">" && eData[i-1] === "e"){
      var next = eData[i-2] + eData[i-3] + eData[i-4]
      if(next === "rp<"){
        readMath = true;
      }
    }

    //Check if the character is the beginning of a pre end tag
    if(eData[i+1] === "<" && eData[i+2] === "/"){
      var next = eData[i+3] + eData[i+4] + eData[i+5] + eData[i+6]
      if(next === "pre>"){
        readMath = false;
      }
    }
  }
  console.log(math);
  $("#preview").append(eData + katex.renderToString(math));
}

setInterval(function() {
  renderPreview();
}, 500);
