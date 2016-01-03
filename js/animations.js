$(document).ready(function(){
  
  $('a[href^="#"]').on('click', function(event) {
    var target = $( $(this).attr('href') );
    if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
      scrollTop: target.addClass("animated fadeInLeft").animate({'opacity':'1'}, 2000).offset().top -70
      }, 2000);
    }
  });

   $(window).scroll( function(){

    /* Check the location of each desired element */
    $('.hideme').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();

        /* If the object is completely visible in the window, fade it it */
        if( bottom_of_window > bottom_of_object ){
          $(this).addClass("animated slideInLeft").animate({'opacity':'1'},2000);
        }
    }); 
  });
});


  