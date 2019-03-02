<?php
/*
Template Name: contact
*/
?>

<?php get_header(); ?>

<div class="wrapper">


<div class="container-fluid">
<section class="row"> 
<div class="hidden-xs contact_main_photo">
   <div class="for_gradient">
    

              <?php $the_query = new WP_Query('p=157'); ?>
        <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>

        <?php the_post_thumbnail('full', array('class' => 'img-responsive')); ?>
                

              
                     <div class="text_contact_main_photo text-center">
                         <h1><?php the_title(); ?></h1>
                         <h4> <?=get_the_excerpt();?> </h4>
                         
                         <a href="#m2" class="btn scrollto">CONTACT US NOW!</a>      
                     </div>
                      
        <?php endwhile; ?>
    </div>    
</div>  
<div class="visible-xs contact_main_photo">
  <?php $the_query = new WP_Query('p=157'); ?>
  <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>
   <div class="for_gradient">
     <div style="background: url('<?=get_the_post_thumbnail_url()?>') center center no-repeat; background-size: cover; height:500px;"></div>
                     <div class="text_contact_main_photo text-center">
                         <h1><?php the_title(); ?></h1>
                         <h4><?=get_the_excerpt();?></h4>

                         <a href="#m2" class="btn scrollto">CONTACT US NOW!</a>
                     </div>

    </div>
  <?php endwhile; ?>
</div>
</section>
</div>


<div class="container contact_info">

    <div class="row"> 
    <div class="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4 text-center">

       <h2>Contact Info</h2>

    </div>  
    </div>

    <div class="row"> 
    <div class="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4 text-center">

        <p>
            VXG Inc.<br>56 Temperance Street, Suite #700,<br>Toronto, Canada, M5H 3V5 
        </p>
<a href="https://www.google.ca/maps/place/VXG+Inc./@43.6504156,-79.3817483,15z/data=!4m5!3m4!1s0x0:0x57e3c3902d5c8689!8m2!3d43.6504156!4d-79.3817483">
<img src="https://www.videoexpertsgroup.com/wp-content/uploads/2017/09/map_addr.png" style="width:100%;">
</a>
        <p>
            +1 866 416 0159 <br> info@videoexpertsgroup.com
        </p>

    </div>  
    </div>  

</div>



<div id="contactus" class="container GetInTouch">
 
   <div class="row  text-center">
	
            <?php $the_query = new WP_Query('p=165'); ?>
            <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>


                <h2 id="m2"><?php the_title(); ?></h2>
                
                <div class="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">
                <div class="title_GetInTouch"><?php the_content(); ?></div>
                
<!--                <a href="#" class="btn btn-default">CONTACT WITH US</a>-->
                </div>

        <!--		<?php edit_post_link(__('Редактировать')); ?>-->
        <?php endwhile; ?>
		
   </div>   
   


<!--
    <div class="row">
    <div class="col-xs-12 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4">
                    <form id="sms-form-1" method="POST" action="">
                        <label for="firstName">First Name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="Enter your first name" name="firstName">
                        <label for="secondName">Second name</label>	
                            <input type="text" class="form-control" id="secondName" placeholder="Enter your second name" name="secondName">

                        <label for="yourEmail">Your Email</label>
                            <input type="email" class="form-control" id="yourEmail" placeholder="Enter your email" name="yourEmail ">
                        <label for="company">COMPANY</label>	
                            <input type="email" class="form-control" id="company" placeholder="Enter your company" name="company">

                        <label for="message">Message</label>
                            <textarea class="form-control" id="message" placeholder="Enter your message" rows="7" name="message"></textarea>


                            <input type="submit" id="btn_submit" class="form-control" value="SEND IT!">

                    </form>
    </div>
    </div>
-->

    <div class="row what_boils_download">
    <div class="col-xs-12  text-center">
                   
        <?php echo do_shortcode( '[contact-form-7 id="250" title="ContactPageForm"]' ); ?>
                    
        
    </div>
    </div>
</div>




    
</div>

<?php get_footer(); ?>