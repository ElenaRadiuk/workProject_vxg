<?php/*Template Name: search*/?>

<?php get_header(); ?>

<section>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
	<?php if (have_posts()): while (have_posts()): the_post(); ?>
		<?php the_content(); ?>
	<?php endwhile; endif; ?>
            </div>
        </div>
    </div>
</section>
<?php get_footer(); ?>