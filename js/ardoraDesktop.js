//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
var clock;var digit_to_name;var digits = {};var positions;var digit_holder;var st;var isFull=false;var userType;var urls;var actualuser;var users=[];var names=[];var data=[];var grus=[];var lib_url=[];var lib_w=[];var lib_h=[];var lib_txt=[];var lib_co=[];var link_url=[];var link_w=[];var link_h=[];var link_txt=[];var link_ht=[];var link_pu=[];var teacher=[]; var teacherName=[]; var tea=[]; var teacur=[]; var teagru=[];
$(document).ready(function() {
document.addEventListener("touchstart", touchHandler, true);document.addEventListener("touchmove", touchHandler, true);document.addEventListener("touchend", touchHandler, true);document.addEventListener("touchcancel", touchHandler, true);
$.ajax({data: {"action": "islegal"},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {if (data["il"] == false) {logout();};}});
clock=$("#clock");digit_to_name="zero one two three four five six seven eight nine".split(" ");digits={};positions=["h1","h2",":","m1","m2",":","s1","s2"];digit_holder=clock.find(".digits");
$.each(positions, function(){if(this == ":"){digit_holder.append('<div class="dots">');}else{var pos = $("<div>");
for(var i=1; i<8; i++){pos.append('<span class="d' + i + '">');}; digits[this]=pos;digit_holder.append(pos);}});
$("#clock").draggable();
update_time();
$("#iniBut").on("touchstart click",function(){$("#nav").hide();$("#libnav").hide();
if ($("#bottomBar").css("borderTopWidth").toString()=="1px") {$("#bottomBar").css({"borderTopWidth": "0px","boxShadow":"0px 0px 0px 0px rgba(40,40,40,0.5)"});$("#iniBut").css({"border":"1px solid #666"});}
else{$("#bottomBar").css({"borderTopWidth": "1px","boxShadow":"0px -4px 2px 0px rgba(50, 50, 50, 0.5)"});$("#iniBut").css({"border":"1px none #666"});}
var toggleWidth = $("#bottomBar").width() == 40 ? "100%" : "40px";$( ".but" ).toggle( "fast", function() {});$("#bottomBar").animate({ width: toggleWidth });});
$("#iniBut").click();getIdUser();
$("#noteBut").on("touchstart click",function(){addNotes();});
$("#fodBut").on("touchstart click",function(){addFold();});
$("#adminBut").on("touchstart click",function(){$.ajax({data: {"action": "getInfo"},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {
users = data["users"];user_n = data["user_n"];user_c = data["user_c"];user_g = data["user_g"];var newHtml = '<table width="100%" border="0">';var cur = "";var gru = "";
for (i = 0; i < users.length; i++) {
if (cur != user_c[i] || gru != user_g[i]) {cur = user_c[i];gru = user_g[i];newHtml = newHtml + "<tr id='tr_" + user_c[i] + "_" + user_g[i] + "' class='tr_group'>";newHtml = newHtml + "<td colspan='3'> <b>" + user_c[i] + " " + user_g[i] + "</b></td>";newHtml = newHtml + "</tr>";}
newHtml = newHtml + "<tr id='tr_" + users[i] + "' class='tr_user " + user_c[i] + "_" + user_g[i] + "'>";newHtml = newHtml + "<td> &#9632; <b>" + user_n[i] + "</b> (" + users[i] + ")" + "</td>";
newHtml = newHtml + "<td class='tableBut editBut' id='edit_"+users[i]+"'><p>P</p></td>";newHtml = newHtml + "<td class='tableBut delBut' id='del_"+users[i]+"'><p>b</p></td>";}
var newHtml = newHtml + "</table>";newHtml = newHtml + "<div class='tableBut' id='addUser'><p>+</p></div>";$("#ardoraMain").empty();$("#ardoraMain").append("<div id='infoTable'></div>");$("#infoTable").html(newHtml);
$(".delBut").on("touchstart click",function(){alert($(this).attr("id").substring(4,60));});
$(".editBut").on("touchstart click",function(){alert($(this).attr("id").substring(5,60));});
$("#addUser").on("touchstart click",function(){});
}
});
});
show_da();
$("#mReloxo").on("touchstart click",function(){$("#clock").toggle();update_time();})
$("#mEditor").on("touchstart click", function() {if ($("#editorPanel").length){}else{var newLib = '<iframe id="ifr_edit" src="gestorarchi/editor/index.htm" frameborder="0"></iframe>';var inifile="Unsaved file";
var calculator=jsPanel.create({id:"editorPanel",theme: "mdb-elegant",closeOnEscape: true,position: "center-top 0 10",panelSize: {width: 800,height: 475},animateIn: "jsPanelFadeIn",
headerTitle: "",contentOverflow: "hidden",content: newLib,onwindowresize: false,
footerToolbar: '<p id="fileText">'+inifile+'</p><button id="b_open" class="basic_but butLe b_cancel" type="button"><b>🗁</b> Abrir</button><button class="basic_but butRi b_ok" id="b_save" type="button"><b>🖫</b> Guardar</button><button class="basic_but butRi b_ok" id="b_savec" type="button"><b>🖫</b> Guardar como</button><button class="basic_but butRi b_ok" id="b_close" type="button"><b>✖</b> Cerrar</button>',
callback: function(panel) {jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_close").addEventListener(evt, function() {panel.close();});panel.footer.querySelector("#b_open").addEventListener(evt, function() {openTextFile();});
panel.footer.querySelector("#b_save").addEventListener(evt, function() {if ($("#fileText").text()!=inifile){saveTextFile("edit", $("#ifr_edit").contents().find(".note-editable").html());
}else{saveTextFile("new",$("#ifr_edit").contents().find(".note-editable").html());}});
panel.footer.querySelector("#b_savec").addEventListener(evt, function() {saveTextFile("new", $("#ifr_edit").contents().find(".note-editable").html());});
});}});}});
$("#divfulls").click(function(e) {toggleFullScreen();});
$("#buttonClose").on("touchstart click", function() {jsPanel.modal.create({theme: "danger",closeOnEscape: true,position:"center-top 0 100",panelSize: {width: 350, height:150},animateIn:"jsPanelFadeIn",
headerTitle: "Cerrar la sesión:",content:"<p class='p_panel'>¿Realmente quieres cerrar sesi</p><br>",
footerToolbar:'<button id="b_close" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Cancelar</button><button class="basic_but butRi b_ok" id="b_ok" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,callback: function (panel) {jsPanel.setStyles(panel.content, {fontSize:"1rem"});jsPanel.pointerup.forEach(function (evt) {panel.footer.querySelector("#b_close").addEventListener(evt, function () {panel.close();});
panel.footer.querySelector("#b_ok").addEventListener(evt, function () {logout();});});}});});
$("#buttonUsu").on("touchstart click", function() {if ($("#d_own").length==0){goadminusers();}});
$("#nav").hide();$("#toolsBut").on("touchstart click", function() {$("#nav").toggle();$("#libnav").hide();$("#linknav").hide();});
$("#nav").on("touchstart click", function() {$("#nav").hide();});
$("#libnav").hide();$("#libBut").on("touchstart click", function() {$("#libnav").toggle();$("#nav").hide();$("#linknav").hide();$(".ssml").hide();});
$("#libnav").on("touchstart click", function(){$("#libnav").hide();});
$("#fullBut").on("touchstart click", function() {toggleFullScreen();});
loadInitialNotes();
$("#buttonCFG").on("touchstart click", function() {if ($("#set_library").length==0){gocfg();}});
$("#buttonLnk").on("touchstart click", function() {getLinks();});
$("#linknav").hide();$("#linkBut").on("touchstart click", function() {$("#linknav").toggle();$("#nav").hide();$("#libnav").hide();$(".ssm").hide();});$("#linknav").on("touchstart click", function() {$("#linknav").hide();});
$("#buttonAdmin").on("touchstart click", function() {if ($("#d_teach").length == 0) {getTeachers();}});
});
function getTeachers(){$.when($.ajax({data: {"action": "getTeachers"},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {teacher=data["teacher"];teacherName=data["teacherName"];tea=data["tea"];teacur=data["cur"];teagru=data["gru"];set_teacher(teacher,teacherName,tea,teacur,teagru);}})).done(function() {setAdmin();});}
function set_teacher(teacher,teacherName,tea,teacur,teagru){vteacher=teacher;vteacherName=teacherName;vtea=tea;vteacur=teacur;vteagru=teagru;}
function setAdmin(){var nhtml="<div id='d_teach'>";nhtml=nhtml+"<table id='t_teacher' class='table_users'>";nhtml = nhtml + "<tr id='trhead'><th>Profesorado</th><th></th></tr>";
for (var i=0; i < vteacher.length; i++) {nhtml=nhtml+"<tr id='tr_"+vteacher[i]+"'><td class='cedit' contenteditable='true' id='tean_" + vteacher[i] + "'>" + vteacherName[i] + "</td>" +
"<td class='delTeach' id='delTeach_" + vteacher[i] + "'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";}
nhtml=nhtml+"</table></div>";nhtml=nhtml+"<div id='d_new'>";nhtml = nhtml + '<div class="formtitle">Añadir<span class="ardoraArr"> o</span></div>';
nhtml=nhtml+'<div class="formfield"><label for="fusu3">Usuario<span></span></label><div class="inputs"><input class="aweform" type="text" id="fusu3" name="fusu3" value="" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fname3">Nombre completo<span></span></label><div class="inputs"><input class="aweform" type="text" id="fname3" name="fname3" value="" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fpass3">Contraseña<span></span></label><div class="inputs"><input class="aweform" type="password" id="fpass3" name="fpass3" value="" placeholder="It must have a value" required/><p class="seepwd">Q</p></div></div>';
nhtml=nhtml+"</div>";
nhtml=nhtml+"<div id='d_groups'>";nhtml=nhtml+"<table id='t_group' class='table_users'>";
nhtml=nhtml+"<tr id='tr_head'><th>Profesorado</th><th>Curso</th><th>Grupo</th><th></th></tr>";
for (var i=0; i<vtea.length; i++) {for (var z = 0; z < vteacher.length; z++) {if (vteacher[z]==vtea[i]){var tname=vteacherName[z];}};
nhtml=nhtml+"<tr id='tr_"+vtea[i]+"_"+parseInt(i)+"'><td class='cedit' id='ttea_" + vtea[i] +"_"+parseInt(i)+"'>" + tname + "</td>" +
"<td class='cedit' id='tc_" + vtea[i] +"_"+parseInt(i)+ "'>" + vteacur[i] + "</td>" + "<td class='cedit' id='tg_" + vtea[i] +"_"+parseInt(i)+ "'>" + vteagru[i] + "</td>"+
"<td class='delTeachJoin' id='delTeachJoin_" + vtea[i] +"_"+parseInt(i)+ "'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";}
nhtml=nhtml+"</table>";nhtml=nhtml+"<br><p class='butfont butRi' id='but_newgroup'>I</p>";nhtml=nhtml+"</div>";
var c_own = nhtml;var htool='<p id="set_gru" class="hTool active" title="Profesorado">q</p><p id="set_new" class="hTool" title="Añadir">o</p><p id="set_groups" class="hTool" title="Grupo">🄰</p>';
jsPanel.create({theme: "info",closeOnEscape: true,position: "center-top 0 10",panelSize: {width: 550,height: 500},animateIn: "jsPanelFadeIn",headerTitle: "Gestión docente",
headerToolbar: htool,content: c_own,footerToolbar:'<button id="b_close1" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Cancelar</button><button class="basic_but butRi b_ok" id="b_ok1" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,callback: function(panel) {$("#d_teach").show();$("#d_new").hide();$("#d_groups").hide();jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {
panel.header.querySelector("#set_gru").addEventListener(evt, function() {$("#set_gru").addClass("active");$("#set_new").removeClass("active");$("#d_teach").show();$("#d_new").hide();$("#set_groups").removeClass("active");$("#d_groups").hide();});
panel.header.querySelector("#set_new").addEventListener(evt, function() {$("#set_gru").removeClass("active");$("#set_new").addClass("active");$("#d_teach").hide();$("#d_new").show();$("#set_groups").removeClass("active");$("#d_groups").hide();});
panel.header.querySelector("#set_groups").addEventListener(evt, function() {$("#set_groups").addClass("active");$("#set_gru").removeClass("active");$("#set_new").removeClass("active");$("#d_teach").hide();$("#d_new").hide();$("#d_groups").show();});
$("#but_newgroup").on("touchstart click", function() {var i=$("#t_group tr").length+1;var ncu=$("#t_group tr:last").find("td").eq(1).text().trim();var ngr=$("#t_group tr:last").find("td").eq(2).text().trim();
var cb_t = "<select id='cb_t" + parseInt(i) + "' name='cb_t" + parseInt(i) + "' size='1'>";for (var z = 0; z < vteacher.length; z++) {cb_t=cb_t+'<option value="' + vteacher[z] + '">' + vteacherName[z] + '</option>';};
cb_t=cb_t+"</select>";var ntr="<tr id='tr_" + parseInt(i) + "'><td class='cedit' id='ttea_" + parseInt(i) + "'>" + cb_t + "</td>" + "<td class='cedit' contenteditable='true' id='tc_" + parseInt(i) + "'>" + ncu + "</td>" +
"<td class='cedit' contenteditable='true' id='tg_" + parseInt(i) + "'>" +ngr+ "</td>"+"<td class='delTeachJoin' id='delTeachJoin_" + parseInt(i) + "'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";
$("#t_group tr:last").after(ntr);set_teacher_function();});
panel.footer.querySelector("#b_close1").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_ok1").addEventListener(evt, function() {if ($("#set_gru").hasClass("active")) {var cansave=true;var ndata=[];$("#t_teacher tr:has(td)").each(function() {var n=$(this).find("td").eq(0).attr("id").substr(5,1000);var na=$(this).find("td").eq(0).text().trim();
if (!na){cansave=false;showalert("Debes llenar todos los datos.");};ndata.push(new Array(n,na));});
if (cansave){$.when($.ajax({data: {"action": "saveteachers","ndata":ndata},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});panel.close();}}
if ($("#set_new").hasClass("active")) {var goClose = true;if ($("#fusu3").val() == "" || $("#fname3").val() == "" || $("#fpass3").val() == "") {goClose = false;
showalert("Debes llenar todos los datos.");if ($("#fusu3").val() == "") {$("#fusu3").focus()};if ($("#fname3").val() == "") {$("#fname3").focus()};if ($("#fpass3").val() == "") {$("#fpass3").focus()};} else {
$.when($.ajax({data: {"action": "savenewteacher","user":$("#fusu3").val(),"name":$("#fname3").val(),"pass":$("#fpass3").val()},type:"POST",dataType: "json",url:"php/ardoraXML.php",success: function(data, textStatus, jqXHR) {
te=data["teacher"];ten=data["teacherName"];vteacher.push(te);vteacherName.push(ten);var ntr="<tr id='tr_"+te+"'><td class='cedit' contenteditable='true' id='tean_" + te + "'>" + ten + "</td>" +
"<td class='delTeach' id='delTeach_" + te + "'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";$("#t_teacher tr:last").after(ntr);set_teacher_function();}})).done(function() {});
$("#fusu3").val("");$("#fname3").val("");$("#fpass3").val("");}}
if ($("#set_groups").hasClass("active")) {var cansave=true;var ndata=[];$("#t_group tr:has(td)").each(function() {var n = $(this).attr("id").substr(3,900).trim();var cbname="cb_t"+n;if (document.getElementById(cbname)!==null){var n=document.getElementById(cbname).value;var ntea="-";}else{var ntea = $(this).find("td").eq(0).text().trim();var n=$(this).attr("id").split("_")[1];}
var ncur = $(this).find("td").eq(1).text().trim();var ngru = $(this).find("td").eq(2).text().trim();if (!ntea || !ncur || !ngru) {cansave = false;showalert("Debes de cubrir todos os datos.");};ndata.push(new Array(n,ncur,ngru));});
if (cansave) {$.when($.ajax({data: {"action": "saveteachergroup","ndata": ndata},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});panel.close();}}
});});
$(".seepwd").on("touchstart click", function() {if ($("#set_new").hasClass("active")) {var x = document.getElementById("fpass3");};if (x.type === "password") {x.type = "text";} else {x.type = "password";}});set_panel_pwd();set_teacher_function();}});}
function set_teacher_function(){  $(".delTeachJoin").on("touchstart click", function() {var libId = $(this).attr("id").substring(13, 200);$(this).parent("tr").remove();});
$(".delTeach").on("touchstart click", function() {var libId = $(this).attr("id").substring(9,200);for (var i=0; i < vteacher.length; i++) {if (vteacher[i]==libId){var libTxt=vteacherName[i];}}
jsPanel.modal.create({theme: "danger",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 350,height: 200},animateIn: "jsPanelFadeIn",
headerTitle: "Borrar",content: "<p class='p_panel'>¿ Realmente desea borrar <b>" + libTxt + "</b>?</p><br>",
footerToolbar: '<button id="b_closelib" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_oklib" type="button"><b>✓</b> Aceptar</button>',onwindowresize: false,
callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closelib").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_oklib").addEventListener(evt, function() {panel.close();$.when($.ajax({data: {"action": "deleteteacher","user": libId},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {document.getElementById("tr_" + libId).remove();});});});}});});}
function getLinks(){$.when($.ajax({data: {"action": "getLinks"},type: "POST",dataType: "json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {id=data["id"];txt=data["text"];url=data["n_u"];thumb=data["thumb"];act=data["active"];da=data["da"];w=data["width"];h=data["height"];o=data["norder"];ht=data["ht"];pu=data["pu"];me=data["menu"];dopanel_links(id, txt, url, thumb, act, w, h, o, da,ht,pu,me);}})).done(function() {});}
function dopanel_links(id,txt,url,thumb,act,w,h,o,da,ht,pu,me){if ($("#lnkPanel").length){}else{$("#buttonLnk").hide();var nhtml="<div id='tablelink'><table id='t_link' class='table_users'>";
nhtml=nhtml+"<thead><tr id='trhead'><th>Texto</th><th>https://</th><th>URL</th><th>Activar</th><th>Miniatura</th><th>Direct access</th><th>Ancho</th><th>alto</th><th>Pop-up</th><th>Menu</th><th></th></tr></thead>";
for (var i = 0; i < id.length; i++) {var achk = "";if (act[i]=="Y") {achk="checked";};var dachk="";if (da[i]=="Y") {dachk="checked";};var htchk = "";if (ht[i] == "Y") {htchk = "checked";};var puchk = "";if (pu[i] == "Y") {puchk = "checked";};nhtml=nhtml+"<tr id='tr_" + id[i] + "'>"+
"<td class='cedit' contenteditable='true' id='txt_" + id[i] + "'>" + txt[i] + "</td>"+
"<td><input type='checkbox' id='ht_" + id[i] + "' " + htchk + "></td>" +
"<td class='cedit' contenteditable='true' id='url_"+id[i]+"'>"+url[i]+"</td>"+
"<td><input type='checkbox' id='act_" + id[i] + "' " + achk + "></td>"+"<td contenteditable='true' id='nth_"+id[i]+"' class='nthumb'>" + thumb[i]+"</td>"+
"<td><input type='checkbox' id='da_" + id[i] + "' " + dachk + "></td>" +"<td class='cedit onlynumber' contenteditable='true' id='wi_" + id[i]+"'>"+w[i]+"</td>"+
"<td class='cedit onlynumber' contenteditable='true' id='he_" + id[i]+"'>"+h[i]+"</td>"+
"<td><input type='checkbox' id='pu_" + id[i] + "' " + puchk + "></td>"+
"<td class='cedit' contenteditable='true' id='menu_" + id[i] + "'>" + me[i] + "</td>" +
"<td class='delLink' id='delLink_" + id[i] + "'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";};
nhtml=nhtml+"</table>";nhtml=nhtml+"<br><p class='butfont butRi' id='but_newlink'>I</p>";nhtml=nhtml+"</div>";nhtml=nhtml+"<div id='studentlink'></div";
var panelLink = jsPanel.create({id:"lnkPanel",theme:"info",closeOnEscape:true,position:"center-top 0 100",panelSize:{width:850,height:500},animateIn:"jsPanelFadeIn",headerTitle:"Ligazóns",contentSize: "500 275",
headerToolbar: '<p id="set_links" class="hTool active" title="Set up">N</p><p id="set_alulinks" class="hTool" title="Alumnos y alumnas:">q</p>',
footerToolbar: '<button id="b_closeCFG" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_okCFG" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: true,content: nhtml,contentOverflow: "scroll",onclosed: function(panel, closedByUser) {$("#buttonLnk").show();},callback: function(panel) {getjoblink(id,txt);$("#but_newlink").on("touchstart click", function(e) {if ($("#t_link tr:last").attr("id")=="trhead"){var nid=0;}else {var nid=0;$("#t_link tr").each(function(){if (parseInt($(this).attr("id").substring(3, 800))>nid){nid=parseInt($(this).attr("id").substring(3, 800));}})};nid++;
var ntr="<tr id='tr_" +nid + "'>"+"<td class='cedit' contenteditable='true' id='txt_"+nid+"'></td>"+
"<td><input type='checkbox' id='ht_" + nid + "' ></td>"+
"<td class='cedit' contenteditable='true' id='url_"+nid+"'></td>"+"<td><input type='checkbox' id='act_"+nid+"' ></td>" +
"<td contenteditable='true' id='nth_"+nid+"' class='nthumb'></td>"+"<td><input type='checkbox' id='da_"+nid+"' ></td>" +
"<td class='cedit onlynumber' contenteditable='true' id='wi_"+nid+"'>1000</td>"+"<td class='cedit onlynumber' contenteditable='true' id='he_"+nid+"'>700</td>"+
"<td><input type='checkbox' id='pu_"+nid+"' ></td>" +
"<td class='cedit' contenteditable='true' id='menu_" + nid + "'></td>" +
"<td class='delLink' id='delLink_"+nid+"'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";$("#t_link tr:last").after(ntr);
$("#t_studentlink").find("tr").each(function(i,row) {var n=$("#t_studentlink tr:last td").length;var primer_td=$(row).find("td,th")[n-1];if (primer_td.tagName == "TH") {
var nt="<th class='td_center td_" + nid + "' align='center' valign='center'>" + nid + "<p class='ardoraArr b_allchk' id='ball_" + nid + "'>D</p>" + "</th>";$(nt).insertAfter(primer_td);} else {
var nt = "<td class='td_center td_" + nid + "'><input type='checkbox' id='chk_" + nid + "_" + $(this).attr("id").substr(5, 500) + "'></td>";$(nt).insertAfter(primer_td);}});
$("#ball_"+nid).on("touchstart click", function(e) {var chkid = $(this).attr("id").substring(5, 500);$("input:checkbox").each(function() {if ($(this).attr("id").substring(0, 5 + chkid.length) == "chk_" + chkid + "_") {if ($(this).prop("checked")) {$(this).prop("checked", false);} else {$(this).prop("checked", true);}}});});setFunToTable();});
$("#studentlink").hide();jsPanel.pointerup.forEach(function(evt) {$("#set_links").on("touchstart click", function(e) {$("#set_links").addClass("active");$("#set_alulinks").removeClass("active");$("#tablelink").show();$("#studentlink").hide();});
$("#set_alulinks").on("touchstart click", function(e) {$("#set_links").removeClass("active");$("#set_alulinks").addClass("active");$("#tablelink").hide();$("#studentlink").show();});panel.footer.querySelector("#b_closeCFG").addEventListener(evt, function() {$("#buttonLnk").show();panel.close();});
panel.footer.querySelector("#b_okCFG").addEventListener(evt, function() {var tindex=0;var cansave=true;var ndata=[];$("#t_link tr:has(td)").each(function() {var n=$(this).find("td").eq(0).attr("id").substr(4, 100);var v_txt = $(this).find("td").eq(0).text();var v_url = $(this).find("td").eq(2).text();var v_act = "N";
if ($("#act_" + n + ":checkbox:checked").length > 0) {v_act = "Y";};var v_thu=$(this).find("td").eq(4).text();var v_da="N";if ($("#da_" + n + ":checkbox:checked").length > 0) {v_da = "Y";};var v_ht="N";if ($("#ht_"+n+":checkbox:checked").length > 0) {v_ht="Y";};var v_pu="N";if ($("#pu_"+n+":checkbox:checked").length > 0) {v_pu="Y";};var v_wid=$(this).find("td").eq(6).text();var v_hei=$(this).find("td").eq(7).text();var v_me = $(this).find("td").eq(9).text();var v_ord=tindex;
if (!v_txt.trim() || !v_url.trim() || !v_wid.trim() || !v_hei.trim()){cansave=false;showalert("Debes llenar todos los datos.");};ndata.push(new Array(n,v_txt,v_url,v_thu,v_act,v_wid,v_hei,v_ord,v_da,v_ht,v_pu,v_me));tindex++;});
if (cansave) {var nstulib=[];$("input:checkbox").each(function() {if ($(this).attr("id").substring(0, 4)=="chk_"){
var nd=$(this).attr("id").split("_");if ($(this).prop("checked")) {nstulib.push(new Array(nd[2], nd[1],"Y"));}else{nstulib.push(new Array(nd[2], nd[1],"N"));}}});
$.when($.ajax({data: {"action":"saveLinks","ndata":ndata,"nstulib":nstulib},type:"POST",dataType:"json",url:"php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});
panel.close();$("#buttonLnk").show();show_da();}});});setFunToTable();}});}}
function getjoblink(n_id, n_folder) {var cn_id=n_id;var cn_folder=n_folder;var nhtml="<table id='t_studentlink' class='table_users'>";nhtml=nhtml + "<thead><tr><th>Alumnado</th>";for (var i = 0; i < n_folder.length; i++) {nhtml = nhtml + "<th class='td_center td_" + n_id[i] + "' align='center' valign='center'>" + n_folder[i] + "<p class='ardoraArr b_allchk' id='ball_" + n_id[i] + "'>D</p>" + "</th>";}
nhtml=nhtml+"</tr></thead>";if (userType=="admin") {$.when($.ajax({data: {"action": "getjoblink"},type:"POST",dataType: "json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {vec = data["alljob"];
for (var i = 0; i < vec.length; i++) {nhtml=nhtml+"<tr id='trsl_" + vec[i]["user"] + "'>";nhtml=nhtml+"<td >" + vec[i]["fullname"] + "</td>";for (var z = 0; z < cn_folder.length; z++) {
var fi = n_id[z];var achk = "";if (vec[i][fi] == "Y") {achk="checked"};nhtml = nhtml + "<td class='td_center td_" + n_id[z] + "'><input type='checkbox' id='chk_" + n_id[z] + "_" + vec[i]["user"] + "' " + achk + "></td>";};nhtml=nhtml+"</tr>";}}
})).done(function() {nhtml=nhtml+"</table>";$("#studentlink").html(nhtml);$(".b_allchk").on("touchstart click", function(e) {var chkid=$(this).attr("id").substring(5, 500);$("input:checkbox").each(function() {
if ($(this).attr("id").substring(0, 5 + chkid.length) == "chk_" + chkid + "_") {if ($(this).prop("checked")) {$(this).prop("checked", false);} else {$(this).prop("checked", true);}}});});});}}
function saveTextFile(ty, con) {var un;if (ty=="new") {$.ajax({data: {"action": "getUs"},type: "POST",dataType: "json",async: false,url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {un=data["un"];
var nhtml = '<p class="ma_bo">Select folder</p><div id="folders"></div><p class="ma_bo">Save as </p><div id="file_sa"><img src="gestorarchi/css/images/folder_open.png" alt="Open folder" width="16" height="16"><p id="folderNameUser"></p></div>';
nhtml = nhtml + '<input type="text" id="fname" name="fname">.text';
var hea='<p id="bNewFolderPersonal" class="hTool2" title="New folder">m</p><p id="bDelFolderPersonal" class="hTool2" title="Delete folder" style="">n</p>';
jsPanel.modal.create({theme:"light",closeOnEscape:true,position: "center-top 0 1",panelSize: {width: 500,height: 450},animateIn: "jsPanelFadeIn",headerTitle: "Guardar",
content: nhtml,headerToolbar:hea,footerToolbar: '<button id="b_c" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cerrar</button><button class="basic_but butRi b_ok" id="b_s" type="button"><b>🖫</b> Guardar</button>',
onwindowresize: false,callback: function(panel) {$("#bNewFolderPersonal").on("touchstart click", function(e) {addNewFolder(un);});$("#bDelFolderPersonal").on("touchstart click", function(e) {deleFolder(un);});
$("#bDelFolderPersonal").hide();actualFile="";if (userType == "admin") {rootP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";} else {
rootP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
$("#folders").fileTree({expandSpeed: 750,collapseSpeed: 750,multiFolder: false,root: rootP,script: "gestorarchi/php/jqueryFileTree.php"}, function(file) {openFile(file);}, function(dir) {openDir(dir);});
jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_c").addEventListener(evt, function() {panel.close();});panel.footer.querySelector("#b_s").addEventListener(evt, function() {
$("#fname").val(normalize($("#fname").val()));if ($("#fname").val().trim()!=""){if (userType == "admin") {rP = "../gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";
rP2="gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";
} else {rP = "../gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";
rP2 = "gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
var ct=$("#ifr_edit").contents().find(".note-editable").html();var fn=rP+$("#folderNameUser").text().substring(1,1000).trim()+$("#fname").val().trim()+".text";var fn2=rP2+$("#folderNameUser").text().substring(1,1000).trim()+$("#fname").val().trim()+".text";var nt=$("#fname").val().trim();
if (!UrlExists(fn2)) {$.when($.ajax({data: {"action": "saveFileText","fn":fn,"ct":ct},type:"POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {$("#fileText").text($("#folderNameUser").text().substring(1,1000).trim()+$("#fname").val().trim()+".text");panel.close();});}
else{panel.close();var m_pa=jsPanel.modal.create({theme: "danger",headerTitle: "Mens. Error",content: '<p class="p_panel">The file already exists, do you want to replace it?</p>',contentSize: '400 170',position: 'center 60 60',
footerToolbar: '<button id="b_c2" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_s2" type="button"><b> ✓</b> <Aceptar</button>',
callback: function(panel) {jsPanel.pointerup.forEach(function(evt1) {panel.footer.querySelector("#b_c2").addEventListener(evt1, function() {cansave=false;panel.close();});panel.footer.querySelector("#b_s2").addEventListener(evt1, function() {
$.when($.ajax({data: {"action": "saveFileText","fn": fn,"ct":ct},type:"POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}
})).done(function() {$("#fileText").text($("#folderNameUser").text().substring(1,1000).trim()+nt+".text");m_pa.close();});});});}});}}
else{showalert("You must write a name");}});});}});}});}
if (ty=="edit") {$.ajax({data: {"action": "getUs"},type: "POST",dataType: "json",async:false,url:"php/ardoraXML.php",success: function(data, textStatus, jqXHR) {un=data["un"];if (userType == "admin") {
rP = "../gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";} else {
rP = "../gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
var ct=$("#ifr_edit").contents().find(".note-editable").html();var fn=rP+$("#fileText").text();$.ajax({data: {"action":"saveFileText","fn": fn,"ct":ct},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}});}});};$(".jsPanel-content").css("padding","4px");}
function openTextFile(){var un;$.ajax({data: {"action":"getUs"},type:"POST",dataType: "json",async: false,url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {un = data["un"];
var nhtml = '<p class="ma_bo">Select folder</p><div id="folders"></div><div id="file_sa"><img src="gestorarchi/css/images/folder_open.png" alt="Open folder" width="16" height="16"><p id="folderNameUser"></p></div>';
jsPanel.modal.create({theme: "light",closeOnEscape: true,position: "center-top 0 1",panelSize: {width: 500,height:450},animateIn: "jsPanelFadeIn",
headerTitle: "Abrir",content: nhtml,
footerToolbar: '<button id="b_c" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cerrar</button><button class="basic_but butRi b_ok" id="b_s" type="button"><b>✓</b> Abrir</button>',
onwindowresize: false,callback: function(panel) {$("#b_s").attr("disabled", true);actualFile = "";if (userType == "admin") {
rootP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";} else {
rootP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
$("#folders").fileTree({expandSpeed:750,collapseSpeed:750,multiFolder:false,root:rootP,script:"gestorarchi/php/jqueryFileTree.php"}, function(file) {openNewFile(file,un);}, function(dir) {openDir(dir);});
jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_c").addEventListener(evt, function() {panel.close();});panel.footer.querySelector("#b_s").addEventListener(evt, function() {if (userType == "admin") {
var rP="gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";} else {
var rP = "gestorarchi/ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
var newf=$("#folderNameUser").html();if (newf.substring(newf.lastIndexOf("."))==".text"){$.ajax({url : rP+newf,dataType: "text",success : function (data) {$("#ifr_edit").contents().find(".note-editable").html(data);$("#fileText").text(newf);}});
panel.close();}});});$(".jsPanel-content").css("padding","4px");}});}});}
function openNewFile(file,un) {if (userType == "admin") {var rP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";} else {
var rP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
if (file.indexOf(".text")==-1){$("#b_s").attr("disabled",true);}else {$("#b_s").attr("disabled",false);}; $("#folderNameUser").html(file.replace(rP,""));}
function openFile(file) {$("#bDelFolderPersonal").hide();}
function addNewFolder(un){var tit = $("#folderNameUser").text();var newHtml =  '<div id="modalBody">Folder name: <b>' + tit + '</b> ';
newHtml = newHtml + '<input type="text" id="fName" name="fName" placeholder=""><br>';jsPanel.modal.create({theme: "danger",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 350,height: 200},
animateIn: "jsPanelFadeIn",headerTitle: "Carpeta",content: newHtml,footerToolbar: '<button id="b_closelib" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_oklib" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem",padding: "3px"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closelib").addEventListener(evt, function() {panel.close();});panel.footer.querySelector("#b_oklib").addEventListener(evt, function() {
if ($("#fName").val().length > 0) {var folder = $("#fName").val();folder=normalize(folder.replace(/^\s+/g, "").replace(/\s+$/g, ""));$.ajax({data: {"action":"makeDir","fName":tit.substr(1)+folder,"fType": 1},type: "POST",
dataType: "json",async: false,url:"gestorarchi/php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}});refreshFolders(un);};panel.close();});});}});}
function deleFolder(un){var tit = $("#folderNameUser").text();jsPanel.modal.create({theme: "danger",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 350,height: 200},animateIn: "jsPanelFadeIn",
headerTitle: "Borrar",content: "<p class='p_panel'>¿ Realmente desea borrar <b>" + tit + "</b>?</p><br>",
footerToolbar: '<button id="b_closelib" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_oklib" type="button"><b></b> Aceptar</button>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closelib").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_oklib").addEventListener(evt, function() {panel.close();var folder = tit.substr(1);folder = folder.substr(0, folder.length - 1);$.when($.ajax({data: {"action": "deleteDir","fName": folder,"fType": 1},type: "POST",dataType: "json",async: false,
url: "gestorarchi/php/ardoraFileManager.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});refreshFolders(un);});});}});}
function refreshFolders(un){if (userType == "admin") {rootP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Profesorado/" + un + "/";} else {
rootP = "../ardoraWorkFiles/gestorarchi/gestorarchi_Alumnado/" + un + "/";}
$("#folders").fileTree({expandSpeed: 750,collapseSpeed: 750,multiFolder: false,root: rootP,script:"gestorarchi/php/jqueryFileTree.php"}, function(file) {openFile(file);}, function(dir) {openDir(dir);});$("#folderNameUser").text("");}
function openDir(dir) {$("#folderNameUser").html(dir);
if (dir.length > 1) {$("#bDelFolderPersonal").show();} else {$("#bDelFolderPersonal").hide();}
}
function show_da() {$("#ardoraMain").html("");$.when($.ajax({data: {"action": "getDa"},type:"POST",dataType:"json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {
n_id = data["id"];n_folder=data["folder"];n_text=data["text"];n_coment=data["coment"];n_url=data["n_url_to"];n_thumb = data["thumb"];n_active=data["active"];n_width=data["width"];n_height=data["height"];n_order=data["noder"];n_da=data["da"];n_menu = data["menu"];print_da(n_id,n_folder,n_text,n_coment,n_url,n_thumb,n_active,n_width,n_height,n_order,n_da,n_menu);}
})).done(function() {$.ajax({data: {"action": "getDaLink"},type:"POST",dataType:"json",url:"php/ardoraLibraryXML.php",success:function(data, textStatus, jqXHR) {n_id=data["id"];n_text=data["text"];n_url=data["n_url_to"];n_thumb=data["thumb"];n_active=data["active"];
n_width=data["width"];n_height=data["height"];n_order=data["noder"];n_da=data["da"];n_ht=data["ht"];n_pu=data["pu"];n_menu = data["menu"];print_dalink(n_id,n_text,n_url, n_thumb, n_active, n_width, n_height, n_order, n_da,n_ht,n_pu,n_menu);}});});}
function print_dalink(n_id,n_text,n_url,n_thumb,n_active,n_width,n_height,n_order,n_da,n_ht,n_pu,n_menu) {link_url=n_url;link_w=n_width;link_h=n_height;link_txt=n_text;link_ht=n_ht;link_pu=n_pu;var act_html=$("#ardoraMain").html();var nhtml="";var nli="";
for (var i=0; i < n_text.length; i++) {if (n_da[i]=="Y") {nhtml=nhtml+"<div id='adlink_" + i.toString() + "' class='div_adlink'>";nhtml=nhtml+"<img src='ardoraWorkFiles/library/thumbs/" + n_thumb[i] + "'>";nhtml=nhtml+"<p>" + n_text[i] + "</p>";nhtml=nhtml+"</div>";}
if (n_menu[i].trim().length===0){nli=nli+'<li class="submenu lib_li submenulink" id="mlink_'+i.toString()+'"><a><img class="butLe" src="ardoraWorkFiles/library/thumbs/'+n_thumb[i]+'"><p class="butLe libtext">'+n_text[i]+'<br></p></a></li>';
}else{nli=nli+'<li class="submenu lib_li subsubmenulink"><a><p class="butLe libtext">'+n_menu[i].trim()+'<br></p></a></li>';}}
$("#ardoraMain").append(nhtml);$("#linkMenu").html(nli);
var menus=[];var in_menu=0;$("#linkMenu .subsubmenulink").each(function(){if ($.inArray($(this).text(),menus)==-1){menus.push($(this).text());$(this).attr("id","subsub_"+in_menu.toString());in_menu++;}else{$(this).remove();}});
for (var i=0; i<menus.length; i++) {$("#ardoraMain").append("<div class='ssm' id='ssm_"+i.toString()+"'></div>");$("#subsub_"+i.toString()+" a").on("touchstart click mouseover" , function(e){var id=$(this).parent().attr("id").split("_");
var pos=$(this).offset();var hei=$("#ssm_"+id[1]).height()-$(this).height();$("#ssm_"+id[1]).css("top",pos.top-hei);$("#ssm_"+id[1]).css("left",0);$("#ssm_"+id[1]).css("z-index",99999);$("#subsub_"+id[1]).css("background-color","#dadada");$("#ssm_"+id[1]).show();});}
$(".subsubmenulink").mouseenter(function(e){$(".ssm").mouseleave();});$(".ssm").mouseleave(function() {var id=$(this).attr("id").split("_");$("#subsub_"+id[1]).css("background-color","white");$(this).hide();});$(".submenulink").on("touchstart click mouseover" , function(e){$(".ssm").mouseleave();});
for (var i = 0; i < n_text.length; i++) {if (n_menu[i].trim().length!==0){for (var z=0; z<menus.length; z++) {if (menus[z]==n_menu[i].trim()){
$("#ssm_"+z.toString()).append('<li class="submenu lib_li" id="mlink_'+i.toString()+'"><a><img class="butLe" src="ardoraWorkFiles/library/thumbs/'+n_thumb[i]+'"><p class="butLe libtext">'+n_text[i]+'<br></p></a></li>');
$("#ssm_"+z.toString()).hide();}}}}
for (var i=0; i < n_text.length; i++) {$("#adlink_" + i.toString()).on("touchstart click", function(e) {var ni=parseInt($(this).attr("id").substring(7, 10));openlink(ni);});
$("#mlink_" + i.toString()).on("touchstart click", function(e) {var ni=parseInt($(this).attr("id").substring(6, 10));openlink(ni);});};}
function openlink(ni) {if ($("#link"+String(ni)+"Panel").length){}else{var nurl=link_url[ni];if (link_ht[ni]=="Y"){nurl="https://"+nurl;}else{nurl="http://"+nurl;}
if (link_pu[ni]=="Y"){window.open(nurl,"pu_" + ni,"width="+link_w[ni]+",height="+link_h[ni]+",resizable=1");}else{
jsPanel.create({id:"link"+String(ni)+"Panel",theme: "light",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: link_w[ni],height: link_h[ni]},animateIn: "jsPanelFadeIn",headerTitle: link_txt[ni],
content:'<iframe src="' + nurl + '" style="width: 100%; height: 100%;"></iframe>',onwindowresize: false,
callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {});}});}}}
function print_da(n_id,n_folder,n_text,n_coment,n_url,n_thumb,n_active,n_width,n_height,n_order,n_da,n_menu){lib_url=n_url;lib_w=n_width;lib_h=n_height;lib_txt=n_text;lib_co=n_coment;var nhtml="";var nli="";
for (var i=0;i<n_folder.length;i++) {if (n_da[i]=="Y"){nhtml=nhtml+"<div id='a_d_"+i.toString()+"' class='div_ad'>";nhtml=nhtml+"<img src='ardoraWorkFiles/library/thumbs/"+n_thumb[i]+"'>";nhtml=nhtml+"<p>"+n_text[i]+"</p>";nhtml=nhtml+"</div>";}
if (n_menu[i].trim().length===0){nli=nli+'<li class="submenu lib_li submenulib" id="mlib_' + i.toString() + '"><a><img class="butLe" src="ardoraWorkFiles/library/thumbs/'+n_thumb[i]+'"><p class="butLe libtext">'+n_text[i]+'<br></p></a></li>';
}else{nli=nli+'<li class="submenu lib_li subsubmenulib"><a><p class="butLe libtext">'+n_menu[i].trim()+'<br></p></a></li>';}
}
$("#ardoraMain").append(nhtml);$("#libMenu").html(nli);
var menus=[];var in_menu=0;$("#libMenu .subsubmenulib").each(function(){if ($.inArray($(this).text(),menus)==-1){menus.push($(this).text());$(this).attr("id","subsubl_"+in_menu.toString());in_menu++;}else{$(this).remove();}});
for (var i=0; i<menus.length; i++) {$("#ardoraMain").append("<div class='ssml' id='ssml_"+i.toString()+"'></div>");$("#subsubl_"+i.toString()+" a").on("touchstart click mouseover" , function(e){
var id=$(this).parent().attr("id").split("_");var pos=$(this).offset();var hei=$("#ssml_"+id[1]).height()-$(this).height();$("#ssml_"+id[1]).css("top",pos.top-hei);$("#ssml_"+id[1]).css("left","-30px");$("#ssml_"+id[1]).css("z-index",99999);$("#subsubl_"+id[1]).css("background-color","#dadada");$("#ssml_"+id[1]).show();});}
$(".subsubmenulib").mouseenter(function(e){$(".ssml").mouseleave();});$(".ssml").mouseleave(function() {var id=$(this).attr("id").split("_");$("#subsubl_"+id[1]).css("background-color","white");$(this).hide();});
$(".submenulib").on("touchstart click mouseover" , function(e){$(".ssml").mouseleave();});for (var i = 0; i < n_text.length; i++) {if (n_menu[i].trim().length!==0){for (var z=0; z<menus.length; z++) {if (menus[z]==n_menu[i].replace("<br>","").trim()){
$("#ssml_"+z.toString()).append('<li class="submenu lib_li" id="mlib_'+i.toString()+'"><a><img class="butLe" src="ardoraWorkFiles/library/thumbs/'+n_thumb[i]+'"><p class="butLe libtext">'+n_text[i]+'<br></p></a></li>');
$("#ssml_"+z.toString()).hide();}}}}
for (var i=0; i<n_folder.length; i++) {$("#a_d_" + i.toString()).on("touchstart click", function(e) {var ni = parseInt($(this).attr("id").substring(4, 10));openlibrary(ni);});
$("#mlib_"+i.toString()).on("touchstart click", function(e) {var ni = parseInt($(this).attr("id").substring(5, 10));openlibrary(ni);});}}
function openlibrary(ni){if ($("#library"+String(ni)+"Panel").length){}else{var nurl="library/" + lib_url[ni];jsPanel.create({id:"library"+String(ni)+"Panel",theme: "light",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: lib_w[ni],height: lib_h[ni]},
animateIn: "jsPanelFadeIn",headerTitle: lib_txt[ni],content: '<iframe src="' + nurl + '" style="width: 100%; height: 100%;"></iframe>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize:"1rem"});jsPanel.pointerup.forEach(function(evt) {});}});}}
function gocfg(){if (userType=="admin"){$.ajax({data: {"action": "getLibrary"},type: "POST",dataType: "json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {n_id = data["id"];n_folder = data["folder"];n_text = data["text"];n_coment = data["coment"];n_url = data["n_url_to"];n_thumb = data["thumb"];n_active = data["active"];
n_width = data["width"];n_height = data["height"];n_order = data["noder"];n_da=data["da"];n_menu=data["menu"];showLibrary(n_id,n_folder,n_text,n_coment,n_url,n_thumb,n_active,n_width,n_height,n_order,n_da,n_menu);}});}}
function UrlExists(url){var http = new XMLHttpRequest();http.open("HEAD",url,false);http.send();return http.status!=404;}
function setFunToTable(){$("tbody").sortable();$(".cedit").on("touchstart click", function() {$(this).focus();});$(".onlynumber").keypress(function(e) {if (isNaN(String.fromCharCode(e.which))) e.preventDefault();});
 $('#t_library tr:has(td)').each(function() {if ($(this).find("td").eq(0).html() == $(this).find("td").eq(3).html()) {$(this).find("td").eq(3).attr('contenteditable','false');}});
$(".nthumb").on("touchstart click", function(e) {var libId = $(this).attr("id").substring(4, 200);var libTxt = $("#nfo_" + libId).text();jsPanel.modal.create({theme:"light",closeOnEscape:true,position: "center-top 0 100",panelSize: {width: 350,height: 300},
animateIn: "jsPanelFadeIn",headerTitle: "Miniatura",
content: "<div id='fthumb'><p>Seleccione miniatura para: <b>" + libTxt + "</b></p><br><div id='div_file'><label for='file'>Archivo imagen</label><input type='file' id='file' name='file' required /></div><div id='labelprogr'>Subiendo archivos...</div><progress class='progress' value='0' max='100'>Subiendo archivos...</progress></div>",
footerToolbar: '<button id="b_close" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_ok" type="button"><b></b> Aceptar</button>',
onwindowresize:false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_close").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_ok").addEventListener(evt, function() {e.preventDefault();if ($("#file").get(0).files.length === 0) {$("#fthumb").append('<br><div class="alert">❌ Debes seleccionar una imagen.</div>');};var filename = $("#file").val();
var extension=filename.replace(/^.*\./, '').toLowerCase();if (extension != "jpg" && extension != "jpeg" && extension != "png") { $("#fthumb").append('<br><div class="alert">❌ La imagen debe ser jpg o png</div>');  } else {var formData = new FormData();var files=$("#file")[0].files[0];formData.append("file", files);
$.when($.ajax({
xhr: function() {var progress=$(".progress"),xhr=$.ajaxSettings.xhr();$("#b_okup").css("visibility","hidden");$("#b_closeup").css("visibility","hidden");$("#div_file").css("visibility","hidden");$("#fthumb p").css("visibility","hidden");$("#labelprogr").css("visibility","visible");progress.css("visibility","visible");
xhr.upload.onprogress = function(ev) {if (ev.lengthComputable) {var percentComplete = parseInt((ev.loaded / ev.total) * 100);progress.val(percentComplete);}};return xhr;},
url: "php/ardoraLibraryXML.php?action=savethumb&nid=" + libId,type: "post",data: formData,contentType: false,processData: false,success:function(response) {}})).done(function() {var nf = document.getElementById("file").files[0].name;$("#nth_" + libId).text(nf);panel.close();});}});});}});});
$(".delLibrary").on("touchstart click", function() {var libId = $(this).attr("id").substring(11, 200);var libTxt = $("#nfo_" + libId).text();jsPanel.modal.create({theme: "danger",closeOnEscape:true,position: "center-top 0 100",panelSize: {width:350,height: 200},animateIn: "jsPanelFadeIn",
headerTitle: "Borrar",content: "<p class='p_panel'>¿ Realmente desea borrar <b>" + libTxt + "</b>?</p><br>",footerToolbar:'<button id="b_closelib" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_oklib" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closelib").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_oklib").addEventListener(evt, function() {panel.close();$.when($.ajax({data: {"action": "delLibrary","nid": libId}, type: "POST",dataType: "json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {$("#tr_" + data["id"]).remove();$(".td_" + data["id"]).remove();}})).done(function() {});});});}});});
$(".delLink").on("touchstart click", function() {var libId=$(this).attr("id").substring(8,200);var libTxt = $("#txt_" + libId).text();jsPanel.modal.create({theme: "danger",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 350,height: 200},
animateIn: "jsPanelFadeIn",headerTitle: "Borrar",content: "<p class='p_panel'>¿ Realmente desea borrar <b>" + libTxt + "</b>?</p><br>",
footerToolbar:'<button id="b_closelib" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_oklib" type="button"><b></b> Aceptar</button>',
onwindowresize:false,callback:function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closelib").addEventListener(evt, function() {panel.close();});panel.footer.querySelector("#b_oklib").addEventListener(evt, function() {
panel.close();$.when($.ajax({data: {"action": "delLink","nid": libId},type:"POST",dataType:"json",url:"php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {$("#tr_" + data["id"]).remove();$(".td_" + data["id"]).remove();}})).done(function() {});});});}});});
}
function getjoblibrary(n_id, n_folder){var cn_id=n_id;var cn_folder=n_folder;var nhtml="<table id='t_studentlibrary' class='table_users'>";nhtml = nhtml + "<thead><tr><th>Alumnado</th>";
for (var i=0;i<n_folder.length; i++) {nhtml=nhtml+"<th class='td_center td_"+n_id[i]+"' align='center' valign='center'>"+n_folder[i]+"<p class='ardoraArr b_allchk' id='ball_"+n_id[i]+"'>D</p>"+"</th>";}
nhtml=nhtml+"</tr></thead>";if (userType == "admin") {$.when($.ajax({data: {"action": "getjoblibrary"},type: "POST",dataType: "json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {
vec=data["alljob"];for (var i=0; i < vec.length; i++) {nhtml=nhtml + "<tr id='trsl_" + vec[i]["user"] + "'>";nhtml=nhtml+"<td >" + vec[i]["fullname"]+ "</td>";for (var z = 0; z < cn_folder.length; z++) {var fi=n_id[z];var achk="";if (vec[i][fi]=="Y"){achk="checked"}
nhtml=nhtml+"<td class='td_center td_"+n_id[z]+"'><input type='checkbox' id='chk_" + n_id[z]+"_"+vec[i]["user"]+ "' " + achk + "></td>";};nhtml=nhtml+"</tr>";}}})).done(function() {nhtml=nhtml+"</table>";$("#studentlibrary").html(nhtml);
$(".b_allchk").on("touchstart click", function(e) {var chkid=$(this).attr("id").substring(5,500);$("input:checkbox").each(function() {if($(this).attr("id").substring(0,5+chkid.length)=="chk_"+chkid+"_"){
if( $(this).prop("checked") ) {$(this).prop("checked",false);}else{$(this).prop("checked",true);}}});});});}}
function showLibrary(n_id,n_folder,n_text,n_coment,n_url,n_thumb,n_active,n_width,n_height,n_order,n_da,n_menu){var nhtml="<div id='tablelibrary'><table id='t_library' class='table_users'>";
nhtml = nhtml + "<thead><tr><th>Carpeta</th><th>Texto</th><th>Comentario</th><th>URL</th><th>Miniatura</th><th>Activar</th><th>Ancho</th><th>alto</th><th>Direct access</th><th>Menu</th><th></th></tr></thead>";
for (var i = 0; i < n_id.length; i++) {var achk="";if (n_active[i]=="Y"){achk="checked";};var dachk="";if (n_da[i]=="Y") {dachk="checked";}
nhtml = nhtml + "<tr id='tr_"+n_id[i]+"'><td id='nfo_"+n_id[i]+"'>"+n_folder[i]+"</td><td class='cedit' contenteditable='true' id='nte_"+n_id[i]+"'>"+n_text[i]+
"</td><td class='cedit' contenteditable='true' id='nco_"+n_id[i]+"'>"+n_coment[i]+"</td><td class='cedit' contenteditable='true' id='nur_"+n_id[i]+"'>"+
n_url[i]+"</td><td contenteditable='true' id='nth_"+n_id[i]+"' class='nthumb'>"+n_thumb[i]+"</td><td><input type='checkbox' id='nac_"+n_id[i]+"' "+achk+">"+
"</td><td class='cedit onlynumber' contenteditable='true' id='nwi_"+n_id[i]+"'>"+n_width[i]+"</td><td class='cedit onlynumber' contenteditable='true' id='nhe_"+n_id[i]+"'>"+
n_height[i]+"</td><td><input type='checkbox' id='dac_" + n_id[i] + "' " + dachk + ">" +
"<td class='cedit' contenteditable='true' id='nme_" + n_id[i] + "'>" + n_menu[i] + "</td>"+
"<td class='delLibrary' id='delLibrary_"+n_id[i]+"'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";};
nhtml=nhtml+"</table>";nhtml=nhtml+"<br><p class='butfont butRi' id='but_upload' title='Upload'>I</p>";nhtml=nhtml+"</div>";nhtml = nhtml +"<div id='studentlibrary'></div>";$("#buttonCFG").hide();
var panelCFG = jsPanel.create({theme: "info",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 850,height: 500},animateIn: "jsPanelFadeIn",headerTitle: "subir a biblioteca",contentSize: "500 275",
headerToolbar: '<p id="set_library" class="hTool active" title="Biblioteca">l</p><p id="set_stulib" class="hTool" title="Alumnos y alumnas:">q</p>',
footerToolbar:'<button id="b_closeCFG" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_okCFG" type="button"><b>✓</b> Aceptar</button>',
onwindowresize:true,content:nhtml,contentOverflow:"scroll",onclosed: function(panel, closedByUser) {$("#buttonCFG").show();},callback: function(panel) {getjoblibrary(n_id, n_folder);$("#studentlibrary").hide();jsPanel.pointerup.forEach(function(evt) {
$("#set_library").on("touchstart click", function(e) {$("#set_library").addClass("active");$("#set_stulib").removeClass("active");$("#tablelibrary").show();$("#studentlibrary").hide();});
$("#set_stulib").on("touchstart click", function(e) {$("#set_library").removeClass("active");$("#set_stulib").addClass("active");$("#tablelibrary").hide();$("#studentlibrary").show();});
panel.footer.querySelector("#b_closeCFG").addEventListener(evt, function() {$("#buttonCFG").show();panel.close();});panel.footer.querySelector("#b_okCFG").addEventListener(evt, function() {
var tindex=0;var cansave=true;var ndata=[];$('#t_library tr:has(td)').each(function () {var n=$(this).find("td").eq(0).attr("id").substr(4,100);var v_fol=$(this).find("td").eq(0).html();var v_txt=$(this).find("td").eq(1).html();var v_com=$(this).find("td").eq(2).html();var v_url=$(this).find("td").eq(3).html();
if (!UrlExists("library/"+v_url)){if (cansave){showalert("URL invalida "+v_url);}; cansave=false;};var v_thu = $(this).find("td").eq(4).html();var v_act="N";if ($("#nac_"+n+":checkbox:checked").length>0){v_act="Y";}
var v_da = "N";if ($("#dac_" + n + ":checkbox:checked").length > 0) {v_da = "Y";};var v_wid = $(this).find("td").eq(6).html();var v_hei= $(this).find("td").eq(7).html();var v_men = $(this).find("td").eq(9).html();if (v_men=="<br>"){v_men="";};var v_ord=tindex;ndata.push(new Array(v_fol,v_txt,v_com,v_url,v_thu,v_act,v_wid,v_hei,v_ord,v_da,v_men));tindex++;});
if (cansave){var nstulib=[];$("input:checkbox").each(function() {if($(this).attr("id").substring(0,4)=="chk_"){
var nd = $(this).attr("id").split("_");if ($(this).prop("checked")) {nstulib.push(new Array(nd[2], nd[1],"Y"));}else{nstulib.push(new Array(nd[2], nd[1],"N"));}}});
$.when($.ajax({data: {"action": "saveLibrary","ndata": ndata,"nstulib":nstulib},type:"POST",dataType:"json",url: "php/ardoraLibraryXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});$("#buttonCFG").show();panel.close();show_da();}});
setFunToTable();
$("#but_upload").on("touchstart click", function(e) {jsPanel.modal.create({theme:"light",closeOnEscape:true,position: "center-top 0 100",panelSize: {width: 350,height: 300},animateIn: "jsPanelFadeIn",headerTitle: "Upload",
content: "<div id='fthumb'><p>Seleccione un archivo</p><br><div id='div_file'><label for='file'>Archivo</label><input type='file' id='fileup' name='fileup' required /></div><div id='labelprogr'>Subiendo archivos...</div><progress class='progress' value='0' max='100'>Subiendo archivos...</progress></div>",
footerToolbar: '<button id="b_closeup" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_okup" type="button"><b>✓</b>  Aceptar</button>',onwindowresize: false,callback: function(panel) {
jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closeup").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_okup").addEventListener(evt, function() {e.preventDefault();if ($("#fileup").get(0).files.length === 0){$("#fthumb").append('<br><div class="alert">❌  Debes seleccionar un archivo.</div>'); };var filename = $("#fileup").val();var extension = filename.replace(/^.*\./, '').toLowerCase();
if (extension != "jpg" && extension != "jpeg" && extension != "png" && extension != "pdf" && extension != "webm" && extension != "mp4" && extension != "mp3" && extension != "ogg" && extension != "ogv" && extension != "odt" && extension != "zip" && extension != "ods" && extension != "odp") {
$("#fthumb").append('<br><div class="alert">❌ Tipo de archivo no permitido</div>');} else {var formData = new FormData();var files = $("#fileup")[0].files[0];
formData.append("fileup", files);$.when($.ajax({
xhr: function() {var progress = $(".progress"),xhr = $.ajaxSettings.xhr();$("#b_okup").css("visibility","hidden");$("#b_closeup").css("visibility","hidden");$("#div_file").css("visibility","hidden");$("#fthumb p").css("visibility","hidden");$("#labelprogr").css("visibility","visible");progress.css("visibility","visible");
xhr.upload.onprogress = function(ev) {if (ev.lengthComputable) {var percentComplete = parseInt((ev.loaded / ev.total) * 100);progress.val(percentComplete);
if (percentComplete === 100) {$("#labelprogr").css("visibility","hidden");progress.hide().val(0);$("#labelprogr").remove();progress.remove();$("#div_file").remove();$("#fthumb p").remove();$("#fthumb br").remove();
$("#fthumb").append("<div class='loader'></div><div>Configurando...</div>");}}};return xhr;},
url: "php/ardoraLibraryXML.php?action=savefile",type: "POST",data: formData,dataType: "json",contentType:false,processData:false,success: function(data) {n_id=data["id"];n_folder=data["folder"];n_text="";n_coment="";n_url=data["n_url_to"];n_thumb="";n_active="N";n_width=data["width"];n_height=data["height"];n_da="N";
var ntr= "<tr id='tr_" +n_id+ "'><td id='nfo_" + n_id+ "'>" + n_folder+ "</td><td class='cedit' contenteditable='true' id='nte_"+n_id+ "'>"+n_text+
"</td><td class='cedit' contenteditable='true' id='nco_"+n_id+"'>"+n_coment+ "</td><td class='cedit' contenteditable='true' id='nur_"+n_id+ "'>" +
n_url+ "</td><td contenteditable='true' id='nth_"+n_id+"' class='nthumb'>"+n_thumb+"</td><td><input type='checkbox' id='nac_" + n_id+ "'>" +
"</td><td class='cedit onlynumber' contenteditable='true' id='nwi_" + n_id+ "'>" + n_width+ "</td><td class='cedit onlynumber' contenteditable='true' id='nhe_"+n_id+ "'>" +
n_height+"</td><td><input type='checkbox' id='dac_" + n_id + "'></td>"+
"<td class='cedit' contenteditable='true' id='nme_"+n_id+"'></td>"+
"<td class='delLibrary' id='delLibrary_"+n_id+"'><p class='basic_but butLe b_cancel ardoraArr'>b</p></td></tr>";$("#t_library tr:last").after(ntr);
$("#t_studentlibrary").find("tr").each(function(i,row){var n= $("#t_studentlibrary tr:last td").length;var primer_td= $(row).find("td,th")[n-1];if(primer_td.tagName=="TH"){
var nt="<th class='td_center td_"+n_id+"' align='center' valign='center'>"+n_folder+"<p class='ardoraArr b_allchk' id='ball_"+n_id+"'>D</p>"+"</th>";
$(nt).insertAfter(primer_td);}else{var nt="<td class='td_center td_"+n_id+"'><input type='checkbox' id='chk_" + n_id+"_"+$(this).attr("id").substr(5,500)+ "'></td>";$(nt).insertAfter(primer_td);}});
$("#ball_"+n_id).on("touchstart click", function(e) {var chkid=$(this).attr("id").substring(5,500);$("input:checkbox").each(function() {if($(this).attr("id").substring(0,5+chkid.length)=="chk_"+chkid+"_"){if( $(this).prop("checked") ) {$(this).prop("checked",false);}else{$(this).prop("checked",true);}}});});
setFunToTable();
}})).done(function() {panel.close();});}});});}});});});}});}
function loadInitialNotes() {var f=new Date();currentDay=f.getDate();currentMonth=f.getMonth()+1;currentYear=f.getFullYear();activeDay=currentDay;activeMonth=currentMonth;activeYear=currentYear;
$.ajax({data: {"action": "listNote","actdate": activeDay + "/" + activeMonth + "/" + activeYear},type: "POST",dataType: "json",url: "php/ardoraNotesXML.php",
success: function(data, textStatus, jqXHR) {n_id=data["id"];n_text=data["text"];n_coment=data["coment"];n_color=data["color"];n_start=data["start"];n_end=data["end"];n_type=data["type"];showInitialNotes(n_id,n_text,n_coment,n_color,n_start,n_end,n_type);}});}
function showInitialNotes(n_id,n_text,n_coment,n_color,n_start,n_end,n_type){if (n_id.length>0){var nhtml="";for (i=0; i<n_id.length; i++) {
var ndate=n_start[i];var da = n_end[i].split("/");if (Date.parse(da[2]+"-"+da[1]+"-"+da[0])) {ndate=ndate+' - '+n_end[i]};
nhtml=nhtml+'<div class="initialNote" style="border-left-color:'+n_color[i]+';"><div class="initialStartNote">'+ndate+'</div>';
nhtml=nhtml+"<div>" + n_text[i] + "<br></div>";if (n_coment[i].length<300){nhtml=nhtml+'<div class="initialTitleNote">' + n_coment[i] + '<br></div>';}else{n_coment[i]=n_coment[i].replace(/<div>/g,"<br>");n_coment[i]=n_coment[i].replace(/<\/div>/g,"");
nhtml=nhtml+'<div class="initialTitleNote">';nhtml=nhtml+'<p id="pnote300'+i.toString()+'" class="pnote_300">'+n_coment[i].substring(0,300)+'...<span id="spnFull'+i.toString()+'" class="spnFull">🠋</span></p>';
nhtml=nhtml+'<p id="pnoteFull'+i.toString()+'" class="pnote_full">'+n_coment[i]+'<span id="spn300'+i.toString()+'" class="spn300">🠉</span></p>';
nhtml=nhtml+"</div>";};nhtml = nhtml + "</div>";}
jsPanel.create({id: "panelInitialNote",theme: "mdb-elegant",closeOnEscape: true,position: "right-top 0 80",headerControls: "closeonly xs",animateIn: "jsPanelFadeIn",headerTitle: "",
content: nhtml,contentSize: {width: function() {return window.innerWidth / 7;},height: "auto"},footerToolbar:'<button id="b_recharge" class="basic_but butLe b_cancel" type="button">🗘</button>',onwindowresize: false,callback: function(panel) {$(".pnote_full").hide();
$(".spnFull").on("touchstart click", function() {var num=$(this).attr("id").substring(7,40);$("#pnote300"+num).hide();$("#pnoteFull"+num).show();});
$(".spn300").on("touchstart click", function() {var num=$(this).attr("id").substring(6,40);$("#pnoteFull"+num).hide();$("#pnote300"+num).show();});$(this).css("height", "auto");$("#panelInitialNote").css("maxHeight", "calc(100% - 150px)");
jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_recharge").addEventListener(evt, function() {panel.close();loadInitialNotes();});});}});}}
function goadminusers(){var nhtml="<div id='d_own'>";nhtml=nhtml+'<div class="formtitle">'+userName+'<span class="ardoraArr"> U</span></div>';
nhtml=nhtml+'<div class="formfield"><label for="fname">Nombre completo<span></span></label><div class="inputs"><input class="aweform" type="text" id="fname" name="fname" value="'+userName+'" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fpass">Contraseña<span></span></label><div class="inputs"><input class="aweform" type="password" id="fpass" name="fpass" value="" placeholder="It must have a value"/><p class="seepwd">Q</p></div></div>';
nhtml=nhtml+"</div>";
if (userType=="admin"){nhtml=nhtml+"<div id='d_stu'>";nhtml=nhtml+create_tableusu();nhtml=nhtml+"</div>";nhtml=nhtml+"<div id='d_new'>";
nhtml=nhtml+'<div class="formtitle">Añadir<span class="ardoraArr"> o</span></div>';nhtml=nhtml+'<div class="formfield"><label for="fusu3">Usuario<span></span></label><div class="inputs"><input class="aweform" type="text" id="fusu3" name="fusu3" value="" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fname3">Nombre usuario/a<span></span></label><div class="inputs"><input class="aweform" type="text" id="fname3" name="fname3" value="" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fpass3">Contraseña<span></span></label><div class="inputs"><input class="aweform" type="password" id="fpass3" name="fpass3" value="" placeholder="It must have a value" required/><p class="seepwd">Q</p></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fcur3">Curso<span></span></label><div class="inputs"><input class="aweform" type="text" id="fcur3" name="fcur3" value="" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fgru3">Grupo<span></span></label><div class="inputs"><input class="aweform" type="text" id="fgru3" name="fgru3" value="" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+"</div>";}
var c_own=nhtml;if (userType=="admin"){var htool='<p id="set_user" class="hTool active" title="Mis datos">U</p><p id="set_gru" class="hTool" title="Alumnos y alumnas:">q</p><p id="set_new" class="hTool" title="Añadir">o</p>';
} else {var htool='<p id="set_user" class="hTool active" title="Mis datos">U</p>';}
jsPanel.create({theme: "info",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 550, height:500},animateIn: "jsPanelFadeIn",headerTitle: "Información personal",headerToolbar: htool,content: c_own,
footerToolbar:'<button id="b_close1" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Cancelar</button><button class="basic_but butRi b_ok" id="b_ok1" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,callback: function (panel) {$("#d_own").show();$("#d_stu").hide();$("#d_new").hide();jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function (evt) {
panel.header.querySelector("#set_user").addEventListener(evt, function () {$("#set_user").addClass("active");$("#set_gru").removeClass("active");$("#set_new").removeClass("active");$("#d_own").show();$("#d_stu").hide();$("#d_new").hide();});
if (userType=="admin"){panel.header.querySelector("#set_gru").addEventListener(evt, function () {$("#set_user").removeClass("active");$("#set_gru").addClass("active");$("#set_new").removeClass("active");$("#d_own").hide();$("#d_stu").show();$("#d_new").hide();});
panel.header.querySelector("#set_new").addEventListener(evt, function () {$("#set_user").removeClass("active");$("#set_gru").removeClass("active");$("#set_new").addClass("active");$("#d_own").hide();$("#d_stu").hide();$("#d_new").show();});}
panel.footer.querySelector("#b_close1").addEventListener(evt, function () {panel.close();});panel.footer.querySelector("#b_ok1").addEventListener(evt, function () {if ($("#set_user").hasClass("active")){var goClose=true;
if ($("#fname").val()!=userName){if($("#fname").val()!=""){savefield(actualuser,"uName",$("#fname").val(),userType,0);}else{goClose=false;showalert("It must have a value");$("#fname").focus();}}
if($("#fpass").val()){ if ( $("#length").hasClass("valid") && $("#letter").hasClass("valid") && $("#capital").hasClass("valid") && $("#number").hasClass("valid")  ) { savefield(actualuser,"uPass",$("#fpass").val(),userType,0);} else{goClose=false;showalert("La contraseña debe tener:");$("#fpass").focus();}};if (goClose){panel.close();}}
if ($("#set_gru").hasClass("active")){}
if ($("#set_new").hasClass("active")){var goClose=true;if($("#fusu3").val()=="" || $("#fname3").val()=="" || $("#fpass3").val()=="" || $("#fcur3").val()=="" || $("#fgru3").val()==""){goClose=false;showalert("Ya existe un usuario con ese nombre, por favor, introduzca otro.");if($("#fusu3").val()==""){$("#fusu3").focus()};if($("#fname3").val()==""){$("#fname3").focus()};if($("#fpass3").val()==""){$("#fpass3").focus()};if($("#fcur3").val()==""){$("#fcur3").focus()};if($("#fgru3").val()==""){$("#fgru3").focus()};}
else{if (users.indexOf($("#fusu3").val())!=-1){goClose=false;showalert("Debes llenar todos los datos.");}else{savenewuser(userName,$("#fusu3").val(),$("#fname3").val(),$("#fpass3").val(),$("#fcur3").val(),$("#fgru3").val());$("#fusu3").val("");$("#fname3").val("");$("#fpass3").val("");$("#fcur3").val("");$("#fgru3").val("");}
}}});});
$(".seepwd").on("touchstart click", function() {if ($("#set_user").hasClass("active")){var x = document.getElementById("fpass");};if ($("#set_new").hasClass("active")){var x = document.getElementById("fpass3");}if (x.type === "password") {x.type = "text";} else {x.type = "password";}});set_panel_pwd();set_tr_function();}});}
function savenewuser(teacher,n_user,n_nameuser,n_pwd,n_cur,n_gru){$.when($.ajax({data: {"action": "savenewuser","teacher":teacher,"n_user":n_user,"n_nameuser":n_nameuser,"n_pwd":n_pwd,"n_cur":n_cur,"n_gru":n_gru},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});
showok("<b>"+n_user+"</b> fue agregado al sistema.");users.push(n_user);names.push(n_nameuser);curs.push(n_cur);grus.push(n_gru);$("#d_stu").html(create_tableusu());set_tr_function();}
function set_panel_pwd(){$("input[type=password]").keyup(function() {$("#fpass_info").offset({top:$(this).offset().top+40,left:$(this).offset().left-100});var fpass = $(this).val();if ( fpass.length <4) {$("#length").removeClass("valid").addClass("invalid");} else {$("#length").removeClass("invalid").addClass("valid");}
if ( fpass.match(/[A-z]/) ) {$("#letter").removeClass("invalid").addClass("valid");} else {$("#letter").removeClass("valid").addClass("invalid");}; if ( fpass.match(/[A-Z]/) ) {$("#capital").removeClass("invalid").addClass("valid");} else {$("#capital").removeClass("valid").addClass("invalid");}
if ( fpass.match(/\d/) ) {$("#number").removeClass("invalid").addClass("valid");} else {$("#number").removeClass("valid").addClass("invalid");}; $("#fpass_info").show();}).blur(function() {$("#fpass_info").offset({top:-1000,left:0});$("#fpass_info").hide();});}
function edituser(i){var nhtml="<div>";nhtml=nhtml+'<div class="formtitle">'+users[i]+' - '+names[i]+'<span class="ardoraArr"> U</span></div>';
nhtml=nhtml+'<div class="formfield"><label for="fname2">Nombre completo<span></span></label><div class="inputs"><input class="aweform" type="text" id="fname2" name="fname2" value="'+names[i]+'" placeholder="It must have a value" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fpass2">Contraseña<span></span></label><div class="inputs"><input class="aweform" type="password" id="fpass2" name="fpass2" value="" placeholder="It must have a value"/><p class="seepwd">Q</p></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fcur2">Curso<span></span></label><div class="inputs"><input class="aweform" type="text" id="fcur2" name="fcur2" value="'+curs[i]+'" placeholder="Este campo debe de ter un valor" required/></div></div>';
nhtml=nhtml+'<div class="formfield"><label for="fgru2">Grupo<span></span></label><div class="inputs"><input class="aweform" type="text" id="fgru2" name="fgru2" value="'+grus[i]+'" placeholder="Este campo debe de ter un valor" required/></div></div>';
nhtml=nhtml+"</div>";var panelUser=jsPanel.modal.create({theme: "info",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 550, height:500},animateIn: "jsPanelFadeIn",
headerTitle: "Alumnos y alumnas:",contentSize: "500 275",
footerToolbar:'<button id="b_del" class="basic_but butLe b_cancel" type="button"><span class="ardoraArr">b</span> Borrar</button><button id="b_close2" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Cancelar</button><button class="basic_but butRi b_ok" id="b_ok2" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,content: nhtml,callback: function (panel) {jsPanel.pointerup.forEach(function (evt) {set_panel_pwd();$(".seepwd").on("touchstart click", function() {var x=document.getElementById("fpass2");if (x.type === "password") {x.type = "text";} else {x.type = "password";}});
panel.footer.querySelector("#b_close2").addEventListener(evt, function () { panel.close();});panel.footer.querySelector("#b_ok2").addEventListener(evt, function () {var goClose=true;if ($("#fname2").val()!=names[i]){if($("#fname2").val()!=""){savefield(users[i],"uName",$("#fname2").val(),userType,1);names[i]=$("#fname2").val();} else
{goClose=false;showalert("It must have a value");$("#fname2").focus();}};if($("#fpass2").val()){if ( $("#length").hasClass("valid") && $("#letter").hasClass("valid") && $("#capital").hasClass("valid") && $("#number").hasClass("valid")  ) { savefield(users[i],"uPass",$("#fpass2").val(),userType,1);}
else{goClose=false;showalert("It must have a value");$("#fpass2").focus();}}
if($("#fcur2").val()!=curs[i]){if($("#fcur2").val()!=""){savefield(users[i],"uCur",$("#fcur2").val(),userType,1);curs[i]=$("#fcur2").val();} else {goClose=false;showalert("El estudiante debe pertenecer a un curso.");$("#fcur2").focus();}}
if($("#fgru2").val()!=grus[i]){if($("#fgru2").val()!=""){savefield(users[i],"uGru",$("#fgru2").val(),userType,1);grus[i]=$("#fgru2").val();} else{goClose=false;showalert("El estudiante debe pertenecer a un grupo");$("#fgru2").focus();}}
if (goClose){$("#d_stu").html(create_tableusu());set_tr_function();panel.close();}});panel.footer.querySelector("#b_del").addEventListener(evt, function () {
jsPanel.modal.create({theme: "danger",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 350, height:200},animateIn: "jsPanelFadeIn",headerTitle: "Borrar",content: "<p class='p_panel'>¿ Realmente desea borrar <b>"+names[i]+"</b>?</p><br>",
footerToolbar:'<button id="b_close" class="basic_but butLe b_cancel" type="button"><b>✖</b> Cancelar</button><button class="basic_but butRi b_ok" id="b_ok" type="button"><b>✓</b> Aceptar</button>',
onwindowresize: false,callback: function (panel) {jsPanel.setStyles(panel.content, {fontSize:"1rem"});jsPanel.pointerup.forEach(function (evt) {
panel.footer.querySelector("#b_close").addEventListener(evt, function () {panel.close();});panel.footer.querySelector("#b_ok").addEventListener(evt, function () {panel.close();panelUser.close();deleteuser(i);});
});}});});});}});}
function deleteuser(i){$.when($.ajax({data: {"action": "deleteuser","user":users[i]},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});
showok("<b>"+users[i]+"</b> El estudiante fue eliminado del sistema.");users[i]="";names[i]="";curs[i]="";grus[i]="";users=users.filter(Boolean);names=names.filter(Boolean);curs=curs.filter(Boolean);grus=grus.filter(Boolean);$("#d_stu").html(create_tableusu());set_tr_function();}
function create_tableusu() {var nhtml="<table class='table_users'>";
nhtml=nhtml+"<thead><tr><th>Usuario</th><th>Nombre usuario/a</th><th>Curso</th><th>Grupo</th></tr></thead>";
for (var i=0; i<users.length; i++) {nhtml=nhtml+"<tr><td>"+users[i]+"</td><td>"+names[i]+"</td><td>"+curs[i]+"</td><td>"+grus[i] + "</td></tr>";};nhtml=nhtml+"</table>";return nhtml;}
function set_tr_function(){$(".table_users tr").on("touchstart click", function() {var ni=$(this).html().substring(4,100);ni=ni.substring(0,ni.indexOf("</td>"));var index=-1;for (i=0;i<users.length;i++){if (users[i]==ni){index=i;}};edituser(index);});}
function savefield(user,field,val,utype,typeUser){$.when($.ajax({data: {"action": "editField","user":user,"field":field,"val":val,"utype":utype,"typeUs":typeUser},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {}})).done(function() {});
if (field=="uName"){userName=val;showok("<b>"+val+"</b> Datos guardados.");};if (field=="uPass"){showok("Datos guardados.");}}
function showalert(cont){jsPanel.hint.create({position:"center-top 0 15 down",contentSize: "330 auto",content:"<br>&nbsp;  "+cont+"<br><br>",theme:"danger filledlight",headerTitle: "Error"});}
function showok(cont){jsPanel.hint.create({position:"center-top 0 15 down",contentSize:"330 auto",content:"<br>&nbsp;  "+cont+"<br><br>",theme:"success filled",headerTitle:"Datos guardados."});}
function makeform(users){}
function getuserlist(teacher){$.when($.ajax({data: {"action":"getStudents","teacher":teacher},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {nusers=data["user"];nnames=data["userName"];ncurs=data["userCur"];ngrus=data["userGru"];ajaxsetlist(nusers,nnames,ncurs,ngrus);}})).done(function() {});}
function ajaxsetlist(nusers,nnames,ncurs,ngrus){users=nusers;names=nnames;curs=ncurs;grus=ngrus;}
function logout(){$.ajax({data: {"action": "logout"},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {if (data["status"] == "logout") {window.open("index.php", "_self");};}});}
function getIdUser() {$.when($.ajax({data: {"action": "getIdUser"},type: "POST",dataType: "json",url: "php/ardoraXML.php",success: function(data, textStatus, jqXHR) {idNum=parseInt(data["id"])+1;userName = data["userName"];userGru = data["userGru"];userCur = data["userCur"];actualuser=data["user"];userType = "alu";
if ( data["userType"]=="admin"){$("#buttonCFG").remove();$("#buttonLnk").remove();$("#meseBut").remove();$("#noteBut").remove();$("#toolsBut").remove();$("#linkBut").remove();$("#libBut").remove();$("#fodBut").remove();}else{$("#buttonAdmin").remove();}
if (data["userType"]=="profe" || data["userType"]== "admin") {if (data["userType"]=="profe"){userType="admin";}else{userType="coor";};$("#usuIdName").text(data["userName"]);} else {$("#buttonCFG").remove();$("#adminBut").remove();$("#buttonLnk").remove();$("#usuIdName").text(data["userName"] + " " + data["userCur"] + data["userGru"]);}}})).done(function() { getuserlist(userName);});
var cssLeftMenu = $("#toolsBut").position().left.toString() + "px";$("#nav li ul").css("left", cssLeftMenu);
cssLeftMenu=$("#libBut").position().left.toString() + "px";$("#libnav li ul").css("left", cssLeftMenu);
}
function addNotes(){if ($("#notesPanel").length){}else{var diary=jsPanel.create({id:"notesPanel",theme: "mdb-elegant",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 800,height: 600},
animateIn: "jsPanelFadeIn",headerTitle: "",contentOverflow: "hidden",content:'<iframe id="if_notes" src="php/ardoraNotes.php" style="width: 100%; height: 100%;"></iframe>',onwindowresize: false,callback: function(panel) {setTimeout(function () {$("#if_notes").contents().find("body").css("backgroundImage","none");}, 1000);}});}}
function addFold() {if ($("#folderPanel").length){}else{var folder=jsPanel.create({id: "folderPanel",theme:"mdb-elegant",closeOnEscape: true,position: "center-top 0 10",panelSize: {width: 1005,height: 500},animateIn: "jsPanelFadeIn",headerTitle: "",contentOverflow: "hidden",content: '<iframe id="x_a" src="gestorarchi/index.php" style="width: 100%; height: 100%;"></iframe>',onwindowresize: false,callback: function(panel) {}});}}
function update_time(){var currentdate = new Date();var v_h=currentdate.getHours().toString();if (v_h.length==1) {v_h="0"+v_h};var v_m=currentdate.getMinutes().toString();if (v_m.length==1) {v_m="0"+v_m};var v_s=currentdate.getSeconds().toString();if (v_s.length==1) {v_s="0"+v_s};
digits.h1.attr("class", digit_to_name[v_h.substring(0,1)]);digits.h2.attr("class", digit_to_name[v_h.substring(1,2)]);digits.m1.attr("class", digit_to_name[v_m.substring(0,1)]);
digits.m2.attr("class", digit_to_name[v_m.substring(1,2)]);digits.s1.attr("class", digit_to_name[v_s.substring(0,1)]);digits.s2.attr("class", digit_to_name[v_s.substring(1,2)]);st=setTimeout(update_time,1000);}
function touchHandler(event) {var touch = event.changedTouches[0];var simulatedEvent = document.createEvent("MouseEvent");simulatedEvent.initMouseEvent({touchstart: "mousedown",touchmove: "mousemove",touchend: "mouseup"}[event.type], true, true, window, 1,
touch.screenX, touch.screenY,touch.clientX, touch.clientY, false,false, false, false, 0, null);touch.target.dispatchEvent(simulatedEvent);event.preventDefault();};
function toggleFullScreen() {if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {if (document.documentElement.requestFullscreen) {document.documentElement.requestFullscreen();} else if (document.documentElement.msRequestFullscreen) {document.documentElement.msRequestFullscreen();} else if (document.documentElement.mozRequestFullScreen) {document.documentElement.mozRequestFullScreen();} else if (document.documentElement.webkitRequestFullscreen) {document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);}
} else {if (document.exitFullscreen) {document.exitFullscreen();} else if (document.msExitFullscreen) {document.msExitFullscreen();} else if (document.mozCancelFullScreen) {document.mozCancelFullScreen();} else if (document.webkitExitFullscreen) {document.webkitExitFullscreen();}}}
var normalize = (function() {var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",mapping = {};for (var i = 0, j = from.length; i < j; i++) mapping[from.charAt(i)] = to.charAt(i);
return function(str) {var ret=[];for (var i=0, j=str.length; i < j; i++) {var c = str.charAt(i);if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);else ret.push(c);};return ret.join("").replace(/[^-A-Za-z0-9]+/g, "_");}})();
