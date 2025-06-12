<?php /* Smarty version 2.6.26, created on 2011-02-11 13:55:10
         compiled from tpl.category.php */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'date_format', 'tpl.category.php', 17, false),)), $this); ?>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "tpl.header.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<div id="wap" style="margin:0 0 2px;text-align:left;width:76em;padding:0;float:left;">
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "tpl.left.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>
<div id="wap_right" style="border: 1px solid; margin:0;text-align: left; padding: 0pt; float: left; width:57.653em;">
<?php unset($this->_sections['news']);
$this->_sections['news']['name'] = 'news';
$this->_sections['news']['loop'] = is_array($_loop=$this->_tpl_vars['news']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['news']['show'] = true;
$this->_sections['news']['max'] = $this->_sections['news']['loop'];
$this->_sections['news']['step'] = 1;
$this->_sections['news']['start'] = $this->_sections['news']['step'] > 0 ? 0 : $this->_sections['news']['loop']-1;
if ($this->_sections['news']['show']) {
    $this->_sections['news']['total'] = $this->_sections['news']['loop'];
    if ($this->_sections['news']['total'] == 0)
        $this->_sections['news']['show'] = false;
} else
    $this->_sections['news']['total'] = 0;
if ($this->_sections['news']['show']):

            for ($this->_sections['news']['index'] = $this->_sections['news']['start'], $this->_sections['news']['iteration'] = 1;
                 $this->_sections['news']['iteration'] <= $this->_sections['news']['total'];
                 $this->_sections['news']['index'] += $this->_sections['news']['step'], $this->_sections['news']['iteration']++):
$this->_sections['news']['rownum'] = $this->_sections['news']['iteration'];
$this->_sections['news']['index_prev'] = $this->_sections['news']['index'] - $this->_sections['news']['step'];
$this->_sections['news']['index_next'] = $this->_sections['news']['index'] + $this->_sections['news']['step'];
$this->_sections['news']['first']      = ($this->_sections['news']['iteration'] == 1);
$this->_sections['news']['last']       = ($this->_sections['news']['iteration'] == $this->_sections['news']['total']);
?>
<div id="article_<?php echo $this->_tpl_vars['news'][$this->_sections['news']['index']]['title_id']; ?>
" class="article_list" style="float: left; border: 1px solid; padding: 10px; width:55em;margin: 5px;">
	<span class="article_title" style="width:55em;float:left;">
		<strong>
		<a href="<?php echo $this->_tpl_vars['news'][$this->_sections['news']['index']]['url']; ?>
" title="<?php echo $this->_tpl_vars['news'][$this->_sections['news']['index']]['title_tip']; ?>
" style="color:#DDDDDD;text-decoration:none;"><?php echo $this->_tpl_vars['news'][$this->_sections['news']['index']]['title_title']; ?>
</a>
		</strong>
	</span>
	<span class="article_content" style="width:55em;float:left;">
		<?php echo $this->_tpl_vars['news'][$this->_sections['news']['index']]['content']; ?>

	</span>
	<span class="article_detail" style="width:55em;float:left;">
		<b>Viewed: <?php echo $this->_tpl_vars['news'][$this->_sections['news']['index']]['title_view']; ?>
</b>
		<b>Publish Date:<?php echo ((is_array($_tmp=$this->_tpl_vars['news'][$this->_sections['news']['index']]['title_date'])) ? $this->_run_mod_handler('date_format', true, $_tmp, "%A, %B %e, %Y") : smarty_modifier_date_format($_tmp, "%A, %B %e, %Y")); ?>
</b>
	</span>
</div>
<?php endfor; endif; ?>
<?php echo $this->_tpl_vars['catalog']['multipage']; ?>

<div style="clear:both;" class="clearfix"></div>
</div>
<div style="clear:both;" class="clearfix"></div>
</div>
<?php $_smarty_tpl_vars = $this->_tpl_vars;
$this->_smarty_include(array('smarty_include_tpl_file' => "tpl.footer.php", 'smarty_include_vars' => array()));
$this->_tpl_vars = $_smarty_tpl_vars;
unset($_smarty_tpl_vars);
 ?>