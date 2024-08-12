document.getElementById('imageInput').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Display the selected image
            ctx.drawImage(img, 0, 0);
        }
    }

    reader.readAsDataURL(file);
});

document.getElementById('invertButton').addEventListener('click', function () {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Invert colors
    for (let i = 0; i < data.length; i += 4) {
        data[i] = 255 - data[i];     // Red
        data[i + 1] = 255 - data[i + 1]; // Green
        data[i + 2] = 255 - data[i + 2]; // Blue
    }

    ctx.putImageData(imageData, 0, 0);

    // Save the inverted image
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const invertedImage = canvas.toDataURL('image/png');
    saveImage(invertedImage, `w_${file.name}`);
});

function saveImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
}
