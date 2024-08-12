document.getElementById('invertButton').addEventListener('click', function () {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length === 0) {
        alert("Please select an image first.");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            const canvas = document.getElementById('imageCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            // Invert colors
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];     // Red
                data[i + 1] = 255 - data[i + 1]; // Green
                data[i + 2] = 255 - data[i + 2]; // Blue
            }

            ctx.putImageData(imageData, 0, 0);

            // Save the image
            const invertedImage = canvas.toDataURL('image/png');
            saveImage(invertedImage, `w_${file.name}`);
        }
    }

    reader.readAsDataURL(file);
});

function saveImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
}
