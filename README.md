Este projeto foi desenvolvido com o intuito de mostrar meus conhecimentos em desenvolvimento fullstack para o processo seletivo da Keevo.

#Requisitos Funcionais
- Cadastrar uma nova tarefa
- Editar uma tarefa da lista
- Remover uma tarefa da lista
- A tarefa deve possuir status que indiquem sua situação
- Visualizar a lista de tarefas
- Filtrar as tarefas por status
- Botão Sort que ordena as tarefas por status
- Botão Reload que limpa filtro e ordenação

#Propostas de Melhoria
- Colunas de status em que seja possível arrastar as tarefas de acordo com seu andamento
- Inclusão de datas limite para as tarefas
- Sistema de Login e compartilhamento de tarefas entre equipes (associação de responsáveis para cada tarefa)

#Requisitos Técnicos
- Backend: .NET Core
- Frontend: Angular
- Banco de dados: PostGres
- Persistência dos dados: EntityFramework Core

O projeto é dividido em dois grandes diretórios: Client(front) e Server(back).
Para a execução do projeto deve-se:
- Entrar no diretório Client/ e executar o comand npm i para instalar as dependências
- Entrar no diretório Server/ e executar dotnet run para rodar o backend
- Entrar no diretório Client/src/app/components e executar ng serve para rodar o frontend
