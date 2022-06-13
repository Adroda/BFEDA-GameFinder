/*fetch('http://localhost:3000/users')
    .then((response) => response.json())
    .then((users) => {
        console.log('users');
    });*/

// LOGIN
/*const login = () => {
    window.location.replace('components/home/index.html');
};*/
//jwt_decode(response.accessToken)

const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
    let user = { email: 'prueba@prueba.com', password: '123456' };
    let parsedUser = JSON.stringify(user);
    fetch('http://localhost:3000/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: parsedUser,
    })
        .then((res) => console.log(res))
        .catch((err) => {
            throw err;
        });
});

//email y pass son la informacion q agarro de los input y la checkie,
/*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById('demo').innerHTML = xhttp.responseText;
        }
    };
    xhttp.open('POST', 'http://127.0.0.1:3000/login', true);
    xhttp.send({ email: 'email@algo.com', password: 'password' });*/
//window.location.replace('components/home/index.html');
