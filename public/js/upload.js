$("#done").click(function() {
  if ($("input[type='checkbox'].box1").is(":checked")) {
    var a = [];
    $("input[type='checkbox'].box1:checked").each(function() {
      a.push(this.id);
    });
    var img = a;
    var name = $("#upload-text-input").val();
    var price = $("#upload-number-input").val();
    console.log(img);
    console.log(name);
    console.log(price);

    $.post("/upload/:id", {
      imgs: JSON.stringify(img),
      name: name,
      price: price
    }, function(data) {
      console.log(data);
      window.location.href = data;
    });


  }
});


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
