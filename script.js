document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const originalCanvas = document.getElementById('originalCanvas');
            const ctxOriginal = originalCanvas.getContext('2d');
            originalCanvas.width = img.width;
            originalCanvas.height = img.height;

            // Display the selected image on the left canvas
            ctxOriginal.drawImage(img, 0, 0);
        }
    }

    reader.readAsDataURL(file);
});

document.getElementById('invertButton').addEventListener('click', function () {
    const originalCanvas = document.getElementById('originalCanvas');
    const invertedCanvas = document.getElementById('invertedCanvas');
    const ctxOriginal = originalCanvas.getContext('2d');
    const ctxInverted = invertedCanvas.getContext('2d');

    // Get the image data from the original canvas
    const imageData = ctxOriginal.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
    const data = imageData.data;

    // Invert colors
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
    }

    // Display the inverted image on the right canvas
    invertedCanvas.width = originalCanvas.width;
    invertedCanvas.height = originalCanvas.height;
    ctxInverted.putImageData(imageData, 0, 0);

    // Save the inverted image
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const invertedImage = invertedCanvas.toDataURL('image/png');
    saveImage(invertedImage, `w_${file.name}`);
});

function saveImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
}
