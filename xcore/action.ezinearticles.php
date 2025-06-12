<?
function ezinearticles_post($url){
	$data = xgateway::xcurl($url,$url,"","","FF","");
	list($f,$l) = explode("Article Submitted On: ",$data);
	list($f,$l) = explode("	</font>",$l);
	$array['date'] = strtotime(trim($f));
	$html = str_get_html($data);
	$array['url'] = trim($url);
	$array['title'] = trim($html->find(".art_title",0)->innertext);
	$array['author'] = str_replace("/?expert=","",trim($html->find("div.copyright",0)->find("a",0)->href));
	$array['content'] = trim($html->find("#body",0)->innertext);
	return $array;
}
function ezinearticles_getpage($url){
	$data = xgateway::xcurl($url,$url,"","","FF","");
	$html = str_get_html($data);
	foreach($html->find("li") as $li){
		$post_url = "http://ezinearticles.com".trim($li->find("a",0)->href);
		if(!empty($post_url)) $array[] = $post_url;
	}
	return $array;
}
function ezinearticles_writecontent($file,$path,$content){
	$file = "xdata/".$path."/".$file."";
	@mkdir("xdata/".$path);
	$fp = @fopen($file,"w");
	@fwrite($fp,$content);
	@fclose($fp);
	return true;
}