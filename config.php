<?php
use NewsApp\Database;

set_time_limit(0);

define('ROOTPATH', str_replace('\\', '/', __DIR__));

define('DEBUG', true);

define('DB_DSN', getenv('DB_DSN') ?: 'mysql:host=localhost;dbname=master_news;charset=utf8');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: 'password');
define('DB_TABLE_PREFIX', 'news_');

require_once __DIR__ . '/src/Database.php';

$site_name   = 'Cucde.com';
$site_domain = 'http://cucde.com';
$site_path   = '/news';
$site_fullpath = $site_domain . $site_path;

$site = [
    'surl'   => $site_fullpath,
    'menu'   => is_file(ROOTPATH . '/xcache/categories.html') ? file_get_contents(ROOTPATH . '/xcache/categories.html') : '',
    'footer' => '&copy; ' . date('Y') . " $site_name",
    'google' => 'verify-key',
    'yahoo'  => 'verify-key',
    'bing'   => 'verify-key',
];

$db = new Database(DB_DSN, DB_USER, DB_PASS);
