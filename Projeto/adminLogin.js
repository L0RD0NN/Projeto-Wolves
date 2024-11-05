function realizarLogin() {
    // Lógica para realizar o login aqui
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const usuarioValido = 'admin';
    const senhaValida = 'admin123';

    if(usuario === usuarioValido && senha === senhaValida) {
        alert('Login realizado com sucesso!');
        // Redirecionar para a página de administração
        window.location.href = 'telaAdmin.html';
    } else {
        alert('Usuário ou senha inválidos. Tente novamente.');
    }

   
}

const botaoLogin = document.getElementById('botao-login');
botaoLogin.addEventListener('click', realizarLogin);