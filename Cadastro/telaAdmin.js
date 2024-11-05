document.getElementById('load-data-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/admin/dados');
        const data = await response.json();

        // Preencher tabela de Emprestimos
        const emprestimosTableBody = document.getElementById('emprestimos-table').getElementsByTagName('tbody')[0];
        emprestimosTableBody.innerHTML = ''; // Limpar tabela antes de preencher
        data.emprestimos.forEach(emprestimo => {
            const row = emprestimosTableBody.insertRow();
            row.insertCell(0).textContent = emprestimo.nome_usuario;
            row.insertCell(1).textContent = emprestimo.codigo_produto;
            row.insertCell(2).textContent = new Date(emprestimo.dataEmprestimo).toLocaleDateString();
            row.insertCell(3).textContent = new Date(emprestimo.dataDevolucaoPrometida).toLocaleDateString();
            row.insertCell(4).textContent = emprestimo.dataDevolucao ? new Date(emprestimo.dataDevolucao).toLocaleDateString() : 'N/A';
            row.insertCell(5).textContent = emprestimo.status;
        });

        // Preencher tabela de Equipamentos
        const equipamentosTableBody = document.getElementById('equipamentos-table').getElementsByTagName('tbody')[0];
        equipamentosTableBody.innerHTML = ''; // Limpar tabela antes de preencher
        data.equipamentos.forEach(equipamento => {
            const row = equipamentosTableBody.insertRow();
            row.insertCell(0).textContent = equipamento.codigo_produto;
            row.insertCell(1).textContent = equipamento.tipo;
            row.insertCell(2).textContent = equipamento.status;
        });

        // Preencher tabela de Devolucoes
        const devolucoesTableBody = document.getElementById('devolucoes-table').getElementsByTagName('tbody')[0];
        devolucoesTableBody.innerHTML = ''; // Limpar tabela antes de preencher
        data.devolucoes.forEach(devolucao => {
            const row = devolucoesTableBody.insertRow();
            row.insertCell(0).textContent = devolucao.nome_usuario;
            row.insertCell(1).textContent = devolucao.codigo_produto;
            row.insertCell(2).textContent = devolucao.telefone;
            row.insertCell(3).textContent = new Date(devolucao.dataDevolucaoReal).toLocaleDateString();
            row.insertCell(4).textContent = new Date(devolucao.dataDevolucaoPrometida).toLocaleDateString();
            row.insertCell(5).textContent = devolucao.diasAtraso;
            row.insertCell(6).textContent = devolucao.status;
            row.insertCell(7).textContent = devolucao.estado_equipamento;
        });
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
});

document.getElementById('form-equipamento').addEventListener('submit', async (event) => {
    event.preventDefault();

    const tamanho = document.getElementById('tamanho').value;
    const codigo_produto = document.getElementById('codigo_produto').value;
    const tipo = document.getElementById('tipo').value;

    try {
        const response = await fetch('http://localhost:3000/equipamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tamanho, codigo_produto, tipo, status: 'Disponível' })
        });

        if (response.ok) {
            alert('Equipamento cadastrado com sucesso!');
            document.getElementById('form-equipamento').reset();
            document.getElementById('load-data-btn').click(); // Recarregar dados
        } else {
            const errorData = await response.json();
            alert(`Erro: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar equipamento:', error);
        alert('Erro ao cadastrar equipamento. Tente novamente mais tarde.');
    }
});