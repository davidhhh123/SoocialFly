$(document).ready(function () {
  const lfr = '  <div class="categor_4" style="display: none;"><img src="iconfinder-icon.svg"><span class="title_categor">Categories</span></div>' + 

'<div class="categor_5"><ul>' + 
     '<li id="f252"><i class="fa fa-male" aria-hidden="true" style="font-size: 30px;position: absolute;color: #666666"></i><span class="title_categor">For Men</span>' + 
      '<div class="hover_cat" id="hover_cat">'+ 
        '<div class="close_cat" id = "close_cat"></div>'+
        

      '</div></li>'+
      '<li id="f252"><i class="fa fa-female" aria-hidden="true" style="font-size: 30px;position: absolute;color: #e572aa"></i><span class="title_categor">For Women</span>'
        + '<div class="hover_cat" id="hover_cat1"><div class="close_cat" id = "close_cat1"></div></div>'


     + '</li>'+
    '<li id="f252"><img src="iconfinder_fashion.svg"><span class="title_categor">Fashion</span><div class="hover_cat" id="hover_cat2">'+
        
        '<div class="close_cat" id = "close_cat2"></div>'+
     '</div>'+

    '</li>'+
    '<li id="f252"><img src="iconfinder-icon_el.svg" id="ic"><span class="title_categor">Electronics</span><div class="hover_cat" id="hover_cat3"><div class="close_cat" id = "close_cat3"></div></div>'+

   '</li>'+
     '<li id="f252"><img src="iconfinder-icon (5).svg" id="ic1"><span class="title_categor">For Home</span><div class="hover_cat" id="hover_cat4"><div class="close_cat" id = "close_cat4"></div></div></li>'+
     '<li id="f252"><img src="iconfinder_ecommerce-10.svg" id="ic1"><span class="title_categor">Accessories</span>'+
      '<div class="hover_cat" id="hover_cat5">'+
        
        '<div class="close_cat" id = "close_cat5"></div>'+
      '</div>'+

     '</li>'+
  '</ul>'+
  
'</div>'


  $("a#pageLink").on('click', function() {
    $("a#pageLink").removeClass("active");
    $(this).addClass("active");
  });

  $(".menu-button").on('click', function() {
    $(".left-area").removeClass("hide-on-mobile");
  });

  $(".close-menu").on('click', function() {
    $(".left-area").addClass("hide-on-mobile");
  });

  $(".more-button").on('click', function() {
    $(".more-menu-list").toggle("hide");
  });
  $(".header__btn").on('click', function() {
    $(".f48").toggle("hide");
    $(this).toggleClass('header__btn--active');
    $('.header__nav').toggleClass('header__nav--active');
    


  });
  $('.categor_4').on('click', function() {

    document.getElementById('f48').innerHTML = '';
    document.getElementById('f48').innerHTML = lfr;

  
      
  });
  $('.f252').on('click', function() {
   
    var width = $(this).find(".hover_cat").width()
    if (width == 0){
      $(this).find(".hover_cat").css(
      "width", "100%"

      )  

    }
    else{

    }
    
    

    
   
});
$('.close_cat').on('click', function() {
    
    

    $("#f252 .hover_cat").css(
      "width", "0%"

      )  
   
});


  
  
 //$( "li" ).hover(
 //  function() {
 //  
 //  
 //  document.getElementById("hover_cat").style.position = "absolute";
 //  document.getElementById("hover_cat").style.marginLeft = "-250px";
 //  document.getElementById("hover_cat").style.width = "100%";
 //  $("#hover_cat").toggle();
 //}, function() {
 //  
 //  document.getElementById("hover_cat").style.width = "0";
 //}


 //  );
  

  var owl = $("#owl-slider-1");
  $("#owl-slider-1").owlCarousel({
    navigation: true,
    slideSpeed: 400,
    paginationSpeed: 400,
    items: 1,
    loop: true,
    itemsDesktop: false,
    itemsDesktopSmall: false,
    itemsTablet: false,
    itemsMobile: false,
    autoplay: true,
    autoPlaySpeed: 200,
    autoPlayTimeout: 100,
    autoplayHoverPause: true
  });
  // Custom Navigation Events
  $(".owl-next").click(function () {
    owl.trigger("owl.next");
  });
  $(".owl-prev").click(function () {});

  $(".play").click(function () {
    owl.trigger("owl.play", 100);
  });
  $(".stop").click(function () {
    owl.trigger("owl.stop");
  });

  var owl = $("#owl-slider-2");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,
    dots:false,
    paginationSpeed: 400,
    
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
      
      
    }
  });
  var owl = $("#owl-slider-4");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,
    paginationSpeed: 400,
    dots:false,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
  var owl = $("#owl-slider-5");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
    var owl = $("#owl-slider-6");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
  var owl = $("#owl-slider-7");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },

      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
  var owl = $("#owl-slider-8");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
  var owl = $("#owl-slider-9");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
  var owl = $("#owl-slider-10");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });


  var owl = $("#owl-slider-3");
  owl.owlCarousel({
    navigation: true,
    slideSpeed: 400,dots:false,
    paginationSpeed: 400,
    responsive: {
      0: {
        items: 2.7
      },
       290: {
        items: 3
      },
      480: {
        items: 3.5
      },
      480: {
        items: 3.5
      },
      600: {
        items: 4
      },
      1000: {
        items: 5
      }
    }
  });
});