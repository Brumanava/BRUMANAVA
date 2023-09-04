// jQuery File Tree Plugin
// Version 1.01 - Modificated by ARDORA http://www.webardora.net
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// 24 March 2008
// Visit http://abeautifulsite.net/notebook.php?article=58 for more information
// TERMS OF USE
// This plugin is dual-licensed under the GNU General Public License and the MIT License and
// is copyright 2008 A Beautiful Site, LLC.
if (jQuery)(function($) {$.extend($.fn, {fileTree: function(o, h, dire) {if (!o) var o = {};if (o.root == undefined) o.root = "/";if (o.script == undefined) o.script = "jqueryFileTree.php";if (o.folderEvent == undefined) o.folderEvent = "click";
if (o.expandSpeed == undefined) o.expandSpeed = 500;if (o.collapseSpeed==undefined) o.collapseSpeed=500;if (o.expandEasing==undefined) o.expandEasing=null;if (o.collapseEasing==undefined) o.collapseEasing=null;if (o.multiFolder == undefined) o.multiFolder = true;if (o.loadMessage == undefined) o.loadMessage = "Loading...";
$(this).each(function() {function showTree(c, t) {$(c).addClass("wait");$(".jqueryFileTree.start").remove();$.post(o.script, {dir: t}, function(data) {$(c).find(".start").html("");$(c).removeClass("wait").append(data);if (o.root == t) $(c).find("UL:hidden").show();
else $(c).find("UL:hidden").slideDown({duration: o.expandSpeed,easing: o.expandEasing});bindTree(c);});}
function bindTree(t) {$(".context-menu").hide();var ruta;$(t).find("LI A").bind(o.folderEvent, function() {if ($(this).parent().hasClass("directory")) {if ($(this).parent().hasClass("collapsed")) {
ruta = $(this).attr("rel");ruta=ruta.replace(o.root, "/");dire(ruta);if (!o.multiFolder) {$(this).parent().parent().find("UL").slideUp({duration: o.collapseSpeed,easing: o.collapseEasing});$(this).parent().parent().find("LI.directory").removeClass("expanded").addClass("collapsed");}
$(this).parent().find("UL").remove();showTree($(this).parent(), escape($(this).attr("rel").match(/.*\//)));$(this).parent().removeClass("collapsed").addClass("expanded");} else {$(this).parent().find("UL").slideUp({duration:o.collapseSpeed,easing:o.collapseEasing});
$(this).parent().removeClass("expanded").addClass("collapsed");ruta=$(this).attr("rel").substring(0, $(this).attr("rel").length - 1);ruta=ruta.substring(0, ruta.lastIndexOf("/") + 1);ruta=ruta.replace(o.root, "/");dire(ruta);}} else {h($(this).attr("rel"));};return false;});
if (o.folderEvent.toLowerCase != "click") $(t).find("LI A").bind("click", function() {return false;});$(".file").draggable({revert:true});
$(".directory").droppable({drop: function( event, ui ) {var m_file=$(ui.draggable).find("a").attr("rel");var tm_file=m_file.substring(m_file.lastIndexOf("/") + 1, 800);var m_dir=$(this).find("a").attr("rel");var tm_dir=m_dir.substring(0,m_dir.length - 1).substring(m_dir.substring(0,m_dir.length - 1).lastIndexOf("/") + 1, 800);moveFile(m_file,tm_file,m_dir,tm_dir);}});
$(".directory").on("contextmenu", function(e) {$("#m_paste").unbind("click");var nfile=$("#sel").text();if (nfile){$("#m_copy").hide();$("#m_cut").hide();$("#m_paste").show();$(".separator").hide();$("#m_del").hide();$(".context-menu").css({top: e.pageY-15,left: e.pageX,display: "block"});
var f=$(this).find("a").attr("rel").replace("../","");$("#m_paste").click(function() {m_file="../"+$("#sel").text();tm_file=m_file.substring(m_file.lastIndexOf("/") + 1, 800);m_dir="../"+f;tm_dir=m_dir.substring(0,m_dir.length - 1).substring(m_dir.substring(0,m_dir.length - 1).lastIndexOf("/") + 1, 800);
if ($("#tab1").css("display") != "none") {fType="0";}if ($("#tab2").css("display") != "none") {fType="1";}if ($("#tab3").css("display") != "none") {fType="2";}if ($("#ty").text()=="cut"){moveFile(m_file,tm_file,m_dir,tm_dir);$("#ty").text("");$("#sel").text("");};if ($("#ty").text()=="copy"){copyFile(m_file,tm_file,m_dir,tm_dir,fType);}});};return false;});
$(".file").on("contextmenu", function(e) {$("#m_del").unbind("click");$("#m_copy").unbind("click");$("#m_cut").unbind("click");$("#m_copy").show();$("#m_cut").show();$("#m_paste").hide();$(".separator").show();$("#m_del").show();$(".context-menu").css({top: e.pageY-15,left: e.pageX,display:"block"});var f=$(this).find("a").attr("rel").replace("../","");
$("#m_copy").click(function() {$("#sel").text(f);$("#ty").text("copy");});$("#m_cut").click(function() {$("#sel").text(f);$("#ty").text("cut");});$("#m_del").click(function(e) {deleteFile(f);$("#sel").text("");$("#ty").text("none");$(".context-menu").hide();});return false;});
$(document).click(function(e) {if (e.which == 1) {$(".context-menu").hide();}});$(document).keydown(function(e) {if (e.which == 27) {$(".context-menu").hide();}});
};$(this).html('<ul class="jqueryFileTree start"><li class="wait">' + o.loadMessage + "<li></ul>");showTree($(this), escape(o.root));});}});})(jQuery);
