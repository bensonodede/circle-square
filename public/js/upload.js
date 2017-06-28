var socket = io();

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBngrEriZV5kEmLCe-RsRHAuKa-qqH9WwU",
  authDomain: "theshop-7c5b7.firebaseapp.com",
  databaseURL: "https://theshop-7c5b7.firebaseio.com",
  projectId: "theshop-7c5b7",
  storageBucket: "theshop-7c5b7.appspot.com",
  messagingSenderId: "71632938094"
};
firebase.initializeApp(config);

 var shopRef = firebase.database().ref('shop/');
 var prodRef = firebase.database().ref('products/-Kjbg3Wx9dsV5Z38kWvj');

function createShop (){

  shopRef.push({
    name:"Shop #5",
    number:"0750000000",
    banner:"https://source.unsplash.com/gZKrIKtZUPc/",
    subtext: " gear"
  });
}

function createProduct(){

  prodRef.push({
    title:"A device",
    price:"9,000",
    slideshow:['https://source.unsplash.com/RAJONCCrXh8/700x700/', 'https://source.unsplash.com/78PQJ5nK1Gc/700x700/'],
    description:"Something something something something something something something something something",
    tags:["Electronics"],
    sizes:["30", "34", "36", "38",],
    shopKey: ""                         //Makes page redirect simple when using algoliasearch
  });
}

function readFile() {

  if (this.files && this.files[0]) {
    var FR= new FileReader();

    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      document.getElementById("b64").innerHTML = e.target.result;
      console.log(e.target.result);
      socket.emit('news', { hello: e.target.result });
      var image = new Image();
      image.src = "https://res.cloudinary.com/dzxuz9zc9/image/upload/v1498500181/yzhczace9u25wepguqwy.jpg";
      document.body.appendChild(image);
    });

    FR.readAsDataURL( this.files[0] );
    console.log();
  }

}

document.getElementById("inp").addEventListener("change", readFile);
