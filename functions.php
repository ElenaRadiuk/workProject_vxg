<?

add_action('wp', 'customRedirect');

function customRedirect() {

  if(is_page( 62 ) || is_page( 123 )){
    wp_redirect( "https://www.videoexpertsgroup.com", 301 );
    exit;
  }

}



function enqueue_styles() {
  if ( is_page( 539 )||is_page( 731 ) ) {
    wp_enqueue_style('whitesquare-style', get_stylesheet_uri());
    wp_register_style('videojs', get_template_directory_uri() .'/webplayer/vxgcloudplayer-latest.min.css');
    wp_enqueue_style('videojs');
//    wp_register_style('videojs', get_template_directory_uri() .'/css/videojs-5.18.3.min.css');
//    wp_enqueue_style('videojs');
    wp_register_style('arcticmodal', get_template_directory_uri() .'/css/jquery.arcticmodal-0.3.css');
    wp_enqueue_style('arcticmodal');
    wp_register_style('hint', get_template_directory_uri() .'/css/hint-2.4.1.min.css');
    wp_enqueue_style('hint');
//    wp_register_style('vxgcloudplayer', get_template_directory_uri() .'/css/vxgcloudplayer.css');
//    wp_enqueue_style('vxgcloudplayer');

  } else {

      wp_register_style('css-bootstrap', get_template_directory_uri() .'/bootstrap/css/styleb.css');
      wp_enqueue_style('css-bootstrap');

    wp_enqueue_style('whitesquare-style', get_stylesheet_uri());

//      wp_register_style('switch-style', get_template_directory_uri() .'/css/toggle-switch.css');
//      wp_enqueue_style('switch-style');

    wp_register_style('font-style', 'https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600');
    wp_enqueue_style('font-style');

      wp_register_style('fullPage', get_template_directory_uri() .'/css/jquery.fullPage.css');
      wp_enqueue_style('fullPage');


      wp_register_style('fontawesomecss', get_template_directory_uri() .'/font-awesome/css/font-awesome.min.css');
      wp_enqueue_style('fontawesomecss');


    wp_register_style('player', 'https://www.videoexpertsgroup.com/nacl_player_api/vxgplayer-1.8.21.min.css');
    wp_enqueue_style('player');




  }
}
add_action('wp_enqueue_scripts', 'enqueue_styles');

add_theme_support( 'post-thumbnails' );


register_nav_menu( 'menu', 'topMenu' );


function wpb1_adding_scripts() {

  if ( is_page( 539 ) ) {
    wp_register_script('videojs', get_template_directory_uri().'/webplayer/vxgcloudplayer-latest.min.js', '', '1.1', false);
    wp_enqueue_script('videojs');
    wp_register_script('additional', get_template_directory_uri() . '/webplayer/additional.js', ['videojs'], '1.1', false);
    wp_enqueue_script('additional');
//    wp_deregister_script('jquery');
    wp_register_script('jquery', get_template_directory_uri() .'/js/jquery-3.1.0.min.js', '', '1.1', false);
    wp_enqueue_script('jquery');
    wp_register_script('arcticmodal', get_template_directory_uri() .'/webplayer/jquery.arcticmodal-0.3.min.js', ['jquery'], '1.1', false);
    wp_enqueue_script('arcticmodal');
//    wp_register_script('CloudAPI', get_template_directory_uri() .'/js/CloudAPI.min.js', ['jquery'], '1.1', true);
//    wp_enqueue_script('CloudAPI');
//    wp_register_script('CloudAPI', get_template_directory_uri() .'/js/CloudAPI.min.js', ['jquery'], '1.1', true);
//    wp_enqueue_script('CloudAPI');
//    wp_register_script('vxgcloudplayer', get_template_directory_uri() .'/js/vxgcloudplayer-1.0.5.js', ['jquery'], '1.1', true);
//    wp_enqueue_script('vxgcloudplayer');
    wp_register_script('customjs', get_template_directory_uri() . '/webplayer/customjs.js', ['jquery'], '1.1', false);
    wp_enqueue_script('customjs');
    wp_register_script('custom', get_template_directory_uri() . '/js/custom.js', ['jquery'], '1.1', false);
    wp_enqueue_script('custom');


  } else {

    wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', '', '1.1', true);
    wp_enqueue_script('jquery');
    wp_register_script('bootstrap', get_template_directory_uri() . '/bootstrap/js/bootstrap.min.js', ['jquery'], '1.1', true);
    wp_enqueue_script('bootstrap');
    wp_register_script('masonry', get_template_directory_uri() . '/js/masonry.pkgd.min.js', ['jquery'], '1.1', true);
    wp_enqueue_script('masonry');

    wp_register_script('fullPage', get_template_directory_uri() . '/js/jquery.fullPage.js', ['jquery'], '1.1', true);
    wp_enqueue_script('fullPage');
    wp_register_script('custom', get_template_directory_uri() . '/js/custom.js', ['jquery'], '1.1', true);
    wp_enqueue_script('custom');

    wp_register_script('player', 'https://www.videoexpertsgroup.com/nacl_player_api/vxgplayer-1.8.31.min.js', '', '1.1', true);
    wp_enqueue_script('player');
  }
}

