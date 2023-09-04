<?php ob_start();include_once("../php/paraUsu.php"); require("usuarios_para.php");require("usuarios_slogin.php");$us=$_POST["slogin_POST_username"];$pass=$_POST["slogin_POST_password"];$usH=encod($us,keynum);
$db=new SQLite3("../db/usuarios.db") or die("Unable to open database");$result=$db->query("SELECT * FROM users WHERE username='$usH'");$exists=0;
while($res=$result->fetchArray(SQLITE3_ASSOC)){$hash=$res["password"];$us=$res["username"];$exists=1;}
if ($exists==1){if(password_verify($pass, $hash) ){session_start();$_SESSION["Username"]=$usH;$estado=0;header("Location: ../index.php");}else{$estado=1;@session_unset (); @session_destroy ();header("Location: ../index.php?estado=1&usu=".$_POST["slogin_POST_username"]);}}else{$estado=1;header("Location: ../index.php?estado=1&usu=".$_POST["slogin_POST_username"]);}
ob_end_flush();
?>
