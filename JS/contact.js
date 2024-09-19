document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const thankYouMessage = document.getElementById('thank-you-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(function() {
                form.reset();
                form.style.display = 'none';
                thankYouMessage.style.display = 'block';
            }, 1000);
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(function(input) {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (!isValid) {
            alert('Please fill in all fields.');
        }

        return isValid;
    }
});