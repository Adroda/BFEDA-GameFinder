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
    /*var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById('demo').innerHTML = xhttp.responseText;
        }
    };
    xhttp.open('POST', 'http://127.0.0.1:3000/login', true);
    xhttp.send({ email: 'email@algo.com', password: 'password' });*/
    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: { email: 'email@algo.com', password: 'password' }, //email y pass son la informacion q agarro de los input y la checkie,
    })
        .then((res) => console.log(res))
        .catch(err);
    //window.location.replace('components/home/index.html');
});

/*class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();
    }

    validateonSubmit() {
        let self = this;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                console.log(input.value);
            });
        });
    }
}

const form = document.querySelector('#loginForm');
if (form) {
    const fields = ['username', 'password'];
    const validator = new Login(form, fields);
}*/
