const loginBtn = document.getElementById('loginBtn');
const mailInput = document.querySelector('.loginBox__userEmail');
const passInput = document.querySelector('.passwordBox__userPassword');
const hiddenEyeBtn = document.querySelector('.passwordBox__hiddenEye');
const hiddenEyeIcons = document.querySelectorAll('.hiddenEye__icon');

let userToken = sessionStorage.getItem('userToken');
let userMail;
let userPass;

if (userToken) {
  window.location.replace('components/home/index.html');
} else {
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
    hiddenEyeIcons[0].style.fill = '#36B972';
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
          res
            .json()
            .then((data) =>
              sessionStorage.setItem('userToken', data.accessToken)
            );
          window.location.replace('components/home/index.html');
        } else {
          mailInput.classList.add('loginBox__userEmail--error');
          document
            .querySelector('.loginBox__passwordBox')
            .classList.add('loginBox__passwordBox--error');
          const iconPaths = document.querySelectorAll('.hiddenEye__icon path');
          iconPaths.forEach((iconPath) => {
            iconPath.style.fill = '#fb5f5f';
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
