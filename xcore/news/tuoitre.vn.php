<?php
function tuoitre_vn($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		foreach($html->find('a[scrollbars=yes]') as $e) $e->outertext = '';
		$xata['title'] = strip_tags($html->find('.pTitle', 0)->innertext);
		foreach($html->find('.pTitle') as $e) $e->outertext = '';
		$xata['data'] = $html->find('#divContent', 0)->innertext;
		return $xata;
	}