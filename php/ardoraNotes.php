<?php
//ArdoraDesktop
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage=0;$slogin_pagetitle="";$usr=$_SESSION["Username"];
$db = new SQLite3("../db/usuarios.db") or die("Unable to open database");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, user STRING,color STRING,start STRING,finish STRING,type STRING,txt STRING, coment STRING)
EOD;
$db->exec($query) or die("Create db failed");
$query = <<<EOD
CREATE TABLE IF NOT EXISTS jobnotes (idnote INTEGER, user STRING)
EOD;
$db->exec($query) or die("Create db failed");
?>
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /><title>BRUMANAVA</title>
<link type="text/css" href="../ardoraFiles/css/normalize.css" rel="stylesheet" />
<link type="text/css" href="../ardoraFiles/jspanel/jspanel.min.css" rel="stylesheet" />
<link type="text/css" href="../css/ardoraDesktop.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="../css/ardoranotes.css">
<script src="../ardoraFiles/js/jquery.js"></script>
<script src="../ardoraFiles/js/jquery-ui.min.js"></script>
<script src="../js/ardoranotes.js"></script>
</head>
<body><div id="ardoraMain"></div>
<div id="modal-background"></div><div id="modal-content"></div>
<script src="../ardoraFiles/jspanel/jspanel.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.contextmenu.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.datepicker.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.dock.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.hint.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.layout.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.modal.min.js"></script>
<script src="../ardoraFiles/jspanel/jspanel.tooltip.min.js"></script>
</body></html>
