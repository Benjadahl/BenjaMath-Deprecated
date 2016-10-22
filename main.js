CKEDITOR.replace("editor");

CKEDITOR.instances.editor.setData("<h1>Testman</h1>");

parser = new DOMParser();

var userExpressions = [];

function solve (eq, variable) {
  eq = new algebra.parse(eq);
  solved = eq.solveFor(variable)
  console.log(eq.solveFor(variable).toString());
  return {string: solved.toString(), algebra: solved};
}

function renderPreview(){
  $("#preview").empty();
  var eData = CKEDITOR.instances.editor.getData();
  var data = parser.parseFromString(eData, "text/html");
  var preTags = data.getElementsByTagName("pre");
  //This loop check wheter there are any elements in the pretags array.
  //If there is take the one at position 0 and replace it. This works because the list is live updating.
  while(preTags.length > 0){
    var element = preTags[0];
    var replaceString = "";
    var mathArray = element.innerHTML.split("\n");
    for (m of mathArray){
      if(m !== ""){
        var curlyOpen = m.indexOf("{");
        var curlyClose = m.indexOf("}");
        if(curlyOpen !== -1){
          if(curlyClose !== -1){
            var args = m.substring(curlyOpen + 1 , curlyClose);
            args = args.split(",");
            var ls = args[1];
            var rs = window[m.substring(0, curlyOpen)](args[0], args[1]);
            userExpressions.push({ls: ls, rs: rs});
          }
        }else{
          userExpressions.push({ls: m, rs: {string: new algebra.parse(m).toString()}});
        }
        console.log(userExpressions);
        replaceString += katex.renderToString(math.parse(userExpressions[userExpressions.length - 1].ls).toTex() + "=" + math.parse(userExpressions[userExpressions.length - 1].rs.string).toTex()) + "<br>";      }
    }
    $(element).replaceWith(replaceString);
  }
  $("#preview").append(data.getElementsByTagName("body")[0].innerHTML);
  userExpressions = [];
}

setInterval(function() {
  window["renderPreview"]();

}, 500);