add_action( 'wp_enqueue_scripts', 'wpb1_adding_scripts' );

function add_image_class($class){
  $class .= ' img-responsive center-block';
  return $class;
}
add_filter('get_image_tag_class','add_image_class');


function add_posttype_slug_template( $single_template ){

  if( in_category( 'newspage_article' ) ){
    $single_template = locate_template( 'single-fullnews.php' );
  }

  return $single_template;
}
add_filter( 'single_template', 'add_posttype_slug_template' );

add_filter( 'script_loader_tag', function ( $tag, $handle ) {

//  if ( 'contact-form-7' !== $handle )
//    return $tag;

  return str_replace( ' src', ' defer="defer" src', $tag );
}, 10, 2 );


function previous_posts_from_tax($post_num=5, $format='', $cache='', $tax='category', $post_type='post'){
	global $post, $wpdb;

	$cache_key = (string) md5( __FUNCTION__ . $post->ID );
	$cache_flag = __FUNCTION__;
	if ( $cache && $cache_out = wp_cache_get($cache_key, $cache_flag) )
		return $cache_out;

	$tax_id = "SELECT term_id FROM $wpdb->term_relationships rl LEFT JOIN $wpdb->term_taxonomy tx ON (rl.term_taxonomy_id = tx.term_taxonomy_id) WHERE object_id = {$post->ID} AND tx.taxonomy = '$tax' LIMIT 1";
	$same_join = "SELECT ID, post_title, post_date, comment_count, guid
	FROM $wpdb->posts p
		LEFT JOIN $wpdb->term_relationships rel ON (p.ID = rel.object_id)
		LEFT JOIN $wpdb->term_taxonomy tax ON (rel.term_taxonomy_id = tax.term_taxonomy_id)";
	$same_and = "AND tax.term_id = ($tax_id)
		AND tax.taxonomy = '$tax'
		AND p.post_status = 'publish'
		AND p.post_type = '$post_type'
		ORDER BY p.post_date DESC";
	$sql = "$same_join
	WHERE p.post_date < '{$post->post_date}'
		$same_and
	LIMIT $post_num";
	$res = $wpdb->get_results($sql);

	$count_res = count($res);
	// если количество меньше нужного, делаем 2-й запрос (кольцевая перелинковка)
	if ( !$res || $count_res<$post_num ){
		foreach ($res as $id)
			$exclude .= ','.$id->ID;
		$sql = "$same_join
		WHERE p.ID NOT IN ({$post->ID}{$exclude})
			$same_and
		LIMIT ".($post_num-$count_res);
		$res2 = $wpdb->get_results($sql);

		$res = array_merge($res,$res2);
	}

	if(!$res)
		return false;

	// Формировка вывода
	if ($format)
		preg_match ('!\{date:(.*?)\}!', $format, $date_m);
	foreach ($res as $pst){
		$x = ($x == 'li1') ?  'li2' : 'li1';
		$Title = stripslashes($pst->post_title);
		$a = "<a href='". get_permalink($pst->ID) ."' title='{$Title}'>"; //get_permalink($pst->ID) меняем на $pst->guid если настроено поле guid

		if($format){
			$Sformat = strtr($format, array(
				'{title}'     => $Title
				,'{a}'        => $a
				,'{/a}'       => '</a>'
				,'{comments}' => ($pst->comment_count==0) ? '' : $pst->comment_count
			));
			if($date_m)
				$Sformat = str_replace($date_m[0], apply_filters('the_time', mysql2date($date_m[1], $pst->post_date)), $Sformat);
		}
		else
			$Sformat = "$a$Title</a>";

		$out .= "\t<li class='$x'>$Sformat</li>\n";
	}

	if($cache) wp_cache_add($cache_key, $out, $cache_flag);

	return '<ul>'. $out .'</ul>';
}


if (!current_user_can('admin')):
    show_admin_bar(false);
endif;




function wph_add_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'wph_add_mime_types');


remove_filter( 'the_content', 'wpautop' );
?>
