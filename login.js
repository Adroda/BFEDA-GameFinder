const loginBtn = document.getElementById('loginBtn');
const mailInput = document.querySelector('.loginBox__userEmail');
const passInput = document.querySelector('.passwordBox__userPassword');

let userMail;
let userPass;

mailInput.addEventListener('input', () => {
    userMail = mailInput.value;
});
passInput.addEventListener('input', () => {
    userPass = passInput.value;
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
                document
                    .querySelector('.loginBox__userEmail')
                    .classList.add('loginBox__userEmail--error');
                document
                    .querySelector('.loginBox__passwordBox')
                    .classList.add('loginBox__passwordBox--error');
            }
        }) //cuando me logeo no puedo apretar el boton de atras para volver a donde estaba
        .catch((err) => {
            throw err;
        });
});
