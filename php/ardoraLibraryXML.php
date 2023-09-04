<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();
$d_w="1000";$d_h="700";
$db=new SQLite3("../db/usuarios.db") or die("Unable to open database");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS library (id INTEGER PRIMARY KEY AUTOINCREMENT, folder STRING,txt STRING,coment STRING,url_to STRING,thumb STRING,active STRING, width STRING,height STRING, n_order INTEGER, da STRING, menu STRING)
EOD;
$db->exec($query) or die("Create db failed");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS joblibrary (iduser STRING,idlibrary STRING)
EOD;
$db->exec($query) or die("Create db failed");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS links (idlink INTEGER PRIMARY KEY AUTOINCREMENT,txt_link STRING, u_link STRING, thumb_link STRING, w_link STRING, h_link STRING, n_olink INTEGER,ac_link STRING,da_link STRING,https_link STRING,popup_link STRING, menu STRING)
EOD;
$db->exec($query) or die("Create db failed");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS joblink (iduser STRING,idlink STRING)
EOD;
$db->exec($query) or die("Create db failed");
require("paraUsu.php");
date_default_timezone_set("Europe/Madrid");
if($_POST["action"]=="getjoblibrary"){$tea=$_SESSION["Username"];
$actuser=$db->query("SELECT * FROM teachers WHERE teacher='$tea'");
$alljob=array();
$alulib=array();
while ($a_u=$actuser->fetchArray(SQLITE3_ASSOC)){
$c=$a_u["cur"];
$g=$a_u["gru"];
$users=$db->query("SELECT * FROM users WHERE cur='$c' AND gru='$g'");while($use=$users->fetchArray(SQLITE3_ASSOC)){$actualuse=$use["username"];
$student=$db->query("SELECT * FROM users WHERE username='$actualuse'");$fn_stu=$student->fetchArray(SQLITE3_ASSOC);$alulib["user"]=$actualuse;$alulib["fullname"]=decod($fn_stu["fullsusername"],keynum);$library=$db->query("SELECT * FROM library ORDER BY n_order");
while($lib=$library->fetchArray(SQLITE3_ASSOC)){$field=$lib["id"];$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM joblibrary WHERE iduser='$actualuse' AND idlibrary='$field'");
if ($count==0){$alulib[$field]="N";}else{$alulib[$field]="Y";}};array_push($alljob,$alulib);}}usort($alljob, function($a, $b) { return $a["fullname"] <=> $b["fullname"];});echo json_encode(array("alljob"=>$alljob));}
if($_POST["action"]=="getLibrary"){$norder=-1;$result=$db->query('SELECT * FROM library');while($res=$result->fetchArray(SQLITE3_ASSOC)){if ($res["n_order"]>$norder){$norder=$res["n_order"];};}
if ($handle = opendir('../library/')) {while (false !== ($entry = readdir($handle))) {if ($entry != "." && $entry != "..") {if (strrpos($entry,".")==false){$nurl=$entry."/";
if (file_exists("../library/".$entry."/js/ardoraComentarios.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraSticky.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraPolaroid.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraGravadora.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraPoster.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (is_dir("../library/".$entry."/ardoraWorkFiles"."/") && file_exists("../library/".$entry."/php/para.php")){copy("../lib/ew/para_ps.php","../library/".$entry."/php/para.php");}
if (file_exists("../library/".$entry."/index.php")){$nurl=$entry."/index.php";
if (file_exists("../library/".$entry."/avalia/informe.php") && file_exists("../library/".$entry."/avalia/informe.js") && file_exists("../library/".$entry."/avalia/informe.css")){
if ($handle2=opendir("../library/".$entry."/")) {while (false !== ($entry2 = readdir($handle2))) {if ($entry2 != "." && $entry2 != "..") {
if (strrpos($entry2,".")==false){if (file_exists("../library/".$entry."/".$entry2."/".$entry2."_lib.php") && file_exists("../library/".$entry."/".$entry2."/".$entry2."_slogin.php") ){
copy("../lib/dummy.php","../library/".$entry."/".$entry2."/".$entry2."_lib.php");copy("../lib/paq/ardoraXML.php","../library/".$entry."/php/ardoraXML.php");}}}}}}
}else{if (file_exists("../library/".$entry."/".$entry.".htm")){$nurl=$entry."/".$entry.".htm";
if (file_exists("../library/".$entry."/css/ardoraEW.css") && file_exists("../library/".$entry."/resources")){makeserverpages($entry);}
if (file_exists("../library/".$entry."/css/ardoraEW.css") && file_exists("../library/".$entry."/avalia") && file_exists("../library/".$entry."/resources")){if ($handle2 = opendir("../library/".$entry."/")) {while (false !== ($entry2 = readdir($handle2))) {
if ($entry2 != "." && $entry2 != "..") {if (strrpos($entry2,".")==false){if (file_exists("../library/".$entry."/".$entry2."/".$entry2."_lib.php") && file_exists("../library/".$entry."/".$entry2."/".$entry2."_slogin.php") ){
copy("../lib/dummy.php","../library/".$entry."/".$entry2."/".$entry2."_lib.php");}}}}}
if ($handle3 = opendir("../library/".$entry."/resources"."/")) {while (false !== ($entry3 = readdir($handle3))) {if ($entry3 != "." && $entry3 != "..") {if (strrpos($entry3,".")==false){
if (file_exists("../library/".$entry."/resources"."/".$entry3."/".$entry3.".php") && file_exists("../library/".$entry."/resources"."/".$entry3."/avalia/informe.css") ){
copy("../lib/ew/ardoraXML.php","../library/".$entry."/resources"."/".$entry3."/php/ardoraXML.php");}}}};copy("../lib/ew/informeXML.php","../library/".$entry."/resources/informe/ardoraXML.php");}}
}else{if (file_exists("../library/".$entry."/index.htm")){$nurl=$entry."/index.htm";}else{
if (file_exists("../library/".$entry."/index.html")){$nurl=$entry."/index.html";}}}}}else{$nurl=$entry;}; $count=(int)$db->querySingle("SELECT COUNT(*) as count FROM library WHERE folder='$entry'");
if ($count==0){$norder++;$db->exec("BEGIN");$db->query("INSERT INTO library (folder,url_to,active, width,height,n_order,da) VALUES ('$entry','$nurl','N','1000','700','$norder','N')");$db->exec("COMMIT");}}};closedir($handle);}
$result=$db->query('SELECT * FROM library');while($res=$result->fetchArray(SQLITE3_ASSOC)){if (!file_exists("../library/".$res["folder"])){$f=$res["folder"];$db->exec("BEGIN");$db->query("DELETE FROM library WHERE folder='$f'");$db->exec("COMMIT");}}
$result=$db->query('SELECT * FROM library ORDER BY n_order');
$i=0;$n_id=array();$n_folder=array();$n_txt=array();$n_coment=array();$n_url_to=array();$n_thumb=array();$n_active=array();$n_width=array();$n_height=array();$n_order=array();$n_da=array();$n_menu=array();
while($res=$result->fetchArray(SQLITE3_ASSOC)){$n_id[$i]=$res["id"];$n_folder[$i]=$res["folder"];$n_txt[$i]=$res["txt"];$n_coment[$i]=$res["coment"];$n_url_to[$i]=$res["url_to"];$n_thumb[$i]=$res["thumb"];$n_active[$i]=$res["active"];$n_width[$i]=$res["width"];$n_height[$i]=$res["height"];$n_order[$i]=$res["n_order"];$n_da[$i]=$res["da"];$n_menu[$i]=$res["menu"];$i++;}
echo json_encode(array("id"=>$n_id,"folder"=>$n_folder,"text"=>$n_txt,"coment"=>$n_coment,"n_url_to"=>$n_url_to,"thumb"=>$n_thumb,"active"=>$n_active,"width"=>$n_width,"height"=>$n_height,"norder"=>$n_order,"da"=>$n_da,"menu"=>$n_menu));}
if($_POST["action"]=="delLibrary"){$nid=$_POST["nid"];$result=$db->query("SELECT * FROM library WHERE id='$nid'");$res=$result->fetchArray(SQLITE3_ASSOC);if (strrpos($res["folder"],".")==false){if (strlen($res["folder"])>0){deleteDirectory("../library/".$res["folder"]);}}
else{unlink("../library/".$res["folder"]);}; $db->exec("BEGIN");$db->query("DELETE FROM library WHERE id='$nid'");$db->exec("COMMIT");
$db->exec("BEGIN");$db->query("DELETE FROM joblibrary WHERE idlibrary='$nid'");$db->exec("COMMIT");echo json_encode(array("id"=>$nid));}
if($_POST["action"]=="saveLibrary"){$ndata=$_POST["ndata"];for ($i=0;$i<count($ndata); $i++) {$n_folder=$ndata[$i][0];$n_txt=$ndata[$i][1];$n_coment=$ndata[$i][2];$n_url_to=$ndata[$i][3];$n_thumb=$ndata[$i][4];$n_active=$ndata[$i][5];$n_width=$ndata[$i][6];$n_height=$ndata[$i][7];$n_order=$ndata[$i][8];$n_da=$ndata[$i][9];$n_menu=$ndata[$i][10];$db->exec("BEGIN");
$db->query("UPDATE library SET da='$n_da', txt='$n_txt',coment='$n_coment',url_to='$n_url_to',thumb='$n_thumb',active='$n_active', width='$n_width',height='$n_height',n_order='$n_order', menu='$n_menu'  WHERE folder='$n_folder'");
$db->exec("COMMIT");};$nstulib=$_POST["nstulib"];  for ($i=0;$i<count($nstulib); $i++) {$n_u=$nstulib[$i][0];$n_l=$nstulib[$i][1];$n_chk=$nstulib[$i][2];$db->exec("BEGIN");
$db->query("DELETE FROM joblibrary WHERE iduser='$n_u' AND idlibrary='$n_l'");$db->exec("COMMIT");if ($n_chk=="Y"){$db->exec("BEGIN");
$db->query("INSERT INTO joblibrary (iduser,idlibrary) VALUES ('$n_u','$n_l')");$db->exec("COMMIT");}}}
if($_GET["action"]=="savethumb"){$mimetypes=array("image/jpeg","image/pjpeg","image/png");$foto_nome=$_FILES["file"]["name"];$foto_tipo=$_FILES["file"]["type"];$foto_tmp=$_FILES["file"]["tmp_name"];$foto_tam=$_FILES["file"]["size"];if ($foto_nome != ""  AND $foto_tam != 0){
if(!in_array($foto_tipo, $mimetypes)) die("Foto non válida");switch($foto_tipo) {case $mimetypes[0]:$img = imagecreatefromjpeg($foto_tmp);break;case $mimetypes[1]:$img = imagecreatefromjpeg($foto_tmp);break;case $mimetypes[2]:$img = imagecreatefrompng($foto_tmp);break;};$datos = getimagesize($foto_tmp);$ancho = round(40*$datos[0]/$datos[1]);$imaGrande = imagecreatetruecolor($ancho,40);
imagealphablending($imaGrande, false);imagesavealpha($imaGrande, true);imagecopyresampled($imaGrande, $img, 0, 0, 0, 0, $ancho, 40, $datos[0], $datos[1]);switch($foto_tipo) {case $mimetypes[0]:imagejpeg($imaGrande,"../ardoraWorkFiles/library/thumbs/".$foto_nome);break;case $mimetypes[1]:imagejpeg($imaGrande,"../ardoraWorkFiles/library/thumbs/".$foto_nome);break;case $mimetypes[2]:imagepng($imaGrande,"../ardoraWorkFiles/library/thumbs/".$foto_nome);break;};
@unlink($foto_tmp);imagedestroy($imaGrande);}}
if($_GET["action"]=="savefile"){$file_nome = $_FILES["fileup"]["name"];$file_tipo = $_FILES["fileup"]["type"];$file_tmp = $_FILES["fileup"]["tmp_name"];$file_tam = $_FILES["fileup"]["size"];$finfo = new finfo(FILEINFO_MIME_TYPE);if (false === $ext = array_search(
$finfo->file($_FILES['fileup']['tmp_name']),array('jpg' => 'image/jpeg','jpeg' => 'image/jpeg','png' => 'image/png','zip' => 'application/zip','mp3' => 'audio/mpeg',
'ogg' => 'audio/ogg','mp4' => 'video/mpeg','ogv' => 'video/ogg','webm' => 'video/webm','pdf' => 'application/pdf','odt' => 'application/vnd.oasis.opendocument.text','ods' => 'application/vnd.oasis.opendocument.spreadsheet','odp' => 'application/vnd.oasis.opendocument.presentation',
),true)) {throw new RuntimeException('Invalid file format.');}; if (!move_uploaded_file($_FILES["fileup"]["tmp_name"],"../library/".$_FILES["fileup"]["name"])) {throw new RuntimeException('Failed to move uploaded file.');}else{
if ($ext=="zip"){$zip=new ZipArchive;$comp=$zip->open("../library/".$_FILES["fileup"]["name"]);if ($comp===true){$zip->extractTo("../library/");$zip->close();unlink("../library/".$_FILES["fileup"]["name"]);}else{throw new RuntimeException('Failed to extract file.');}}}
if ($handle = opendir('../library/')) {while (false !== ($entry = readdir($handle))) {if ($entry != "." && $entry != "..") {if (strrpos($entry,".")==false){$nurl=$entry."/";if (file_exists("../library/".$entry."/index.php")){$nurl=$entry."/index.php";
if (file_exists("../library/".$entry."/avalia/informe.php") && file_exists("../library/".$entry."/avalia/informe.js") && file_exists("../library/".$entry."/avalia/informe.css")){if ($handle2 = opendir("../library/".$entry."/")) {
while (false !== ($entry2=readdir($handle2))) {if ($entry2 != "." && $entry2 != "..") {if (strrpos($entry2,".")==false){
if (file_exists("../library/".$entry."/".$entry2."/".$entry2."_lib.php") && file_exists("../library/".$entry."/".$entry2."/".$entry2."_slogin.php") ){
copy("../lib/dummy.php","../library/".$entry."/".$entry2."/".$entry2."_lib.php");copy("../lib/paq/ardoraXML.php","../library/".$entry."/php/ardoraXML.php");}}}}}}
if (file_exists("../library/".$entry."/js/ardoraComentarios.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraSticky.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraPolaroid.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraGravadora.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/js/ardoraPoster.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/php/ardoraAjaxLogin.php");}
if (is_dir("../library/".$entry."/ardoraWorkFiles"."/") && file_exists("../library/".$entry."/php/para.php")){copy("../lib/ew/para_ps.php","../library/".$entry."/php/para.php");}
}else{
if (file_exists("../library/".$entry."/".$entry.".htm")){$nurl=$entry."/".$entry.".htm";
if (file_exists("../library/".$entry."/css/ardoraEW.css") && file_exists("../library/".$entry."/resources")){makeserverpages($entry);}
if (file_exists("../library/".$entry."/css/ardoraEW.css") && file_exists("../library/".$entry."/avalia") && file_exists("../library/".$entry."/resources")){if ($handle2=opendir("../library/".$entry."/")) {
while (false !==($entry2 = readdir($handle2))) {if ($entry2 != "." && $entry2 != "..") {if (strrpos($entry2,".")==false){
if (file_exists("../library/".$entry."/".$entry2."/".$entry2."_lib.php") && file_exists("../library/".$entry."/".$entry2."/".$entry2."_slogin.php") ){
copy("../lib/dummy.php","../library/".$entry."/".$entry2."/".$entry2."_lib.php");}}}}}
if ($handle3 = opendir("../library/".$entry."/resources"."/")) {while (false !== ($entry3 = readdir($handle3))) {if ($entry3 != "." && $entry3 != "..") {if (strrpos($entry3,".")==false){
if (file_exists("../library/".$entry."/resources"."/".$entry3."/".$entry3.".php") && file_exists("../library/".$entry."/resources"."/".$entry3."/avalia/informe.css") ){
copy("../lib/ew/ardoraXML.php","../library/".$entry."/resources"."/".$entry3."/php/ardoraXML.php");}}}}
copy("../lib/ew/informeXML.php","../library/".$entry."/resources/informe/ardoraXML.php");}}
}else{if (file_exists("../library/".$entry."/index.htm")){$nurl=$entry."/index.htm";}else{if (file_exists("../library/".$entry."/index.html")){$nurl=$entry."/index.html";}}}}}else{$nurl=$entry;};
$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM library WHERE folder='$entry'");if ($count==0){$norder++;$db->exec("BEGIN");$db->query("INSERT INTO library (folder,url_to,active, width,height,n_order,da) VALUES ('$entry','$nurl','N',$d_w,$d_h,'$norder','N')");
$db->exec("COMMIT");$result=$db->query("SELECT * FROM library WHERE folder='$entry'");$res=$result->fetchArray(SQLITE3_ASSOC);$n_id=$res["id"];$n_folder=$res["folder"];$n_url_to=$res["url_to"];echo json_encode(array("id"=>$n_id,"folder"=>$n_folder,"n_url_to"=>$n_url_to,"width"=>$d_w,"height"=>$d_h));}}};closedir($handle);}
}
if($_POST["action"]=="getDa"){$usr=$_SESSION["Username"];$result=$db->query("SELECT * FROM users WHERE username='$usr'");$res=$result->fetchArray(SQLITE3_ASSOC);$usrtype=decod($res["usertype"],keynum);if ($usrtype=="profe"){$usrtype="admin";};$i=0;
$n_id=array();$n_folder=array();$n_txt=array();$n_coment=array();$n_url_to=array();$n_thumb=array();$n_active=array();$n_width=array();$n_height=array();$n_order=array();$n_da=array();$n_menu=array();if ($usrtype=="admin"){
$result=$db->query('SELECT * FROM library ORDER BY n_order');while($res=$result->fetchArray(SQLITE3_ASSOC)){$n_id[$i]=$res["id"];$n_folder[$i]=$res["folder"];$n_txt[$i]=$res["txt"];$n_coment[$i]=$res["coment"];$n_url_to[$i]=$res["url_to"];$n_thumb[$i]=$res["thumb"];$n_active[$i]=$res["active"];$n_width[$i]=$res["width"];$n_height[$i]=$res["height"];$n_order[$i]=$res["n_order"];$n_da[$i]=$res["da"];$n_menu[$i]=$res["menu"];$i++;}}
else{$result=$db->query("SELECT * FROM library WHERE active='Y' ORDER BY n_order");while($res=$result->fetchArray(SQLITE3_ASSOC)){$idlib=$res["id"];
$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM joblibrary WHERE iduser='$usr' AND idlibrary='$idlib'");if ($count>0){$n_id[$i]=$res["id"];$n_folder[$i]=$res["folder"];$n_txt[$i]=$res["txt"];
$n_coment[$i]=$res["coment"];$n_url_to[$i]=$res["url_to"];$n_thumb[$i]=$res["thumb"];$n_active[$i]=$res["active"];$n_width[$i]=$res["width"];$n_height[$i]=$res["height"];$n_order[$i]=$res["n_order"];$n_da[$i]=$res["da"];$n_menu[$i]=$res["menu"];$i++;}}}
echo json_encode(array("id"=>$n_id,"folder"=>$n_folder,"text"=>$n_txt,"coment"=>$n_coment,"n_url_to"=>$n_url_to,"thumb"=>$n_thumb,"active"=>$n_active,"width"=>$n_width,"height"=>$n_height,"norder"=>$n_order,"da"=>$n_da,"menu"=>$n_menu));}
function deleteDirectory($dir) {if(!$dh = @opendir($dir)) return;while (false !== ($current = readdir($dh))) {if($current != '.' && $current != '..') {if (!@unlink($dir.'/'.$current)) deleteDirectory($dir.'/'.$current);}};closedir($dh);@rmdir($dir);}
if($_POST["action"]=="getLinks"){$result=$db->query('SELECT * FROM links ORDER BY n_olink');$i=0;$n_id=array();$n_txt=array();$n_u=array();$n_thumb=array();$n_ac=array();$n_w=array();$n_h=array();$n_o=array();$n_da=array();$n_https=array();$n_popup=array();$n_menu=array();
while($res=$result->fetchArray(SQLITE3_ASSOC)){$n_id[$i]=$res["idlink"];$n_txt[$i]=$res["txt_link"];$n_u[$i]=$res["u_link"];$n_thumb[$i]=$res["thumb_link"];$n_ac[$i]=$res["ac_link"];$n_w[$i]=$res["w_link"];$n_h[$i]=$res["h_link"];$n_o[$i]=$res["n_olink"];$n_da[$i]=$res["da_link"];$n_https[$i]=$res["https_link"];$n_popup[$i]=$res["popup_link"];$n_menu[$i]=$res["menu"];$i++;}
echo json_encode(array("id"=>$n_id,"text"=>$n_txt,"n_u"=>$n_u,"thumb"=>$n_thumb,"active"=>$n_ac,"width"=>$n_w,"height"=>$n_h,"norder"=>$n_o,"da"=>$n_da,"ht"=>$n_https,"pu"=>$n_popup,"menu"=>$n_menu));}
if($_POST["action"]=="saveLinks"){$ndata=$_POST["ndata"];for ($i=0;$i<count($ndata); $i++) {$n=$ndata[$i][0];$n_txt=$ndata[$i][1];$n_url_to=$ndata[$i][2];$n_thumb=$ndata[$i][3];$n_active=$ndata[$i][4];$n_width=$ndata[$i][5];$n_height=$ndata[$i][6];$n_order=$ndata[$i][7];$n_da=$ndata[$i][8];$n_ht=$ndata[$i][9];$n_pu=$ndata[$i][10];$n_menu=$ndata[$i][11];
$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM links WHERE idlink='$n'");if ($count==0){$db->exec("BEGIN");
$db->query("INSERT INTO links (da_link,txt_link,u_link,thumb_link,ac_link,w_link,h_link,n_olink,https_link,popup_link,menu) VALUES ('$n_da','$n_txt','$n_url_to','$n_thumb','$n_active','$n_width','$n_height','$n_order','$n_ht','$n_pu','$n_menu')");$db->exec("COMMIT");}
else{$db->exec("BEGIN");$db->query("UPDATE links SET da_link='$n_da', txt_link='$n_txt',u_link='$n_url_to',thumb_link='$n_thumb',ac_link='$n_active', w_link='$n_width',h_link='$n_height',n_olink='$n_order',https_link='$n_ht',popup_link='$n_pu',menu='$n_menu'  WHERE idlink='$n'");$db->exec("COMMIT");}};
$nstulib=$_POST["nstulib"];for ($i=0;$i<count($nstulib); $i++) {$n_u=$nstulib[$i][0];$n_l=$nstulib[$i][1];$n_chk=$nstulib[$i][2];$db->exec("BEGIN");$db->query("DELETE FROM joblink WHERE iduser='$n_u' AND idlink='$n_l'");$db->exec("COMMIT");
if ($n_chk=="Y"){$db->exec("BEGIN");$db->query("INSERT INTO joblink (iduser,idlink) VALUES ('$n_u','$n_l')");$db->exec("COMMIT");}}}
if($_POST["action"]=="delLink"){$nid=$_POST["nid"];$db->exec("BEGIN");$db->query("DELETE FROM links WHERE idlink='$nid'");$db->exec("COMMIT");
$db->exec("BEGIN");$db->query("DELETE FROM joblink WHERE idlink='$nid'");$db->exec("COMMIT");echo json_encode(array("id"=>$nid));}
if($_POST["action"]=="getjoblink"){$tea=$_SESSION["Username"];$actuser=$db->query("SELECT * FROM teachers WHERE teacher='$tea'");$alljob=array();$alulib=array();while($a_u=$actuser->fetchArray(SQLITE3_ASSOC)){$c=$a_u["cur"];$g=$a_u["gru"];$users=$db->query("SELECT * FROM users WHERE cur='$c' AND gru='$g'");
while($use=$users->fetchArray(SQLITE3_ASSOC)){$actualuse=$use["username"];$student=$db->query("SELECT * FROM users WHERE username='$actualuse'");$fn_stu=$student->fetchArray(SQLITE3_ASSOC);$alulib["user"]=$actualuse;$alulib["fullname"]=decod($fn_stu["fullsusername"],keynum);
$library=$db->query("SELECT * FROM links ORDER BY n_olink");while($lib=$library->fetchArray(SQLITE3_ASSOC)){$field=$lib["idlink"];
$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM joblink WHERE iduser='$actualuse' AND idlink='$field'");if ($count==0){$alulib[$field]="N";}else{$alulib[$field]="Y";}};
array_push($alljob,$alulib);}}; usort($alljob, function($a, $b) { return $a["fullname"] <=> $b["fullname"];});echo json_encode(array("alljob"=>$alljob));}
if($_POST["action"]=="getDaLink"){$usr=$_SESSION["Username"];$result=$db->query("SELECT * FROM users WHERE username='$usr'");$res=$result->fetchArray(SQLITE3_ASSOC);$usrtype=decod($res["usertype"],keynum);if ($usrtype=="profe"){$usrtype="admin";};
$i=0;$n_id=array();$n_txt=array();$n_url_to=array();$n_thumb=array();$n_active=array();$n_width=array();$n_height=array();$n_order=array();$n_da=array();$n_https=array();$n_popup=array();$n_menu=array();if ($usrtype=="admin"){$result=$db->query('SELECT * FROM links ORDER BY n_olink');while($res=$result->fetchArray(SQLITE3_ASSOC)){
$n_id[$i]=$res["idlink"];$n_txt[$i]=$res["txt_link"];$n_url_to[$i]=$res["u_link"];$n_thumb[$i]=$res["thumb_link"];$n_active[$i]=$res["ac_link"];$n_width[$i]=$res["w_link"];$n_height[$i]=$res["h_link"];$n_order[$i]=$res["n_olink"];$n_da[$i]=$res["da_link"];$n_https[$i]=$res["https_link"];$n_popup[$i]=$res["popup_link"];$n_menu[$i]=$res["menu"];$i++;}}else{
$result=$db->query("SELECT * FROM links WHERE ac_link='Y' ORDER BY n_olink");while($res=$result->fetchArray(SQLITE3_ASSOC)){$idlib=$res["idlink"];
$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM joblink WHERE iduser='$usr' AND idlink='$idlib'");if ($count>0){$n_id[$i]=$res["idlink"];$n_txt[$i]=$res["txt_link"];$n_url_to[$i]=$res["u_link"];$n_thumb[$i]=$res["thumb_link"];
$n_active[$i]=$res["ac_link"];$n_width[$i]=$res["w_link"];$n_height[$i]=$res["h_link"];$n_order[$i]=$res["n_olink"];$n_da[$i]=$res["da_link"];$n_https[$i]=$res["https_link"];$n_popup[$i]=$res["popup_link"];$n_menu[$i]=$res["menu"];$i++;}}}
echo json_encode(array("id"=>$n_id,"text"=>$n_txt,"n_url_to"=>$n_url_to,"thumb"=>$n_thumb,"active"=>$n_active,"width"=>$n_width,"height"=>$n_height,"norder"=>$n_order,"da"=>$n_da,"ht"=>$n_https,"pu"=>$n_popup,"menu"=>$n_menu));}
function makeserverpages($entry){if ($han=opendir("../library/".$entry."/")) {while (false !== ($ent = readdir($han))) {if ($ent != "." && $ent != "..") {if (file_exists("../library/".$entry."/".$ent."/php/para.php")){copy("../lib/ew/para.php","../library/".$entry."/".$ent."/php/para.php");}
if (file_exists("../library/".$entry."/".$ent."/js/ardoraComentarios.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/".$ent."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/".$ent."/js/ardoraSticky.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/".$ent."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/".$ent."/js/ardoraPolaroid.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/".$ent."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/".$ent."/js/ardoraGravadora.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/".$ent."/php/ardoraAjaxLogin.php");}
if (file_exists("../library/".$entry."/".$ent."/js/ardoraPoster.js")){copy("../lib/serv/ardoraAjaxLogin.php","../library/".$entry."/".$ent."/php/ardoraAjaxLogin.php");}
}}}}
?>
