const imageService = function () {

    async function resize(file, maxWidth, maxHeight) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function (readerEvent) {
                const image = new Image();

                image.onload = function (imageEvent) {
                    const canvas = document.createElement('canvas');
                    let width = image.width;
                    let height = image.height;
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                    const dataURL = canvas.toDataURL('image/jpeg', 0.75);
                    canvas.toBlob((blob) => {
                            resolve({blob, dataURL});
                    }, "image/jpeg", 0.75);

                };
                image.src = readerEvent.target.result;
            }
            reader.readAsDataURL(file);
        });
    }

    return {resize}
}

export default imageService();