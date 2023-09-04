<?php
//Creado con Ardora - www.webardora.net
//bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
//para otros usos contacte con el autor
if (file_exists("../../../../php/paraUsu.php")){require("../../../../php/paraUsu.php");};if (file_exists("../../../php/paraUsu.php")){require("../../../php/paraUsu.php");};$slogin_Username=decod($_SESSION["Username"],keynum);
function dameValor($username, $tipo){$u=encod($username,keynum);$db=new SQLite3(profUname."../db/usuarios.db");$result=$db->query("SELECT * FROM users WHERE username='$u'");$res=$result->fetchArray(SQLITE3_ASSOC);
if (strtoupper (trim ($tipo)) == strtoupper (trim ("NOM"))) {return (decod($res["fullsusername"],keynum));}
if (strtoupper (trim ($tipo)) == strtoupper (trim ("CUR"))) {return (decod($res["cur"],keynum));}
if (strtoupper (trim ($tipo)) == strtoupper (trim ("GRU"))) {return (decod($res["gru"],keynum));}
if (strtoupper (trim ($tipo)) == strtoupper (trim ("TIP"))) {return (decod($res["usertype"],keynum));}
}
?>
