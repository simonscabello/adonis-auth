# Rodando um Projeto Adonis Localmente com Yarn e SQLite3

Este guia irá ajudá-lo a configurar e executar um projeto AdonisJS localmente em sua máquina usando Yarn como gerenciador de pacotes e SQLite3 como banco de dados.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Yarn](https://yarnpkg.com/) (instalado globalmente)
- [AdonisJS CLI](https://adonisjs.com/docs/4.1/installation#_installing_adonisjs) (`npm i -g @adonisjs/cli`)

## Configuração do Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/simonscabello/adonis-auth
   cd adonis-auth
   ```

2. **Instale as dependências do projeto:**

   ```bash
   yarn install
   ```

3. **Copie o arquivo `.env.example` para `.env`:**

   ```bash
    cp .env.example .env
   ```

4. **Gere uma chave para o projeto:**
5. **Execute as migrations para criar as tabelas no banco de dados:**

   ```bash
   adonis migration:run
   ```

6. **Execute o projeto:**

   ```bash
    adonis serve --dev
   ```

7. **Acesse o projeto em `http://localhost:3333`.**

8. Os endpoint sao

   ```bash
     http://localhost:3333/login
     http://localhost:3333/users/:id/profile
     http://localhost:3333/users
   ```
