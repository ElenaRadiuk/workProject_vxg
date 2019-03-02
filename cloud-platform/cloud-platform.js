
(function($){

  var counter=0;

$(document).ready(function() {


  $(".getFree_btn2").click(function(){
    $(".boilsForm2").toggle();
    $("#FormCap").text("Get Free Evaluation Package");
    $(".wpcf7-submit").val("Get Free");
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: $('.boilsForm2').offset().top-44
    }, 1000);
  });

  $(".getFree_btn3").click(function(){
    $(".boilsForm").toggle();
    $("#FormCap").text("Sign-up for Starter Package");
    $(".wpcf7-submit").val("Sign-up");
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: $('.boilsForm').offset().top-44
    }, 1000);
  });

  $(".getFree_btn4").click(function(){
    $(".boilsForm").toggle();
    $("#FormCap").text("Sign-up for Advanced Package");
    $(".wpcf7-submit").val("Sign-up");
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: $('.boilsForm').offset().top-44
    }, 1000);
  });

  $(".getFree_btn5").click(function(){
    $(".boilsForm").toggle();
    $("#FormCap").text("Contact us");
    $(".wpcf7-submit").val("Send it");
    jQuery("html:not(:animated),body:not(:animated)").animate({
      scrollTop: $('.boilsForm').offset().top-44
    }, 1000);
  });


  $(".extra").click(function(){
$(this).next().toggle();
  });

});
})(jQuery);
