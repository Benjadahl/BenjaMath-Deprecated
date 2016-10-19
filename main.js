CKEDITOR.replace("editor");

CKEDITOR.instances.editor.setData("<h1>Testman</h1>");

parser = new DOMParser();

var userExpressions = [];

function renderPreview(){
  $("#preview").empty();
  var eData = CKEDITOR.instances.editor.getData();
  var data = parser.parseFromString(eData, "text/html");
  var preTags = data.getElementsByTagName("pre");
  console.log(data);
  for (T of preTags){
    userExpressions.push(new algebra.parse(T.innerHTML));
    $(T).replaceWith(katex.renderToString(math.parse(T.innerHTML).toTex() + "=" + userExpressions[userExpressions.length - 1]));
  }
  $("#preview").append(data.getElementsByTagName("body")[0].innerHTML);
}

setInterval(function() {
  renderPreview();

}, 500);
