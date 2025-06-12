<?php
	// ini_set("memory_limit","3048M");
	// error_reporting(0);
	set_time_limit(0);
	define('ROOTPATH', str_replace("\\","/",dirname(__FILE__)) );
	define( 'DS', DIRECTORY_SEPARATOR );
	define( 'DEBUG', true );
	define('db_hostname','localhost');
	define('db_username','root');
	define('db_password','congacon');
	define('db_database','master_news');
	define('db_tablepre','news_');
	$site_name = "Cucde.com";
	$site_domain = "http://cucde.com";
	$site_path = "/news";
	$site_fullpath = "http://cucde.com/news";
	$site['surl'] = $site_fullpath;
	$site['menu'] =  file_get_contents(ROOTPATH . "/xcache/categories.html");
	$site['footer'] = "&copy; ".date("Y")." $site_name";
	$site['google'] = "verify-key";
	$site['yahoo'] = "verify-key";
	$site['bing'] = "verify-key";
	foreach(glob("./xcore/*.php") as $plugin) include($plugin);
	$db = new dbstuff;
	$db->connect(db_hostname,db_username,db_password,db_database);
	
	$db->close();
	if(DEBUG === false){
		foreach(glob(ROOTPATH . DS . "templates_c/*.php") as $template_cache){
			@unlink($template_cache);
		}
	}
	
	
?>
