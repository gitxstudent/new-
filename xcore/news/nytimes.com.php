<?php
function nytimes_com($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script,nyt_pf_inline') as $e) $e->outertext = '';
		foreach($html->find('.articleHeadline,.byline,.articleTools,.dateline,.last,.articleFooter') as $e) $e->outertext = '';
		$xata['title'] = strip_tags($html->find('nyt_headline', 0)->innertext);
		foreach($html->find('.articleBody') as $e) $xata['data'] .= $e->innertext ." ";
		$xata['data'] = killline($xata['data']);
		return $xata;
	}