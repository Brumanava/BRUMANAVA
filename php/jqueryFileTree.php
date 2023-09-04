<?php
// jQuery File Tree PHP Connector Version 1.01
// Cory S.N. LaViska
// A Beautiful Site (http://abeautifulsite.net/)
// Output a list of files for jQuery File Tree
header("Content-Type: text/html;charset=utf-8");$_POST["dir"] = urldecode($_POST["dir"]);
if( file_exists($_POST["dir"]) ) {$files = scandir($_POST["dir"]);natcasesort($files);if( count($files) > 2 ) {echo "<ul class=\"jqueryFileTree\" style=\"display: none;\">";
foreach( $files as $file ) {if( file_exists($_POST["dir"] . $file) && $file != "." && $file != ".." && is_dir($_POST["dir"] . $file) ) {
echo "<li class=\"directory collapsed\"><a href=\"#\" rel=\"" . htmlentities($_POST["dir"] . $file) . "/\">" . htmlentities($file) . "</a></li>";}}foreach( $files as $file ) {
$extensions=explode(".",$file);if ($extensions[0]!="index"){if( file_exists($_POST["dir"] . $file) && $file != "." && $file != ".." && !is_dir($_POST["dir"] . $file)){
$ext = strtolower(preg_replace("/^.*\./", "", $file));echo "<li class=\"file ext_$ext\"><a href=\"#\" rel=\"" . htmlentities($_POST["dir"] . $file) . "\">" . htmlentities($file) . "</a></li>";}}} echo "</ul>";}}
?>
