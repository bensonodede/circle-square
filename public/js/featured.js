function getID(theKey) {
  //Redirect
  key = theKey.id;
  var str = window.location.href + "/" + key ;
  console.log(str);
  window.location.href = str;
}
