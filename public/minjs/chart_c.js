$(function(){"use strict";var e={labels:["1","2","3","4","5","6","7"],datasets:[{label:"My First dataset",fillColor:"rgba(100, 181, 246, 0.5)",strokeColor:"#90caf9",pointColor:"transparent",pointStrokeColor:"rgba(41, 128, 185, 0)",pointHighlightFill:"rgba(41, 128, 185, 0.9)",pointHighlightStroke:"rgba(41, 128, 185, 0)",data:[100,70,20,155,50,70,50]},{label:"My Second dataset",fillColor:"rgba(155, 89, 182, 0.5)",strokeColor:"rgba(155, 89, 182, 0.6)",pointColor:"rgba(155, 89, 182, 0.9)",pointStrokeColor:"rgba(231, 76, 60, 255, 0)",pointHighlightFill:"rgba(155, 89, 182, 0.9)",pointHighlightStroke:"rgba(231, 76, 60, 0)",data:[28,54,40,19,37,20,90]}]},t=[{value:33,color:"#BBDEFB",highlight:"#29b6f6",label:"New"},{value:66,color:"#ffcc80",highlight:"#ffa726",label:"Completed"},{value:66,color:"#e1bee7",highlight:"#ba68c8",label:"Cancelled"}],l=[{value:250,color:"#BBDEFB",highlight:"#42a5f5",label:"Search"},{value:70,color:"#EF9A9A",highlight:"#ef5350",label:"Bounce"},{value:100,color:"#fff9c4",highlight:"#fff176",label:"New"}],a={labels:["1","2","3","4","5"],datasets:[{fillColor:"rgba(100, 181, 246, 0.5)",strokeColor:"#90caf9",highlightFill:"rgba(41, 128, 185, 0.9)",highlightStroke:"rgba(41, 128, 185, 0)",data:[65,59,90,56,40]},{fillColor:"rgba(155, 89, 182, 0.5)",strokeColor:"rgba(155, 89, 182, 0.6)",highlightFill:"rgba(155, 89, 182, 0.9)",highlightStroke:"rgba(231, 76, 60, 0)",data:[28,48,19,27,90]}]},o=document.getElementById("canvas").getContext("2d");window.myLine=new Chart(o).Line(e,{responsive:!0});var r=document.getElementById("pieChart").getContext("2d");window.myPie=new Chart(r).Pie(t,{animation:!0,responsive:!0});var i=document.getElementById("barChart").getContext("2d");window.myBar=new Chart(i).Bar(a,{responsive:!0});var g=document.getElementById("doughnutChart").getContext("2d");window.myPie=new Chart(g).Doughnut(l,{animation:!0,responsive:!0})});