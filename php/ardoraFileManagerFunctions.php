<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
header("Content-Type: text/html;charset=utf-8");
function sizeAvailable($sF,$sM,$sizeF){if (sizeDir("../".$sF)+$sizeF<$sM){return "ok";}else{return "no";}}
function sizeDir($path){if(!is_dir($path) || !is_readable($path)){if(is_file($path) || file_exists($path)){$size = filesize($path);} else {return false;}} else {
$path_stack[] = $path;$size = 0;do {$path   = array_shift($path_stack);$handle = opendir($path);while(false !== ($file = readdir($handle))) {if($file != "." && $file != ".." && is_readable($path . DIRECTORY_SEPARATOR . $file)) {
if(is_dir($path . DIRECTORY_SEPARATOR . $file)){ $path_stack[] = $path . DIRECTORY_SEPARATOR . $file; }$size += filesize($path . DIRECTORY_SEPARATOR . $file);}} closedir($handle);} while (count($path_stack)> 0);} return $size;}
function format($sizeDir,$retstring=null){$sizes = array("B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");if($retstring == null) { $retstring = "%01.2f %s"; } $lastsizestring = end($sizes);foreach($sizes as $sizestring){if($sizeDir <1024){ break; } if($sizestring != $lastsizestring){ $sizeDir /= 1024; }}
if($sizestring == $sizes[0]){ $retstring = "%01d %s"; } $sizeFormated = sprintf($retstring, $sizeDir, $sizestring);return $sizeFormated;}
function deleteDir($dir){if (is_dir($dir)) {$objects = scandir($dir);foreach ($objects as $object) {if ($object != "." && $object != "..") {if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink   ($dir."/".$object);}} reset($objects);rmdir($dir);}}
function normaliza($cadena){$originales = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿRr";$modificadas ="aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr";$cadena = utf8_decode($cadena);$cadena = strtr($cadena, $originales, $modificadas);return utf8_encode($cadena);}
?>
