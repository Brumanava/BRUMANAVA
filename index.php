<?php
//XestorArquivos
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage = 0;$slogin_pagetitle = "";include_once("php/paraUsu.php");include_once (profUname.uName."/".uName."_lib.php");include("php/cfg.php");include_once("php/ardoraFileManagerFunctions.php");error_reporting(E_ALL^E_NOTICE);
?>
<!DOCTYPE html><html><head><meta charset="utf-8"><link type="text/css" href="css/jqueryFileTree.css" rel="stylesheet"/><link type="text/css" href="css/ardoraFileManager.css" rel="stylesheet"/><link type="text/css" href="css/uploadfile.css" rel="stylesheet"/>
<title>Brumanava</title>
<script language="javascript" type="text/javascript" src="ardoraFiles/js/jquery.js"></script>
<script language="javascript" type="text/javascript" src="ardoraFiles/js/jquery-ui.min.js"></script>
<script language="javascript" type="text/javascript" src="js/jqueryFileTree.js"></script>
<script language="javascript" type="text/javascript" src="js/jquery.uploadfile.min.js"></script>
<script language="javascript" type="text/javascript" src="js/ardoraFileManager.js"></script>
</head><body>
<!--1Compartida-->
<!--2Personal-->
<!--3Estudiante-->

<div id="sidebar"><ul id="tabs"><li><a href="#" id="atab1" class="atab">Compartida</a></li><li><a href="#" id="atab2" class="atab">Personal</a></li></ul>
<div id="contentTabs"><div id="tab1" class="ctab"><div class="folderIcon"><img src="css/images/folder_open.png" width="16" height="16" alt="Carpeta aberta" longdesc="Imagen de carpeta abierta" /></div>
<div id="folderName" class="cfolderName">/</div><div id="arbol0"><div id="carpeta_compartida" class="directorio"></div><div id="estado_compartida" class="barraEstado"></div></div>
<div class="butBarFM"><p id="bNewFolderS" class="butfont butLe but" title="carpeta nueva">m</p><p id="bDelFolderS" class="butfont butLe but" title="Delete folder">n</p><p id="bUpLoadS" class="butfont butRi but" title="subir">I</p><p id="bRefreshS" class="butfont butRi but" title="Recharge">Z</p></div></div>
<div id="tab2" class="ctab"><div class="folderIcon"><img src="css/images/folder_open.png" width="16" height="16" alt="Carpeta aberta" longdesc="Imaxen de carpeta aberta" /></div>
<div id="folderNameUser" class="cfolderName">/</div><div id="arbol1"><div id="carpeta_personal" class="directorio"></div><div id="estado_personal" class="barraEstado"></div></div>
<div class="butBarFM"><p id="bNewFolderPersonal" class="butfont butLe but" title="carpeta nueva">m</p><p id="bDelFolderPersonal" class="butfont butLe but" title="Delete folder">n</p><p id="bUpLoadPersonal" class="butfont butRi but" title="">I</p><p id="bRefreshPersonal" class="butfont butRi but" title="Recharge">Z</p>
<p id="bRecorderPersonal" class="butfont butRi but" title="Recorder">K</p>
</div></div></div></div>
<div class="main-content"><div class="swipe-area"><a href="#" id="sidebar-toggle"></a></div><div class="content"><div id="visor"></div><div id="infoFile"></div>
<div class="butBarVisor"><p id="bDownFile" class="butfont butLe but" title="Download">J</p><p id="bInfoFile" class="butfont butLe but" title="Información">k</p><p id="bSeeFile" class="butfont butLe but" title="Fullscreen">H</p><p id="bRotateRight" class="butfont butLe but" title="Rotate">↻</p><p id="bRotateLeft" class="butfont butLe but" title="Rotate">↺</p><p id="bRenameFile" class="butnf butLe but" title="Change name">A➜B</p><p id="eFileName"></p><p id="bDeleteFile" class="butfont butRi but" title="Borrar palabra">b</p></div></div></div>
<div id="modal-background"></div><div id="modal-content"></div><div id="divFull"></div>
<div class="context-menu"><ul><li id="m_copy"><small>🗉</small><a>copy</a></li><li id="m_cut"><small>✄</small><a>cut</a></li><li id="m_paste"><small>🗊</small><a>paste</a></li><p class="separator"></p><li id="m_del"><small>b</small><a>Borrar palabra</a></li><p id="sel"></p><p id="ty"></p></ul></div>
</body></html>
