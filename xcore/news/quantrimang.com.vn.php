<?php
function quantrimang_com_vn($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('img') as $e) $e->src = 'http://www.quantrimang.com.vn'.$e->src;
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		$xata['title'] = strip_tags($html->find('.Title_article', 0)->innertext);
		$xata['data'] = $html->find('.infoDetail', 0)->innertext;
		return $xata;
	}