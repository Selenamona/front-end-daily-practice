const compressbtn = document.querySelector("#compressbtn");
const compressImage = document.querySelector("#compressPrevContainer");
compressbtn.addEventListener("click", compress);

function compress(quality = 80, mimeType = "image/webp") {
  const imageDataURL = canvas.toDataURL(mimeType, quality / 100);
  compressImage.src = imageDataURL;
}
 
