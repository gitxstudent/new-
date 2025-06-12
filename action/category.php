<?php
$cid =  empty($_GET['cid'])?1:intval($_GET['cid']);
$smarty->caching = 0;
$smarty->cache_lifetime = 0; 
$db->connect(db_hostname,db_username,db_password,db_database);
$db->query("SET NAMES 'utf8';");
$perpage = 30;
$curpage = empty($_GET['page'])?1:$_GET['page'];
$pages = (($curpage-1) * $perpage);
$catalog = $db->fetch_first("SELECT * FROM `". db_tablepre ."catalog` WHERE `catalog_id` = '$cid' LIMIT 0,1;");
$where = "WHERE title_cid=$cid";
$querys = "SELECT * FROM `". db_tablepre ."title` $where ORDER BY `title_date` DESC LIMIT $pages,$perpage;";
$query = $db->query($querys);
$total = $db->num_rows($db->query("SELECT * FROM `". db_tablepre ."title` $where"));
$catalog['multipage'] = xgateway::multi($total, $perpage, $curpage,'/');
$catalog['multipage'] = preg_replace("|\/\?page=(\d+)|",$site_fullpath."/c$cid-p\\1.html\"",$catalog['multipage']);;
$catalog['multipage'] = str_replace("<a ","<a style='border:1px solid;display:block;float:left;font-weight:bold;margin:3px;padding:0 3px 0 6px;text-decoration:none;' ",$catalog['multipage']);;
$catalog['multipage'] = str_replace("<a style='border:1px solid;display:block;float:left;font-weight:bold;margin:3px;padding:0 3px 0 6px;text-decoration:none;' href=\"javascript:void(0)\"","<a style='color:Wheat;border:1px solid Wheat;display:block;float:left;font-weight:bold;margin:3px;padding:0 3px 0 6px;text-decoration:none;' href=\"javascript:void(0)\"",$catalog['multipage']);;
$i = 0;
while ($line = $db->fetch_array($query))
{	
	$line['url'] = $site_fullpath."/a".$line['title_id']."~".xgateway::seo_url_utf($line['title_title']).".html";
	$line['title_tip'] = htmlspecialchars($line['title_title']);
	$line['content'] = trim(xgateway::cutstr(strip_tags(file_get_contents("xdata/".$line['title_cid']."/".$line['title_id'].".x")),200))."...";
	$value[] = $line;
	$i = $i+1;
}
$db->close();
$site['title'] = $site_name." &raquo; ".$catalog['catalog_name']; 
if($_GET['page'] > 1) $site['title'] = $site_name." &raquo; ".$catalog['catalog_name'] ." &raquo; Page - ".htmlspecialchars($_GET['page']); 

$smarty->assign('site', $site);
$smarty->assign('catalog', $catalog);
$smarty->assign('news', $value);
$smarty->display('tpl.category.php');