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
    title:"A book",
    price:"1000",
    slideshow:['https://source.unsplash.com/M4C5tzTeFmE/1600x900/', 'https://source.unsplash.com/gZKrIKtZUPc/'],
    description:"Something something something something something something something something something",
    tags:["book", "boards"],
    sizes:["XS", "S", "M", "L",],
  });
}
