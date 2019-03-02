<?php
/*
Template Name: services
*/
?>

<?php get_header(); ?>

  <div class="wrapper">

    <!--
   *
   *
   *
   *           START Main photo BLOCK
   *
   *
   *
   *
    -->

    <div class="container-fluid">
      <section class="row">
        <div class="hidden-xs service_main_photo">
          <div class="for_gradient">


            <?php $the_query = new WP_Query('p=83'); ?>
            <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>

              <?php the_post_thumbnail('full', array('class' => 'img-responsive')); ?>



              <div class="text_service_main_photo text-center">
                <h1><?php the_title(); ?></h1>
                <h4> <?=get_the_excerpt();?> </h4>

              </div>

            <?php endwhile; ?>
          </div>
        </div>
        <div class="visible-xs service_main_photo">
          <?php $the_query = new WP_Query('p=83'); ?>
          <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>
            <div class="for_gradient">
              <div style="background: url('<?=get_the_post_thumbnail_url()?>') center center no-repeat; background-size: cover; height:500px;"></div>
              <div class="text_service_main_photo text-center">
                <h1><?php the_title(); ?></h1>
                <h4><?=get_the_excerpt();?></h4>

              </div>

            </div>
          <?php endwhile; ?>
        </div>
      </section>
    </div>
    <!--
*
*
*
*           END Main photo BLOCK
*
*
*
*
-->


    <!--
    *
    *
    *
    *           START TECHNOLOGIES BLOCK
    *
    *
    *
    *
     -->


    <div class="container block_service_video">
      <div class="row">

        <?php $pc = new WP_Query('cat=15&orderby=date&posts_per_page=4'); ?>
        <?php while ($pc->have_posts()) : $pc->the_post(); ?>

          <div class="col-xs-12 col-sm-6 col-md-3">


            <h3><?php the_title(); ?></h3>
            <div class="service_video_text"> <?php the_content(); ?> </div>

          </div>
        <?php endwhile; ?>

      </div>
    </div>

    <!--
    *
    *
    *
    *           END TECHNOLOGIES BLOCK
    *
    *
    *
    *
     -->

    <!--
    *
    *
    *
    *           START VXG Cloud Web Player BLOCK
    *
    *
    *
    *

    <div class="container-fluid">
      <section class="row bg_green green">
        <div class="col-xs-12">
          <?php $the_query = new WP_Query('p=554'); ?>
          <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>

            <div class="text_service_plugIn text-center">
              <h2><?php the_title(); ?></h2>

              <div class="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6">
                <p> <?=get_the_excerpt();?> </p>
                <?php $servpPlugIn = get_post_custom_values('servicesp_PlugIn_link'); ?>
                <div class="btn"> <?php echo $servpPlugIn[0];?> </div>
              </div>

            </div>

            <div class="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8">
              <?php the_post_thumbnail('full', array('class' => 'img-responsive center-block')); ?>
            </div>

          <?php endwhile; ?>

        </div>
      </section>
    </div>


   *
   *
   *
   *           END VXG Cloud Web Player BLOCK
   *
   *
   *
   *
    -->

    <!--
   *
   *
   *
   *           START Media Plugin for Chrome OS BLOCK
   *
   *
   *
   *
    -->


    <div class="container-fluid">
      <section class="row service_plugIn">
        <div class="col-xs-12">
          <?php $the_query = new WP_Query('p=96'); ?>
          <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>

            <div class="text_service_plugIn text-center">
              <h2><?php the_title(); ?></h2>

              <div class="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-3 col-md-6">
                <p> <?=get_the_excerpt();?> </p>
                <?php $servpPlugIn = get_post_custom_values('servicesp_PlugInChrome_link'); ?>
                <div class="btn"> <?php echo $servpPlugIn[0];?> </div>
              </div>

            </div>

            <div class="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8">
              <?php the_post_thumbnail('full', array('class' => 'img-responsive center-block')); ?>
            </div>

          <?php endwhile; ?>

        </div>
      </section>
    </div>
    <!--
   *
   *
   *
   *           END Media Plugin for Chrome OS BLOCK
   *
   *
   *
   *
    -->

    <!--
   *
   *
   *
   *           START Contact US BLOCK
   *
   *
   *
   *
    -->


    <div class="container block_service_solution pageServ  text-center">


      <div class="row block_unit6_solution">
        <div class="col-xs-12">

          <?php $the_query = new WP_Query('p=44'); ?>
          <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>


            <h2><?php the_title(); ?></h2>

            <div class="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8">
              <div class="title2"><?php the_content(); ?></div>

              <?php $mpcontact = get_post_custom_values('mp_contact_link'); ?>
              <div class="btn"><?php echo $mpcontact[0];?> </div>
            </div>

          <?php endwhile; ?>



        </div>
      </div>



    </div>





  </div>

<?php get_footer(); ?>
