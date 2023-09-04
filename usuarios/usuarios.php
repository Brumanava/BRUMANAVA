<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
$db = new SQLite3("db/usuarios.db") or die("Unable to open database");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS users (username STRING PRIMARY KEY,password STRING,fullsusername STRING,cur STRING,gru STRING,usertype STRING)
EOD;
$db->exec($query) or die("Create db failed");$count = (int)$db->querySingle("SELECT COUNT(*) as count FROM users");
$query2 = <<<EOD
CREATE TABLE IF NOT EXISTS teachers (teacher STRING ,cur STRING,gru STRING)
EOD;
$db->exec($query2) or die("Create db failed");
if ($count==0){include_once("php/paraUsu.php");
if (file_exists(uName.DIRECTORY_SEPARATOR.uName.".xml")){$xml = new DOMDocument("1.0", "utf-8");$xml->formatOutput=true;$xml->preserveWhiteSpace=false;
$xml->load(uName.DIRECTORY_SEPARATOR.uName.".xml");$objItem=$xml->getElementsByTagName("item");$length=$objItem->length;
for ($z=0;$z<$length;$z++){$p = $objItem->item($z);$s_u = encod($p->getElementsByTagName("username")->item(0)->nodeValue,keynum);$s_p = password_hash($p->getElementsByTagName("password")->item(0)->nodeValue,PASSWORD_DEFAULT);
$s_n=encod($p->getElementsByTagName("fullusername")->item(0)->nodeValue,keynum);$s_c = encod($p->getElementsByTagName("cur")->item(0)->nodeValue,keynum);$s_g = encod($p->getElementsByTagName("gru")->item(0)->nodeValue,keynum);
$s_ty=$p->getElementsByTagName("teacher")->item(0)->nodeValue;if ($s_ty!="admin" and $s_ty!="profe"){$s_ty="alu";};$s_pr =encod($s_ty,keynum);
$db->exec("BEGIN");$db->query("INSERT INTO users (username,password,fullsusername,cur,gru,usertype) VALUES ('$s_u','$s_p','$s_n','$s_c','$s_g','$s_pr')");
$db->exec("COMMIT");};
for ($z=0;$z<$length;$z++){$p=$objItem->item($z);$s_ty=$p->getElementsByTagName("teacher")->item(0)->nodeValue;$s_pr =encod($s_ty,keynum);if ($s_ty!="admin" and $s_ty!="profe"){
$result=$db->query("SELECT * FROM users WHERE fullsusername='$s_pr'");$res=$result->fetchArray(SQLITE3_ASSOC);$tea=$res["username"];$s_c=encod($p->getElementsByTagName("cur")->item(0)->nodeValue,keynum);$s_g = encod($p->getElementsByTagName("gru")->item(0)->nodeValue,keynum);
$count = (int)$db->querySingle("SELECT COUNT(*) as count FROM teachers WHERE teacher='$tea' AND cur='$s_c' AND gru='$s_g'");
if ($count==0){$db->query("INSERT INTO teachers (teacher,cur,gru) VALUES ('$tea','$s_c','$s_g')");}}}
unlink(uName.DIRECTORY_SEPARATOR.uName.".xml");}}
$result=$db->query('SELECT * FROM users');$slogin_user=array();$slogin_pass=array();$slogin_name=array();$slogin_curs=array();$slogin_grup=array();$slogin_profe=array();
$i=1;while($res=$result->fetchArray(SQLITE3_ASSOC)){$slogin_user[$i]=$res["username"];$slogin_pass[$i]=$res["password"];$slogin_name[$i]=$res["fullsusername"];$slogin_curs[$i]=$res["cur"];$slogin_grup[$i]=$res["gru"];$slogin_profe[$i]=$res["usertype"];$i++;}
?>
