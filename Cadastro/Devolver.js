document.getElementById('form-devolucao').addEventListener('submit', async (event) => {
    event.preventDefault();

    const codigo_produto = document.getElementById('codigo').value;
    const estado_equipamento = document.getElementById('estado').value;

    try {
        const response = await fetch('http://localhost:3000/devolucoes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigo_produto, estado_equipamento })
        });

        if (response.ok) {
            alert('Devolução registrada com sucesso!');
            document.getElementById('form-devolucao').reset();
        } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Erro ao registrar devolução:', error);
        alert('Erro ao registrar devolução. Tente novamente mais tarde.');
    }
});