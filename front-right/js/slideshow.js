var interval = 3000;
var random_display = 0;
var imageDir = "images/img";

var imageNum = 0;

imageArray = new Array();

imageArray[imageNum++] = new imageItem(imageDir + "2.jpeg");
imageArray[imageNum++] = new imageItem(imageDir + "3.jpeg");
imageArray[imageNum++] = new imageItem(imageDir + "4.jpeg");
imageArray[imageNum++] = new imageItem(imageDir + "5.jpeg");


var totalImages= imageArray.length;

function imageItem(image_location){
  this.image_item = new Image();
  this.image_item.src = image_location;
}

function get_ImageItemLocation(imageObj){
  return(imageObj.image_item.src)
}

function randNum(x, y) {
  var range = y - x + 1;
  return Math.floor(Math.random() * range) + x;
}

function getNextImage() {
  if (random_display) {
    imageNum = randNum(0, totalImages-1);
  }
  else {
     imageNum = (imageNum+1) % totalImages;
  }
  var new_image = get_ImageItemLocation(imageArray[imageNum]);
  return(new_image);
}
function switchImage(place) {
  var marginTop = "margin-top";
  var marginLeft = "margin-left;"
  var marginBot = "margin-bottom";
  var marginRight = "margin-right;"
  var tmpHeight = 0;
  var tmpWidth = 0;
  var marginVertNum = "";
  var marginHortizontalNum="";

  // for (var i = 0; i < imageArray.length; i++) {
    // if(tmpHeight < imageArray[i].image_item.height){
      // tmpHeight = imageArray[i].image_item.height;
      // document.getElementById("slideShow").style.height = tmpHeight +"px";
    // }
    // if(imageArray[i].image_item.width > tmpWidth){
      // tmpWidth = imageArray[i].image_item.width;
      // document.getElementById("slideShow").style.width = tmpWidth +"px";
    // }
  //}
  var new_image = getNextImage();
  document[place].src = new_image;

 // marginVertNum = (tmpHeight - imageArray[imageNum].image_item.height)/2;
  // document.getElementById("slides").style.marginTop = marginVertNum +"px";
  // document.getElementById("slides").style.marginBot = marginVertNum +"px";

  // //marginHortizontalNum = (tmpWidth - imageArray[imageNum].image_item.width)/2;
  // document.getElementById("slides").style.marginLeft = marginHortizontalNum +"px";
  // document.getElementById("slides").style.marginRight = marginHortizontalNum +"px";

  var recur_call = "switchImage('"+place+"')";
  timerID = setTimeout(recur_call, interval);
}