CKEDITOR.replace("editor");

CKEDITOR.instances.editor.setData("<h1>Testman</h1>");

parser = new DOMParser();

var userExpressions = [];

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
        userExpressions.push(new algebra.parse(m));
        replaceString += katex.renderToString(math.parse(m).toTex() + "=" + userExpressions[userExpressions.length - 1]) + "<br>";
      }
    }
    $(element).replaceWith(replaceString);
  }
  $("#preview").append(data.getElementsByTagName("body")[0].innerHTML);
}

setInterval(function() {
  renderPreview();

}, 500);
