<?
$id = empty($_GET['id'])?1:intval($_GET['id']);
$db->connect(db_hostname,db_username,db_password,db_database);
$db->query("SET NAMES 'utf8';");
$item = $db->fetch_first("SELECT * FROM `". db_tablepre ."title` WHERE `title_id` = '$id' LIMIT 0,1;");
$item['content'] = file_get_contents("xdata/".$item['title_cid']."/".$item['title_id'].".x");
$site['title'] = $site_name." &raquo; ".htmlspecialchars($item['title_title']); 
// print_r($item);
$smarty->assign('site', $site);
$smarty->assign('item', $item);
$smarty->display('tpl.view.php');