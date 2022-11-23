var eyeballs = document.getElementsByClassName("eyeball");

document.onmousemove = function(){
  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 120 / window.innerHeight + "%";

  for(var i=0;i<2;i++) {
    eyeballs[i].style.left = x;
    eyeballs[i].style.top = y;
  }
}

function cowabunga() {
  console.log ("Cowabunga!!!");
}

cowabunga()