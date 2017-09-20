$(function() {
  'use strict';

  /* Prevent Safari opening links when viewing as a Mobile App */
  (function(a, b, c) {
    if (c in b && b[c]) {
      var d, e = a.location,
        f = /^(a|html)$/i;
      a.addEventListener("on", function(a) {
        d = a.target;
        while (!f.test(d.nodeName)) d = d.parentNode;
        "href" in d && (d.href.indexOf("http") || ~d.href.indexOf(e.host)) && (a.preventDefault(), e.href = d.href);
      }, !1)
    }
  })(document, window.navigator, "standalone");
  var duration_CONSTANT = 250;
  var options = {
    prefetch: true,
    cacheLength: 0,
    blacklist: '.no-smoothState',
    onStart: {
      duration: duration_CONSTANT,
      render: function($container) {
        $('#bottom-sheet').closeModal();
        $container.addClass('is-exiting');
        smoothState.restartCSSAnimations();
        setTimeout(function() {}, duration_CONSTANT * 2);
      }
    },
    onReady: {
      duration: 0,
      render: function($container, $newContent) {
        $container.removeClass('is-exiting');
        $container.html($newContent);
      }
    },
    onAfter: function($container, $newContent) {
      setTimeout(function() {
        ResizeHandler = ResizeHandler || function() {};
        ResizeHandler();
      }, 500)
      initiate_plugins(); // All onAfter calls goes inside this function
    }
  };
  var smoothState = $('#main').smoothState(options).data('smoothState');
});
////--> Call all function for Ajax <--////
function initiate_plugins() {

  $('body').removeClass('menu-open');

  // Tabs
  $('ul.tabs').tabs();

  // Modal
  $('.modal-trigger').leanModal();

  // Accordion
  $('.collapsible').collapsible({
    accordion: true
  });

  // Drag
  $('.drag-target').remove();

  // Right Sidebar
  $('#open-right').sideNav({
    menuWidth: 240, // Default is 240
    edge: 'right', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });

  // Left Sidebar
  $('#open-left').sideNav({
    menuWidth: 240, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });

  // Swipebox
  $('.swipebox').swipebox();

  // Scrolling Floating Action Button
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 1) {
      $(".floating-button").addClass("scrolled-down");
    } else {
      $(".floating-button").removeClass("scrolled-down");
    }
  });

  // Row Height for Drawer
  var grandparent_height = $('#grandparent').height();
  $('.child').height(grandparent_height * 0.25);

  // Swiper Sliders
  var swiper = new Swiper('.swiper-slider', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: false,
    loop: true
  });

  // MixItUP
  $(function() {
    var layout = 'grid', // Store the current layout as a variable
      $container = $('#filter'), // Cache the MixItUp container
      $changeLayout = $('#ChangeLayout'); // Cache the changeLayout button
    // Instantiate MixItUp with some custom options:
    try {
      $container.mixItUp('destroy');
    } catch (x) {}
    $container.mixItUp({
      animation: {
        animateChangeLayout: true, // Animate the positions of targets as the layout changes
        animateResizeTargets: true, // Animate the width/height of targets as the layout changes
        effects: 'fade rotateX(-40deg) translateZ(-100px)'
      },
      layout: {
        containerClass: 'grid' // Add the class 'list' to the container on load
      }
    });
    // MixItUp does not provide a default "change layout" button, so we need to make our own and bind it with a click handler:
    $changeLayout.on('click', function() {
      // If the current layout is a list, change to grid:
      if (layout == 'grid') {
        layout = 'list';
        $changeLayout.text('Grid'); // Update the button text
        $container.mixItUp('changeLayout', {
          containerClass: layout // change the container class to "grid"
        });
        // Else if the current layout is a grid, change to list:
      } else {
        layout = 'grid';
        $changeLayout.text('List'); // Update the button text
        $container.mixItUp('changeLayout', {
          containerClass: layout // Change the container class to 'list'
        });
      }
    });
  });

  // Material Layout
  $('.parallax').parallax();
  $(function() {
    var hBanner = $('.h-banner').height();
    var cbHeight = hBanner - 56;
    var hHeight = hBanner - 86; // for Title
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= cbHeight) {
        $(".Eclipse-nav").addClass('h-bg');
      }
      if (scroll <= cbHeight) {
        $(".Eclipse-nav").removeClass('h-bg');
      }
      // For heading Title
      if (scroll >= hHeight) {
        $(".banner-title").hide();
        $(".Eclipse-nav .title").show();
      }
      if (scroll <= hHeight) {
        $(".banner-title").show();
        $(".Eclipse-nav .title").hide();
      }
    });
    // opacity Plush button
    var fadeStart = 50 // 100px scroll or less will equiv to 1 opacity
    fadeUntil = 150 // 150px scroll or more will equiv to 0 opacity
    fading = $('.resize');
    $(window).on('scroll', function() {
      var offset = $(document).scrollTop(),
        opacity = 0;
      if (offset <= fadeStart) {
        opacity = 1;
      } else if (offset <= fadeUntil) {
        opacity = 1 - offset / fadeUntil;
      }
      fading.css({
        'transform': 'scale(' + opacity + ')'
      });
    });
  });

  // Menu

  var isLateralNavAnimating = false;

  //open/close lateral navigation
  $('.menu-trigger').on('click', function(event) {
    event.preventDefault();
    //stop if nav animation is running
    if (!isLateralNavAnimating) {
      if ($(this).parents('.csstransitions').length > 0) isLateralNavAnimating = true;

      $('body').toggleClass('menu-open');
      $('.menu-navigation').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        //animation is over
        isLateralNavAnimating = false;
      });
    }
  });

  $('#menu-icon').on('click', function() {
    $(this).toggleClass('open');
  });


}
////--> End of Call all function for Ajax, now from there recall all the functions <--////

