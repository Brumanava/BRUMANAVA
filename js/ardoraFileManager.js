//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
var collapsed = false;var allUser;var userN;var userName;var userGru;var userCur;var userType;var extraObj;var indexCom=0;var actualFile="";var maxShared;var maxUser;var useShared;var useUser;var cached=true;
$(document).ready(function() {
$(window).on("resize", function(){var h=($(this).height()-$(".atab").height()-$("#header").height()-$(".cfolderName").height()-$(".barraEstado").height()-$(".butBarFM").height()-60).toString()+"px";$('.directorio').css("max-height",h);});
$("#bRecorderPersonal").click(function() {showRecorder();});
$("#bCloseSesion").click(function() {$.ajax({data: {"action": "logout"},type: "POST",dataType: "json",async: false,url:"php/ardoraFileManager.php",success: function(data, textStatus, jqXHR){if (data["status"]=="logout"){window.open("index.php","_self");}}});});
$("#atab1").css("background","#FFFFFF");$("#atab1").css("fontWeight","bold");$("#divFull").hide();$("#infoFile").hide();getIdUser();
$("#sidebar-toggle").click(function() {if(!collapsed){$("#sidebar").animate({width: "0px"});$(".main-content").animate({width: "100%"},function(){visorResize();});
} else { $("#sidebar").animate({width:"30%"}); $(".main-content").animate({width:"70%"},function(){visorResize();});} collapsed = !collapsed;});
$(".ctab").hide();$("#tab1").show();$(".atab").click(function(e) {$(".atab").css("backgroundImage","linear-gradient(to bottom,#FFFFFF,#C0C0C0)");$(".atab").css("fontWeight","normal");e.preventDefault();$(".ctab").hide();$("#" + $(this).attr("id").substring(1,9)).show();$(this).css("background","#FFFFFF");$(this).css("fontWeight","bold");});
showShared();showPersonal();$("#bRefreshS").click(function(e) {showShared();});$("#bRefreshPersonal").click(function(e) {showPersonal();});$("#bRefreshAlumnado").click(function(e) {showAlumnado();});
$("#bNewFolderS").click(function(e) {addFolder(0);});$("#bNewFolderPersonal").click(function(e) {addFolder(1);});$("#bNewFolderAlumnado").click(function(e) {addFolder(2);});$("#bDelFolderS").click(function(e) {delFolder(0);});$("#bDelFolderPersonal").click(function(e) {delFolder(1);});$("#bDelFolderAlumnado").click(function(e) {delFolder(2);});
$("#bUpLoadS").click(function(e) {upLoad(0);});$("#bUpLoadPersonal").click(function(e) {upLoad(1);});$("#bUpLoadAlumnado").click(function(e) {upLoad(2);});});
function showShared(){$(".butBarVisor").hide();$("#infoFile").hide();actualFile="";$("#visor").empty();$("#carpeta_compartida").fileTree({expandSpeed: 750, collapseSpeed: 750, multiFolder: false,
root: "../ardoraWorkFiles/gestorarchi/gestorarchi_Shared/",script: "php/jqueryFileTree.php" },function(file) { openFile(file);},function(dir) { openDir(dir);});getStateFolder(0);$("#bDelFolderS").hide();$("#folderName").html("/");}
function showPersonal(){$(".butBarVisor").hide();$("#infoFile").hide();$("#visor").empty();actualFile="";if (userType=="admin"){
rootP="../ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/"+userN+"/";}else{
rootP="../ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/"+userN+"/";}
$("#carpeta_personal").fileTree({expandSpeed: 750, collapseSpeed: 750, multiFolder: false,root: rootP,script:"php/jqueryFileTree.php"},function(file) { openFile(file);},function(dir) { openDir(dir);});getStateFolder(1);$("#bDelFolderPersonal").hide();}




