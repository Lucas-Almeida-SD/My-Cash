# Projeto My Cash

Nesse projeto foi desenvolvida uma 
aplicação fullstack, no qual na parte do `backend` foi desenvolvida uma `REST API` para ser consumida pela parte do `frontend`. 

A API é um sistema de gerenciamento de contas financeiras, no qual seus usuários podem realizar login, leitura de seus dados pessoais, de suas contas e de suas transações realizadas. Também é possível cadastrar novos usuários, novas contas e novas transações.

Na parte do `frontend` foi desenvolvida uma `SPA` (Single Page Aplication) com uma interface simples, amigável e intuitiva, capaz de consumir a API desenvolvida na parte do `backend`. Através dela o usuário pode realizar seu cadastro, fazer login, visualizar informações de sua conta e de suas transações, além de poder realizar novas transações de acordo com seu saldo em conta.

## Tecnologias
  - __Back-end__
    - Node.js
    - Express
    - TypeScript
    - Sequelize
    - jwt
    - zod
    - mocha
    - chai
    - PostgreSQL
    - ESLint
    - Docker

  - __Front-end__
    - React.js
    - TypeScript
    - React Router Dom
    - React Hot Toast
    - React Testing Library
    - ESlint
    - Sass
    - Docker

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone git@github.com:Lucas-Almeida-SD/My-Cash.git

$ cd My-Cash
```

Para iniciá-lo, siga os passos abaixo:

<details>
  <summary><strong>Com Docker</strong></summary>

  ### Recomendações
  Durante o desenvolvimento deste projeto, foi utilizado as seguintes versões:
  - [Docker v20.10.21](https://docs.docker.com/get-docker/)
  - [Docker Compose v1.29.2](https://docs.docker.com/compose/install/)

  Certifique-se de que as portas `3000`, `3001` e `5432` estejam disponíveis antes de iniciar a aplicação, caso contrário, poderá ocorrer erros.

  _Em seu terminal, digite os comandos abaixo:_
  ```bash
  # Criar os containers
  $ docker-compose up -d
  ```

  Após isso, a aplicação já estará funcionando e poderá ser acessada através de [http://localhost:3000/](http://localhost:3000/).

</details>

<details>
  <summary><strong>Sem Docker</strong></summary>

  ### Recomendações
  Durante o desenvolvimento deste projeto, foi utilizado as seguintes versões:

  - [Node v16.15.1](https://nodejs.org/pt-br/)
  - [PostgreSQL v15.1](https://www.postgresql.org/download/)

  Certifique-se de que a porta `3000` esteja disponível antes de iniciar a aplicação e de que o seu sistema de gerenciamento de banco de dados `PostgreSQL` esteja operando corretamente.

  Lembrando que o arquivos `.env.example` (localizados em `./front-end` e `./back-end`) deverão ser renomeados para `.env` e as variáveis de ambiente contidas neles deverão possuir os valores de acordo com as suas credenciais.

  _Em seu terminal, digite os comandos abaixo:_

  ```bash
  # Iniciar o backend - utilizar uma aba do terminal
  $ npm run start:backend

  # Iniciar o frontend - utilizar uma aba do terminal
  $ npm run start:frontend
  ```

  Após isso, a aplicação já estará funcionando e poderá ser acessada através de [http://localhost:3000/](http://localhost:3000/).

</details>