// Menu
jQuery(document).ready(function($) {
  var isLateralNavAnimating = false;

  //open/close lateral navigation
  $('.menu-trigger').on('click', function(event) {
    event.preventDefault();
    //stop if nav animation is running
    if (!isLateralNavAnimating) {
      if ($(this).parents('.csstransitions').length > 0) isLateralNavAnimating = true;

      $('body').toggleClass('menu-open');
      $('.menu-navigation').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        //animation is over
        isLateralNavAnimating = false;
      });
    }
  });

  $('#menu-icon').on('click', function() {
    $(this).toggleClass('open');
  });
});

// Tabs
$('ul.tabs').tabs();

// Modal
$('.modal-trigger').leanModal();

// Accordion
$('.collapsible').collapsible({
  accordion: true
});

// Right Sidebar
$('#open-right').sideNav({
  menuWidth: 240, // Default is 240
  edge: 'right', // Choose the horizontal origin
  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Left Sidebar
$('#open-left').sideNav({
  menuWidth: 240, // Default is 240
  edge: 'left', // Choose the horizontal origin
  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

// Swipebox
$('.swipebox').swipebox();

// Masonry
$('.grid').masonry({
  itemSelector: '.grid-item'
});

// Scrolling Floating Action Button
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 1) {
    $(".floating-button").addClass("scrolled-down");
  } else {
    $(".floating-button").removeClass("scrolled-down");
  }
});

// Row Height for Drawer
var grandparent_height = $('#grandparent').height();
$('.child').height(grandparent_height * 0.25);

// Swiper sliders
var swiper = new Swiper('.swiper-slider', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  autoplay: false,
  loop: true
});

// Material Layout
$('.parallax').parallax();
$(function() {
  var hBanner = $('.h-banner').height();
  var cbHeight = hBanner - 56;
  var hHeight = hBanner - 86; // for Title
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= cbHeight) {
      $(".Eclipse-nav").addClass('h-bg');
    }
    if (scroll <= cbHeight) {
      $(".Eclipse-nav").removeClass('h-bg');
    }
    // For heading Title
    if (scroll >= hHeight) {
      $(".banner-title").hide();
      $(".Eclipse-nav .title").show();
    }
    if (scroll <= hHeight) {
      $(".banner-title").show();
      $(".Eclipse-nav .title").hide();
    }
  });
  // opacity Plush button
  var fadeStart = 50 // 100px scroll or less will equiv to 1 opacity
  fadeUntil = 150 // 150px scroll or more will equiv to 0 opacity
  fading = $('.resize');
  $(window).on('scroll', function() {
    var offset = $(document).scrollTop(),
      opacity = 0;
    if (offset <= fadeStart) {
      opacity = 1;
    } else if (offset <= fadeUntil) {
      opacity = 1 - offset / fadeUntil;
    }
    fading.css({
      'transform': 'scale(' + opacity + ')'
    });
  });
});

// MixItUp
$(function() {
  var layout = 'grid', // Store the current layout as a variable
    $container = $('#filter'), // Cache the MixItUp container
    $changeLayout = $('#ChangeLayout'); // Cache the changeLayout button
  // Instantiate MixItUp with some custom options:
  $container.mixItUp({
    animation: {
      animateChangeLayout: true, // Animate the positions of targets as the layout changes
      animateResizeTargets: true, // Animate the width/height of targets as the layout changes
      effects: 'fade rotateX(-40deg) translateZ(-100px)'
    },
    layout: {
      containerClass: 'grid' // Add the class 'list' to the container on load
    }
  });
  // MixItUp does not provide a default "change layout" button, so we need to make our own and bind it with a click handler:
  $changeLayout.on('click', function() {
    // If the current layout is a list, change to grid:
    if (layout == 'grid') {
      layout = 'list';
      $changeLayout.text('Grid'); // Update the button text
      $container.mixItUp('changeLayout', {
        containerClass: layout // change the container class to "grid"
      });
      // Else if the current layout is a grid, change to list:
    } else {
      layout = 'grid';
      $changeLayout.text('List'); // Update the button text
      $container.mixItUp('changeLayout', {
        containerClass: layout // Change the container class to 'list'
      });
    }
  });

  // init swiper layout
  window.onload = function() {
    setTimeout(function() {
      ResizeHandler = ResizeHandler || function() {};
      ResizeHandler();
    }, 500)
  };

});

