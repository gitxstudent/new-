<?
	include("config.php");
	$scriptname= pathinfo(__FILE__,PATHINFO_BASENAME);
	$logname =  pathinfo(__FILE__,PATHINFO_FILENAME).".log";
	function dantri_vn($url){
		$url = trim($url);
		$data = xgateway::xcurl($url,$url,"","","FF");
		$doc = new DOMDocument;
		libxml_use_internal_errors(TRUE);
		$doc->loadHTML('<meta http-equiv="content-type" content="text/html; charset=utf-8">' . htmlspecialchars_decode($data,ENT_COMPAT));
		libxml_use_internal_errors(FALSE);
		$doc->formatOutput = TRUE;
		$data = str_replace(array(
		'<html><head><meta http-equiv="content-type" content="text/html; charset=utf-8"/></head><body>',
		'</body></html>',
		''
		),'',simplexml_import_dom($doc)->asXML());
		$html = str_get_html($data);
		foreach($html->find('img') as $e) $e->class = null;
		foreach($html->find('img') as $e) $e->width = null;
		foreach($html->find('img') as $e) $e->height = null;
		foreach($html->find('img') as $e) $e->style = null;
		foreach($html->find('img') as $e) $e->src = $e->src;
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->class = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		foreach($html->find('input') as $e) $e->outertext = '';
		foreach($html->find('span') as $e) $e->style = null;
		foreach($html->find('img') as $e) {
			if(!empty($e->src)){
				$xata['thumb'] = $e->src;
			}
		}
		$xata['title'] = trim($html->find('.fon31', 0)->innertext);
		$xata['data'] = trim(str_replace(array("&nbsp;","<p></p>",'&#13;'),array(" ",""),$html->find('.fon34', 0)->innertext));
		$xata['url'] = $url;
		list($f,$l) = explode(",",trim($html->find('.fon7', 0)->innertext));
		list($f,$l) = explode(" - ",trim($l));
		$xata['time'] = strtotime(str_replace("/","-",$f));
		return $xata;
	}
	// print_r(dantri_vn("http://dantri.com.vn/c26/s26-450723/becks-se-khong-ra-san-khi-tottenham-doi-dau-voi-mu.htm"));
	function postnews($url){
		global $db;
		$data = dantri_vn($url);
		$cid = empty($_GET['cid'])?die("empty cid"):$_GET['cid'];
		$title = $data['title'];
		$source = $data['url'];
		$date = $data['time'];
		$message = $data['data'];
		$db->connect(db_hostname,db_username,db_password,db_database);
		$db->query("SET NAMES 'utf8';");
		$check = $db->fetch_first("SELECT * FROM `". db_tablepre ."title` WHERE `title_title` = '$title' LIMIT 0,1;");
		$status = "HAVE";
		if(empty($check)){
			$db->query("INSERT INTO `". db_tablepre ."title` (`title_title` ,`title_date` ,`title_cid`,`title_aid` ,`title_source`) VALUES ('$title','$date','$cid','$aid', '$source');");
			$check = $db->fetch_first("SELECT * FROM `". db_tablepre ."title` WHERE `title_title` = '$title' AND `title_source` = '$source' LIMIT 0,1;");
			$file = "{$check['title_id']}.x";
			$path = "xdata/$cid";
			@mkdir($path);
			$fp =  fopen("$path/$file","w");
			fwrite($fp,$message );
			fclose($fp);
			$status = "IMPORT";
		}
		$db->close();
	}
	$cid = empty($_GET['cid'])?die("empty cid"):$_GET['cid'];
	$page = empty($_GET['page'])?1:intval($_GET['page']);
	$dt_cat = empty($_GET['dt_cat'])?1:$_GET['dt_cat'];
	$next = $scriptname . "?page=". (1 + $page) ."&cid=$cid&dt_cat=$dt_cat";
	echo '<meta http-equiv="Refresh" Content="3; url='.$next.'">';
	echo "<title>$page/$cid</title>";
	$url = "http://dantri.com.vn/$dt_cat/sukien/trang-$page.htm";
	$data = xgateway::xcurl($url,$url,"","","FF");
	$html = str_get_html($data);

	foreach($html->find(".fon6") as $e){
		echo $link = "http://dantri.com.vn".$e->href;
		postnews($link);
		echo "<br>";
	}

	$fp =  fopen($logname.$dt_cat.".log","w");
	fwrite($fp,$page);
	fclose($fp);
	echo '<script>window.location.href = "'.$next.'";</script>';