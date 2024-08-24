[Linkedin](https://www.linkedin.com/in/matheus-mozart-borges)

# Projeto API com NestJS, TypeScript, Redis, PostgreSQL, PgAdmin, Docker e TypeORM

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/) e [TypeScript](https://www.typescriptlang.org/), utilizando [Redis](https://redis.io/), [PostgreSQL](https://www.postgresql.org/), [TypeORM](https://typeorm.io/), [Docker](https://www.docker.com/), e [Docker Compose](https://docs.docker.com/compose/). A API recebe tokens JWT, valida com um token armazenado no Redis e interage com um banco de dados PostgreSQL.

## Requisitos

Certifique-se de ter o seguinte instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações eficientes e escaláveis.
- **TypeScript**: Superconjunto do JavaScript que adiciona tipos estáticos.
- **Redis**: Banco de dados em memória utilizado como cache e para a validação de tokens JWT.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados.
- **TypeORM**: ORM para TypeScript e JavaScript.
- **Docker**: Containerização da aplicação.
- **Docker Compose**: Orquestração de múltiplos containers Docker.
- **Pg admin**: Administração dos bancos de dados.
- **Swagger**: Documentação da api.

## Configuração do Projeto

### Passo 1: Clonar o Repositório

```bash
git clone git@github.com:Mtmozart/mks.git
cd seu-projeto
```

````

### Passo 2: Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:

```env
# Configurações do Ambiente
NODE_ENV=development

# Configurações do Banco de Dados
HOST_DB=
PORT_DB=
USER_DB=
PASSWORD_DB=s
NAME_DB=
URL_DATABASE=

# Configurações do JWT
SECRET=

PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

### Passo 3: Instalar Dependências

Utilize o Yarn para instalar as dependências do projeto:

```bash
yarn install
```

### Passo 4: Iniciar os Containers Docker

Use o Docker Compose para iniciar os containers do projeto, incluindo PostgreSQL, Redis e pgAdmin:

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`.

## Acesso ao pgAdmin

O pgAdmin é uma ferramenta de administração do PostgreSQL e pode ser acessado em `http://localhost:5050`.

### Configurar o pgAdmin

1. Acesse o pgAdmin em `http://localhost:5050`.
2. Use as seguintes credenciais padrão:
   - **Email**: `definida nas variáveis de ambiente`
   - **Senha**: `definida nas variáveis de ambiente`
3. Após fazer login, crie um novo servidor:
   - Clique com o botão direito em "Servers" e selecione "Create > Server".
   - Na aba "General", dê um nome ao servidor, como definido nas variáveis de ambiente.
   - Na aba "Connection", configure as seguintes opções:
     - **Host**: `com base na que fez na variável de ambiente`
     - **Port**: `com base na que fez na variável de ambiente`
     - **Username**: `com base na que fez na variável de ambiente`
     - **Password**: `com base na que fez na variável de ambiente`

Clique em "Save" para finalizar.

### Configuração da Rede do Docker

Os serviços no Docker Compose estão configurados para usar a rede `mks-bridge`, o que permite que todos os containers se comuniquem entre si. Não é necessário criar uma rede adicional, pois a rede padrão já suporta a comunicação entre os serviços. A configuração do Docker Compose assume que o `pgAdmin`, o PostgreSQL e o Redis estão todos na mesma rede, permitindo fácil interação.

## Estrutura de Pastas

- **src**: Contém o código-fonte da aplicação.
  - **modules**: Módulos da aplicação.
  - **config**: Configurações da aplicação.
  - **controllers**: Controladores que gerenciam as rotas.
  - **services**: Serviços que contêm a lógica de negócios.

## Autenticação JWT

O processo de autenticação funciona da seguinte forma:

1. O cliente envia uma requisição com um token JWT no header `Authorization`.
2. A API valida o token e verifica se ele está armazenado no Redis.
3. Se o token for válido, a requisição é permitida; caso contrário, é negada.
4. Depois é verificado os dados do usuário no jwt strategy.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
````
