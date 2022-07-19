const loginBtn = document.getElementById('loginBtn');
const mailInput = document.querySelector('.loginBox__userEmail');
const passInput = document.querySelector('.passwordBox__userPassword');
const hiddenEyeBtn = document.querySelector('.passwordBox__hiddenEye');
const hiddenEyeIcons = document.querySelectorAll('.hiddenEye__icon');

let userMail;
let userPass;

hiddenEyeBtn.addEventListener('click', () => {
    if (passInput.type === 'password') {
        passInput.type = 'text';
    } else {
        passInput.type = 'password';
    }
    hiddenEyeIcons.forEach((icon) => {
        icon.classList.toggle('hide');
    });
});

const clearErrors = () => {
    mailInput.classList.remove('loginBox__userEmail--error');
    document
        .querySelector('.loginBox__passwordBox')
        .classList.remove('loginBox__passwordBox--error');
    hiddenEyeIcon.style.fill = '#36B972';
};

mailInput.addEventListener('input', () => {
    userMail = mailInput.value;
    clearErrors();
});
passInput.addEventListener('input', () => {
    userPass = passInput.value;
    clearErrors();
});

loginBtn.addEventListener('click', () => {
    let user = { email: userMail, password: userPass };
    let parsedUser = JSON.stringify(user);
    fetch('http://localhost:3000/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: parsedUser,
    })
        .then((res) => {
            if (res.status === 200) {
                window.location.replace('components/home/index.html');
            } else {
                mailInput.classList.add('loginBox__userEmail--error');
                document
                    .querySelector('.loginBox__passwordBox')
                    .classList.add('loginBox__passwordBox--error');
                const iconPaths = document.querySelectorAll(
                    '.hiddenEye__icon path'
                );
                iconPaths.forEach((iconPath) => {
                    iconPath.style.fill = '#fb5f5f';
                });
            }
        }) //TODO cuando me logeo no puedo apretar el boton de atras para volver a donde estaba
        .catch((err) => {
            throw err;
        });
});
