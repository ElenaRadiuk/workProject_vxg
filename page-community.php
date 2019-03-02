<?php
/**
 *Template Name: community
 */
get_header(); // Подключаем хедер?>

<div class="wrapper">


    <div class="container-fluid">

        <section class="row">

            <div class="hidden-xs contact_main_photo community_pages">

                <div class="for_gradient">


                    <?php $the_query = new WP_Query('p=2389'); ?>

                    <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>


                        <?php the_post_thumbnail('full', array('class' => 'img-responsive')); ?>



                        <div class="text_contact_main_photo text-center">

                            <h1><?php the_title(); ?></h1>

                            <h4> <?php the_content(); ?> </h4>



                        </div>


                    <?php endwhile; ?>

                </div>

            </div>

            <div class="visible-xs contact_main_photo community_pages">

                <?php $the_query = new WP_Query('p=2389'); ?>

                <?php while  ($the_query->have_posts() ) : $the_query->the_post(); ?>

                    <div class="for_gradient">

                        <div style="background: url('<?=get_the_post_thumbnail_url()?>') center center no-repeat; background-size: cover; height:270px;"></div>

                        <div class="text_contact_main_photo text-center">

                            <h1><?php the_title(); ?></h1>

                            <h4><?=get_the_excerpt();?></h4>



                        </div>


                    </div>

                <?php endwhile; ?>

            </div>

        </section>

    </div>



<!--    <section class="topcommunity-aq">-->
<!--    <div class="container">-->
<!--        <div class="row">-->
<!--            <div class="col-xs-12 col-sm-offset-1 col-sm-5 text-center">-->
<!--                <div class="ask_block">-->
<!--                    <a href="https://www.videoexpertsgroup.com/questions/ask/">-->
<!--                        <div class="wrap_icon">-->
<!--                            <i class="fa fa-comment-o" aria-hidden="true"></i>-->
<!--                        </div>-->
<!--                        <h3>ASK</h3>-->
<!--                        <span>Have a question?</span>-->
<!--                    </a>-->
<!--                </div>-->
<!--            </div>-->
<!---->
<!--            <div class="col-xs-12 col-sm-5 text-center">-->
<!--                <div class="answer_block">-->
<!--                    <a href="https://www.videoexpertsgroup.com/questions/">-->
<!--                        <div class="wrap_icon">-->
<!--                            <i class="fa fa-comments-o" aria-hidden="true"></i>-->
<!--                        </div>-->
<!--                        <h3>Answer</h3>-->
<!--                        <span>Know a solution?</span>-->
<!--                    </a>-->
<!--                </div>-->
<!--            </div>-->
<!---->
<!--        </div>-->
<!--    </div>-->
<!--    </section>-->



    <div class="container community_aq">

        <div class="row">

            <?php if (have_posts()): while (have_posts()): the_post(); ?>
                <div class="col-xs-12">
                    <?php the_content(); ?>
                </div>
            <?php endwhile; endif; ?>
        </div>

    </div>


</div>

<?php get_footer(); // Подключаем футер ?>


