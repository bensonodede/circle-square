function getID(e){key=e.id,window.location.href="products/"+key}var data=JSON.parse(Cookies.get("name"));console.log(data);var app=new Vue({el:"#shop-template",data:{items:data},mounted:function(){this.$nextTick(function(){console.log("Complete")})}});