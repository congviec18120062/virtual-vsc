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
var closeHtml = document.getElementById("close-html");
var closeCss = document.getElementById("close-css");
var closeJs = document.getElementById("close-js");

var myTextArea = document.getElementById("editor");
var choice = [html, css, js];
var temp = [1,1,1]
var choiced = [htmlTab, cssTab, jsTab];
var closeType = [closeHtml, closeCss, closeJs];

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
var htmlTemp = cssTemp = jsTemp = ""

var editor = CodeMirror.fromTextArea(myTextArea, {
    mode: 'text/html',
    lineNumbers: true,
    lineWrapping: true,
    content: myTextArea.value,
    indentUnit: 4,
    smartIndent: true,
    indentWithTabs: true,
    autocorrect: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    readOnly: false,
    autoCloseTags: true,
    autoFocus: true,
    autoCloseBrackets: true,
    theme: "zamiere",
    styleActiveLine: true,
    matchBrackets: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});

editor.setOption("extraKeys", {
    "Ctrl-Y": cm => CodeMirror.commands.foldAll(cm),
    "Ctrl-I": cm => CodeMirror.commands.unfoldAll(cm),
})

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
    e.stopPropagation();
    e.preventDefault();
    if(e.target === html) {
        clearClass(choiced, "choiced");
        htmlTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        html.classList.add("choiced-file");
        editor.setValue(htmlContent)
    }
    
})

css.addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target === css) {
        clearClass(choiced, "choiced");
        cssTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        css.classList.add("choiced-file");
        editor.setValue(cssContent)
    }
})

js.addEventListener("click", e => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target === js) {
        clearClass(choiced, "choiced");
        jsTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        js.classList.add("choiced-file");
        editor.setValue(jsContent)
    }
})

htmlTab.addEventListener("click", e => {
    if (html.classList.value.split(" ").filter(value => value == "close").length) html.classList.remove("close");
    temp[0] = 1
    editor.setOption("readOnly", false);
    clearClass(choiced, "choiced");
    htmlTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    html.classList.add("choiced-file");
    editor.setValue(htmlContent)
})

cssTab.addEventListener("click", e => {
    if (css.classList.value.split(" ").filter(value => value == "close").length) css.classList.remove("close");
    temp[1] = 1
    editor.setOption("readOnly", false);
    clearClass(choiced, "choiced");
    cssTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    css.classList.add("choiced-file");
    editor.setValue(cssContent)
})

jsTab.addEventListener("click", e => {
    if (js.classList.value.split(" ").filter(value => value == "close").length) js.classList.remove("close");
    temp[2] = 1
    editor.setOption("readOnly", false);
    clearClass(choiced, "choiced");
    jsTab.classList.add("choiced");
    clearClass(choice, "choiced-file");
    js.classList.add("choiced-file");
    editor.setValue(jsContent)
})

closeHtml.addEventListener("click", e => {
    temp[0] = 0
    if (temp[1]) {
        clearClass(choiced, "choiced");
        cssTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        css.classList.add("choiced-file");
        editor.setValue(cssContent)
    } else if (temp[2]) {
        clearClass(choiced, "choiced");
        jsTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        js.classList.add("choiced-file");
        editor.setValue(jsContent)
    } else {
        clearClass(choiced, "choiced");
        clearClass(choice, "choiced-file");
        editor.setValue("")
        editor.setOption("readOnly", true);
    }
    html.classList.add("close");
})



closeCss.addEventListener("click", e => {
    temp[1] = 0
    if (temp[2]) {
        clearClass(choiced, "choiced");
        jsTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        js.classList.add("choiced-file");
        editor.setValue(jsContent)
    } else if (temp[0]) {
        clearClass(choiced, "choiced");
        htmlTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        html.classList.add("choiced-file");
        editor.setValue(htmlContent)
    } else {
        clearClass(choiced, "choiced");
        clearClass(choice, "choiced-file");
        editor.setValue("")
        editor.setOption("readOnly", true);
    }
    css.classList.add("close");
})

closeJs.addEventListener("click", e => {
    temp[2] = 0
    if (temp[1]) {
        clearClass(choiced, "choiced");
        cssTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        css.classList.add("choiced-file");
        editor.setValue(cssContent)
    } else if (temp[0]) {
        clearClass(choiced, "choiced");
        htmlTab.classList.add("choiced");
        clearClass(choice, "choiced-file");
        html.classList.add("choiced-file");
        editor.setValue(htmlContent)
    } else {
        clearClass(choiced, "choiced");
        clearClass(choice, "choiced-file");
        editor.setValue("")
        editor.setOption("readOnly", true);
    }
    js.classList.add("close");
})