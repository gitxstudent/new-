<?php
function vn24h_com_vn($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('img') as $e) $e->class = null;
		foreach($html->find('img') as $e) $e->width = null;
		foreach($html->find('img') as $e) $e->height = null;
		foreach($html->find('img') as $e) $e->style = null;
		foreach($html->find('p') as $e) $e->class = null;
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		$xata['title'] = $html->find('h1[class=baiviet-title]', 0)->innertext;
		$xata['content'] = $html->find('div[class=text-content]', 0)->find('div', 0)->innertext;
		return $xata;
	}