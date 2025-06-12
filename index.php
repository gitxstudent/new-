<?php
require_once __DIR__ . '/config.php';
require_once ROOTPATH . '/xcore/smarty/Smarty.class.php';

$scriptname = pathinfo(__FILE__, PATHINFO_BASENAME);
$logname    = pathinfo(__FILE__, PATHINFO_FILENAME) . '.log';

$smarty = new Smarty();
$smarty->compile_check = true;

$allowed = ['view', 'category', 'category_cache', 'submit'];
$action  = isset($_GET['action']) && in_array($_GET['action'], $allowed) ? $_GET['action'] : 'category';

switch ($action) {
    case 'view':
        require 'action/view.php';
        break;
    case 'category_cache':
        require 'action/category_cache.php';
        break;
    case 'submit':
        require 'action/submit.php';
        break;
    case 'category':
    default:
        require 'action/category.php';
        break;
}