//Go back function
function goBack() {
  window.history.back();
}

//Redirect functions

function homeRedirect() {
  window.location.href = "/"
};

function featuredRedirect() {
  window.location.href = "/featured"
};

function contactRedirect() {
  window.location.href = "/contact"
};


// Navigation side-nav
$('.button-collapse-menu').sideNav({
  edge: 'left', // Choose the horizontal origin
  closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  draggable: true // Choose whether you can drag to open on touch screens
});

//Search side-nav
$('.button-collapse').sideNav({
  menuWidth: '100%',
  edge: 'right' // Choose the horizontal origin
});

$(document).ready(function() {
  $('select').material_select();
});

// Close search menu (Custom implementation due to bug when side-nav is 100%)
$("#closeSearch").click(function() {
  function remove() {
    $('#slide-out-search').css({
      'transition': ''
    });
  }
  $('#slide-out-search').css({
    'right': '',
    'transition': '0.25s ease'
  });
  $('#sidenav-overlay').remove();
  setTimeout(remove, 250)
});
//End close search menu




// Menu-arrow animation

var upClass = 'menu-arrow-left';
var downClass = 'menu-arrow-right';

function toggle() {
  var square = document.getElementById('menu-arrow');

  if (~square.className.indexOf(downClass)) {
    square.className = square.className.replace(downClass, upClass);
  } else {
    square.className = square.className.replace(upClass, downClass);
  }

}

/********************* ALGOLIA SEARCH FUNCTIONS ****************************


//Algolia autocomplete and suggestions search script
var client = algoliasearch("53Q7NWI1VU", "3393f31617d57b6957d78dc1f65f504f"); // Use SEARCH ONLY API key, NO admin key
var products = client.initIndex('products');
//initialize autocomplete on search input (ID selector must match)
autocomplete('#aa-search-input', {
  hint: true,
  debug: true
}, {
  source: autocomplete.sources.hits(products, {
    hitsPerPage: 5
  }),
  //value to be displayed in input control after user's suggestion selection
  displayKey: 'title',
  //hash of templates used when rendering dataset
  templates: {
    //'suggestion' templating function used to render a single suggestion
    suggestion: function(suggestion) {
      return '<span>' +
        suggestion._highlightResult.title.value + '</span><span>';
    },
    empty: '<div class="aa-empty">No matching results</div>'
  }
});



//Algolia instantsearch and results page
/*
var search = instantsearch({
  // Replace with your own values
  appId: '53Q7NWI1VU',
  apiKey: '3393f31617d57b6957d78dc1f65f504f', // search only API key, no ADMIN key
  indexName: 'products'
});

//Binding the search input
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#aa-search-input'
  })
);

//Displaying results
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 10,
    urlSync: true,
    templates: {
      item: function(item) {
        console.log(item);
        return '<div class="item-result">' +
          '<a class="catalogue_placeholder no-smoothState" onclick="getID(this)" id=' + item._highlightResult._id.$oid.value + '>' +
          '<img class="lazy item-image-result" src="' + item.slideshow[0] + '">' +
          '<div class="gallery-item-header">' +
          '<div id="card-details">' +
          '<span id="product-price">' +
          '<div class="inline">' + item.price + '</div>' +
          '</span>' +
          '<span id="product-title">' + item._highlightResult.title.value + '</span>' +
          '</div>'
        '</div>'
        '</a>'
        '</div>'



        /*'<div class="grid-item gallery-item-card">' +
                  '<img src="img/1.jpg" alt="image">' +
                  '<div class="gallery-item-header">' +
                    '<div class="gallery-item-author">' +
                      '<span>Jassie North</span>' +
                      '<span class="small">1hour ago - 62 Share</span>' +
                    '</div>' +
                  '</div>' +
                '</a>' +
              '</div>'





        '<div class="item-result">' +
                '<a class="catalogue_placeholder no-smoothState" onclick="getID(this)" id="">' +
                  '<img class="lazy" id="catalogue" src="'+ item.slideshow[0] +'">' +
                    '<div class="gallery-item-header">'+
                      '<div id="card-details">'+
                        '<span id="product-price">' +
                          '<div class="inline">'+ item.price +'</div>' +
                          '</span>' +
                          '<span id="product-title">' + item._highlightResult.title.value +'</span>'+
                      '</div>'
                    '</div>'
                  '</a>'
                '</div>'

      },
      empty: "We didn't find any results for the search <em>\"{{query}}\"</em>"
    }
  })
);

$("#aa-search-input").on("change keyup paste", function() {
  if ($("#aa-search-input").val() == "") {
    $("#page-contents").show();
    $("#hits").hide();
  } else {
    $("#page-contents").hide();
    $("#hits").show();
  }
});

$("#aa-search-input").on("focusin", function() {
  if ($("#aa-search-input").val() == "") {
    $("#hits").hide();
  }
  search.start();
});

$("#aa-search-input").on("focusout", function() {
  if ($("#aa-search-input").val() == "") {
    $("#page-contents").show();
  }
});

*/
