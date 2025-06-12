<?php
function phunuonline_com_vn($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('img') as $e) $e->src = 'http://www.phunuonline.com.vn'.$e->src;
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		foreach($html->find('link') as $e) $e->outertext = '';
		$xata['title'] = strip_tags($html->find('.newsTitle', 0)->innertext);
		$xata['data'] = $html->find('.pageImgCont', 0)->innertext;
		return $xata;
	}