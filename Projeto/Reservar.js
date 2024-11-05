const form = document.getElementById('form');
const nome = document.getElementById('nome');
const tamanho = document.getElementById('tamanho');
const quantidade = document.getElementById('quantidade');
const tipo = document.getElementById('tipo');
const codigo = document.getElementById('codigos');
const dataEmprestimo = document.getElementById('data-emprestimo');
const dataDevolucao = document.getElementById('data-devolucao');
const telefone = document.getElementById('telefone');

function checkInputsName() {
    const nameValue = nome.value;
    if (nameValue === '') {
        errorinput(name_usuario, "Preencha o campo Nome");
        return false;
    } else {
        const formItem = nome.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkInputsTamanho() {
    const tamanhoValue = tamanho.value;
    if (tamanhoValue === '') {
        errorinput(tamanho, "Preencha o campo Tamanho");
        return false;
    } else {
        const formItem = tamanho.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkInputsQuantidade() {
    const quantidadeValue = quantidade.value;
    if (quantidadeValue === '') {
        errorinput(quantidade, "Preencha o campo Quantidade");
        return false;
    } else {
        const formItem = quantidade.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkInputsCodigo() {
    const codigoValue = codigo.value;
    if (codigoValue === '') {
        errorinput(codigo, "Preencha o campo Código");
        return false;
    } else {
        const formItem = codigo.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkInputsDataEmprestimo() {
    const dataEmprestimoValue = dataEmprestimo.value;
    if (dataEmprestimoValue === '') {
        errorinput(dataEmprestimo, "Preencha o campo Data de Empréstimo");
        return false;
    } else {
        const formItem = dataEmprestimo.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkInputsDataDevolucao() {
    const dataDevolucaoValue = dataDevolucao.value;
    if (dataDevolucaoValue === '') {
        errorinput(dataDevolucao, "Preencha o campo Data de Devolução");
        return false;
    } else {
        const formItem = dataDevolucao.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkInputsTelefone() {
    const telefoneValue = telefone.value;
    if (telefoneValue === '') {
        errorinput(telefone, "Preencha o campo Telefone");
        return false;
    } else {
        const formItem = telefone.parentElement;
        formItem.className = "form-content";
        return true;
    }
}

function checkForm() {
    const isNameValid = checkInputsName();
    const isTamanhoValid = checkInputsTamanho();
    const isQuantidadeValid = checkInputsQuantidade();
    const isCodigoValid = checkInputsCodigo();
    const isDataEmprestimoValid = checkInputsDataEmprestimo();
    const isDataDevolucaoValid = checkInputsDataDevolucao();
    const isTelefoneValid = checkInputsTelefone();

    return isNameValid && isTamanhoValid && isQuantidadeValid && isCodigoValid && isDataEmprestimoValid && isDataDevolucaoValid && isTelefoneValid;
}

function errorinput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.className = 'form-content error';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (checkForm()) {
        const emprestimo = {
            nome_usuario: nome.value,
            tamanho: tamanho.value,
            quantidade: quantidade.value,
            tipo: tipo.value,
            codigo_produto: codigo.value,
            dataEmprestimo: dataEmprestimo.value,
            dataDevolucaoPrometida: dataDevolucao.value,
            telefone: telefone.value
        };

        console.log('Enviando dados do empréstimo:', emprestimo);

        fetch('http://localhost:3000/emprestimos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emprestimo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.error) {
                console.error('Erro ao registrar empréstimo:', data.details);
                alert("Erro ao registrar empréstimo");
            } else {
                alert("Empréstimo realizado com sucesso");
                form.reset();
            }
        })
        .catch(error => {
            console.error('Erro ao registrar empréstimo:', error);
            alert("Erro ao registrar empréstimo");
        });
    }
});