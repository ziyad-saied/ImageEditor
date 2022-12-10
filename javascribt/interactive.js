let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayScale = document.getElementById("grayScale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hueRotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let reset = document.getElementById("reset");

let image = document.getElementById("img");
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let imageBox = document.querySelector(".image");

//return values to its default

function resetValues() {
    image.style.filter = 'none';
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayScale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
}


//hidde the buttons
window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    imageBox.style.display = 'none';
}

//upload image and show buttons back
upload.onchange = function () {
    resetValues();
    download.style.display = 'block';
    reset.style.display = 'block';
    imageBox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        image.src = file.result;
    }
    image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        image.style.display = 'none';
    }
}

//filters changes 
let allFilters = document.querySelectorAll(".optionsContainer input");
allFilters.forEach(f => {
    f.addEventListener('input', function () {
        ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayScale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    })
})

//reset the data
reset.onclick = function () {
    ctx.filter = 'none';
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayScale.value = "0";
    blur.value = "0";
    hueRotate.value = "0";
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

}


//download image after filter effect
download.onclick = function () {
    download.href = canvas.toDataURL('image/jpeg');
}