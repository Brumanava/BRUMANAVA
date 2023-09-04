<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage=0;$slogin_pagetitle="";$usr=$_SESSION["Username"];require("paraUsu.php");
if($_POST["action"]=="islegal"){$islegal=false;$db=new SQLite3("../db/usuarios.db");$count=(int)$db->querySingle("SELECT COUNT(*) as count FROM users WHERE username='$usr'");if ($count>0){$islegal=true;};echo json_encode(array("il"=>$islegal));}
if($_POST["action"]=="getIdUser"){$db = new SQLite3("../db/usuarios.db");$result = $db->query('SELECT * FROM users');$i=1;
while($res=$result->fetchArray(SQLITE3_ASSOC)){if ($res["username"]==$usr){$u=$_SESSION["Username"];$t=decod($res["usertype"],keynum);$f=decod($res["fullsusername"],keynum);$c=decod($res["cur"],keynum);$g=decod($res["gru"],keynum);echo json_encode(array("user"=>$u,"userType"=>$t,"userName"=>$f,"userCur"=>$c,"userGru"=>$g));};$i++;}}
if($_POST["action"]=="logout"){$_SESSION["Username"]=NULL;session_destroy();echo json_encode(array("status" => "logout"));}
if($_POST["action"]=="editField"){$db=new SQLite3("../db/usuarios.db");if ($_POST["typeUs"]==0){$u=$_POST["user"];}else{$u=encod($_POST["user"],keynum);};$f=$_POST["field"];if ($f=="uPass"){$v=password_hash($_POST["val"],PASSWORD_DEFAULT);}else{$v=encod($_POST["val"],keynum);}$ty=$_POST["utype"];
if ($f=="uName"){$db->exec("BEGIN");$db->query("UPDATE users SET fullsusername='$v'  WHERE username='$u'");$db->exec("COMMIT");}
if ($f=="uPass"){$db->exec("BEGIN");$db->query("UPDATE users SET password='$v'  WHERE username='$u'");$db->exec("COMMIT");}
if ($f=="uCur"){$db->exec("BEGIN");$db->query("UPDATE users SET cur='$v'  WHERE username='$u'");$db->exec("COMMIT");}
if ($f=="uGru"){$db->exec("BEGIN");$db->query("UPDATE users SET gru='$v'  WHERE username='$u'");$db->exec("COMMIT");}}
if($_POST["action"]=="getStudents"){$db = new SQLite3("../db/usuarios.db");$t=encod($_POST["teacher"],keynum);$usp=encod("profe",keynum);$adp=encod("admin",keynum);$res_teacher= $db->query("SELECT * FROM teachers WHERE teacher='$usr'");$i=0;$slogin_user=array();$slogin_name=array();$slogin_curs=array();$slogin_grup=array();
while($rest=$res_teacher->fetchArray(SQLITE3_ASSOC)){$c=$rest["cur"];$g=$rest["gru"];$result=$db->query("SELECT username,fullsusername,cur,gru FROM users WHERE cur='$c' AND gru='$g' ORDER BY fullsusername");
while($res=$result->fetchArray(SQLITE3_ASSOC)){$slogin_user[$i]=decod($res["username"],keynum);$slogin_name[$i]=decod($res["fullsusername"],keynum);$slogin_curs[$i]=decod($res["cur"],keynum);$slogin_grup[$i]=decod($res["gru"],keynum);$i++;}}
array_multisort($slogin_name,SORT_ASC,$slogin_user,SORT_ASC,$slogin_curs,SORT_ASC,$slogin_grup);
echo json_encode(array("user"=>$slogin_user,"userName"=>$slogin_name,"userCur"=>$slogin_curs,"userGru"=>$slogin_grup));}
if($_POST["action"]=="deleteuser"){$db = new SQLite3("../db/usuarios.db");$u=encod($_POST["user"],keynum);$db->exec("BEGIN");$db->query("DELETE FROM users WHERE username='$u'");$db->exec("COMMIT");}
if($_POST["action"]=="savenewuser"){$db=new SQLite3("../db/usuarios.db");$t=encod("alu",keynum);$u=encod($_POST["n_user"],keynum);$n=encod($_POST["n_nameuser"],keynum);$p=password_hash($_POST["n_pwd"],PASSWORD_DEFAULT);$c=encod($_POST["n_cur"],keynum);$g=encod($_POST["n_gru"],keynum);
$db->exec("BEGIN");$db->query("INSERT INTO users (username,password,fullsusername,cur,gru,usertype) VALUES ('$u','$p','$n','$c','$g','$t')");$db->exec("COMMIT");}
if($_POST["action"]=="getUs"){$db = new SQLite3("../db/usuarios.db");$result = $db->query("SELECT * FROM users WHERE username='$usr'");$res=$result->fetchArray(SQLITE3_ASSOC);$un=decod($res["username"],keynum);$t=decod($res["usertype"],keynum);
echo json_encode(array("un"=>$un,"u_type"=>$t));}
if($_POST["action"]=="saveFileText"){$fn=$_POST["fn"];$ct=$_POST["ct"];$fh = fopen($fn, 'w') or die("File error");
$text=<<<_END
$ct
_END;
fwrite($fh, $text) or die("Cannot create file");fclose($fh);echo json_encode(array("un"=>$fn));}
if($_POST["action"]=="getTeachers"){$db=new SQLite3("../db/usuarios.db");$usp=encod("profe",keynum);$res_teachers= $db->query("SELECT * FROM users WHERE usertype='$usp'");$un=array();$fn=array();$i=0;while($rest=$res_teachers->fetchArray(SQLITE3_ASSOC)){$un[$i]=$rest["username"];$fn[$i]=decod($rest["fullsusername"],keynum);$i++;}
$res_t= $db->query("SELECT * FROM teachers");$t=array();$c=array();$g=array();$i=0;while($rest=$res_t->fetchArray(SQLITE3_ASSOC)){$t[$i]=$rest["teacher"];$c[$i]=decod($rest["cur"],keynum);$g[$i]=decod($rest["gru"],keynum);$i++;};echo json_encode(array("teacher"=>$un,"teacherName"=>$fn,"tea"=>$t,"cur"=>$c,"gru"=>$g));}
if($_POST["action"]=="savenewteacher"){$db=new SQLite3("../db/usuarios.db");$status="ns";$t=encod("profe",keynum);$u=encod($_POST["user"],keynum);$n=encod($_POST["name"],keynum);$p=password_hash($_POST["pass"],PASSWORD_DEFAULT);$c=encod("-",keynum);$g=encod("-",keynum);
$db->exec("BEGIN");$db->query("INSERT INTO users (username,password,fullsusername,cur,gru,usertype) VALUES ('$u','$p','$n','$c','$g','$t')");$db->exec("COMMIT");echo json_encode(array("teacher"=>$u,"teacherName"=>$_POST["name"]));}
if($_POST["action"]=="saveteachers"){$db=new SQLite3("../db/usuarios.db");$ndata=$_POST["ndata"];for ($i=0;$i<count($ndata); $i++) {$n=$ndata[$i][0];
$n_name=encod($ndata[$i][1],keynum);$db->exec("BEGIN");$db->query("UPDATE users SET fullsusername='$n_name' WHERE username='$n'");$db->exec("COMMIT");}}
if($_POST["action"]=="deleteteacher"){$db = new SQLite3("../db/usuarios.db");$u=$_POST["user"];$db->exec("BEGIN");$db->query("DELETE FROM users WHERE username='$u'");$db->exec("COMMIT");
$db->exec("BEGIN");$db->query("DELETE FROM teachers WHERE teacher='$u'");$db->exec("COMMIT");echo json_encode(array("status"=>$u));}
if($_POST["action"]=="saveteachergroup"){$db=new SQLite3("../db/usuarios.db");$db->exec("BEGIN");$db->query("DELETE FROM teachers");$db->exec("COMMIT");$ndata=$_POST["ndata"];
for ($i=0;$i<count($ndata); $i++) {$n=$ndata[$i][0];$c=encod($ndata[$i][1],keynum);$g=encod($ndata[$i][2],keynum);$db->exec("BEGIN");$db->query("INSERT INTO teachers (teacher,cur,gru) VALUES ('$n','$c','$g')");$db->exec("COMMIT");}}
?>
