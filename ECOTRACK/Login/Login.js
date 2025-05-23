var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

document.getElementById('submitSignup').addEventListener('click', async (event) => {
    event.preventDefault();

    // Captura os dados do formulário de cadastro
    const nome = document.querySelector('input[placeholder="Nome"]').value;
    const cpf = document.querySelector('input[placeholder="CPF"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;
    const confirmarSenha = document.querySelector('input[placeholder="Confirme a Senha"]').value;

    // Cria o objeto que será enviado à API
    const registerData = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha
    };

    try {
        // Envia a requisição POST para o endpoint de registro
        const response = await fetch('http://localhost:5268/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        // Verifica se a requisição foi bem-sucedida
        if (response.ok) {
            await response.json();
            alert('Cadastro realizado com sucesso!');
        } else {
            const error = await response.json();
            alert('Erro no cadastro: ' + error.message);
        }
    } catch (error) {
        console.error('Erro ao registrar: ', error.message);
        alert('Erro no servidor.');
    }
});

document.getElementById('submitSignin').addEventListener('click', async (event) => {
    event.preventDefault();

    // Captura os dados do formulário de login
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Cria o objeto que será enviado à API
    const loginData = {
        Email: email,
        Senha: password
    };

    try {
        // Envia a requisição POST para o endpoint de login
        const response = await fetch('http://localhost:5268/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        // Verifica se o login foi bem-sucedido
        if (response.ok) {
            const result = await response.json();
            alert('Login realizado com sucesso!');
            console.log('Token JWT: ', result.Token);
            // Armazena o token no localStorage
            localStorage.setItem('jwtToken', result.token);

            // Redireciona para formulario.html
            window.location.href = 'formulario.html';
        } else {
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    } catch (error) {
        console.error('Erro ao fazer login: ', error.message);
        alert('Erro no servidor.');
    }
});