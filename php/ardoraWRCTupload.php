<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
session_cache_limiter("nocache,private");session_start();$slogin_noauthpage=0;$slogin_pagetitle="";include_once ("paraUsu.php");
include_once("../../php/paraUsu.php");$db=new SQLite3("../../db/usuarios.db") or die("Unable to open database");$usr=$_SESSION["Username"];
$result=$db->query("SELECT * FROM users WHERE username='$usr'");$res=$result->fetchArray(SQLITE3_ASSOC);$nus=decod($res["username"],keynum);$ntyp=decod($res["usertype"],keynum);include_once ("cfg.php");
if(isset($_FILES["file"]) and !$_FILES["file"]["error"]){$fname="???";$fname=$_POST["name"];
if ($ntyp=="profe" || $ntyp=="admin"){move_uploaded_file($_FILES["file"]["tmp_name"], "../".profeFold.$nus.$_POST["dir"]. $fname);$newDir=".."."/".profeFold.$nus.$_POST["dir"];}
else{move_uploaded_file($_FILES["file"]["tmp_name"], "../".aluFold.$nus.$_POST["dir"]. $fname);$newDir=".."."/".aluFold.$nus.$_POST["dir"];}
$idNum=0;$theXmlFile=".."."/".xmlFile;$new=true;if (file_exists($theXmlFile)){$xml=new DOMDocument("1.0", "utf-8");$xml->formatOutput = true;$xml->preserveWhiteSpace = false;$xml->load($theXmlFile);
$query="//files/file[path='".$newDir."']";$xpath = new DomXpath($xml);$tiFiles=$xpath->query($query);foreach($tiFiles as $item){$new=false;$newItem = $xml->createElement("file");$newItem->appendChild($xml->createElement("tab","1"));$newItem->appendChild($xml->createElement("path",$newDir.$fname));
$newItem->appendChild($xml->createElement("usr",$nus));$newItem->appendChild($xml->createElement("datetime",date("d-m-Y H:i:s")));$com=$newItem->appendChild($xml->createElement("coment"));$com->appendChild($xml->createCDATASection($_POST["coment"]));$item->parentNode->replaceChild($newItem,$item);$xml->save($theXmlFile);}}
else{$xml=new XMLWriter();touch($theXmlFile);$theXmlFile = realpath($theXmlFile);$xml->openURI($theXmlFile);$xml->startDocument();$xml->startElement("files");$xml->endElement();$xml->endDocument();$xml->flush();}
if ($new){$xml=new DOMDocument("1.0", "utf-8");$xml->formatOutput=true;$xml->preserveWhiteSpace=false;$xml->load($theXmlFile);$newItem=$xml->createElement("file");$newItem->appendChild($xml->createElement("tab","1"));$newItem->appendChild($xml->createElement("path",$newDir.$fname));
$newItem->appendChild($xml->createElement("usr",$nus));$newItem->appendChild($xml->createElement("datetime",date("d-m-Y H:i:s")));$com = $newItem->appendChild($xml->createElement("coment"));$com->appendChild($xml->createCDATASection($_POST["coment"]));$xml->getElementsByTagName("files")->item(0)->insertBefore($newItem, $element);$xml->save($theXmlFile);}}
?>
