<?php
$cid = isset($_GET['cid']) ? (int)$_GET['cid'] : 1;
$smarty->caching = 0;
$perpage = 30;
$curpage = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
$offset = ($curpage - 1) * $perpage;

// Fetch category info
$catalog = $db->query(
    "SELECT * FROM `".DB_TABLE_PREFIX."catalog` WHERE catalog_id = :cid LIMIT 1",
    ['cid' => $cid]
);
$catalog = $catalog[0] ?? [];

$where = 'WHERE title_cid = :cid';
$articles = $db->query(
    "SELECT * FROM `".DB_TABLE_PREFIX."title` $where ORDER BY title_date DESC LIMIT $offset,$perpage",
    ['cid' => $cid]
);
$totalRows = $db->query("SELECT COUNT(*) as cnt FROM `".DB_TABLE_PREFIX."title` $where", ['cid' => $cid]);
$total = $totalRows[0]['cnt'] ?? 0;

$catalog['multipage'] = xgateway::multi($total, $perpage, $curpage, '/');
$catalog['multipage'] = preg_replace("|/\?page=(\d+)|", $site['surl']."/c$cid-p$1.html", $catalog['multipage']);
$catalog['multipage'] = str_replace('<a ', "<a style='border:1px solid;display:block;float:left;font-weight:bold;margin:3px;padding:0 3px 0 6px;text-decoration:none;' ", $catalog['multipage']);
$catalog['multipage'] = str_replace("<a style='border:1px solid;display:block;float:left;font-weight:bold;margin:3px;padding:0 3px 0 6px;text-decoration:none;' href=\"javascript:void(0)\"", "<a style='color:Wheat;border:1px solid Wheat;display:block;float:left;font-weight:bold;margin:3px;padding:0 3px 0 6px;text-decoration:none;' href=\"javascript:void(0)\"", $catalog['multipage']);

$value = [];
foreach ($articles as $line) {
    $line['url'] = $site['surl'] . "/a" . $line['title_id'] . "~" . xgateway::seo_url_utf($line['title_title']) . ".html";
    $line['title_tip'] = htmlspecialchars($line['title_title'], ENT_QUOTES, 'UTF-8');
    $file = "xdata/" . $line['title_cid'] . "/" . $line['title_id'] . ".x";
    $line['content'] = is_file($file) ? trim(xgateway::cutstr(strip_tags(file_get_contents($file)), 200)) . "..." : '';
    $value[] = $line;
}

$site['title'] = $site_name . ' &raquo; ' . ($catalog['catalog_name'] ?? '');
if ($curpage > 1) {
    $site['title'] .= ' &raquo; Page - ' . $curpage;
}

$smarty->assign('site', $site);
$smarty->assign('catalog', $catalog);
$smarty->assign('news', $value);
$smarty->display('tpl.category.php');
