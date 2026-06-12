# Hotel Reservas

## 1. Descrição do Projeto

O Hotel Reservas é um sistema web desenvolvido para realizar o gerenciamento de quartos e reservas de um hotel. O sistema permite cadastrar quartos, registrar reservas, consultar informações e controlar a ocupação dos quartos por meio de uma interface web integrada a uma API REST.

## 2. Tecnologias Utilizadas

### IDE Utilizada

* Visual Studio Code (VS Code)

### SGBD e Versão

* MySQL 8.0

### Servidor de Aplicação e Versão

* Node.js
* Express.js

### Linguagens Utilizadas

* HTML
* CSS3
* JavaScript
* SQL

### Bibliotecas e Ferramentas

* Prisma ORM
* Prisma Client
* Express
* MySQL

## 3. Estrutura do Projeto

```text
## Estrutura do Projeto

```text
hotelreservas/
│
├── api/
│   ├── node_modules/
│   │
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── quarto.controller.js
│   │   │   └── reserva.controller.js
│   │   │
│   │   ├── data/
│   │   │
│   │   └── routes/
│   │       ├── quarto.routes.js
│   │       └── reserva.routes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── insomnia.json
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma.config.ts
│   └── server.js
│
├── docs/
│   ├── Insomnia_2026-06-...
│   └── schema.prisma
│
├── web/
│   ├── index.html
│   ├── reservas.html
│   ├── script.js
│   └── style.css
│
├── wireframes/
│
└── .gitignore
```

## 4. Banco de Dados

O banco de dados é composto pelas seguintes entidades:

### Quarto

| Campo  | Tipo    |
| ------ | ------- |
| id     | Inteiro |
| numero | Texto   |
| tipo   | Texto   |

### Reserva

| Campo    | Tipo    |
| -------- | ------- |
| id       | Inteiro |
| hospede  | Texto   |
| checkin  | Data    |
| checkout | Data    |
| quartoId | Inteiro |

Relacionamento:

* Um quarto pode possuir várias reservas.
* Uma reserva pertence a apenas um quarto.

## 5. Prints das Telas

### Tela Inicial

## ![Texto alternativo](quarto.png)

### Tela de Cadastro de Quartos

## ![Texto alternativo](quartomodal.png)

### Tela de Reservas

## ![Texto alternativo](reserva.png)

### Tela de Listagem

## ![Texto alternativo](reservamodal.png)

## 6. Passo a Passo para Execução do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/franks-sys/hotelreservas.git
```

### 2. Acessar a pasta do projeto

```bash
cd hotelreservas
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar o banco de dados

Criar um arquivo `.env` na pasta da API:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/hotelreservas"
```

### 5. Executar as migrations

```bash
npx prisma migrate dev
```

### 6. Gerar o Prisma Client

```bash
npx prisma generate
```

### 7. Iniciar o servidor

```bash
npm start
```

ou

```bash
node src/server.js
```

### 8. Executar o Front-end

Abrir o arquivo `index.html` em um navegador ou utilizar a extensão Live Server do Visual Studio Code.

## 7. Funcionalidades Implementadas

* Cadastro de quartos.
* Consulta de quartos.
* Cadastro de reservas.
* Consulta de reservas.
* Exclusão de registros.
* Integração entre front-end e back-end.
* Persistência de dados utilizando MySQL e Prisma ORM.

## 8. Autor

Francisco Paula

GitHub: https://github.com/franks-sys/hotelreservas
