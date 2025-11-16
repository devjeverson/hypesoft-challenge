# HypeSoft Challenge - Aplicação Full-Stack

Este repositório contém uma aplicação web full-stack completa, orquestrada com Docker Compose. A arquitetura inclui um backend em .NET, um frontend em React, autenticação com Keycloak e um banco de dados MongoDB.

## Índice

- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar](#como-executar)
- [Acessando os Serviços](#acessando-os-serviços)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Comandos Úteis do Docker](#comandos-úteis-do-docker)

## Arquitetura

A aplicação é dividida nos seguintes serviços, todos executando em contêineres Docker e conectados através de uma rede customizada (`hypesoft-net`):

-   **`frontend`**: Uma aplicação em React (criada com Vite) que serve como a interface do usuário. Ela é construída e servida por um servidor NGINX.
-   **`api`**: O backend da aplicação, desenvolvido com .NET 9. Ele se conecta ao MongoDB para persistência de dados e ao Keycloak para autenticação e autorização.
-   **`mongo`**: Banco de dados NoSQL (MongoDB) utilizado pela API para armazenar os dados da aplicação.
-   **`mongo-express`**: Uma interface web para visualizar e gerenciar o banco de dados MongoDB.
-   **`keycloak`**: Serviço de gerenciamento de identidade e acesso. Ele é pré-configurado para importar um *realm* (`HypeSoftRealm`) na inicialização.
-   **`keycloak-db`**: Um banco de dados PostgreSQL dedicado para o Keycloak armazenar suas próprias informações.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

-   Docker
-   Docker Compose (geralmente já vem incluído na instalação do Docker Desktop)

## Como Executar

Siga os passos abaixo para colocar toda a stack no ar.

1.  **Clone o repositório**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd hypesoft-challenge
    ```

2.  **Verifique o arquivo de Realm**
    Certifique-se de que o arquivo `realm-export.json` está presente na raiz do projeto. Ele é essencial para a configuração automática do Keycloak.

3.  **Construa as imagens e inicie os contêineres**
    Execute o seguinte comando no terminal, a partir da pasta raiz do projeto (onde o arquivo `docker-compose.yml` se encontra):

    ```bash
    docker-compose up --build -d
    ```
    -   `--build`: Força a reconstrução das imagens da `api` e do `frontend`, garantindo que quaisquer alterações no código-fonte sejam aplicadas.
    -   `-d`: (detached mode) Executa os contêineres em segundo plano, liberando seu terminal.

A primeira execução pode demorar alguns minutos, pois o Docker precisará baixar as imagens base e construir as imagens customizadas.

## Acessando os Serviços

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

| Serviço | URL | Credenciais (se aplicável) |
| :--- | :--- | :--- |
| **Frontend (React)** | `http://localhost:3000` | - |
| **Backend (API .NET)** | `http://localhost:5000` | - |
| **Keycloak (Admin)** | `http://localhost:8080` | `admin` / `admin` |
| **Mongo Express** | `http://localhost:8081` | `admin` / `password` |

## Fluxo de Desenvolvimento

### Backend (.NET)

O serviço da `api` está configurado para **Hot Reload**. Graças à combinação do `dotnet watch` e do mapeamento de volume (`./backend:/app`), qualquer alteração que você salvar nos arquivos dentro da pasta `./backend` irá automaticamente reiniciar o servidor da API dentro do contêiner. Você pode acompanhar os logs de reinicialização com o comando `docker-compose logs -f api`.

### Frontend (React)

O serviço `frontend` está configurado para um **build de produção**. Ele constrói os arquivos estáticos do React e os serve com NGINX. Este setup **não possui Hot Reload**. Para um ambiente de desenvolvimento com Hot Reload no frontend, seria necessária uma configuração diferente, geralmente com um arquivo `docker-compose.override.yml`.

## Estrutura de Pastas

```
.
├── backend/              # Código-fonte da API .NET
├── frontend/             # Código-fonte da aplicação React
├── docker-compose.yml    # Arquivo principal de orquestração dos contêineres
└── realm-export.json     # Arquivo de configuração do Realm do Keycloak
```

## Comandos Úteis do Docker

Aqui estão alguns comandos do Docker Compose que serão úteis durante o desenvolvimento:

-   **Iniciar todos os serviços:** `docker-compose up -d`
-   **Parar e remover os contêineres:** `docker-compose down`
-   **Parar e remover contêineres e volumes (apaga os dados dos bancos):** `docker-compose down -v`
-   **Visualizar os logs de um serviço específico (ex: api):** `docker-compose logs -f api`
-   **Forçar a reconstrução das imagens:** `docker-compose build`
-   **Acessar o terminal de um contêiner em execução (ex: api):** `docker-compose exec api /bin/bash`