document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[action="login.html"]');
    const usuarioInput = document.querySelector('input[placeholder="Usuário"]');
    const senhaInput = document.querySelector('input[placeholder="Senha"]');

    // Limpar o campo de email sempre que a página for carregada
    usuarioInput.value = '';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usuario = {
            email: usuarioInput.value,
            senha: senhaInput.value
        };

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login bem-sucedido!');
                
                window.location.href = 'menu.html';
            } else {
                alert(`Erro ao fazer login: ${data.error}`);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        }
    });
});