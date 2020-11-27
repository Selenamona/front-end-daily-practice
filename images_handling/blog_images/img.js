const image = document.querySelector("#previewContainer");
const canvas = document.querySelector("#canvas");

fetch("https://avatars3.githubusercontent.com/u/4220799")
  .then((response) => response.blob())
  .then((blob) => {
    const objectURL = URL.createObjectURL(blob);
    image.src = objectURL;
    image.onload = () => {
      draw();
    };
  });

function draw() {
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, 230, 230);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  console.log("draw -> data", data)

  const grayscale = function () {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
  };
  const grayscalebtn = document.querySelector("#grayscalebtn");
  grayscalebtn.addEventListener("click", grayscale);
}
