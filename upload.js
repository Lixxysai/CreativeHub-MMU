const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', document.getElementById('imageUpload').files[0]);

    formData.append('author', localStorage.getItem('username'));

    formData.append('content', document.getElementById('captionInput').value);

try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if(result.success) {
            alert('Post uploaded successfully!');
            window.location.href = '/homepage.html';

        } else {
            alert('An error occur while uploading image: ' + result.error);

        }
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred while uploading the image. Please try again.');
    }
});
