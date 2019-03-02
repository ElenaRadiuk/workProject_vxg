<?php
/*
Template Name: fullnews
*/
?>

<?php get_header(); ?>

<div class="wrapper fNews">



<div class="container">
   
   
    <div class="row"> 
        <div class="col-xs-12 col-sm-8">

          <?php if (have_posts()): while (have_posts()): the_post(); ?>
           
           <h2><?php the_title(); ?></h2>
           
            <?php the_content(); ?>
          <?php endwhile; endif; ?>

        <div class="author">By <span><?php the_author(); ?></span> | <?php the_time('F jS, Y') ?></div>    
        </div> 
        
        
        <div class="col-xs-12 col-sm-4 rec_post">

            <h4>Recent Posts</h4>
           <?php echo previous_posts_from_tax(); ?>


        </div>
    </div>
    
    
   
</div>  
   
    <?php get_footer(); ?>
      
</div>



