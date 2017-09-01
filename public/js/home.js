var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true
});

$(document).ready(function() {

  $(function() {
    $('.lazy').lazy({

      // called after an element was successfully handled
      afterLoad: function(element) {
        $grid.masonry();
      },

  });
});

});
