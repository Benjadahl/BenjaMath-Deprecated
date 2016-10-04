CKEDITOR.replace("editor");

CKEDITOR.instances.editor.setData("<h1>Testman</h1>");

var z = new Expression("z");

var eq1 = new Equation(z.multiply(2), z.pow(3));

var userExpressions = [];

console.log(eq1.toString());
console.log(eq1.solveFor("z").toString());

function renderPreview(){
  $("#preview").empty();
  var eData = CKEDITOR.instances.editor.getData();
  var readMath = false;
  var math = "";
  var previewHtml = "";

  for (i=0; i < eData.length; i++){
    //Check if the character should pre recorded as math
    if(readMath){
      math += eData[i];
    }else{
      previewHtml += eData[i];
    }

    //Check if the character is the end of a pre tag
    if(eData[i] === ">" && eData[i-1] === "e"){
      var next = eData[i-2] + eData[i-3] + eData[i-4];
      if(next === "rp<"){
        math = "";
        readMath = true;
      }
    }

    //Check if the character is the beginning of a pre end tag
    if(eData[i+1] === "<" && eData[i+2] === "/"){
      var next = eData[i+3] + eData[i+4] + eData[i+5] + eData[i+6];
      if(next === "pre>"){
        userExpressions.push(new algebra.parse(math.substring(1)));
        try{
          previewHtml += katex.renderToString(math + "=" + userExpressions[userExpressions.length - 1]);
        }catch(err){
          //Do nothing
        }
        readMath = false;
      }
    }
  }
  userExpressions = [];
  $("#preview").append(previewHtml);
}

setInterval(function() {
  renderPreview();

}, 500);
