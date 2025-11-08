// Show QR Modal
function showModal() {
    document.getElementById('qrModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('qrModal').style.display = 'none';
}

// Language select behavior
const languageSelect = document.getElementById('languageSelect');
languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    // Handle language selection logic here
    console.log(`Language changed to: ${selectedLanguage}`);
});

// Display Telebirr number
const telNumber = '1234567890';
document.getElementById('telNumber').innerText = telNumber;
