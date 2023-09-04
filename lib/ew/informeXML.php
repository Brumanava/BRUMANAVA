<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage=0;$slogin_pagetitle="";$usr=$_SESSION["Username"];
require("../../../../php/paraUsu.php");
$db=new SQLite3("../../../../db/usuarios.db") or die("Unable to open database");
if($_POST["action"]=="getInfo"){$folders=json_decode($_POST["folders"]);
$ecuser=array();$user=array();$user_n=array();$user_c=array();$user_g=array();$result=$db->query("SELECT * FROM users WHERE username='$usr'");$res=$result->fetchArray(SQLITE3_ASSOC);$nus=decod($res["username"],keynum);
$nold=decod($res["fullsusername"],keynum);$ncur=decod($res["cur"],keynum);$ngru=decod($res["gru"],keynum);$ntyp=decod($res["usertype"],keynum);
if ($ntyp=="profe"){$r_cg=$db->query("SELECT * FROM teachers WHERE teacher='$usr'");while($rcg=$r_cg->fetchArray(SQLITE3_ASSOC)){$c=$rcg["cur"];$g=$rcg["gru"];$result = $db->query("SELECT * FROM users");
while($res=$result->fetchArray(SQLITE3_ASSOC)){if (decod($res["usertype"],keynum)=="alu" && $res["cur"]==$c && $res["gru"]==$g ){array_push($ecuser,$res["username"]);
array_push($user,decod($res["username"],keynum));array_push($user_n,decod($res["fullsusername"],keynum));array_push($user_c,decod($res["cur"],keynum));array_push($user_g,decod($res["gru"],keynum));}}}}
else{$result=$db->query("SELECT * FROM users");while($res=$result->fetchArray(SQLITE3_ASSOC)){if (decod($res["usertype"],keynum)!="admin" && decod($res["usertype"],keynum)!="profe" && $res["username"]===$usr){
array_push($ecuser,$res["username"]);array_push($user,decod($res["username"],keynum));array_push($user_n,decod($res["fullsusername"],keynum));array_push($user_c,decod($res["cur"],keynum));array_push($user_g,decod($res["gru"],keynum));}}}
array_multisort($user_c,SORT_ASC,$user_g,SORT_ASC,$user_n,SORT_ASC,$user,$ecuser);$jobs=array();$openCount=array();
for($i=0; $i<count($user); $i++){for($z=0; $z<count($folders); $z++){$folderN="../../avalia/".$folders[$z]."/";$openCount[$user[$i]][$folders[$z]]=0;$maxPoint[$user[$i]][$folders[$z]]=0;$actOk[$user[$i]][$folders[$z]]=0;$dateLast[$user[$i]][$folders[$z]]="";
if (file_exists($folderN.$ecuser[$i].".xml")){$xml=new DOMDocument("1.0","utf-8");$xml->formatOutput=true;$xml->preserveWhiteSpace=false;$xml->load($folderN.$ecuser[$i].".xml");
$objJob=$xml->getElementsByTagName("job");$index=0;for($t=0; $t<30; $t++){$parcialPoints[$t]=-1500;$parcialOk[$t]=0;}
foreach($objJob as $job){$openCount[$user[$i]][$folders[$z]]++;$dateLast[$user[$i]][$folders[$z]]=$job->getElementsByTagName("date")->item(0)->nodeValue;$objAttemp=$job->getElementsByTagName("attemp");foreach($objAttemp as $att){
if (intval($att->getElementsByTagName("puntos")->item(0)->nodeValue) > $parcialPoints[intval($att->getElementsByTagName("indice")->item(0)->nodeValue)]){
$parcialPoints[intval($att->getElementsByTagName("indice")->item(0)->nodeValue)]=intval($att->getElementsByTagName("puntos")->item(0)->nodeValue);}
if ($att->getElementsByTagName("estado")->item(0)->nodeValue=="ok"){$parcialOk[intval($att->getElementsByTagName("indice")->item(0)->nodeValue)]=1;}}$partialMax=0;$parcialOkMax=0;
for($t=0; $t<30; $t++){if ($parcialPoints[$t]!=-1500){$partialMax=$partialMax+$parcialPoints[$t];};if ($parcialOk[$t]==1){$parcialOkMax=$parcialOkMax+1;}}
if ($partialMax>intval($maxPoint[$ecuser[$i]][$folders[$z]])){$maxPoint[$user[$i]][$folders[$z]]=$partialMax;};if ($parcialOkMax>$actOk[$user[$i]][$folders[$z]]){$actOk[$user[$i]][$folders[$z]]=$parcialOkMax;}};}}}
echo json_encode(array("users" => $user, "user_n"=>$user_n, "user_c"=>$user_c, "user_g"=>$user_g,"openCount"=>$openCount,"maxPoint"=>$maxPoint,"actOk"=>$actOk,"dateLast"=>$dateLast));}
?>
