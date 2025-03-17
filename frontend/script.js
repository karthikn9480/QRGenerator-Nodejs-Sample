document.getElementById('qr-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const id = document.getElementById('qr-id').value;
    const price = document.getElementById('qr-price').value;

    // Check if the input values are valid
    if (!id || !price) {
        alert("Please fill out both fields!");
        return;
    }

    const formData = { data: { id, price } };

    try {
        // Send POST request to the backend
        const response = await fetch('http://3.83.205.85:3000/generateQR', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // Create an anchor tag to download the generated QR code
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'qrcode.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'Something went wrong');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error generating the QR code');
    }
});
