<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage = 0;$slogin_pagetitle = "";
if (file_exists("cfg2.php")){include_once("cfg2.php");}
if (file_exists("cfgUsu.php")){include_once ("cfgUsu.php");}
include_once("cfg.php");include_once("para.php");include_once ("../".profUname.uName."/".uName."_lib.php");$folderN="../".xmlDir;$folUser=$slogin_Username;date_default_timezone_set("Europe/Madrid");
if($_POST["action"]=="logout"){}
if($_GET["action"]=="login"){echo json_encode(array("usu"=>$slogin_Username,"nom"=>dameValor($slogin_Username, "NOM"),"cur"=>dameValor($slogin_Username, "CUR"),"gru"=>dameValor($slogin_Username, "GRU"),"typ"=>dameValor($slogin_Username, "TIP")));}
?>
