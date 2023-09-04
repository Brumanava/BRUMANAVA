<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage=0;$slogin_pagetitle="";include_once ("paraUsu.php");$usr=$_SESSION["Username"];include_once ("cfg.php");include_once ("ardoraFileManagerFunctions.php");require("../../php/paraUsu.php");
$db=new SQLite3("../../db/usuarios.db") or die("Unable to open database");
$result=$db->query("SELECT * FROM users WHERE username='$usr'");$res=$result->fetchArray(SQLITE3_ASSOC);$nus=decod($res["username"],keynum);$nold=decod($res["fullsusername"],keynum);$ncur=decod($res["cur"],keynum);$ngru=decod($res["gru"],keynum);$ntyp=decod($res["usertype"],keynum);$newDir=$_GET["fol"];
if ($_GET["fType"]==0){$newDir="../".sharedFold.$newDir;}if ($_GET["fType"]==1){$tipo=$ntyp;if (($tipo=="profe") || ($tipo=="admin")){$newDir="../".profeFold.$nus."/".$newDir;}else{$newDir="../".aluFold.$nus."/".$newDir;}}
if ($_GET["fType"]==2){$newDir="../".aluFold.$newDir;}if(isset($_FILES["myfile"])){$ret = array();$error =$_FILES["myfile"]["error"];
{if(!is_array($_FILES["myfile"]["name"])) {$fileName = $_FILES["myfile"]["name"];move_uploaded_file($_FILES["myfile"]["tmp_name"],$newDir.normaliza($_FILES["myfile"]["name"]));$ret[$fileName]= $newDir.$fileName;
$nus=decod($res["username"],keynum);$logFile = fopen(".."."/ardoraWorkFiles/upload.log", "a") or die("Error creando archivo");fwrite($logFile,"\n"."==>".$nus."\n".date("d/m/Y H:i:s")." File-->".normaliza($newDir.$fileName)." IP:".getRealIP()) or die("Error escribiendo en el archivo");fclose($logFile);
}
else{$fileCount = count($_FILES["myfile"]["name"]);for($i=0; $i < $fileCount; $i++){$fileName = $_FILES["myfile"]["name"][$i];$ret[$fileName]=$newDir.$fileName;move_uploaded_file($_FILES["myfile"]["tmp_name"][$i],normaliza($newDir.$fileName));
$nus=decod($res["username"],keynum);$logFile = fopen(".."."/ardoraWorkFiles/upload.log", "a") or die("Error creando archivo");fwrite($logFile,"\n"."==>".$nus."\n".date("d/m/Y H:i:s")." File-->".normaliza($newDir.$fileName)." IP:".getRealIP()) or die("Error escribiendo en el archivo");fclose($logFile);
}}} echo json_encode($ret);}
function getRealIP() {if (!empty($_SERVER["HTTP_CLIENT_IP"])) return $_SERVER["HTTP_CLIENT_IP"];if (!empty($_SERVER["HTTP_X_FORWARDED_FOR"])) return $_SERVER["HTTP_X_FORWARDED_FOR"];return $_SERVER["REMOTE_ADDR"];}
?>
