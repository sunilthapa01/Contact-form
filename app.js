const inputs = document.querySelectorAll('textarea, input[type="text"], input[type="email"], input[type="radio"], input[type="checkbox"]');
const warningMessages = document.querySelectorAll('.Warn');
warningMessages.forEach(warning => warning.style.display = 'none');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

document.getElementById('OnSub').addEventListener('submit', (event) => {
    event.preventDefault();

    let formValid = true;

    inputs.forEach((input) => {
        const warning = input.nextElementSibling;

        if (input.type === 'radio') {
            const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
            const isRadioSelected = Array.from(radioGroup).some(radio => radio.checked);

            if (!isRadioSelected) {
                warning.style.display = 'inline';
            } else {
                warning.style.display = 'none';
            }
        } else if (input.type === 'checkbox') {
            if (!input.checked) {
                formValid = false;
                warning.style.display = 'inline';
            } else {
                warning.style.display = 'none';
            }
        } else if (input.value.trim() === "") {
            formValid = false;
            warning.style.display = 'inline';
        } else {
            warning.style.display = 'none';
        }
    });

    const emailInput = document.getElementById('email');
    const emailWarning = document.querySelector('.Warn[data-for="email"]');
    if (!emailRegex.test(emailInput.value)) {
        formValid = false;
        emailWarning.style.display = 'block';
    } else {
        emailWarning.style.display = 'none';
    }

    if (formValid) {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';

        setTimeout(function() {
            notification.style.display = 'none';
        }, 3000);

        document.getElementById('OnSub').reset();
    }
});

document.getElementById('email').addEventListener('input', (event) => {
    const emailInput = event.target;
    const emailWarning = document.querySelector('.Warn[data-for="email"]');

    if (!emailRegex.test(emailInput.value)) {
        emailWarning.style.display = 'block';
    } else {
        emailWarning.style.display = 'none';
    }
});
