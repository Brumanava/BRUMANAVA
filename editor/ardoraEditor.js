$(document).ready(function() {$("#summernote").summernote({lang: "es-ES",placeholder: "",tabsize: 2,height: 300,
toolbar: [["style", ["style"]],["font", ["fontsize","bold","italic","underline","strikethrough","clear","superscript","subscript"]],
["color", ["color"]],["misc", ["undo","redo"]],["para", ["ul", "ol", "paragraph"]],["table", ["hr","table"]],["insert", ["link", "picture", "video"]],["view", ["help"]]
]});$(".note-editable").css("height","100%");$(".note-toolbar").css({"position":"fixed","z-index":99,"top":0,"width":"100%"});$(".note-editor").css({"position":"relative","margin-top":"80px"});});
