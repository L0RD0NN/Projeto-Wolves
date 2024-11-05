# Wolves - Sistema de Gestão de Equipamentos

## Descrição do Projeto

O sistema **Wolves** foi desenvolvido para facilitar o gerenciamento de equipamentos esportivos. Ele permite que usuários cadastrem-se, façam login, realizem empréstimos e devoluções de equipamentos, enquanto o administrador pode gerenciar o inventário, adicionando novos itens ao sistema.

### Funcionalidades Principais

- **Cadastro e Login de Usuário**: Os usuários podem se cadastrar no sistema informando dados pessoais, como nome completo, idade, CPF, peso, posição (selecionada entre opções específicas) e e-mail. O sistema de login permite que apenas usuários cadastrados acessem as funcionalidades.
- **Gerenciamento de Equipamentos**: Administradores podem cadastrar novos equipamentos, incluindo dados como tipo, código, quantidade e status.
- **Empréstimo de Equipamentos**: Os usuários podem registrar empréstimos de equipamentos, informando o tipo, código do produto, data de empréstimo e data de devolução.
- **Devolução de Equipamentos**: Ao devolver um item, o usuário registra a data de devolução e o estado do equipamento, permitindo que o administrador avalie a condição dos itens.
- **Autenticação de Administrador**: O administrador é autenticado para realizar o cadastro de novos equipamentos, simulando a integração com um leitor de digitais.

---

## Pré-requisitos

Antes de executar o projeto, você precisa ter as seguintes ferramentas instaladas:

- **Node.js** (versão 14 ou superior)
- **PostgreSQL** (versão 13 ou superior)

> Certifique-se de que o PostgreSQL está rodando na porta `5432` e de que as tabelas estão criadas corretamente, conforme o modelo fornecido.

## Estrutura do Projeto

O projeto possui as seguintes pastas principais:

- `/src`: Contém o código fonte da aplicação.
- `/src/controllers`: Controladores que manipulam as funcionalidades da aplicação.
- `/src/routes`: Rotas definidas para cada endpoint da API.
- `/public`: Arquivos estáticos.

--- Apresentação das Telas
#### 1. Tela de Cadastro de Usuário
![Tela de Cadastro de Usuário](public/screenshots/cadastro_usuario.png)

#### 2. Tela de Login
![Tela de Login](public/screenshots/login.png)

#### 3. Tela de Cadastro de Equipamento (Administrador)
![Tela de Cadastro de Equipamento](public/screenshots/cadastro_equipamento.png)

#### 4. Tela de Empréstimo de Equipamento
![Tela de Empréstimo de Equipamento](public/screenshots/emprestimo_equipamento.png)

#### 5. Tela de Devolução de Equipamento
![Tela de Devolução de Equipamento](public/screenshots/devolucao_equipamento.png)



