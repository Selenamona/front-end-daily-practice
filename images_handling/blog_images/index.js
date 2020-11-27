const loadFile = function (event) {
  // 预览本地选择图片
  // const reader = new FileReader();
  // reader.onload = function () {
  //   // const output = document.querySelector("#previewContainer");
  //   // output.src = reader.result;
  //   console.log("reader.onload -> reader.result", reader.result)
  // };
  // reader.readAsDataURL(event.target.files[0]);
  // // reader.readAsArrayBuffer(event.target.files[0]);
  // // reader.readAsText(event.target.files[0]);
  // 预览网络请求图片
  const image = document.querySelector("#previewContainer");
  fetch("https://avatars3.githubusercontent.com/u/4220799")
    .then((response) => response.blob())
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);
      image.src = objectURL;
    });
};

// var aBlob = new Blob();
// console.log("aBlob", aBlob)


// 「示例一：从字符串创建 Blob」
// let myBlobParts = ['<html><h2>Hello Semlinker</h2></html>']; // an array consisting of a single DOMString
// let myBlob = new Blob(myBlobParts, { type: 'text/html', endings: "transparent" }); // the blob
// console.log("myBlob", myBlob)

// 「示例二：从类型化数组和字符串创建 Blob」
// let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二进制格式的 "hello"
// console.log("hello", hello)
// let blob = new Blob([hello, ' ', 'semlinker'], { type: 'text/plain' });
// console.log("blob", blob)


// var blob = new Blob(["\x01\x02\x03\x04"]),
//   fileReader = new FileReader(),
//   array;

// Blob 转换为 ArrayBuffer
// fileReader.onload = function () {
//   array = this.result;
//   console.log("fileReader.onload -> array", array)
// };

// fileReader.readAsArrayBuffer(blob);

// ArrayBuffer 转 Blob
// var array = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
// console.log("array", array)
// var blob = new Blob([array]);
// console.log("blob", blob)

// const buffer = new ArrayBuffer(16);
// console.log("buffer", buffer)
// // Create a couple of views
// const view1 = new DataView(buffer);
// console.log("view1", view1)
// const view2 = new DataView(buffer, 12, 4); //from byte 12 for the next 4 bytes
// console.log("view2", view2)
// view1.setInt8(12, 42); // put 42 in slot 12
// console.log(view2.getInt8(0)); // expected output: 42 


// var uint8 = new Uint8Array(2);
// console.log("uint8", uint8)
// uint8[0] = 42;
// console.log(uint8[0]); // 42


const file = new File(["a".repeat(1000000)], "test.txt");
const chunkSize = 40000;
const url = "https://httpbin.org/post";
async function chunkedUpload() {
  for (let start = 0; start < file.size; start += chunkSize) {
    const chunk = file.slice(start, start + chunkSize + 1);
    const fd = new FormData();
    fd.append("data", chunk);
    await fetch(url, { method: "post", body: fd }).then((res) =>
      res.text()
    );
  }
}
chunkedUpload()
