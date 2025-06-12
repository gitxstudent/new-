<?
include("config.php");
$scriptname= pathinfo(__FILE__,PATHINFO_BASENAME);
$logname =  pathinfo(__FILE__,PATHINFO_FILENAME).".log";
require ROOTPATH . '/xcore/smarty/Smarty.class.php';
$smarty = new Smarty;
$smarty->compile_check = true;
// $smarty->debugging = false;
// $smarty->use_sub_dirs = false;
// $smarty->caching = false;
// $smarty->compile_check = true;
$action = $_GET['action'];
switch ($action) {
    case 'view':
        include("action/view.php");
		exit();
        break;
    case 'category':
        include("action/category.php");
		exit();
        break;
    case 'category_cache':
        include("action/category_cache.php");
		exit();
        break;
    case 'submit':
        include("action/submit.php");
		exit();
        break;
	case '':
        include("action/category.php");
		exit();
        break;
	
}
