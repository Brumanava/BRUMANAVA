<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$folderN="../ardoraWorkFiles/diary/";$folUser=$_SESSION["Username"];$xmlName=$_SESSION["Username"];
require("paraUsu.php");date_default_timezone_set("Europe/Madrid");
if($_POST["action"]=="saveNote"){$db=new SQLite3("../db/usuarios.db");$u=$_SESSION["Username"];$c=$_POST["color"];$s=$_POST["start"];$e=$_POST["end"];$t=$_POST["type"];$txt=encod($_POST["text"],keynum);$com=encod($_POST["coment"],keynum);$db->exec("BEGIN");
$db->query("INSERT INTO notes (user,color,start,finish,type,txt,coment) VALUES ('$u','$c','$s','$e','$t','$txt','$com')");
 $db->exec("COMMIT");$idNum=$db->lastInsertRowID();if ($t=="2"){$to=$_POST["to"];if (strlen($to)>0){$to=substr($to,0,-1);$n_uses=explode(",",$to);for ($i=0;$i<count($n_uses); $i++) {
$n_n=encod(trim($n_uses[$i]),keynum);$db->exec("BEGIN");$db->query("INSERT INTO jobnotes (idnote,user) VALUES ('$idNum','$n_n')");$db->exec("COMMIT");}}}
echo json_encode(array("id" => "P".$idNum));}
if($_POST["action"]=="deleteNote"){$db=new SQLite3("../db/usuarios.db");$i=$_POST["id"];$db->exec("BEGIN");$db->query("DELETE FROM notes WHERE id='$i'");$db->exec("COMMIT");$db->exec("BEGIN");$db->query("DELETE FROM jobnotes WHERE idnote='$i'");$db->exec("COMMIT");}
if($_POST["action"]=="listNote"){$id=array();$text=array();$coment=array();$color=array();$start=array();$end=array();$type=array();$usr=$_SESSION["Username"];$db=new SQLite3("../db/usuarios.db"); $sendTo=array();$rtype=$db->query("SELECT * FROM users WHERE username='$usr'");
$rt=$rtype->fetchArray(SQLITE3_ASSOC);$usrtype=decod($rt["usertype"],keynum);if ($usrtype=="profe"){$usrtype="admin";};$result=$db->query("SELECT id,user,color,start,finish,type,txt,coment FROM notes WHERE type='1' OR type='2' OR user='$usr'");
while($res=$result->fetchArray(SQLITE3_ASSOC)){$go=false;if ($res["type"]=="1" && $res["user"]!=$usr){$us=$res["user"];$r=$db->query("SELECT * FROM teachers WHERE teacher='$us'");while ($r1=$r->fetchArray(SQLITE3_ASSOC)){
$c=$r1["cur"];$g=$r1["gru"];$r2=$db->query("SELECT * FROM users WHERE username='$usr'");$r3=$r2->fetchArray(SQLITE3_ASSOC);if ($r3["cur"]==$c && $r3["gru"]==$g){$go=true;}}}else{if ($res["type"]=="1" && $res["user"]==$usr){$go=true;}
if ($res["type"]=="0" && $res["user"]==$usr){$go=true;};if ($res["type"]=="2" && $res["user"]==$usr){$go=true;};if ($res["type"]=="2" && $res["user"]!=$usr){$r_id=$res["id"];
$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM jobnotes WHERE user='$usr' AND idnote='$r_id'");if ($count>0){$go=true;}}}
if ($go){$daStart=$res["start"];$daEnd=$res["finish"];if (compararFechas($daEnd,$_POST["actdate"])>=0 && compararFechas($_POST["actdate"],$daStart)>=0){
$id[]=$res["id"];$text[]=decod($res["txt"],keynum);$coment[]=decod($res["coment"],keynum);$color[]=$res["color"];$start[]=$res["start"];$end[]=$res["finish"];$type[]=$res["type"];if ($res["type"]=="2" && $usrtype=="admin"){$r_id=$res["id"];
$nj=$db->query("SELECT * FROM jobnotes WHERE idnote='$r_id'");$r_sendTo="";while ($nj_i=$nj->fetchArray(SQLITE3_ASSOC)){$r_sendTo=$r_sendTo.decod($nj_i["user"],keynum).", ";};$sendTo[]=$r_sendTo;}else{$sendTo[]="";}}}}
echo json_encode(array("id"=>$id,"text"=>$text,"coment"=>$coment,"color"=>$color,"start"=>$start,"end"=>$end,"type"=>$type, "sendTo"=>$sendTo));}
if($_POST["action"]=="editNote"){$id=$_POST["id"];$txt=encod($_POST["text"],keynum);$com=encod($_POST["coment"],keynum);$col=$_POST["color"];$finish=$_POST["end"];
$type=$_POST["type"];$db=new SQLite3("../db/usuarios.db");$db->exec("BEGIN");
$db->query("UPDATE notes SET color='$col', finish='$finish',type='$type',txt='$txt',coment='$com'  WHERE id='$id'");$db->exec("COMMIT");
$db->exec("BEGIN");$db->query("DELETE FROM jobnotes WHERE idnote='$id'");$db->exec("COMMIT");$to=$_POST["userlist"];if (strlen($to)>0){$to=substr($to,0,-1);$n_uses=explode(",",$to);
for ($i=0;$i<count($n_uses); $i++) {$n_n=encod(trim($n_uses[$i]),keynum);$db->exec("BEGIN");$db->query("INSERT INTO jobnotes (idnote,user) VALUES ('$id','$n_n')");$db->exec("COMMIT");}}}
function is_valid_date($value, $format = "dd.mm.yyyy"){if(strlen($value) >= 6 && strlen($format) == 10){$separator_only = str_replace(array("m","d","y"),"", $format);$separator = $separator_only[0];
if($separator && strlen($separator_only) == 2){$regexp = str_replace("mm","(0?[1-9]|1[0-2])", $format);$regexp = str_replace("dd","(0?[1-9]|[1-2][0-9]|3[0-1])", $regexp);$regexp = str_replace("yyyy","(19|20)?[0-9][0-9]", $regexp);$regexp = str_replace($separator, "\\" . $separator, $regexp);
if($regexp != $value && preg_match('/'.$regexp.'\z/', $value)){$arr=explode($separator,$value);$day=$arr[0];$month=$arr[1];$year=$arr[2]; if(@checkdate($month, $day, $year)) return true;}}} return false;}
function compararFechas($primera, $segunda){$valoresPrimera = explode ("/", $primera);$valoresSegunda = explode ("/", $segunda);$diaPrimera    = $valoresPrimera[0];$mesPrimera  = $valoresPrimera[1];$anyoPrimera   = $valoresPrimera[2];$diaSegunda   = $valoresSegunda[0];$mesSegunda = $valoresSegunda[1];$anyoSegunda  = $valoresSegunda[2];
$diasPrimeraJuliano = gregoriantojd($mesPrimera, $diaPrimera, $anyoPrimera);$diasSegundaJuliano = gregoriantojd($mesSegunda, $diaSegunda, $anyoSegunda);if(!checkdate($mesPrimera, $diaPrimera, $anyoPrimera)){return 0;
}elseif(!checkdate($mesSegunda, $diaSegunda, $anyoSegunda)){return 0;}else{return  $diasPrimeraJuliano - $diasSegundaJuliano;}}
?>
