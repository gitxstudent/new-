<?php
function vnmedia_vn($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('img') as $e) $e->src = $e->src;
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		$xata['title'] = strip_tags($html->find('.big', 0)->innertext);
		$xata['data'] = $html->find('.news_body', 0)->innertext;
		return $xata;
	}