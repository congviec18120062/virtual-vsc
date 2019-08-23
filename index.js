// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             $('#blah').attr('src', e.target.result);
//         }
//         reader.readAsDataURL(input.files[0]);
//     }
// }
  
// $("#imgInp").change(function() {
//     readURL(this);
// });

var html = document.getElementById("html");
var css = document.getElementById("css");
var js = document.getElementById("js");
var htmlTab = document.getElementById("html-tab");
var cssTab = document.getElementById("css-tab");
var jsTab = document.getElementById("js-tab");

var myTextArea = document.getElementById("editor");
var choice = [html, css, js];
var choiced = [htmlTab, cssTab, jsTab];

var code = document.getElementById("live-code").contentWindow.document;

clearClass = (choice, classes) => {
    for (var i = 0; i < choice.length; i++) {
        if (choice[i] != null) {
            if (
                choice[i].classList.value.split(" ").filter(value => value == classes)
                .length != 0
            ) {
                choice[i].classList.remove(classes);
            }
        }
    }
};

checkChoice = (choice, classes) => {
    for (var i = 0; i < choice.length; i++) {
        if (
            choice[i].classList.value.split(" ").filter(value => value == classes)
            .length != 0
        ) {
            return i;
        }
    }
    return -1;
};

var htmlContent = cssContent = jsContent = ""

var editor = CodeMirror.fromTextArea(myTextArea, {
    lineNumbers: true,
    content: myTextArea.value,
    indentUnit: 4,
    smartIndent: false,
    autocorrect: true,
    autoCloseTags: true,
    theme: "darcula",
    styleActiveLine: true,
    matchBrackets: true
});
if(checkChoice(choice) == 0) htmlContent = editor.getValue()
code.open();
code.writeln(
    htmlContent +
    "<style>" +
    cssContent +
    "</style>" +
    "<script>" +
    jsContent +
    "</script>"
);
code.close();

editor.on("change", () => {
    if (checkChoice(choice, "choiced-file") == 0) htmlContent = editor.getValue()
    else if (checkChoice(choice, "choiced-file") == 1) cssContent = editor.getValue()
    else jsContent = editor.getValue()
    code.open();
    code.writeln(
        "<style>" +
        cssContent +
        "</style>" +
        htmlContent +
        "<script>" +
        jsContent +
        "</script>"
    );
    code.close();
})

html.addEventListener("click", e => {
    clearClass(choiced, "choiced");
    htmlTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    html.classList.add("choiced-file");
    editor.setValue(htmlContent)
})

css.addEventListener("click", e => {
    clearClass(choiced, "choiced");
    cssTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    css.classList.add("choiced-file");
    editor.setValue(cssContent)
})

js.addEventListener("click", e => {
    clearClass(choiced, "choiced");
    jsTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    js.classList.add("choiced-file");
    editor.setValue(jsContent)
})

htmlTab.addEventListener("click", e => {
    clearClass(choiced, "choiced");
    htmlTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    html.classList.add("choiced-file");
    editor.setValue(htmlContent)
})

cssTab.addEventListener("click", e => {
    clearClass(choiced, "choiced");
    cssTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    css.classList.add("choiced-file");
    editor.setValue(cssContent)
})

jsTab.addEventListener("click", e => {
    clearClass(choiced, "choiced");
    jsTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    js.classList.add("choiced-file");
    editor.setValue(jsContent)
})





