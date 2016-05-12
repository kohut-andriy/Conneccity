/*function setNormalHeight() {
  var windowHeight, headerHeight, footerHeight;
  var header, footer, content;

  console.log("draw");

  header = document.getElementsByClassName('menu__header')[0];
  footer = document.getElementsByClassName('menu__footer')[0];
  content = document.getElementsByClassName('menu__navigation')[0];

  windowHeight = window.innerHeight;

  if (header) {
    headerHeight = header.clientHeight;
  }

  if (footer) {
    footerHeight = footer.clientHeight;
  }

  if (content){
    content.style.height = windowHeight - headerHeight - footerHeight + "px";
  }




  //console.log(windowHeight+" "+headerHeight+" "+ footerHeight+" ");
}*/


/*window.addEventListener("resize", setNormalHeight);
window.addEventListener("load", setNormalHeight);*/



/*app.factory('blendImage', function () {

 function createMarker(width, height, radius) {

 var canvas, context;

 canvas = document.createElement("canvas");
 canvas.width = width;
 canvas.height = height;

 context = canvas.getContext("2d");

 context.clearRect(0, 0, width, height);

 context.fillStyle = "rgba(255,255,0,1)";

 context.strokeStyle = "rgba(0,0,0,1)";

 context.beginPath();
 context.moveTo(radius, 0);
 context.lineTo(width - radius, 0);
 context.quadraticCurveTo(width, 0, width, radius);
 context.lineTo(width, height - radius);
 context.quadraticCurveTo(width, height, width - radius, height);
 context.lineTo(radius, height);
 context.quadraticCurveTo(0, height, 0, height - radius);
 context.lineTo(0, radius);
 context.quadraticCurveTo(0, 0, radius, 0);
 context.closePath();


 var img1 = new Image();
 img1.src = 'img/pin.png';
 img1.onload = function () {
 context.drawImage(img1, 0, 0, 25, 25);
 context.drawImage(img2, 0, 0, 25, 25);

 };

 var img2 = new Image();
 img2.src = 'img/cluster.png';
 img2.onload = function () {
 context.drawImage(img2, 0, 0, 25, 25);
 context.drawImage(img1, 0, 0, 25, 25);
 };

 context.fill();
 context.stroke();

 return canvas.toDataURL();

 }

 return {get: createMarker(25, 25, 5)}

 });*/







