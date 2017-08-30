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
