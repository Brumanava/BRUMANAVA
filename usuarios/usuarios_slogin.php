<!--Creado con Ardora - www.webardora.net
bajo licencia Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
para otros usos contacte con el autor-->
<?php include("usuarios_para.php"); ?><html lang="es">
<head><meta charset="utf-8" /><title>Brumanava</title>
<link type="text/css" href="usuarios/css/ardoraLogin.css" rel="stylesheet"/>
</head><body><div id="cabeceira"><h1>Brumanava</h1><p></p></div>
<div id="dialog"><form id="entraUsu" name="entraUsu" method="post" action="<?php echo $ctrl_usu.'/'.$ctrl_usu.'_val.php'; ?>" class="formLogin">
<p id="validateTips">Información</p>
<div class="iconForm" title="User"><p>U</p></div>
<input type="text" name="slogin_POST_username" id="name" placeholder="Nombre usuario/a" required value="<?php if (isset($_GET["usu"])==""){ echo "";}else{echo $_GET["usu"];}?>"/>
<div class="iconForm" title="Pass"><p>c</p></div>
<input type="password" name="slogin_POST_password" id="password" placeholder="Contraseña" required value="" class="text ui-widget-content ui-corner-all"/>
<p><input type="submit" name="submit" value="Enter"></p>
<div id="mensaxe"><?php if (isset($_GET["estado"])==1){
echo '<div class="iconForm" id="warning_i"><p>a</p></div><div id="warning_m"><p>'.$erroLogin.'</p></div>';} ?>
</div></form></div></body></html>
