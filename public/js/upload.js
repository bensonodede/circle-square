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
    title:"Adidas ZX 750",
    price:"4,000",
    slideshow:['http://res.cloudinary.com/dzxuz9zc9/image/upload/v1501137696/Shoe_empire/DSC_0462.jpg'],
    description:"Something something something something something something something something something",
    tags:["Shoes"],
    //sizes:["30", "34", "36", "38",],
    shopKey: "-Kjbg3Wx9dsV5Z38kWvj"                         //Makes page redirect simple when using algoliasearch
  });
}

function readFile() {

  if (this.files && this.files[0]) {
    var FR= new FileReader();

    FR.addEventListener("load", function(e) {
      document.getElementById("img").src       = e.target.result;
      document.getElementById("b64").innerHTML = e.target.result;
      //console.log(e.target.result);
      socket.emit('upload', { hello: e.target.result });
    });

    FR.readAsDataURL( this.files[0] );
    console.log();
  }

}
socket.on('link', function (data) {
  console.log(data);
  document.getElementById("uploaded_img").src = data.src;
})

document.getElementById("inp").addEventListener("change", readFile);
