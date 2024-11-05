const form = document.getElementById('form');
const name = document.getElementById('name');
const idade = document.getElementById('idade');
const cpf = document.getElementById('cpf');
const peso = document.getElementById('peso');
const intencao = document.getElementById('intencao');
const email = document.getElementById('email');
const senha = document.getElementById('password');
const senhaconfirm = document.getElementById('password-confirmation');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (checkForm()) {
        await submitForm();
    }
});

idade.addEventListener("blur",() => {
    checkInputsIdade();
});

cpf.addEventListener("blur",() => {
    checkInputsCPF();
});

peso.addEventListener("blur",() => {
    checkInputsPeso();
});

email.addEventListener("blur",() => {
    checkInputsEmail();
});

senha.addEventListener("blur",() => {
    checkInputsSenha();
});

senhaconfirm.addEventListener("blur",() => {
    checkInputsConfirmSenha();
});
name.addEventListener("blur",() => {
    checkInputsName();
});

function checkInputsName() {
    const nameValue = name.value;
    if(nameValue === '') {
        errorinput(name, "Preencha o campo Nome");
    }else {
        const formItem = name.parentElement;
        formItem.className = "form-content"
    }
}   

function checkInputsIdade() {
    const idadeValue = idade.value;
    if(idadeValue === '') {
        errorinput(idade, "Preencha o campo Idade");
    }else {
        const formItem = idade.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputsCPF() {
    const cpfValue = cpf.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpfValue === '') {
        errorinput(cpf, "Preencha o campo CPF");
    } else if (!validarCPF(cpfValue)) {
        errorinput(cpf, "CPF inválido");
    } else {
        const formItem = cpf.parentElement;
        formItem.className = "form-content"; // Adiciona classe de sucesso
    }
}

function validarCPF(cpf) {
    if (cpf.length !== 11) {
        return false;
    }

    let soma = 0;
    let resto;

    // Verifica se todos os dígitos são iguais
    if (cpf.split('').every(c => c === cpf[0])) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    // Calcula o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

function checkInputsPeso() {
    const pesoValue = peso.value;
    if(pesoValue === '') {
        errorinput(peso, "Preencha o campo Peso");
    }else {
        const formItem = peso.parentElement;
        formItem.className= "form-content"
    }
}

function checkInputsEmail() {
    const emailValue = email.value;
    if(emailValue === '') {
        errorinput(email, "Preencha o campo Email");
    }else {
        const formItem = email.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputsSenha() {
    const senhaValue = senha.value;
    if(senhaValue === "") {
        errorinput(senha, "Preencha o campo Senha");
    }else if(senhaValue.length < 8) {
        errorinput(senha, "A senha deve conter no mínimo 8 caracteres")
    }else {
        const formItem = senha.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputsConfirmSenha() {
    const senhaValue = senha.value;
    const confirmationsenhaValue = senhaconfirm.value;
    if(confirmationsenhaValue === "") {
        errorinput(senhaconfirm, "Preencha o campo de Confirmação de Senha");
    }else if(senhaValue !== confirmationsenhaValue) {
        errorinput(senhaconfirm, "As senhas não coincidem");
    }else {
        const formItem = senhaconfirm.parentElement;
        formItem.className = "form-content"
    }
}

function checkForm(){
    checkInputsName();
    checkInputsIdade();
    checkInputsCPF();
    checkInputsPeso();
    checkInputsEmail();
    checkInputsSenha();
    checkInputsConfirmSenha();
    const formItems = form.querySelectorAll(".form-content");
    const isValid = [...formItems].every((item) => {
        return item.className === "form-content"
    });

    // Seleciona o botão de envio do formulário
    const submitButton = form.querySelector('button[type="submit"]');

    if(isValid) {
        alert("Cadastro realizado com sucesso");
        // Adiciona a classe 'success' e remove 'error' se o formulário for válido
        submitButton.classList.add('success');
        submitButton.classList.remove('error');
        return true;
    } else {
        alert("Preencha todos os campos corretamente");
        // Adiciona a classe 'error' e remove 'success' se o formulário for inválido
        submitButton.classList.add('error');
        submitButton.classList.remove('success');
        return false;
    }
}

function errorinput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.className = 'form-content error';
}

async function submitForm() {
    const formData = {
        nome_completo: name.value,
        idade: idade.value,
        cpf: cpf.value,
        peso: peso.value,
        posicao: intencao.value,
        email: email.value,
        senha: senha.value
    };

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Usuário cadastrado com sucesso:', data);
            // Redirecionar para a tela de login após o cadastro bem-sucedido
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); // Espera 4 segundos antes de redirecionar
        } else {
            console.error('Erro ao cadastrar usuário:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
    }
}