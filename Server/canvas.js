window.addEventListener("load", () => {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const image = document.getElementById("prewiew");

  canvas.height = image.height;
  canvas.width = image.width;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.font = "bold 24px Arial";

  ctx.strokeStyle = "red";
  //drawCanvas();
  var d = 1;
  //image.src =canvas.toDataURL("image/jpg");
  // function drawCanvas

  drawCanvas = function (firstCoordinateX, firstCoordinateY, secondCoordinateX, secondCoordinateY, thirdCoordinateX, thirdCoordinateY, fourthCoordinateX, fourthCoordinateY, name) {
    ctx.moveTo(firstCoordinateX * image.width, firstCoordinateY * image.height);//sol en üst
    ctx.lineTo(thirdCoordinateX * image.width, thirdCoordinateY * image.height);//sağ en üst
    ctx.stroke();
    ctx.moveTo(firstCoordinateX * image.width, firstCoordinateY * image.height);//sol en üst
    ctx.lineTo(fourthCoordinateX * image.width, fourthCoordinateY * image.height);//sol en alt
    ctx.stroke();
    ctx.moveTo(fourthCoordinateX * image.width, fourthCoordinateY * image.height);//sol en alt
    ctx.lineTo(secondCoordinateX * image.width, secondCoordinateY * image.height);//sağ en alt
    ctx.stroke();
    ctx.moveTo(secondCoordinateX * image.width, secondCoordinateY * image.height);//sağ en alt
    ctx.lineTo(thirdCoordinateX * image.width, thirdCoordinateY * image.height);//sağ en üst
    ctx.stroke();
    ctx.fillText(name, fourthCoordinateX * image.width, fourthCoordinateY * image.height);
  }

});