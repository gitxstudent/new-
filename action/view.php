<?php
$id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
$itemRows = $db->query(
    "SELECT * FROM `".DB_TABLE_PREFIX."title` WHERE title_id = :id LIMIT 1",
    ['id' => $id]
);
$item = $itemRows[0] ?? [];
$file = "xdata/" . ($item['title_cid'] ?? '') . "/" . ($item['title_id'] ?? '') . ".x";
$item['content'] = is_file($file) ? file_get_contents($file) : '';
$site['title'] = $site_name . ' &raquo; ' . htmlspecialchars($item['title_title'] ?? '', ENT_QUOTES, 'UTF-8');

$smarty->assign('site', $site);
$smarty->assign('item', $item);
$smarty->display('tpl.view.php');
