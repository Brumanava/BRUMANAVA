//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
var currentDay;var currentMonth;var currentYear;var activeDay;var activeMonth;var activeYear;
var nameMonths=["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];var nameDays=["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
$(document).ready(function() {userType=window.parent.userType;
$("#ardoraMain").append('<div id="calendarMain"></div>');$("#calendarMain").append('<div id="calendarClick"></div>');
newHtml='<table id="tableN"><tr><td id="bdownMonth" class="butArrow"><p class="butfontN">A</p></td><td id="monthName" colspan="5">&nbsp;</td><td id="bupMonth" class="butArrow"><p class="butfontN">C</p></td></tr>';
newHtml=newHtml+'<tr id="lineDays"><td>&nbsp;L</td><td>&nbsp;Ma</td><td>&nbsp;Mi</td><td>&nbsp;J</td><td>&nbsp;V</td> <td>&nbsp;S</td><td class="sunDay">&nbsp;D</td></tr>';
newHtml=newHtml+'<tr><td id="d1_1">&nbsp;</td><td id="d2_1">&nbsp;</td><td id="d3_1">&nbsp;</td><td id="d4_1">&nbsp;</td><td id="d5_1">&nbsp;</td><td id="d6_1">&nbsp;</td><td id="d7_1">&nbsp;</td></tr>';
newHtml=newHtml+'<tr><td id="d1_2">&nbsp;</td><td id="d2_2">&nbsp;</td><td id="d3_2">&nbsp;</td><td id="d4_2">&nbsp;</td><td id="d5_2">&nbsp;</td><td id="d6_2">&nbsp;</td><td id="d7_2">&nbsp;</td></tr>';
newHtml=newHtml+'<tr><td id="d1_3">&nbsp;</td><td id="d2_3">&nbsp;</td><td id="d3_3">&nbsp;</td><td id="d4_3">&nbsp;</td><td id="d5_3">&nbsp;</td><td id="d6_3">&nbsp;</td><td id="d7_3">&nbsp;</td></tr>';
newHtml=newHtml+'<tr><td id="d1_4">&nbsp;</td><td id="d2_4">&nbsp;</td><td id="d3_4">&nbsp;</td><td id="d4_4">&nbsp;</td><td id="d5_4">&nbsp;</td><td id="d6_4">&nbsp;</td><td id="d7_4">&nbsp;</td></tr>';
newHtml=newHtml+'<tr><td id="d1_5">&nbsp;</td><td id="d2_5">&nbsp;</td><td id="d3_5">&nbsp;</td><td id="d4_5">&nbsp;</td><td id="d5_5">&nbsp;</td><td id="d6_5">&nbsp;</td><td id="d7_5">&nbsp;</td></tr>';
newHtml=newHtml+'<tr><td id="d1_6">&nbsp;</td><td id="d2_6">&nbsp;</td><td id="d3_6">&nbsp;</td><td id="d4_6">&nbsp;</td><td id="d5_6">&nbsp;</td><td id="d6_6">&nbsp;</td><td id="d7_6">&nbsp;</td></tr>';
newHtml=newHtml+'<tr><td id="bdownYear" class="butArrow"><p class="butfontN">A</p></td><td id="yearName" colspan="5">&nbsp;ano</td><td id="bupYear" class="butArrow"><p class="butfontN">C</p></td></tr>';
newHtml=newHtml+"</table>";
$("#calendarClick").append(newHtml);
$("#ardoraMain").append('<div id="headerDay"></div>');
$("#ardoraMain").append('<div id="notesDay"></div>');
$("#ardoraMain").append('<div id="footerNotes"><p id="butPrevDay" class="butNote bLeft" title="">A</p><p id="butNextDay" class="butNote bLeft" title="">C</p><p id="addNote" class="butNote green bRight" title="">P</p></div>');
$("#butPrevDay").on("touchstart click",function(){downDay();})
$("#butNextDay").on("touchstart click",function(){upDay();})
loadNotes();
})
function loadNotes() {$("#calendarClick").hide();var f = new Date();currentDay=f.getDate();currentMonth=f.getMonth() +1;currentYear=f.getFullYear();activeDay=currentDay;activeMonth=currentMonth;activeYear=currentYear;
makeCalendar("1",currentMonth,currentYear);
$("#bdownMonth").on("touchstart click",function(){if (parseInt(currentMonth)>1){currentMonth=(parseInt(currentMonth)-1).toString();}else{currentMonth="12";currentYear=(parseInt(currentYear)-1).toString();} activeDay="0";makeCalendar("1",currentMonth,currentYear);});
$("#bupMonth").on("touchstart click",function(){if (parseInt(currentMonth)<12){currentMonth=(parseInt(currentMonth)+1).toString();} else{ currentMonth="1";currentYear=(parseInt(currentYear)+1).toString();} activeDay="0";makeCalendar("1",currentMonth,currentYear);});
$("#bdownYear").on("touchstart click",function(){currentYear=(parseInt(currentYear)-1).toString(); activeDay="0"; makeCalendar("1",currentMonth,currentYear);});
$("#bupYear").on("touchstart click",function(){currentYear=(parseInt(currentYear)+1).toString();activeDay="0";makeCalendar("1",currentMonth,currentYear);});
$("#addNote").on("touchstart click",function(){$("#addNote").hide();$("#newItem").remove();$("#notesDay").append('<div id="newItem" class="note"></div>');var minDay=activeDay;var minMonth=activeMonth;var maxYear=(parseInt(activeYear)+1).toString();
if (parseInt(minDay)<10){minDay="0"+minDay};if (parseInt(minMonth)<10){minMonth="0"+minMonth};
var newHtml = '<form><div id="f_head"><input type="color" name="colorNote" id="colorNote" class="cNote">';newHtml = newHtml + '<label for="title">➜ </label><input id="title" class="ctitle" type="text" name="title" placeholder="Título">';
newHtml=newHtml+'</div><br><textarea id="coment" class="ccoment" name="coment" rows="4" cols="50" placeholder="Comentario"></textarea>';
if (userType=="admin") {newHtml = newHtml+'<br><p id="n_users" class="butNote bLeft">q</p><p id="n_list"></p>';newHtml=newHtml+'<br><p class="ctype" id="p_type"><label for="type"> Send everyone</label><input type="checkbox" name="type" id="type"></p>'}
newHtml=newHtml+'<p id="cancelBut" class="bDeleNote butNote bLeft red">E</p><p id="okBut" class="bEditNote butNote green">g</p>';newHtml = newHtml + '<p class="noteDate bRight">Fin  <input id="dateNote" type="date" min=' + activeYear + '-' + minMonth + '-' + minDay + ' max=' + maxYear + '-' + minMonth + '-' + minDay + '></p>';
newHtml=newHtml+'<p id="delBut" class="bDeleNote butNote bLeft red">b</p><p id="editBut" class="bEditNote butNote green">P</p>';newHtml = newHtml +'</form>';
$("#newItem").append(newHtml);var actualDate = new Date();document.getElementById("dateNote").value=actualDate.toISOString().substring(0,10);
$("#n_users").on("touchstart click", function() {users=window.parent.users;names=window.parent.names;grus=window.parent.grus;curs=window.parent.curs;var cur="";var gru="";
var newHtml='<table width="100%" border="0">';for (i=0;i<users.length; i++) {if (cur!=curs[i] || gru!=grus[i]) {cur=curs[i];gru=grus[i];newHtml=newHtml+"<tr id='tr_" + curs[i] + "_" + grus[i] + "' class='tr_group'>";
newHtml=newHtml+"<td colspan='3'> <b>" + curs[i] + " " + grus[i] + "</b></td>";newHtml=newHtml+"</tr>";}
newHtml=newHtml+"<tr id='tr_" + users[i] + "' class='tr_user " + curs[i] + "_" + grus[i] + "'>";newHtml=newHtml+"<td> &#9632; <b>" + names[i] + "</b> (" + users[i] + ")" + "</td>";var ischk="";
if ($("#n_list").text().includes(" "+users[i]+",")){ischk="checked"};newHtml = newHtml + "<td id='check_" + users[i] + "'><input type='checkbox' id='chk_" + users[i] +"' "+ischk+"/></td>";};newHtml=newHtml+"</table>";
jsPanel.modal.create({theme: "mdb-elegant",closeOnEscape: true,position: "center-top 0 10",panelSize: {width:450,height:500},animateIn:"jsPanelFadeIn",headerTitle: "Send to",content: "<p class='ptit'>Choose the student</p><br>"+newHtml,
footerToolbar: '<button id="b_closen" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Close</button><button class="basic_but butRi b_ok" id="b_oknote" type="button"><b>✓</b>Save</button>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closen").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_oknote").addEventListener(evt, function() {var nl="";$("input:checkbox:checked").each(function() {if($(this).attr("id").substring(0,4)=="chk_"){nl=nl+" "+$(this).attr("id").substring(4,44)+",";}});$("#n_list").text(nl);panel.close();});});}});});
function resizeInput() {$(this).attr('size', $(this).val().length);}; $('input[type="text"]').keyup(resizeInput).each(resizeInput);
$("#delBut").hide();$("#editBut").hide();$("#colorNote").val(rgba2hex($("#newItem").css("backgroundColor")));$("#colorNote").change(function() {$("#newItem").css("backgroundColor",$(this).val());});
$("#cancelBut").on("touchstart click",function(){$("#newItem").remove();$("#addNote").show();});
 $("#okBut").on("touchstart click",function(){if ($("#dateNote").val().length==0) {$("#dateNote").val(actualDate.toISOString().substring(0,10));}
var str = $("#dateNote").val().split("/");var nstr=str[0].split("-");var vD = $("#dateNote").val();if (validDate(vD) || $("#dateNote").val().length==0 ) {
var chkType="0";if($("#type").prop("checked")) {chkType="1"} else {if (userType=="admin") {if ($("#n_list").text().trim().length>0){chkType="2";}}}
$.ajax({data: {"action": "saveNote","text":$("#title").val(),"coment":$("#coment").val(),"color":$("#colorNote").val(),"start":activeDay+"/"+activeMonth.toString()+"/"+activeYear.toString(),"end": nstr[2] + "/" + nstr[1] + "/" + nstr[0],"to":$("#n_list").text().trim(),"type":chkType},
type: "POST",dataType: "json",url: "ardoraNotesXML.php",success: function(data, textStatus, jqXHR) {
var idNum=data["id"];$("#newItem").attr("id","nI_"+idNum);$("#colorNote").attr("id","colorNote_"+idNum);$("#dateNote").addClass("noteDate");$("#dateNote").attr("id","dateNote_"+idNum);$("#title").addClass("ctitle");$("#title").attr("id","title_"+idNum);
$("#coment").addClass("ccoment");$("#coment").attr("id","coment_"+idNum);$("#type").addClass("ctype");$("#type").attr("id","type_"+idNum);$("#delBut").attr("id","delBut_"+idNum);$("#editBut").attr("id","editBut_"+idNum);$("#title_" + idNum).attr("readonly", true);$("#coment_" + idNum).attr("readonly", true);
$("#title_"+idNum).removeAttr("contenteditable").blur();$("#coment_"+idNum).removeAttr("contenteditable").blur();$("#dateNote_"+idNum).prop("readonly", true);$("#type_"+idNum).prop("disabled", true);$("#colorNote_"+idNum).hide();
$("#cancelBut").remove();$("#delBut_"+idNum).show();$("#editBut_"+idNum).show();$("#okBut").remove();
$("#delBut_" + idNum).on("touchstart click",function(){fDeleteNote($(this));});
$("#editBut_" + idNum).on("touchstart click",function(){fEditNote($(this));});loadNotes();
} }); $("#addNote").show();} else {alert("Invalid date");$("#dateNote").focus();}});
 });
$(".activeDay").on("touchstart click",function(){if ($(this).hasClass("d_"+$(this).text())){}else{if ($(this).hasClass("n_"+$(this).text())){
if (parseInt(currentMonth)<12){currentMonth=(parseInt(currentMonth)+1).toString();} else {currentMonth="1";currentYear=(parseInt(currentYear)+1).toString();}}
if ($(this).hasClass("p_"+$(this).text())){if (parseInt(currentMonth)>1){currentMonth=(parseInt(currentMonth)-1).toString();} else { currentMonth="12";currentYear=(parseInt(currentYear)-1).toString();}}}
activeDay=$(this).text();activeMonth=currentMonth;activeYear=currentYear;makeCalendar("1",currentMonth,currentYear);
$("#calendarClick").slideToggle("fast");$("#butShowCalendar").text("J");
});};
function makeCalendar(d,m,y){var num=weekDay(d+"/"+m+"/"+y);if (num==0){num=7}var numDay=1;var col=num;var row=1;
while (numDay<daysInMonth(m,y)+1){$("#d"+col.toString()+"_"+row.toString()).html("<p>"+numDay.toString()+"</p>");$("#d"+col.toString()+"_"+row.toString()).removeClass();
if (col==7){$("#d"+col.toString()+"_"+row.toString()).addClass("d_"+numDay.toString()+" sunDay activeDay");}else{$("#d"+col.toString()+"_"+row.toString()).addClass("d_"+numDay.toString()+" monthDay activeDay");}
if (numDay.toString()==activeDay){$("#d"+col.toString()+"_"+row.toString()).addClass("selectDay");}numDay++;col++;if (col==8){col=1;row++;}}
numDay=1;while (row<7){$("#d"+col.toString()+"_"+row.toString()).html("<p>"+numDay.toString()+"</p>");$("#d"+col.toString()+"_"+row.toString()).removeClass();$("#d"+col.toString()+"_"+row.toString()).addClass("n_"+numDay.toString()+" otherMonth activeDay");numDay++;col++;if (col==8){col=1;row++;}}
if (parseInt(m)>1) {numDay=daysInMonth((parseInt(m)-1).toString(),y);} else{ numDay=daysInMonth("12",y);} var col=num-1;var row=1;
while (col>0){$("#d"+col.toString()+"_"+row.toString()).html("<p>"+numDay.toString()+"</p>");$("#d"+col.toString()+"_"+row.toString()).removeClass();$("#d"+col.toString()+"_"+row.toString()).addClass("p_"+numDay.toString()+" otherMonth activeDay");numDay--;col--;}
var f = new Date();if (currentMonth==f.getMonth() +1 && currentYear==f.getFullYear()){$(".d_"+f.getDate().toString()).addClass("currentDay");}
$("#yearName").html("<p>"+currentYear+"</p>");$("#monthName").html("<p>"+nameMonths[parseInt(currentMonth)-1]+"</p>");if (activeDay=="0"){$("#headerDay").hide();$("#footerNotes").hide();$("#notesDay").hide();}
else{var activeDate=activeDay+"/"+activeMonth+"/"+activeYear;
$("#headerDay").html("<p id='butShowCalendar' class='butNote bLeft' title=''>J</p><p id='headerDayDate'>" + nameDays[weekDay(activeDate)] + ", " + activeDay + " " + nameMonths[parseInt(activeMonth) - 1] + " " + activeYear + "</p>");
$("#butShowCalendar").on("touchstart click",function(){$("#calendarClick").slideToggle("fast");$(this).text(function(i, v){return v === 'J' ? 'I' : 'J'})})
$("#headerDay").show();$("#footerNotes").show();$("#notesDay").show();} showNotes();}
function weekDay(date){date=date.split('/');if(date.length!=3){return null;}var regular =[0,3,3,6,1,4,6,2,5,0,3,5];var bisiesto=[0,3,4,0,2,5,0,3,6,1,4,6];var dia=date[0];var mes=date[1]-1;
var anno=date[2];if((anno % 4 == 0) && !(anno % 100 == 0 && anno % 400 != 0)){mes=bisiesto[mes];} else {mes=regular[mes];}
return Math.ceil(Math.ceil(Math.ceil((anno-1)%7)+Math.ceil((Math.floor((anno-1)/4)-Math.floor((3*(Math.floor((anno-1)/100)+1))/4))%7)+mes+dia%7)%7);}
function daysInMonth(humanMonth, year) {return new Date(year || new Date().getFullYear(), humanMonth, 0).getDate();}
function rgba2hex(rgb){rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);return (rgb && rgb.length === 4) ? "#" +
("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : "";}
function validDate(dtValue){return true;}
function fDeleteNote(buId) {var bId = buId.attr("id").substring(7);var tit = $("#title_" + bId).html();if (bId.charAt(0)=="P") {bId=bId.substring(1,800).trim()};jsPanel.modal.create({theme: "danger",closeOnEscape: true,position: "center-top 0 100",panelSize: {width: 350,height: 200},
animateIn: "jsPanelFadeIn",headerTitle: "Borrar nota",content: "<p>¿ Borrar nota <b>" + tit + "</b>?</p><br>",footerToolbar: '<button id="b_closen" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Close</button><button class="basic_but butRi b_ok" id="b_okn" type="button"><b>✓</b> Delete</button>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closen").addEventListener(evt, function() {panel.close();});
panel.footer.querySelector("#b_okn").addEventListener(evt, function() {
$.ajax({data: {"action": "deleteNote","id": bId},type: "POST",dataType: "json",url: "ardoraNotesXML.php",success: function(data, textStatus, jqXHR) {$("#nI_" + bId).remove();}});panel.close();showNotes();});});}});}
function fEditNote(buId) {var bId=buId.attr("id").substring(8);var tit=$("#title_"+bId).html();$("#delBut_"+bId).hide();$("#editBut_"+bId).hide();$("#addNote").hide();
$("#nI_"+bId).append('<p id="cancelButEdit" class="bDeleNote butNote bLeft red">E</p><p id="okButEdit" class="bEditNote butNote green">g</p>');
var oldColor=$("#colorNote_" + bId).val();var oldTitle=$("#title_" + bId).html();var oldComent=$("#coment_" + bId).html();var oldEnd=$("#dateNote_" + bId).val();$("#colorNote_"+ bId).change(function() {$("#nI_"+bId).css("backgroundColor", $(this).val());});
$("#title_" + bId).attr("contenteditable","true");$("#coment_" + bId).attr("contenteditable","true");
$("#type_" + bId).prop("disabled", false);$("#cancelButEdit").on("touchstart click",function(){$("#colorNote_"+ bId).val(oldColor);$("#colorNote_"+ bId).unbind( "change" );$("#nI_"+bId).css("backgroundColor",oldColor);$("#title_" + bId).removeAttr("contenteditable").blur();$("#coment_" + bId).removeAttr("contenteditable").blur();$("#title_" + bId).html(oldTitle);$("#coment_" + bId).html(oldComent);
$("#dateNote_" + bId).val(oldEnd);$("#delBut_"+bId).show();$("#editBut_"+bId).show();$("#addNote").show();$("#cancelButEdit").remove();$("#okButEdit").remove();});
$("#okButEdit").on("touchstart click",function(){var str = $("#dateNote_" + bId).val().split("/");var nstr = str[0].split("-");var vD = $("#dateNote_" + bId).val();if (validDate(vD) || $("#dateNote_" + bId).val().length == 0) { var chkType = "0";if ($("#type_"+bId).prop("checked")) {chkType = "1"};if ($("#n_list_"+bId).text().trim().length>0){chkType = "2";};if (bId.charAt(0)=="P") {bId=bId.substring(1,800).trim()};
$.ajax({data: {"action": "editNote","id":bId,"text": $("#title_"+bId).html(),"coment": $("#coment_"+bId).html(),"color": $("#colorNote_"+bId).val(),"type": chkType,"userlist":$("#n_list_"+bId).text(),"end": nstr[2] + "/" + nstr[1] + "/" + nstr[0]},type: "POST",dataType: "json",url: "ardoraNotesXML.php",success: function(data, textStatus, jqXHR) {}});};
$("#delBut_"+bId).show();$("#editBut_"+bId).show();$("#addNote").show();$("#cancelButEdit").remove();$("#okButEdit").remove();});}
function showNotes(){$.ajax({ data: {"action": "listNote","actdate": activeDay + "/" + activeMonth + "/" + activeYear},type: "POST",dataType: "json",url: "ardoraNotesXML.php",
success: function(data, textStatus, jqXHR) {n_id=data["id"];n_text=data["text"];n_coment=data["coment"];n_color=data["color"];n_start=data["start"];n_end=data["end"];n_type=data["type"];n_sendto=data["sendTo"];$("#notesDay").empty();$("#addNote").hide();
var minDay = activeDay;var minMonth = activeMonth;var maxYear = (parseInt(activeYear) + 1).toString();if (parseInt(minDay) < 10) {minDay = "0" + minDay}; if (parseInt(minMonth) < 10) {minMonth = "0" + minMonth};
for (i=0;i<n_text.length;i++){$("#notesDay").append("<div id='nI_"+n_id[i]+"' class='note'></div>");$("#nI_"+n_id[i]).css("backgroundColor",n_color[i]);
var newHtml = "<form>";if (n_type[i]=="0" || userType == "admin"){newHtml=newHtml + '<br><p id="n_users_' + n_id[i] + '" class="forusers butNote bLeft">q</p><p id="n_list_' + n_id[i] + '"> ' + n_sendto[i] + '</p>';newHtml=newHtml+'<input type="color" name="colorNote" id="colorNote_'+n_id[i]+'" class="cNote">'};
var da = n_end[i].split("/");if (Date.parse(da[2]+"-"+da[1]+"-"+da[0])){if (n_type[i]=="0" || userType == "admin"){newHtml = newHtml + '<p class="noteDate bRight">Fin <input id="dateNote_'+n_id[i]+'" type="date" min=' + activeYear + '-' + minMonth + '-' + minDay + ' max=' + maxYear + '-' + minMonth + '-' + minDay + '></p>';}
else{newHtml = newHtml + '<p class="bRight">Fin '+n_end[i]+'</p>';}} else{
if (userType == "admin"){newHtml = newHtml + '<p class="noteDate bRight">Fin <input id="dateNote_'+n_id[i]+'" type="date" min=' + activeYear + '-' + minMonth + '-' + minDay + ' max=' + maxYear + '-' + minMonth + '-' + minDay + '></p>';}}
newHtml = newHtml + '<p id="title_'+n_id[i]+'" contentEditable="false"></p><p id="coment_'+n_id[i]+'" contentEditable="false"></p>';
if (userType=="admin") {newHtml=newHtml+'<p><input id="type_'+ n_id[i]+ '" type="checkbox" name="type_'+ n_id[i]+ '">Send everyone</p>';}
if (n_type[i]=="0" || userType == "admin"){newHtml = newHtml + '<p id="delBut_'+n_id[i]+'" class="bDeleNote butNote bLeft ref" title="Borrar palabra">b</p><p id="editBut_'+n_id[i]+'" class="bEditNote butNote green">P</p>';}
newHtml = newHtml +"</form>";$("#nI_"+n_id[i]).append(newHtml);$(".forusers").on("touchstart click", function() {var nid=$(this).attr("id").substr(8,20);users=window.parent.users;names=window.parent.names;grus=window.parent.grus;curs=window.parent.curs;var cur="";var gru="";
var newHtml='<table width="100%" border="0">';for (i=0;i<users.length; i++) {if (cur != curs[i] || gru != grus[i]) {cur=curs[i];gru=grus[i];newHtml=newHtml+"<tr id='tr_" + curs[i] + "_" + grus[i] + "' class='tr_group'>";
newHtml=newHtml+"<td colspan='3'> <b>" + curs[i] + " " + grus[i] + "</b></td>";newHtml=newHtml+"</tr>";};newHtml=newHtml+"<tr id='tr_" + users[i] + "' class='tr_user " + curs[i] + "_" + grus[i] + "'>";newHtml=newHtml+"<td> &#9632; <b>" + names[i] + "</b> (" + users[i] + ")" + "</td>";var ischk="";
if ($("#n_list_"+nid).text().includes(" "+users[i]+",")){ischk="checked"};newHtml=newHtml+"<td id='check_" + users[i] + "'><input type='checkbox' id='chk_" + users[i] +"' "+ischk+"/></td>";};newHtml=newHtml+"</table>";
jsPanel.modal.create({theme: "mdb-elegant",closeOnEscape: true,position: "center-top 0 10",panelSize: {width:450,height:500},animateIn: "jsPanelFadeIn",headerTitle: "Send to",content: "<p class='ptit'>Choose the student</p><br>"+newHtml,
footerToolbar: '<button id="b_closen" class="basic_but butLe b_cancel" type="button"><b>✖</b>  Close</button><button class="basic_but butRi b_ok" id="b_oknote" type="button"><b>✓</b> Save</button>',
onwindowresize: false,callback: function(panel) {jsPanel.setStyles(panel.content, {fontSize: "1rem"});jsPanel.pointerup.forEach(function(evt) {panel.footer.querySelector("#b_closen").addEventListener(evt, function() {panel.close();});panel.footer.querySelector("#b_oknote").addEventListener(evt, function() {
var nl="";$("input:checkbox:checked").each(function() {if($(this).attr("id").substring(0,4)=="chk_"){nl=nl+" "+$(this).attr("id").substring(4,44)+",";}});$("#n_list_"+nid).text(nl);panel.close();});});}});});
$("#coment_"+n_id[i]).append(n_coment[i]);$("#coment_"+n_id[i]).addClass("ccoment");$("#title_"+n_id[i]).append(n_text[i]);$("#title_"+n_id[i]).addClass("ctitle");if (n_type[i]=="0" || userType == "admin"){$("#colorNote_"+n_id[i]).val(n_color[i]);}
var da=n_end[i].split("/");if (Date.parse(da[2]+"-"+da[1]+"-"+da[0])){if (n_type[i]=="0" || userType == "admin"){var nda=da[2]+"-"+da[1]+"-"+da[0];$("#dateNote_" + n_id[i]).val(nda); $("#dateNote_"+n_id[i]).addClass("noteDate")}}
if (n_type[i]=="0" || userType == "admin"){$("#delBut_" + n_id[i]).on("touchstart click",function(){fDeleteNote($(this));}); $("#editBut_" + n_id[i]).on("touchstart click",function(){fEditNote($(this));});}
if (n_type[i] == "1" && userType == "admin") {$("#type_" + n_id[i]).prop("checked", true);} if (userType == "admin") {$("#type_" + n_id[i]).prop("disabled",true);}
} $("#addNote").show();}});}
function downDay(){if (parseInt(activeDay)>1){activeDay=parseInt(activeDay)-1;} else{if (parseInt(activeMonth)>1){activeMonth=parseInt(activeMonth)-1;activeDay=daysInMonth(activeMonth,activeYear);}
else{activeYear=parseInt(activeYear)-1;activeMonth=12;activeDay=31;}} makeCalendar("1", activeMonth, activeYear);}
function upDay(){if (parseInt(activeDay)<daysInMonth(activeMonth,activeYear)){activeDay=parseInt(activeDay)+1;}else{ if (parseInt(activeMonth)<12){
activeDay=1;activeMonth=parseInt(activeMonth)+1;} else{activeDay=1;activeMonth=1;activeYear=parseInt(activeYear)+1;}} makeCalendar("1", activeMonth, activeYear);}
