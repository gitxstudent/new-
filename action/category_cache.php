<?php
$category_cache = ROOTPATH . '/xcache/categories.html';
$filetime = filemtime($category_cache);
$crontime = time() - $filetime;
$timeendcron = 30 * 24 * 60 * 60;
if(!file_exists($category_cache) OR $crontime > $timeendcron){
	$db->connect(db_hostname,db_username,db_password,db_database);
	$db->query("SET NAMES 'utf8';");
	$query = $db->query("SELECT * FROM `". db_tablepre ."catalog` ORDER BY `catalog_id` ASC");
	while ($line = $db->fetch_array($query))
	{	
		$x = $x+1;
		$i = $line['catalog_sub'];
		$array[$i][$x] = $line;
	}
	$db->close();
	ob_start();
	echo '<div class="menu_left">';
	foreach($array as $key=>$value){
		$valuex = $value;
		$menu_1 = array_splice($value,0);
		echo '<a style="color:BlanchedAlmond;display:block;font-weight:bold;height:16px;margin:0;padding:3px 10px 2px;text-decoration:none;width:200px;" href='.$site_fullpath.'/c'.$menu_1[0]['catalog_id'].'-p0.html  onclick="xtab(\'menuacc_'.$menu_1[0]['catalog_id'].'\',\'menu\'); return false;" >&#9660; '.$menu_1[0]['catalog_name'].'</a>';
		echo '<div id=menuacc_'.$menu_1[0]['catalog_id'].' class=menu style=""display:none;>';
			foreach($valuex as $skey=>$svalue){
				echo '<a style="display:block;line-height:16px;overflow:hidden;font-weight:bold;height:16px;margin:0;padding:3px 10px 2px;text-decoration:none;width:200px;color:DarkOrange;" href='.$site_fullpath.'/c'.$svalue['catalog_id'].'-p0.html>&times; ';
				echo ''.ereg_replace("[ ]+"," ",str_replace(array("\n","\r","\t")," ",$svalue['catalog_name'])).'</a>';
			}
		echo '</div>';
	}
	echo '</div>';
	$category_content = $out2 = ob_get_contents();
	ob_end_clean();
	$fp = fopen($category_cache,"w");
	fwrite($fp,$category_content);
	fclose($fp);
	echo $category_content;
}
else
{
	echo file_get_contents($category_cache);
}