function openFile(file){$("#visor").empty();switch (file.substring(file.lastIndexOf(".")+1,400).toLowerCase()) {case "jpg": case "jpeg": case "png": case "bmp": case "svg": visorImage(file.substring(3,file.length));break;
case "pdf":visorPDF(file.substring(3, file.length));break;
case "odt": case "ods": case "odp": case "sxw": case "sxc": case "sxi":visorViewerJS(file.substring(3,file.length));break;
case "mp3": case "ogg":visorAudio(file.substring(3,file.length));break; case "mp4": case "ogv": case "webm": visorVideo(file.substring(3,file.length));break;
case "txt": visorTxt(file.substring(3,file.length)); break; case "swf": visorSwf(file.substring(3,file.length)); break;case "text":visorText(file.substring(3, file.length));break;default: visorNo();}
setButFunction(file.substring(3,file.length));$("#bDelFolderS").hide();$("#bDelFolderPersonal").hide();$("#bDelFolderAlumnado").hide();$("#infoFile").hide();actualFile=file;}
function openDir(dir){if ($("#tab1").is(":visible")) {$("#folderName").html(dir);if(dir.length>1){$("#bDelFolderS").show();}else{$("#bDelFolderS").hide();}}
if ($("#tab2").is(":visible")) {$("#folderNameUser").html(dir);if(dir.length>1){$("#bDelFolderPersonal").show();}else{$("#bDelFolderPersonal").hide();}}
if ($("#tab3").length){if ($("#tab3").is(":visible")) {$("#folderNameAlu").html(dir);}if (dir.length>1){$("#name_alu").html(allUser[dir.substr(1,dir.length-2)]);$("#bUpLoadAlumnado").show();$("#bNewFolderAlumnado").show();$("#bDelFolderAlumnado").show();}
else{$("#name_alu").html("");$("#bUpLoadAlumnado").hide();$("#bNewFolderAlumnado").hide();$("#bDelFolderAlumnado").hide();}}$(".butBarVisor").hide();$("#visor").empty();}
function getIdUser() {$.ajax({data: {"action": "getIdUser"}, type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {
userN=data["userN"];userName = data["userName"];userGru = data["userGru"];userCur = data["userCur"];allUser=data["allUser"];userType = "alu";if (data["userType"]=="profe" || data["userType"] == "admin") {userType = "admin";addAlus();}
$("#hUser").text(userName);
if (userName=="" || userName==null){$.ajax({data:{"action": "logout"},type:"POST",dataType: "json",async: false,url:"php/ardoraFileManager.php",success: function(data, textStatus, jqXHR){if (data["status"]=="logout"){window.open("index.php","_self");}}});}
}});}
function getStateFolder(ft){$.ajax({data: {"action": "getStateFolder","fType":ft}, type: "POST",dataType: "json",url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {
if (ft==0){maxShared=parseFloat(data["sMax"]);useShared=parseFloat(data["useSize"]);if (parseInt(data["useSize"])>parseInt(data["sMax"])){$("#bUpLoadS").hide();$("#estado_compartida").css("color","red");}
else{$("#estado_compartida").css("color","black");$("#bUpLoadS").show();} $("#estado_compartida").html(data["state"]);}
if (ft==1){maxUser=parseFloat(data["sMax"]);useUser=parseFloat(data["useSize"]);if (parseInt(data["useSize"])>parseInt(data["sMax"])){$("#bUpLoadPersonal").hide();$("#estado_personal").css("color","red");}else{$("#estado_personal").css("color","black");$("#bUpLoadPersonal").show();}
$("#estado_personal").html(data["state"]);}}});}
function addAlus(){$("#tabs").append('<li><a href="#" id="atab3" class="atab">Estudiante</a></li>');$("#contentTabs").append('<div id="tab3" class="ctab"></div>');
$("#tab3").append('<div class="folderIcon"><img src="css/images/folder_open.png" width="16" height="16" alt="Carpeta aberta" longdesc="Imaxen de carpeta aberta"/></div>');
$("#tab3").append('<div id="folderNameAlu" class="cfolderName">/</div>');$("#tab3").append('<div id="arbol2"><div id="carpeta_alumnado" class="directorio"></div><div id="name_alu" class="barraEstado"></div></div>')
$("#tab3").append('<div class="butBarFM"><p id="bNewFolderAlumnado" class="butfont butLe but" title="carpeta nueva">m</p><p id="bDelFolderAlumnado" class="butfont butLe but" title="Delete folder">n</p><p id="bUpLoadAlumnado" class="butfont butRi but" title="">I</p><p id="bRefreshAlumnado" class="butfont butRi but" title="Recharge">Z</p></div>');
$("#bUpLoadAlumnado").hide();$("#bNewFolderAlumnado").hide();$("#bDelFolderAlumnado").hide();showAlumnado();}
function addFolder(fType){if (fType==0) {var tit=$("#folderName").text();}if (fType==1) {var tit=$("#folderNameUser").text();}if (fType==2) {var tit=$("#folderNameAlu").text();}
$("#modal-content").empty();$("#modal-content").css("height", "auto");var newHtml = '<div id="modalTit">New folder</div>';
newHtml = newHtml + '<div id="modalBody">Enter the folder name <b>' + tit + '</b> ';
newHtml = newHtml + '<input type="text" id="fName" name="fName" placeholder="Write here"><br>';
newHtml = newHtml + '<div id="modalBar"><p id="cancelBut" class="butfont butLe red" title="Cancelar">E</p><p id="oKBut" class="butfont butRi green" title="">g</p></div></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").toggleClass("active");$("#modal-background, #modal-close, #cancelBut").click(function() {$("#modal-content,#modal-background").toggleClass("active");});
$("#modal-content").draggable();$("#oKBut").click(function() {if ($("#fName").val().length>0){var folder=$("#fName").val();folder=normalize(folder.replace(/^\s+/g,"").replace(/\s+$/g,""));
$.ajax({data: {"action": "makeDir","fName":tit.substr(1)+folder,"fType": fType},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}}); if (fType==0){showShared()} if (fType==1){showPersonal()} if (fType==2){showAlumnado()}
$("#modal-content,#modal-background").toggleClass("active");}else{$("#modal-content,#modal-background").toggleClass("active");}});}
function delFolder(fType){if (fType==0) {var tit=$("#folderName").text();}if (fType==1) {var tit=$("#folderNameUser").text();}if (fType==2) {var tit=$("#folderNameAlu").text();}$("#modal-content").empty();$("#modal-content").css("height", "auto");
var newHtml = '<div id="modalTit">Delete folder</div>';newHtml = newHtml + '<div id="modalBody">Delete folder <b>' + tit + '</b>? ';
newHtml = newHtml + '</div>';newHtml = newHtml + '<div id="modalBar"><p id="cancelBut" class="butfont butLe red" title="Cancelar">E</p><p id="oKBut" class="butfont butRi green" title="">g</p></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").toggleClass("active");$("#modal-background, #modal-close, #cancelBut").click(function() {$("#modal-content,#modal-background").toggleClass("active");});$("#modal-content").draggable();
$("#oKBut").click(function() {var folder=tit.substr(1);folder=folder.substr(0,folder.length-1);
$.ajax({data: {"action": "deleteDir","fName":folder,"fType": fType},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}});
if (fType==0){showShared()} if (fType==1){showPersonal()} if (fType==2){showAlumnado()} $("#modal-content,#modal-background").toggleClass("active");});}
function upLoad(fType){indexCom=0;if (fType==0) {var tit=$("#folderName").text();} if (fType==1) {var tit=$("#folderNameUser").text();} if (fType==2) {var tit=$("#folderNameAlu").text();}$("#modal-content").empty();$("#modal-content").css("height", "auto");
var newHtml = '<div id="modalTit">Upload</div>';newHtml = newHtml + '<div id="modalBody">Save files <b>' + tit + '</b>';
newHtml = newHtml + '<div id="mulitplefileuploader">Upload</div><div id="status"></div>';
newHtml = newHtml + '<div id="modalBar"><p id="cancelBut" class="butfont butLe red" title="Cancelar">E</p><p id="oKBut" class="butfont butRi green" title="">g</p></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").toggleClass("active");$("#modal-background, #modal-close, #cancelBut").click(function() {$("#modal-content,#modal-background").toggleClass("active");});$("#modal-content").draggable();
loadUploadForm(fType,tit.substr(1));$("#oKBut").click(function() {var totSize=0;$(".ajax-file-upload-filename").each(function(i) {var str=$(this).text().substring($(this).text().indexOf("(")+1);str=str.substring(0,str.length-1);
var val=str.substring(0,str.length-2);str=str.substring(str.length-2); if (str=="MB"){totSize=totSize+(parseFloat(val)*1024*1024);} if (str=="KB"){totSize=totSize+(parseFloat(val)*1024);}});
if (fType==0) {getStateFolder(0)}else{getStateFolder(1)}if (useShared+totSize<maxShared){$(".extrahtml").hide();$("#mulitplefileuploader").hide();extraObj.startUpload();}
else{var html="<div class='ajax-file-upload-error'>Folder size exceeded</div>"; $("#mulitplefileuploader").append(html);}});}
function loadUploadForm(fType,fol){extraObj = $("#mulitplefileuploader").uploadFile({url:"php/upload.php?fType="+fType+"&fol="+fol,fileName:"myfile",method: "POST",
allowedTypes:"jpg,gif,png,bmp,svg,mp4,ogv,webm,txt,pdf,mp3,ogg,odt,ods,odp,sxw,sxc,sxi,zip,rar,tar,7z,gzip,bz2,text",multiple: true,
maxFileSize:38*1048576,
maxFileCount:4,
maxFileCountErrorStr:"Maximum number of files ",
dragDropStr: "<span><b>Drop files to upload</b></span>",
abortStr:"E",cancelStr:"b",doneStr:"Fin",
multiDragErrorStr: "File type not allowed",extErrorStr:"File type not allowed --> ",
sizeErrorStr:"File too large ",uploadErrorStr:"Subida de archivos no permitida",uploadStr:"Archivo",
afterUploadAll:function(obj){$("#status").html("Fin"); if (fType==0){showShared()} if (fType==1){showPersonal()} if (fType==2){showAlumnado()} $("#modal-content,#modal-background").toggleClass("active");},
onSuccess:function(files,data,xhr){for (i=0;i<extraObj.existingFileNames.length;i++){if (extraObj.existingFileNames[i]==files[0]){
$.ajax({data: {"action": "addXml","fName":fol,"fileName":files[0],"coment":$("#tags"+i.toString()).val(),"fType": fType}, type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}});}}},
onError: function(files,status,errMsg){$("#status").html("<font color='red'>Error al grabar el archivo</font>");},
extraHTML:function(){var html = "<div><b> </b><input type='text' name='tags"+indexCom+"' id='tags"+indexCom+"' value='' class='coments' /> <br/>";html += "</div>";indexCom++;return html;},autoSubmit:false});}
function visorImage(file){if (cached){var da="?000";}else{var da = new Date().getTime();var da="?"+da;};$("#visor").width("auto");$("#visor").height("auto");$("#visor").append('<img id="ima" name="ima" src="'+file+da+'" alt="'+file.substring(file.lastIndexOf("/")+1,800)+'" />');
$("#ima").on("load", function () {imaResize();});$("#visor").on("resize", function () {imaResize();});$(window).resize(function () {imaResize();});$("#sidebar").resize(function () {imaResize();});}
function visorResize(){if ( $("#ima").length > 0 ) {imaResize()};}
function imaResize(){var wVal=($(".main-content").width() - 30)+"px";var hVal=($(".main-content").height() -90)+"px";$("#ima").css("maxWidth",wVal);$("#ima").css("maxHeight",hVal);}
function visorViewerJS(file){$("#visor").width("calc(100% - 40px)");$("#visor").height("100%");$("#visor").append('<iframe id="viewer" src = "ViewerJS/#../'+file+'" allowfullscreen webkitallowfullscreen></iframe>');}
function visorPDF(file) {$("#visor").width("calc(100% - 40px)");$("#visor").height("100%");$("#visor").append('<iframe id="viewer" src="' + file + '" allowfullscreen webkitallowfullscreen></iframe>');}
function visorText(file) {$("#visor").width("calc(100% - 40px)");$("#visor").height("100%");$.ajax({url : file,dataType: "text",success : function (data) {$("#visor").append('<div>'+data+'</div>');}});}
function visorAudio(file){$("#visor").width("auto");$("#visor").css("width","calc(100% - 10px)");$("#visor").height("auto");
$("#visor").append('<iframe id="viewer" src = "' + file + '" allowfullscreen webkitallowfullscreen></iframe>');}
function visorVideo(file){$("#visor").width("auto");$("#visor").css("width","calc(100% - 10px)");$("#visor").height("100%");
$("#visor").append('<iframe id="viewer" src = "' + file + '" allowfullscreen webkitallowfullscreen></iframe>');}
function visorTxt(file){$("#visor").width("95%");$("#visor").height("95%");$.ajax({data: {"action": "getTxt","fName":file},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",
success: function(data, textStatus, jqXHR){$("#visor").append('<div id="visorTXT">'+data["txt"]+'</div>')}});}
function visorSwf(file){$("#visor").width("100%");$("#visor").height("100%");$("#visor").append('<object id="swfO" type="application/x-shockwave-flash" data="'+file+'"></object>');}
function visorNo(){$("#visor").width("auto");$("#visor").height("auto");$("#visor").append('<p id="visorNo">Q</p>');}
function setButFunction(file){$("#divFull").empty();$("#bDownFile").unbind("click");$("#bInfoFile").unbind("click");$("#bSeeFile").unbind("click");$("#bRotateRight").unbind("click");$("#bRotateLeft").unbind("click");$("#bDeleteFile").unbind("click");
$(".butBarVisor").show();$("#eFileName").text(file.substring(file.lastIndexOf("/")+1,800));var ext=file.substring(file.lastIndexOf(".")+1,400).toLowerCase();
if (ext=="jpg" || ext=="jpeg" || ext =="png" || ext=="bmp"){$("#bRotateRight").show();$("#bRotateLeft").show();$("#bRotateRight").click(function() {rotate("right",file,ext);});$("#bRotateLeft").click(function() {rotate("left",file,ext);});} else {$("#bRotateRight").hide();$("#bRotateLeft").hide();}
if  (ext=="jpg" || ext=="jpeg" || ext=="png" || ext=="bmp" || ext=="svg"){$("#bSeeFile").show();$("#bSeeFile").click(function(){
$("#divFull").append('<img id="imaFull" name="ima" src="'+file+'" alt="'+file.substring(file.lastIndexOf("/")+1,800)+'" />');
$("#divFull").show(function() {var wVal=($("#divFull").width())+"px";var hVal=($("#divFull").height())+"px";$("#imaFull").css("maxHeight",hVal);$("#imaFull").css("maxWidth",wVal);});
launchFullScreen(document.getElementById("divFull"));document.addEventListener("fullscreenchange", function () {if(!document.fullscreen){$("#divFull").hide();$("#divFull").empty();}}, false);
document.addEventListener("mozfullscreenchange", function () {if (!document.mozFullScreen){$("#divFull").hide();$("#divFull").empty();}}, false);
document.addEventListener("webkitfullscreenchange", function () {if (!document.webkitIsFullScreen){$("#divFull").hide();$("#divFull").empty();}}, false);});} else{$("#bSeeFile").hide();}
$("#bDownFile").click(function(){parent.location.href="php/ardoraFileManager.php?action=download&&Arquivo="+file;});
$("#bInfoFile").click(function(){if (file!=actualFile){$.ajax({data: {"action": "getInfoFile","fName":file},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",
success: function(data, textStatus, jqXHR){$("#infoFile").empty();html="<p>"+data["coment"]+"</p>";html=html+"<div id='dt'>";if (data["tab"]==0){html=html+data["usr"];}
html=html+"  "+data["datetime"];html=html+"</div>";$("#infoFile").append(html);}}); actualFile=file;} $("#infoFile").slideToggle( "slow");});
$("#bRenameFile").click(function() {$("#modal-content").empty();$("#modal-content").css("height", "auto");var newHtml = '<div id="modalTit">Change name <b>' + file.substring(file.lastIndexOf("/") + 1, 800) + ' ?</b></div>';
newHtml = newHtml + '<div id="modalBody">New name: <input type="text" id="newname" name="newname"><br>';newHtml = newHtml + '<div id="modalBar"><p id="cancelB" class="butfont butLe red" title="Cancelar">E</p><p id="oKB" class="butfont butRi green" title="">g</p></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").addClass("active");$("#modal-background, #modal-close, #cancelB").click(function() {$("#modal-content,#modal-background").removeClass("active");});$("#modal-content").draggable();
$("#oKB").click(function() {var nm = $("#newname").val().trim();var go = true;if (!nm) {go = false;$("#newname").after("<div id='calert'><div class='alert'>⛔  You must write a name</div></div>")} else {
var oldname = file.substring(file.lastIndexOf("/") + 1, 800);if (nm.indexOf(".") < 0) {nm=normalize(nm);nm=nm+oldname.substring(oldname.lastIndexOf("."), 800);} else {nm=normalize(nm.substring(0, nm.indexOf(".")));nm = nm + oldname.substring(oldname.lastIndexOf("."), 800);};nm=file.substring(0, file.lastIndexOf("/") + 1) + nm;}
if (go) {$.ajax({data: {"action": "renameFile","fName": file,"newname": nm},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}});
if ($("#tab1").css("display") != "none") {showShared()};if ($("#tab2").css("display") != "none") {showPersonal()};if ($("#tab3").css("display") != "none") {showAlumnado()};$("#modal-content,#modal-background").removeClass("active");}});});
$("#bDeleteFile").click(function() {deleteFile(file);});}
function rotate(d,f,t){if (d=="right"){var rot=-90;}if (d=="left"){var rot=-270;}
$.when($.ajax({data: {"action": "rotateImg","file": "../"+f,"rot":rot,"type": t},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}
}).done(function() {da=new Date().getTime();$("#ima").removeAttr("src").attr("src", f+"?"+da);cached=false;}));}
function moveFile(m_file,tm_file,m_dir,tm_dir){$("#modal-content").empty();$("#modal-content").css("height", "auto");var newHtml='<div id="modalTit">Move file</div>';
newHtml = newHtml + '<div id="modalBody">Do you want to move the file: <b>'+tm_file+'</b> to <b>'+tm_dir+'?</b><br>';
newHtml = newHtml + '<div id="modalBar"><p id="cancelB" class="butfont butLe red" title="Cancelar">E</p><p id="oKB" class="butfont butRi green" title="">g</p></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").addClass("active");$("#modal-background, #modal-close, #cancelB").click(function() {$("#modal-content,#modal-background").removeClass("active");});$("#modal-content").draggable();
$("#oKB").click(function() {$.when($.ajax({data: {"action": "moveFile","m_file": m_file,"n_file":tm_file,"m_dir": m_dir},type: "POST",dataType: "json",async:false,url:"php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}
}).done(function(){if ($("#tab1").css("display") != "none") {showShared()};if ($("#tab2").css("display") != "none") {showPersonal()};if ($("#tab3").css("display") != "none") {showAlumnado()};$("#modal-content,#modal-background").toggleClass("active");$("#visor").empty();}));});}
function copyFile(m_file,tm_file,m_dir,tm_dir,fType){$("#modal-content").empty();$("#modal-content").css("height", "auto");var newHtml='<div id="modalTit">copy</div>';
newHtml=newHtml+'<div id="modalBody">Do you want to copy the file: <b>'+tm_file+'</b> to <b>'+tm_dir+'?</b><br>';
newHtml=newHtml+'<div id="modalBar"><p id="cancelB" class="butfont butLe red" title="Cancelar">E</p><p id="oKB" class="butfont butRi green" title="">g</p></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").addClass("active");$("#modal-background, #modal-close, #cancelB").click(function() {$("#modal-content,#modal-background").removeClass("active");});$("#modal-content").draggable();
$("#oKB").click(function() {$.when($.ajax({data: {"action": "copyFile","m_file": m_file,"n_file":tm_file,"m_dir": m_dir,"fType":fType},type: "POST",dataType: "json",async: false,url: "php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}}).done(function(){
if ($("#tab1").css("display") != "none") {showShared()};if ($("#tab2").css("display") != "none") {showPersonal()};if ($("#tab3").css("display") != "none") {showAlumnado()};$("#modal-content,#modal-background").toggleClass("active");$("#visor").empty();}));});}
function deleteFile(file){$("#modal-content").empty();$("#modal-content").css("height", "auto");var newHtml='<div id="modalTit">Borrar palabra</div>';
newHtml=newHtml+'<div id="modalBody"> ¿ Realmente desea borrar <b>' + file.substring(file.lastIndexOf("/") + 1, 800) + ' ?</b><br>';
newHtml=newHtml+'<div id="modalBar"><p id="cancelBut" class="butfont butLe red" title="Cancelar">E</p><p id="oKBut" class="butfont butRi green" title="">g</p></div>';
$("#modal-content").append(newHtml);$("#modal-content,#modal-background").toggleClass("active");$("#modal-background, #modal-close, #cancelBut").click(function() {$("#modal-content,#modal-background").toggleClass("active");});$("#modal-content").draggable();$("#oKBut").unbind("click");
$("#oKBut").click(function() {$.ajax({data: {"action": "deleteFile","fName": file},type:"POST",dataType: "json",async:false,url:"php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}});
if ($("#tab1").css("display") != "none") {showShared()};if ($("#tab2").css("display") != "none") {showPersonal()};if ($("#tab3").css("display") != "none") {showAlumnado()};$("#modal-content,#modal-background").toggleClass("active");$("#visor").empty();});}
function launchFullScreen(element) {if(element.requestFullScreen) {element.requestFullScreen();} else if(element.mozRequestFullScreen) {element.mozRequestFullScreen();} else if(element.webkitRequestFullScreen) {element.webkitRequestFullScreen();}}
function cancelFullscreen() {if(document.cancelFullScreen) {document.cancelFullScreen();} else if(document.mozCancelFullScreen) {document.mozCancelFullScreen();} else if(document.webkitCancelFullScreen) {document.webkitCancelFullScreen();}}
var normalize = (function() {var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",mapping = {};
for(var i = 0, j = from.length; i < j; i++ )mapping[ from.charAt( i ) ] = to.charAt( i );return function( str ) {var ret = [];for( var i = 0, j = str.length; i < j; i++ ) {
var c = str.charAt(i); if( mapping.hasOwnProperty( str.charAt( i ) ) ) ret.push( mapping[ c ] );else ret.push( c );}return ret.join( "" ).replace( /[^-A-Za-z0-9]+/g, "_" );}})();
function showRecorder(){var old_width=$("#modal-content").css("width");var old_height=$("#modal-content").css("height");$("#modal-content").empty();$("#modal-content").css("top","200px");$("#modal-content").css("left", "200px");$("#modal-content").css("height", "auto");$("#modal-content").css("width", "540px");
var newHtml = '<div id="modalTit">Recorder</div>';newHtml=newHtml+'<div id="modalBody">';newHtml=newHtml+"<div id='gUMArea'><div>Select the type of entry";
newHtml=newHtml+'<input type="radio" name="media" value="video" checked id="mediaVideo">Video<input type="radio" name="media" value="audio" id="mediaAudio">Audio<input type="radio" name="media" value="screen" id="mediaScreen">Screen</div>';
newHtml=newHtml+'<button class="btn btn-default"  id="gUMbtn">Connect</button></div><video id="videoShow" autoplay muted></video>';newHtml=newHtml+'<div id="btns"><button  class="btn btn-default" id="start">Start 🔴</button><button  class="btn btn-default" id="stop">Stop ⬛</button></div>';
newHtml=newHtml+'<div><ul  class="list-unstyled" id="ul"></ul></div>';newHtml=newHtml+'<input type="checkbox" id="audioToggle" /><label for="audioToggle">Record audio</label>';
newHtml=newHtml+'<input type="checkbox" id="micAudioToggle" /><label for="micAudioToggle">Record Microphone</label>';newHtml=newHtml+'<a id="download" href="#" style="display: none;">Download</a><br><br>';
newHtml=newHtml+'<div id="modalBar"><p id="cancelBut" class="butfont butLe red" title="Cancelar">E</p></div>';$("#modal-content").append(newHtml);$("#modal-content,#modal-background").toggleClass("active");
$("#modal-background, #modal-close, #cancelBut").click(function() {$("#modal-content,#modal-background").toggleClass("active");$("#modal-content").css("height",old_height);$("#modal-content").css("width",old_width);$("#modal-content").empty();
if (stream===null ||stream===undefined){}else{stream.getTracks().forEach(track => track.stop());}if (strm===null ||strm===undefined){}else{strm.getTracks().forEach(track => track.stop());}
if (desktopStream ===null ||desktopStream ===undefined){}else{desktopStream.getTracks().forEach(track => track.stop());}if (voiceStream===null ||voiceStream===undefined){}else{voiceStream.getTracks().forEach(track => track.stop());}});
$("#modal-content").draggable();$("#btns").hide();$("#micAudioToggle").hide();$("#micAudioToggle").next().hide();var log=console.log.bind(console),stream,recorder,counter=1,chunks,media;var time={m:0,s:0};var time_on = null;const videoShow=document.getElementById("videoShow");
var mv=document.getElementById("mediaVideo");var ma=document.getElementById("mediaAudio");var ms=document.getElementById("mediaScreen");const gUMbtn = document.getElementById("gUMbtn");const download=document.getElementById("download");const audioToggle=document.getElementById("audioToggle");const micAudioToggle = document.getElementById("micAudioToggle");
let blob;let rec;let strm;let voiceStream;let desktopStream;
const mergeAudioStreams = (desktopStream, voiceStream) => {const context=new AudioContext();const destination=context.createMediaStreamDestination();let hasDesktop=false;let hasVoice = false;if (desktopStream && desktopStream.getAudioTracks().length > 0) {const source1 = context.createMediaStreamSource(desktopStream);
const desktopGain = context.createGain();desktopGain.gain.value = 0.7;source1.connect(desktopGain).connect(destination);hasDesktop=true;}
if (voiceStream && voiceStream.getAudioTracks().length > 0) {const source2=context.createMediaStreamSource(voiceStream);const voiceGain=context.createGain();voiceGain.gain.value=0.7;source2.connect(voiceGain).connect(destination);hasVoice=true;}
return (hasDesktop || hasVoice) ? destination.stream.getAudioTracks() : [];};
$('input[type="radio"]').click(function(){if (mv.checked){$("#audioToggle").show();$("#audioToggle").next().show();$("#micAudioToggle").hide();$("#micAudioToggle").next().hide();}
if (ma.checked ){$("#audioToggle").hide();$("#audioToggle").next().hide();$("#micAudioToggle").hide();$("#micAudioToggle").next().hide();};if (ms.checked){$("#audioToggle").hide();$("#audioToggle").next().hide();$("#micAudioToggle").show();$("#micAudioToggle").next().show();}});
gUMbtn.onclick=async()=> {$("#audioToggle").hide();$("#audioToggle").next().hide();$("#micAudioToggle").hide();$("#micAudioToggle").next().hide();$("#gUMArea").css("display","none");$("#btns").css("display","inherit");$("#start").removeAttr("disabled");var getAud=false;if (audioToggle.checked){getAud=true}
var mediaOptions = {video: {tag:"video",type:"video/webm;codecs=vp8,opus",ext:".webm",gUM:{video: true, audio:getAud}},audio: {tag:"audio",type:"audio/ogg;codecs=opus",ext:".ogg",gUM:{audio: true}},screen: {tag:"video",type:"video/webm",ext:".webm",gUM:{video: true, audio: true}}};
if (mv.checked){media=mediaOptions.video;}if (ma.checked){media=mediaOptions.audio;}if (ms.checked){media=mediaOptions.screen;}
if (mv.checked || ma.checked ){if (ma.checked){$("#videoShow").hide();}else{$("#videoShow").show();};navigator.mediaDevices.getUserMedia(media.gUM).then(_stream=>{stream=_stream;$("#gUMArea").css("display","none");$("#btns").css("display","inherit");$("#start").removeAttr("disabled");
recorder=new MediaRecorder(stream);videoShow.srcObject=stream;videoShow.muted=true;recorder.ondataavailable = e => {chunks.push(e.data);if(recorder.state == "inactive")  makeLink();};log("got media successfully");}).catch(log);}
else{download.style.display="none";const audio = audioToggle.checked || false;const mic = micAudioToggle.checked || false;if (mic===true){$("#videoShow").show();desktopStream = await navigator.mediaDevices.getDisplayMedia({ video:true, audio: audio });
voiceStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: mic });const tracks = [...desktopStream.getVideoTracks(),...mergeAudioStreams(desktopStream, voiceStream)];
console.log('Tracks to add to stream', tracks);strm=new MediaStream(tracks);console.log('Stream', strm);videoShow.srcObject=strm;videoShow.muted = true;chunks=[];
rec=new MediaRecorder(strm, {mimeType:"video/webm;codecs=vp8,opus"});rec.ondataavailable=(e) => chunks.push(e.data);rec.onstop = async () => {blob=new Blob(chunks, {type: 'video/webm'});let url = window.URL.createObjectURL(blob);download.href = url;makeLink();};}
else{navigator.mediaDevices.getDisplayMedia(media.gUM).then(_stream => {stream=_stream;$("#gUMArea").css("display","none");$("#btns").css("display","inherit");$("#start").removeAttr("disabled");recorder=new MediaRecorder(stream);videoShow.srcObject=stream;videoShow.muted=true;$("#videoShow").show();recorder.ondataavailable=e => {chunks.push(e.data);if(recorder.state=="inactive")  makeLink();};log("got media successfully");}).catch(log);}}};
$("#start").on("touchstart click", function(e) {$("#start").disabled=true;$("#btns").append("<p id='gra'><a class='blink_me'>Grabando: </a><a id='minute'></a> : <a id='second'></a></p>");
$("#stop").removeAttr("disabled");time_on=setInterval(function(){time.s++;if(time.s >= 60){time.s = 0;time.m++;}$("#minute").text(time.m < 10 ? '0' + time.m : time.m);$("#second").text(time.s < 10 ? '0' + time.s : time.s);},1000);
if (mv.checked || ma.checked || !micAudioToggle.checked){chunks=[];recorder.start();}else{chunks=[];rec.start();}});
$("#stop").on("touchstart click", function(e) {$("#videoShow").hide();$("#stop").disabled=true;clearInterval(time_on);time={m: 0,s: 0};$("#gra").remove();$("#start").removeAttr("disabled");
if (mv.checked || ma.checked || !micAudioToggle.checked) {recorder.stop();} else {rec.stop();};videoShow.srcObject = null;});
function makeLink(){var blobL = new Blob(chunks, {type:media.type});var url = URL.createObjectURL(blobL);var li = document.createElement("li");if (mv.checked || ma.checked || !micAudioToggle.checked){
var mt = document.createElement(media.tag);}else{var mt = document.createElement("video");mt.type= "video/webm; codecs=vp8,opus";url=download.href};var hf=document.createElement("a");
mt.controls=true;mt.src= url;mt.setAttribute("class","butLe");mt.setAttribute("width", "430px");li.appendChild(mt);li.setAttribute("id", "li_"+counter);var nl1=document.createElement("BR");nl1.setAttribute("id", "idbr");li.appendChild(nl1);
var pf=document.createElement("p");pf.setAttribute("class", "inputMedia");pf.textContent="Guardar como: "+$("#folderNameUser").text();li.appendChild(pf);li.appendChild(nl1);
var inp=document.createElement("input");inp.setAttribute("type", "text");inp.setAttribute("id", "input_"+counter);inp.setAttribute("class", "inputMedia");inp.setAttribute("value", "m_"+counter);li.appendChild(inp);
if (mv.checked){var pext=document.createElement("p");pext.setAttribute("class", "inputMedia");pext.textContent=".webm";li.appendChild(pext);};if (ma.checked){var pext=document.createElement("p");pext.setAttribute("class", "inputMedia");pext.textContent=".ogg";li.appendChild(pext);}
if (ms.checked){var pext=document.createElement("p");pext.setAttribute("class", "inputMedia");pext.textContent=".webm";li.appendChild(pext);};var btn=document.createElement("p");btn.setAttribute("id", "b_"+counter);btn.setAttribute("class", "butfont butRi but bmedia green");btn.textContent="g";li.appendChild(btn);
var btn=document.createElement("p");btn.setAttribute("id", "c_"+counter);btn.setAttribute("class", "butfont butRi but bmedia red");btn.textContent="b";li.appendChild(btn);var nl=document.createElement("BR");nl.setAttribute("id", "idbr");li.appendChild(nl);var pext2=document.createElement("p");pext2.setAttribute("class", "inputMedia");pext2.textContent="Comentario: ";li.appendChild(pext2);
var inp2=document.createElement("input");inp2.setAttribute("type","text");inp2.setAttribute("id", "comen_"+counter);inp2.setAttribute("class", "inputMedia c_comen");li.appendChild(inp2);var hr=document.createElement("HR");if (ms.checked){mt.setAttribute("width","430");};$("#ul").append(li);
$("#c_"+counter).on("touchstart click", function(e) {var c_id=$(this).attr("id").substring(2,100);$("#li_"+c_id).remove();});
$("#b_"+counter).on("touchstart click", function(e) {var data = new FormData();data.append("file",blobL);var b_id=$(this).attr("id").substring(2,100);var fn=normalize($("#input_"+b_id).val().replace(/^\s+/g, "").replace(/\s+$/g, ""));if (fn.trim().length==0){var date=new Date;fn=date.getHours()+"_"+date.getMinutes()+"_"+date.getSeconds()+"_"+date.getMilliseconds();}
if (mv.checked){data.append("name",fn+".webm");data.append("type","video");var c_name=fn+".webm";};if (ma.checked){data.append("name",fn+".ogg");data.append("type","audio");var c_name=fn+".ogg";};if (ms.checked){data.append("name",fn+".webm");data.append("type","screen");var c_name=fn+".webm";}
data.append("dir",$("#folderNameUser").text());data.append("coment",$("#comen_"+b_id).val());$.ajax({url :  "php/ardoraWRCTupload.php",type:'POST',data: data,contentType: false,processData: false,success: function(data) {$("#li_"+b_id).html("<p>"+$("#folderNameUser").text()+c_name+" Grabado")}});});counter++;}}
function showAlumnado(){$(".butBarVisor").hide();$("#infoFile").hide();actualFile="";$("#visor").empty();$("#carpeta_alumnado").fileTree({expandSpeed: 750, collapseSpeed: 750, multiFolder: false,
root:"../ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/",script:"php/jqueryFileTree.php"},function(file) { openFile(file);},function(dir) { openDir(dir);});$("#bDelFolderAlumnado").hide();
var pupils=[];$.when($.ajax({data: {"action": "getStudents","teacher": userN},type: "POST",dataType: "json",url: "../php/ardoraXML.php",success: function(data, textStatus, jqXHR) {pupils = data["user"];}
})).done(function() {$("#carpeta_alumnado li").each(function(){if ($.inArray($(this).text(),pupils)<0){$(this).remove();}});});
}
