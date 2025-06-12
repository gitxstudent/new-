<?php
function ngoisao_net($url){
		$data = xcurl($url,$url,"","","FF");
		$html = str_get_html($data);
		foreach($html->find('img') as $e) $e->class = null;
		foreach($html->find('img') as $e) $e->width = null;
		foreach($html->find('img') as $e) $e->height = null;
		foreach($html->find('img[src=/Images/Symbol/Symbol_End_NS.gif]') as $e)$e->outertext = '';
		foreach($html->find('img') as $e) $e->style = null;
		foreach($html->find('img') as $e) $e->src = $url.$e->src;
		foreach($html->find('p') as $e) $e->width = null;
		foreach($html->find('p') as $e) $e->height = null;
		foreach($html->find('p') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->style = null;
		foreach($html->find('div') as $e) $e->width = null;
		foreach($html->find('div') as $e) $e->height = null;
		foreach($html->find('script') as $e) $e->outertext = '';
		$html->find('p[class=Lead]', 0)->outertext ='';
		$xata['title'] = $html->find('p[class=Title]', 0)->innertext;
		$html->find('p[class=Title]', 0)->outertext ='';
		$xata['data'] = $html->find('div[cpms_content=true]', 0)->innertext;
		return $xata;
	}