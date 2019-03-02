<?php
/**
 * Display question list header
 * Shows sorting, search, tags, category filter form. Also shows a ask button.
 *
 * @package AnsPress
 * @author  Rahul Aryan <support@anspress.io>
 */

?>

<div class="row">
<div class="ap-list-head clearfix">


    <div class="col-xs-12 col-md-10">
    <?php ap_get_template_part( 'search-form' ); ?>
    </div>

    <div class="col-xs-12 col-md-10">
	<div class="pull-right">
		<?php ap_ask_btn(); ?>
	</div>
    </div>

    <div class="col-xs-12 col-md-10">
	<?php ap_list_filters(); ?>
    </div>
</div>
</div>
