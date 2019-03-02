<?php
/*
Template Name: news
*/
?>

<?php get_header(); ?>

  <div class="wrapper news">


    <div class="container text-center">


      <div class="row title_news text-center">
        <div class="col-xs-12">
          <?php $the_query = new WP_Query('p=208'); ?>
          <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>


            <h1><?php the_title(); ?></h1>
            <div> <?php the_excerpt(); ?></div>

          <?php endwhile; ?>


        </div>
      </div>


      <div class="row masonry">

        <div class="grid">
          <div class="grid-sizer col-xs-12 col-sm-4 col-md-3 news-item"></div>

          <?php $pc = new WP_Query('cat=33&orderby=date&posts_per_page=99'); ?>
          <?php while ($pc->have_posts()) : $pc->the_post(); ?>


            <div class="grid-item col-xs-12 col-sm-4 col-md-3 news-item">

              <div class="grid-item-content">
                <div>
                  <?php the_post_thumbnail('full', array('class' => 'img-responsive')); ?>
                </div>

                <div class="news_text">
                  <h5><?php the_title(); ?></h5>
                  <h6>By <span><?php the_author(); ?></span> | <?php the_time('F jS, Y') ?></h6>

                  <?php the_excerpt(); ?>
                  <a href="<?php the_permalink() ?>" rel="bookmark">Read more <span>&gt;</span></a>
                </div>
              </div>

            </div>
          <?php endwhile; ?>
        </div>


      </div>
      <button id="more-posts" class="btn">More news<i class="glyphicon glyphicon-arrow-down"></i></button>
    </div>


  </div>


  <!--<script>-->
  <!--    (function ($) {-->
  <!---->
  <!--        $(document).ready(function() {-->
  <!--        $('.grid').masonry({-->
  <!--          itemSelector: '.grid-item',-->
  <!--          columnWidth: '.grid-sizer',-->
  <!--          percentPosition: true-->
  <!--        });-->
  <!--            });-->
  <!--     })(jQuery)-->
  <!---->
  <!--</script>-->


<?php get_footer(); ?>