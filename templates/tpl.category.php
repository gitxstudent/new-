{include file="tpl.header.php"}
<div id="wap" style="margin:0 0 2px;text-align:left;width:76em;padding:0;float:left;">
{include file="tpl.left.php"}
<div id="wap_right" style="border: 1px solid; margin:0;text-align: left; padding: 0pt; float: left; width:57.653em;">
{section name=news loop=$news}
<div id="article_{$news[news].title_id}" class="article_list" style="float: left; border: 1px solid; padding: 10px; width:55em;margin: 5px;">
	<span class="article_title" style="width:55em;float:left;">
		<strong>
		<a href="{$news[news].url}" title="{$news[news].title_tip}" style="color:#DDDDDD;text-decoration:none;">{$news[news].title_title}</a>
		</strong>
	</span>
	<span class="article_content" style="width:55em;float:left;">
		{$news[news].content}
	</span>
	<span class="article_detail" style="width:55em;float:left;">
		<b>Viewed: {$news[news].title_view}</b>
		<b>Publish Date:{$news[news].title_date|date_format:"%A, %B %e, %Y"}</b>
	</span>
</div>
{/section}
{$catalog.multipage}
<div style="clear:both;" class="clearfix"></div>
</div>
<div style="clear:both;" class="clearfix"></div>
</div>
{include file="tpl.footer.php"}